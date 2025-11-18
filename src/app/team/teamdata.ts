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

export const teamData: Subteam[] = [
  // -------------------------
  // TEAM LEADS
  // -------------------------
  {
    team: "Team Leads",
    members: [
      {
        name: "Neha Naveen",
        image: "/Neha.png",
        role: "Full Team Lead",
        subteam: "Software",
        year: "2027",
        major: "Computer Science",
        hometown: "California",
        email: "njn43@cornell.edu",
        linkedin: "https://www.linkedin.com/company/cornell-university-autoboat/",
        portfolio: "https://www.cornellautoboat.com/",
      },
      {
        name: "Thomas Wells",
        image: "/Thomas.png",
        role: "Full Team Lead",
        subteam: "Hardware",
        year: "2027",
        major: "Mechanical Engineering",
        hometown: "California",
        email: "tlw85@cornell.edu",
        linkedin: "https://www.linkedin.com/company/cornell-university-autoboat/",
        portfolio: "https://www.cornellautoboat.com/",
      },
    ],
  },

  // -------------------------
  // HARDWARE SUBTEAM
  // -------------------------
  {
    team: "Hardware",
    members: [
      {
        name: "Rajarshi Das",
        email: "rd496@cornell.edu",
        role: "Robotics Lead",
        subteam: "Hardware",
        year: "2026",
        hometown: "Westbury, NY",
        major: "Mechanical Engineering",
        linkedin: "https://www.linkedin.com/company/cornell-university-autoboat/",
        image: "/ABteam2.jpg",
        portfolio: "https://www.cornellautoboat.com/",
      },
      {
        name: "Findlay Hartman",
        email: "fgh36@cornell.edu",
        role: "Manufacturing Lead",
        subteam: "Hardware",
        year: "2027",
        hometown: "Tampa, FL",
        major: "Materials Science & Engineering",
        linkedin: "https://www.linkedin.com/company/cornell-university-autoboat/",
        image: "/ABteam2.jpg",
        portfolio: "https://www.cornellautoboat.com/",
      },
      {
        name: "Nitya Shukla",
        email: "nds57@cornell.edu",
        role: "Design Lead",
        subteam: "Hardware",
        year: "2027",
        hometown: "Briarcliff Manor, NY",
        major: "Mechanical Engineering",
        linkedin: "https://www.linkedin.com/company/cornell-university-autoboat/",
        image: "/ABteam2.jpg",
        portfolio: "https://www.cornellautoboat.com/",
      },
      {
        name: "Daniel Yu",
        email: "dhy22@cornell.edu",
        role: "E-Systems Lead",
        subteam: "Hardware",
        year: "2026",
        hometown: "Raritan, NJ",
        major: "Electrical & Computer Engineering",
        linkedin: "https://www.linkedin.com/company/cornell-university-autoboat/",
        image: "/ABteam2.jpg",
        portfolio: "https://www.cornellautoboat.com/",
      },
    ],
  },

  // -------------------------
  // SOFTWARE SUBTEAM
  // -------------------------
  {
    team: "Software",
    members: [
      {
        name: "Avishi Trivedi",
        email: "at783@cornell.edu",
        role: "Perception Lead",
        subteam: "Software",
        year: "2027",
        hometown: "San Jose, CA",
        major: "Computer Science",
        linkedin: "https://www.linkedin.com/company/cornell-university-autoboat/",
        image: "/ABteam2.jpg",
        portfolio: "https://www.cornellautoboat.com/",
      },
      {
        name: "Raymond Lin",
        email: "rpl67@cornell.edu",
        role: "ROS + Sims Lead",
        subteam: "Software",
        year: "2027",
        hometown: "Princeton, NJ",
        major: "Computer Science, Physics",
        linkedin: "https://www.linkedin.com/company/cornell-university-autoboat/",
        image: "/ABteam2.jpg",
        portfolio: "https://www.cornellautoboat.com/",
      },
      {
        name: "Selena Wang",
        email: "shw59@cornell.edu",
        role: "Controls Lead",
        subteam: "Software",
        year: "2027",
        hometown: "San Jose, CA",
        major: "Computer Science, ECE",
        linkedin: "https://www.linkedin.com/company/cornell-university-autoboat/",
        image: "/ABteam2.jpg",
        portfolio: "https://www.cornellautoboat.com/",
      },
    ],
  },
];
