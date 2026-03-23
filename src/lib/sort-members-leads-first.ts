import type { TeamMember } from "@/app/team/teamtypes";
import { roleLooksLikeLead } from "@/lib/member-lead-role";

export function sortMembersLeadsFirst(members: TeamMember[]): TeamMember[] {
  return [...members].sort((a, b) => {
    const aLead = roleLooksLikeLead(a.role);
    const bLead = roleLooksLikeLead(b.role);
    if (aLead !== bLead) return aLead ? -1 : 1;
    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });
}
