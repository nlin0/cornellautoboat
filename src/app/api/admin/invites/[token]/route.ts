import { NextResponse } from "next/server";
import { sql } from "lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (!token) {
    return NextResponse.json({ error: "Token required" }, { status: 400 });
  }

  try {
    const { rows } = await sql`
      SELECT email, netid, role, super_admin_type, managed_subteams, expires_at
      FROM admin_invites
      WHERE token = ${token} AND expires_at > NOW()
      LIMIT 1
    `;

    const invite = rows[0] as { email: string; netid: string | null; role: string; super_admin_type: string | null; managed_subteams: string[] | null; expires_at: Date } | undefined;
    if (!invite) {
      return NextResponse.json({ error: "Invalid or expired invite" }, { status: 404 });
    }

    return NextResponse.json({
      email: invite.email,
      netid: invite.netid,
      role: invite.role,
      super_admin_type: invite.super_admin_type,
      managed_subteams: invite.managed_subteams,
    });
  } catch (err) {
    console.error("Failed to validate invite:", err);
    return NextResponse.json({ error: "Failed to validate invite" }, { status: 500 });
  }
}
