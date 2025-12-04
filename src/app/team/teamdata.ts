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
    team: 'Team Leads',
    members: [
      {
        name: 'Neha Naveen',
        image: '/team/Neha.png',
        role: 'Full Team Lead',
        subteam: 'Software',
        year: '2027',
        major: 'Computer Science',
        hometown: 'California',
        email: 'njn43@cornell.edu',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Thomas Wells',
        image: '/team/Thomas.png',
        role: 'Full Team Lead',
        subteam: 'Hardware',
        year: '2027',
        major: 'Mechanical Engineering',
        hometown: 'California',
        email: 'tlw85@cornell.edu',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        portfolio: 'https://www.cornellautoboat.com/',
      },
    ],
  },

  // -------------------------
  // HARDWARE SUBTEAM
  // -------------------------
  {
    team: 'Hardware',
    members: [
      {
        name: 'Rajarshi Das',
        email: 'rd496@cornell.edu',
        role: 'Robotics Lead',
        subteam: 'Hardware',
        year: '2026',
        hometown: 'Westbury, NY',
        major: 'Mechanical Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Findlay Hartman',
        email: 'fgh36@cornell.edu',
        role: 'Manufacturing Lead',
        subteam: 'Hardware',
        year: '2027',
        hometown: 'Tampa, FL',
        major: 'Materials Science & Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Nitya Shukla',
        email: 'nds57@cornell.edu',
        role: 'Design Lead',
        subteam: 'Hardware',
        year: '2027',
        hometown: 'Briarcliff Manor, NY',
        major: 'Mechanical Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Daniel Yu',
        email: 'dhy22@cornell.edu',
        role: 'E-Systems Lead',
        subteam: 'Hardware',
        year: '2026',
        hometown: 'Raritan, NJ',
        major: 'Electrical & Computer Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Emily Felts',
        email: 'ef438@cornell.edu',
        role: 'Mechanical',
        subteam: 'Mechanical',
        year: '2027',
        hometown: 'Evanston, IL',
        major: 'Mechanical Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Emmanuel Sasson',
        email: 'es777@cornell.edu',
        role: 'Mechanical',
        subteam: 'Mechanical',
        year: '2026',
        hometown: 'Queens, NY',
        major: 'Civil Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Brianna Cheng',
        email: 'bc539@cornell.edu',
        role: 'Mechanical',
        subteam: 'Mechanical',
        year: '2027',
        hometown: 'Clarksboro, NJ',
        major: 'Mechanical Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Calvin Stern',
        email: 'cas569@cornell.edu',
        role: 'Mechanical',
        subteam: 'Mechanical',
        year: '2028',
        hometown: 'Middletown, NJ',
        major: 'Environment and Sustainability',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Ivan Zheng',
        email: 'iz55@cornell.edu',
        role: 'E-Systems',
        subteam: 'E-Systems',
        year: '2027',
        hometown: 'Durham, NC',
        major: 'Electrical and Computer Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Joanna Saint-Pierre',
        email: 'jes624@cornell.edu',
        role: 'E-Systems',
        subteam: 'E-Systems',
        year: '2027',
        hometown: 'Newark, NJ',
        major: 'Electrical and Computer Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Keya Gillenwater',
        email: 'kpg36@cornell.edu',
        role: 'E-Systems',
        subteam: 'E-Systems',
        year: '2027',
        hometown: 'Seattle, WA',
        major: 'Electrical and Computer Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Jacob Kupperman',
        email: 'jak562@cornell.edu',
        role: 'E-Systems',
        subteam: 'E-Systems',
        year: '2028',
        hometown: 'Demarest, NJ',
        major: 'Engineering Physics',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Stefanie Fan',
        email: 'sf646@cornell.edu',
        role: 'E-Systems',
        subteam: 'E-Systems',
        year: '2028',
        hometown: 'Phoenix, AZ',
        major: 'Electrical and Computer Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Naomi Naranjo',
        email: 'nsn25@cornell.edu',
        role: 'Robotics',
        subteam: 'Robotics',
        year: '2026',
        hometown: 'Queens, NY',
        major: 'Mechanical Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'James Xiao',
        email: 'jx396@cornell.edu',
        role: 'Robotics',
        subteam: 'Robotics',
        year: '2028',
        hometown: 'Highland Park, IL',
        major: 'Mechanical Engineering and CS',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Anthony Wang',
        email: 'asw269@cornell.edu',
        role: 'Robotics',
        subteam: 'Robotics',
        year: '2028',
        hometown: 'Queens, NY',
        major: 'Mechanical Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Nick Arana',
        email: 'nea43@cornell.edu',
        role: 'Robotics',
        subteam: 'Robotics',
        year: '2027',
        hometown: 'Miami, FL',
        major: 'ORIE',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Bilal Mahmood',
        email: 'bm724@cornell.edu',
        role: 'Mechanical',
        subteam: 'Mechanical',
        year: '2028',
        hometown: '',
        major: '',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Junayed Ridwan',
        email: 'jr2434@cornell.edu',
        role: 'Mechanical',
        subteam: 'Mechanical',
        year: '2028',
        hometown: 'Queens, NY',
        major: 'Mechanical Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Benjamin Rosen',
        email: 'bmr98@cornell.edu',
        role: 'E-Systems',
        subteam: 'E-Systems',
        year: '2027',
        hometown: 'White Plains, NY',
        major: 'Electrical and Computer Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Modupe Ogunmekan',
        email: 'mdo55@cornell.edu',
        role: 'Robotics',
        subteam: 'Robotics',
        year: '2027',
        hometown: 'Mansfield, TX',
        major: 'Electrical and Computer Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
    ],
  },

  // -------------------------
  // SOFTWARE SUBTEAM
  // -------------------------
  {
    team: 'Software',
    members: [
      {
        name: 'Avishi Trivedi',
        email: 'at783@cornell.edu',
        role: 'Perception Lead',
        subteam: 'Software',
        year: '2027',
        hometown: 'San Jose, CA',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Raymond Lin',
        email: 'rpl67@cornell.edu',
        role: 'ROS + Sims Lead',
        subteam: 'Software',
        year: '2027',
        hometown: 'Princeton, NJ',
        major: 'Computer Science, Physics',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Selena Wang',
        email: 'shw59@cornell.edu',
        role: 'Controls Lead',
        subteam: 'Software',
        year: '2027',
        hometown: 'San Jose, CA',
        major: 'Computer Science, ECE',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Kiran Mitra',
        email: 'km936@cornell.edu',
        role: 'AI Lead',
        subteam: 'AI',
        year: '2027',
        hometown: 'Seattle, WA',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Caitlin Farrell',
        email: 'cf526@cornell.edu',
        role: 'Controls Lead',
        subteam: 'Controls',
        year: '2027',
        hometown: 'Montclair, NJ',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Arthi Vijayakumar',
        email: 'av439@cornell.edu',
        role: 'AI',
        subteam: 'AI',
        year: '2026',
        hometown: 'Sharon, MA',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Jolly Zheng',
        email: 'jz767@cornell.edu',
        role: 'Perception',
        subteam: 'Perception',
        year: '2026',
        hometown: 'Queens, NY',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Joanna Andrews',
        email: 'jda242@cornell.edu',
        role: 'Perception',
        subteam: 'Perception',
        year: '2026',
        hometown: 'Albany, NY',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Ireanne Cao',
        email: 'ixc3@cornell.edu',
        role: 'Perception',
        subteam: 'Perception',
        year: '2026',
        hometown: 'West Windsor, NJ',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Timothy Park',
        email: 'tkp26@cornell.edu',
        role: 'Controls',
        subteam: 'Controls',
        year: '2027',
        hometown: 'Melville, NY',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Aryan Kumar',
        email: 'ak2488@cornell.edu',
        role: 'AI',
        subteam: 'AI',
        year: '2027',
        hometown: 'Hyderabad, India',
        major: 'Computer Science & Math',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Sorong Dong',
        email: 'sd922@cornell.edu',
        role: 'ROS + Sims',
        subteam: 'ROS + Sims',
        year: '2027',
        hometown: 'Westminster, MD',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Phoebe Wang',
        email: 'pw483@cornell.edu',
        role: 'ROS + Sims',
        subteam: 'ROS + Sims',
        year: '2027',
        hometown: 'Arcadia, CA',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Kaustav Mitra',
        email: 'km992@cornell.edu',
        role: 'AI',
        subteam: 'AI',
        year: '2028',
        hometown: 'Seattle, WA',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Harry Yu',
        email: 'hy645@cornell.edu',
        role: 'Controls',
        subteam: 'Controls',
        year: '2028',
        hometown: 'Naperville, IL',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Fanhao Yu',
        email: 'fy229@cornell.edu',
        role: 'AI',
        subteam: 'AI',
        year: '2028',
        hometown: 'Nashua, NH',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Tejesh Dandu',
        email: 'td439@cornell.edu',
        role: 'AI',
        subteam: 'AI',
        year: '2028',
        hometown: 'Fairfax, VA',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Elise Lee',
        email: 'el798@cornell.edu',
        role: 'Controls',
        subteam: 'Controls',
        year: '2028',
        hometown: 'Ridgefield, NJ',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Evan Sun',
        email: 'es2274@cornell.edu',
        role: 'Perception',
        subteam: 'Perception',
        year: '2028',
        hometown: 'Jericho, NY',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Vivien Chen',
        email: 'vc365@cornell.edu',
        role: 'Perception',
        subteam: 'Perception',
        year: '2028',
        hometown: 'Palo Alto, California',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
      {
        name: 'Kevin Peng',
        email: 'kcp52@cornell.edu',
        role: 'Perception',
        subteam: 'Perception',
        year: '2028',
        hometown: 'Potomac, MD',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
        portfolio: 'https://www.cornellautoboat.com/',
      },
    ],
  },

  // -------------------------
  // BUSINESS AND OUTREACH SUBTEAM
  // -------------------------
  {
    team: 'Business and Outreach',
    members: [
      {
        name: 'Jessie Yung',
        email: 'jy869@cornell.edu',
        role: 'Business Lead',
        subteam: 'Business and Outreach',
        year: '2027',
        hometown: 'Brooklyn, NY',
        major: 'Economics',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
      },
      {
        name: 'Nicole Lin',
        email: 'njl55@cornell.edu',
        role: 'Design and Media',
        subteam: 'Business and Outreach',
        year: '2026',
        hometown: 'Omaha, NE',
        major: 'Computer Science',
        linkedin: 'https://www.linkedin.com/in/nicolejlin/',
        image: '/team/ABteam2.JPG',
      },
      {
        name: 'Preston Garton',
        email: 'tpg45@cornell.edu',
        role: 'Media',
        subteam: 'Business and Outreach',
        year: '2026',
        hometown: 'Middleton, WI',
        major: 'History',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
      },
      {
        name: 'Kathy Zhang',
        email: 'kyz7@cornell.edu',
        role: 'Design',
        subteam: 'Business and Outreach',
        year: '2027',
        hometown: 'Tenafly, NJ',
        major: 'Information Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
      },
      {
        name: 'Michelle Zhao',
        email: 'mz625@cornell.edu',
        role: 'Design and Media',
        subteam: 'Business and Outreach',
        year: '2028',
        hometown: 'Vancouver, WA',
        major: 'Computer Science',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
      },
      {
        name: 'Aaron Legg',
        email: 'all288@cornell.edu',
        role: 'Media',
        subteam: 'Business and Outreach',
        year: '2028',
        hometown: 'Scottsdale, AZ',
        major: 'Chemical Engineering',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
      },

      {
        name: 'Bekzod Mamasoliyev',
        email: 'bm723@cornell.edu',
        role: 'Outreach and Media',
        subteam: 'Business and Outreach',
        year: '2028',
        hometown: 'Brooklyn, NY',
        major: 'Dyson Business School',
        linkedin:
          'https://www.linkedin.com/company/cornell-university-autoboat/',
        image: '/team/ABteam2.JPG',
      },
    ],
  },
];
