import { sql } from "lib/db";
import type { TeamMember, Subteam } from "@/app/team/teamtypes";
import { sortMembersLeadsFirst } from "@/lib/sort-members-leads-first";

export async function getTeamDataFromDb(): Promise<Subteam[] | null> {
  try {
    const { rows } = await sql`
      SELECT id, name, image, role, subteam, year, major, hometown, email, linkedin, portfolio, display_order
      FROM members
      ORDER BY display_order ASC, subteam, name
    `;

    if (rows.length === 0) return null;

    const byTeam = new Map<string, TeamMember[]>();
    for (const row of rows as Array<{
      name: string;
      image: string | null;
      role: string;
      subteam: string;
      year: string | null;
      major: string | null;
      hometown: string | null;
      email: string | null;
      linkedin: string | null;
      portfolio: string | null;
    }>) {
      const member: TeamMember = {
        name: row.name,
        image: row.image || undefined,
        role: row.role,
        subteam: row.subteam,
        year: row.year || "",
        major: row.major || "",
        hometown: row.hometown || "",
        email: row.email || undefined,
        linkedin: row.linkedin || undefined,
        portfolio: row.portfolio || undefined,
      };
      const list = byTeam.get(row.subteam) || [];
      list.push(member);
      byTeam.set(row.subteam, list);
    }

    const SUBTEAM_TO_TEAM: Record<string, string> = {
      "Team Leads": "Team Leads",
      "Hardware": "Hardware",
      "Mechanical": "Hardware",
      "Robotics": "Hardware",
      "E-Systems": "Hardware",
      "Software": "Software",
      "Perception": "Software",
      "AI": "Software",
      "Controls": "Software",
      "ROS + Sims": "Software",
      "Business and Outreach": "Business and Outreach",
    };
    const merged = new Map<string, TeamMember[]>();
    for (const [subteam, members] of byTeam) {
      const team = SUBTEAM_TO_TEAM[subteam] || subteam;
      const list = merged.get(team) || [];
      list.push(...members);
      merged.set(team, list);
    }

    for (const [team, members] of merged) {
      merged.set(team, sortMembersLeadsFirst(members));
    }

    const teamOrder = ["Team Leads", "Hardware", "Software", "Business and Outreach"];
    const seen = new Set<string>();
    const result: Subteam[] = [];
    for (const team of teamOrder) {
      const members = merged.get(team);
      if (members && members.length > 0) {
        result.push({ team, members });
        seen.add(team);
      }
    }
    for (const [team, members] of merged) {
      if (!seen.has(team)) result.push({ team, members });
    }
    return result;
  } catch {
    return null;
  }
}
