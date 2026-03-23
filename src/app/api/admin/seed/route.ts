import { NextResponse } from "next/server";
import { sql } from "lib/db";
import { hashPassword } from "lib/auth-utils";

/**
 * One-time seed for 3 super-admins.
 * Call with ?secret=YOUR_SEED_SECRET (set SEED_SECRET in env).
 * Emails and passwords from env: SEED_SUPER_ADMIN_EMAILS and SEED_SUPER_ADMIN_PASSWORDS
 * Format: comma-separated, e.g. lead1@cornell.edu,lead2@cornell.edu,business@cornell.edu
 */
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const expectedSecret = process.env.SEED_SECRET;
  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const emailsStr = process.env.SEED_SUPER_ADMIN_EMAILS;
  const passwordsStr = process.env.SEED_SUPER_ADMIN_PASSWORDS;
  if (!emailsStr || !passwordsStr) {
    return NextResponse.json(
      {
        error:
          "Set SEED_SUPER_ADMIN_EMAILS and SEED_SUPER_ADMIN_PASSWORDS (comma-separated)",
      },
      { status: 400 }
    );
  }

  const emails = emailsStr.split(",").map((e) => e.trim()).filter(Boolean);
  const passwords = passwordsStr.split(",").map((p) => p.trim()).filter(Boolean);

  if (emails.length !== 3 || passwords.length !== 3) {
    return NextResponse.json(
      { error: "Exactly 3 emails and 3 passwords required" },
      { status: 400 }
    );
  }

  const superAdminTypes: ("team_lead" | "business_lead")[] = [
    "team_lead",
    "team_lead",
    "business_lead",
  ];

  try {
    for (let i = 0; i < 3; i++) {
      const email = emails[i].toLowerCase().trim();
      const netid = email.includes("@cornell.edu")
        ? email.split("@")[0].toLowerCase()
        : null;
      const password_hash = await hashPassword(passwords[i]);
      const super_admin_type = superAdminTypes[i];

      await sql`
        INSERT INTO admins (netid, email, password_hash, role, super_admin_type)
        VALUES (${netid}, ${email}, ${password_hash}, 'super_admin', ${super_admin_type})
        ON CONFLICT (email) DO UPDATE SET
          netid = EXCLUDED.netid,
          password_hash = EXCLUDED.password_hash,
          role = EXCLUDED.role,
          super_admin_type = EXCLUDED.super_admin_type,
          updated_at = NOW()
      `;
    }
    return NextResponse.json({ success: true, message: "Seeded 3 super-admins" });
  } catch (err) {
    console.error("Seed failed:", err);
    const message = err instanceof Error ? err.message : String(err);
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        error: "Seed failed.",
        ...(isDev && { detail: message }),
      },
      { status: 500 }
    );
  }
}
