import type { Subteam } from "./teamtypes";
import { getTeamDataFromDb } from "@/lib/team-db";

/**
 * Gets team data from the database.
 * Team page cards use this — images and member info come from Neon DB (images served from Vercel Blob).
 */
export async function getTeamData(): Promise<Subteam[]> {
  const fromDb = await getTeamDataFromDb();
  return fromDb ?? [];
}