import { NextResponse } from "next/server";
import { sql } from "lib/db";
import { hashPassword } from "lib/auth-utils";
import { syncMemberLeadRoleForNewAdmin } from "@/lib/sync-member-lead-role";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    const { rows } = await sql`
      SELECT email, netid, role, super_admin_type, managed_subteams
      FROM admin_invites
      WHERE token = ${token} AND expires_at > NOW()
      LIMIT 1
    `;

    const invite = rows[0] as { email: string; netid: string | null; role: string; super_admin_type: string | null; managed_subteams: string[] | null } | undefined;
    if (!invite) {
      return NextResponse.json({ error: "Invalid or expired invite" }, { status: 400 });
    }

    const password_hash = await hashPassword(String(password));
    const ms = invite.managed_subteams;
    const arrLiteral =
      Array.isArray(ms) && ms.length > 0
        ? `{${ms.map((s) => `"${String(s).replace(/"/g, '\\"')}"`).join(",")}}`
        : "{}";

    await sql`
      INSERT INTO admins (email, netid, password_hash, role, super_admin_type, managed_subteams)
      VALUES (
        ${invite.email},
        ${invite.netid},
        ${password_hash},
        ${invite.role},
        ${invite.super_admin_type},
        ${invite.role === "super_admin" ? null : arrLiteral}::text[]
      )
    `;

    await sql`DELETE FROM admin_invites WHERE token = ${token}`;

    const superAdminType =
      invite.super_admin_type === "business_lead" || invite.super_admin_type === "team_lead"
        ? invite.super_admin_type
        : null;

    await syncMemberLeadRoleForNewAdmin({
      email: invite.email,
      netid: invite.netid,
      adminRole: invite.role as "super_admin" | "admin",
      super_admin_type: superAdminType,
      managed_subteams: invite.managed_subteams,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const isDuplicate = err && typeof err === "object" && "code" in err && (err as { code: string }).code === "23505";
    return NextResponse.json(
      { error: isDuplicate ? "Account already exists for this invite" : "Failed to create account" },
      { status: 500 }
    );
  }
}
