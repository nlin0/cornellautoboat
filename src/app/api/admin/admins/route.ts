import { NextResponse } from "next/server";
import { auth } from "auth";
import { sql } from "lib/db";
import { hashPassword } from "lib/auth-utils";
import { syncMemberLeadRoleForNewAdmin } from "@/lib/sync-member-lead-role";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "super_admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { rows } = await sql`
      SELECT id, netid, email, role, super_admin_type, managed_subteams, created_at
      FROM admins
      ORDER BY role DESC, email ASC
    `;
    return NextResponse.json({ admins: rows });
  } catch (err) {
    console.error("Failed to fetch admins:", err);
    return NextResponse.json(
      { error: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "super_admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { email, password, netid, managed_subteams } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const emailStr = String(email).toLowerCase().trim();
    const netidVal = netid
      ? String(netid).trim().toLowerCase()
      : emailStr.includes("@cornell.edu")
        ? emailStr.split("@")[0].toLowerCase()
        : null;

    const password_hash = await hashPassword(String(password));
    const managedSubteams = Array.isArray(managed_subteams) ? managed_subteams : [];
    const arrLiteral = managedSubteams.length > 0
      ? `{${managedSubteams.map((s) => `"${String(s).replace(/"/g, '\\"')}"`).join(",")}}`
      : "{}";
    await sql`
      INSERT INTO admins (email, netid, password_hash, role, super_admin_type, managed_subteams)
      VALUES (
        ${emailStr},
        ${netidVal},
        ${password_hash},
        'admin',
        NULL,
        ${arrLiteral}::text[]
      )
    `;

    await syncMemberLeadRoleForNewAdmin({
      email: emailStr,
      netid: netidVal,
      adminRole: "admin",
      super_admin_type: null,
      managed_subteams: managedSubteams,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err && typeof err === "object" && "code" in err
      ? (err as { code: string }).code === "23505"
        ? "An admin with this email already exists"
        : "Failed to create admin"
      : "Failed to create admin";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "super_admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Admin ID is required" }, { status: 400 });
  }

  // Prevent self-deletion
  if (id === session.user.id) {
    return NextResponse.json(
      { error: "You cannot remove yourself" },
      { status: 400 }
    );
  }

  try {
    const { rows } = await sql`
      SELECT role FROM admins WHERE id = ${id}
    `;
    const admin = rows[0] as { role: string } | undefined;
    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    if (admin.role === "super_admin") {
      const count = await sql`SELECT COUNT(*)::int as n FROM admins WHERE role = 'super_admin'`;
      const n = (count.rows[0] as { n: number }).n;
      if (n <= 1) {
        return NextResponse.json(
          { error: "Cannot remove the last super-admin" },
          { status: 400 }
        );
      }
    }

    await sql`DELETE FROM admins WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete admin:", err);
    return NextResponse.json(
      { error: "Failed to delete admin" },
      { status: 500 }
    );
  }
}
