import { NextResponse } from "next/server";
import { auth } from "auth";
import { sql } from "lib/db";
import { randomBytes } from "crypto";
import { sendAdminInviteEmail } from "@/lib/send-admin-invite-email";

const INVITE_EXPIRY_DAYS = 7;

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "super_admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { rows } = await sql`
      SELECT id, email, netid, role, super_admin_type, managed_subteams, expires_at, created_at
      FROM admin_invites
      WHERE expires_at > NOW()
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ invites: rows });
  } catch (err) {
    console.error("Failed to fetch invites:", err);
    return NextResponse.json({ error: "Failed to fetch invites" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "super_admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { email, netid, role, super_admin_type, managed_subteams } = body;

    const emailStr = String(email || "").toLowerCase().trim();
    if (!emailStr) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const netidVal = netid
      ? String(netid).trim().toLowerCase()
      : emailStr.includes("@cornell.edu")
        ? emailStr.split("@")[0].toLowerCase()
        : null;

    if (role !== "super_admin" && role !== "admin") {
      return NextResponse.json({ error: "Role must be super_admin or admin" }, { status: 400 });
    }

    if (role === "super_admin") {
      const sat = super_admin_type as string;
      if (sat !== "team_lead" && sat !== "business_lead") {
        return NextResponse.json({ error: "super_admin_type must be team_lead or business_lead" }, { status: 400 });
      }
    }

    if (role === "admin" && (!managed_subteams || !Array.isArray(managed_subteams))) {
      return NextResponse.json({ error: "managed_subteams array is required for admin" }, { status: 400 });
    }

    const existingAdmin = await sql`SELECT 1 FROM admins WHERE email = ${emailStr}`;
    if (existingAdmin.rows.length > 0) {
      return NextResponse.json({ error: "This email already has an admin account" }, { status: 400 });
    }

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + INVITE_EXPIRY_DAYS);
    const arrLiteral =
      role === "admin" && Array.isArray(managed_subteams) && managed_subteams.length > 0
        ? `{${managed_subteams.map((s) => `"${String(s).replace(/"/g, '\\"')}"`).join(",")}}`
        : "{}";

    await sql`
      INSERT INTO admin_invites (token, email, netid, role, super_admin_type, managed_subteams, expires_at)
      VALUES (
        ${token},
        ${emailStr},
        ${netidVal},
        ${role},
        ${role === "super_admin" ? super_admin_type : null},
        ${role === "super_admin" ? null : arrLiteral}::text[],
        ${expiresAt.toISOString()}::timestamptz
      )
    `;

    const requestOrigin = new URL(request.url).origin;
    const baseUrl = requestOrigin
      || process.env.NEXTAUTH_URL
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
      || "http://localhost:3000";
    const joinUrl = `${baseUrl}/admin/join?token=${token}`;

    const emailResult = await sendAdminInviteEmail({
      toEmail: emailStr,
      joinUrl,
    });

    return NextResponse.json({
      success: true,
      joinUrl,
      expiresAt: expiresAt.toISOString(),
      emailSent: emailResult.sent,
      ...(emailResult.sent
        ? {}
        : emailResult.reason === "not_configured"
          ? { emailSkipped: "not_configured" as const }
          : { emailError: emailResult.message }),
    });
  } catch (err) {
    console.error("Failed to create invite:", err);
    return NextResponse.json({ error: "Failed to create invite" }, { status: 500 });
  }
}
