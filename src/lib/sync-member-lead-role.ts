import { sql } from "lib/db";
import { buildMemberLeadRoleFromAdminInvite } from "@/lib/member-lead-role";

/**
 * When an admin account is created, set matching `members.role` to a lead title if a row exists.
 */
export async function syncMemberLeadRoleForNewAdmin(input: {
  email: string;
  netid: string | null;
  adminRole: "super_admin" | "admin";
  super_admin_type: "team_lead" | "business_lead" | null;
  managed_subteams: string[] | null;
}): Promise<void> {
  const emailNorm = input.email.toLowerCase().trim();
  const memberRole = buildMemberLeadRoleFromAdminInvite({
    adminRole: input.adminRole,
    super_admin_type: input.super_admin_type,
    managed_subteams: input.managed_subteams,
  });

  if (input.netid) {
    await sql`
      UPDATE members SET role = ${memberRole}, updated_at = NOW()
      WHERE LOWER(TRIM(email)) = ${emailNorm} OR netid = ${input.netid}
    `;
  } else {
    await sql`
      UPDATE members SET role = ${memberRole}, updated_at = NOW()
      WHERE LOWER(TRIM(email)) = ${emailNorm}
    `;
  }
}
