import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import type { TeamMember, Subteam } from './teamtypes';

/**
 * Reads and parses a CSV file containing team member data
 */
function parseCSV(filePath: string): TeamMember[] {
  const csvFile = fs.readFileSync(filePath, 'utf8');
  const result = Papa.parse<TeamMember>(csvFile, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => header.trim(),
  });
  return result.data;
}

/**
 * Loads team data from CSV files
 */
function loadTeamData(): Subteam[] {
  const dataDir = path.join(process.cwd(), 'src', 'app', 'team', 'data');
  
  const teamLeads = parseCSV(path.join(dataDir, 'team_leads.csv'));
  const hardware = parseCSV(path.join(dataDir, 'hardware.csv'));
  const software = parseCSV(path.join(dataDir, 'software.csv'));
  const business = parseCSV(path.join(dataDir, 'business.csv'));

  return [
    {
      team: 'Team Leads',
      members: teamLeads,
    },
    {
      team: 'Hardware',
      members: hardware,
    },
    {
      team: 'Software',
      members: software,
    },
    {
      team: 'Business and Outreach',
      members: business,
    },
  ];
}


// Export the team data loaded from CSV files
export const teamData: Subteam[] = loadTeamData();