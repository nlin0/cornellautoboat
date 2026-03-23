import { SUBTEAMS } from "@/lib/subteams";

/**
 * Role string for `members.role` when someone becomes an admin (subteam lead).
 */
export function buildMemberLeadRoleFromAdminInvite(input: {
  adminRole: "super_admin" | "admin";
  super_admin_type: "team_lead" | "business_lead" | null;
  managed_subteams: string[] | null;
}): string {
  if (input.adminRole === "super_admin") {
    if (input.super_admin_type === "business_lead") return "Business Lead";
    return "Full Team Lead";
  }

  const slugs = (input.managed_subteams ?? []).filter(Boolean);
  if (slugs.length === 0) return "Subteam Lead";

  const names = slugs.map((slug) => {
    const found = SUBTEAMS.find((s) => s.slug === slug);
    return found?.name ?? slug;
  });

  if (names.length === 1) return `${names[0]} Lead`;
  return `${names.join(" & ")} Lead`;
}

/**
 * True if this member should sort before non-leads on the team page.
 */
export function roleLooksLikeLead(role: string): boolean {
  return /\blead\b/i.test(role);
}
