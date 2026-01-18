export type TeamMember = {
  name: string;
  image?: string;
  role: string;
  subteam: string;
  year: string;
  major: string;
  hometown: string;
  email?: string;
  linkedin?: string;
  portfolio?: string;
};

export type Subteam = {
  team: string;
  members: TeamMember[];
};

/**
 * Gets the image path for a team member.
 * Returns the image path if set, otherwise returns placeholder.
 */
export function getMemberImage(member: TeamMember): string {
  return member.image || '/team/teamPhotos/Full_Team_2.webp';
}
