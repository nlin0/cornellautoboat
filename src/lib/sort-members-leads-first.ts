import type { TeamMember } from "@/app/team/teamtypes";
import { roleLooksLikeLead } from "@/lib/member-lead-role";

export function sortMembersLeadsFirst(members: TeamMember[]): TeamMember[] {
  return [...members].sort((a, b) => {
    const aLead = roleLooksLikeLead(a.role);
    const bLead = roleLooksLikeLead(b.role);
    if (aLead !== bLead) return aLead ? -1 : 1;
    const aOrder = Number.isFinite(a.display_order) ? (a.display_order as number) : Number.MAX_SAFE_INTEGER;
    const bOrder = Number.isFinite(b.display_order) ? (b.display_order as number) : Number.MAX_SAFE_INTEGER;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });
}
