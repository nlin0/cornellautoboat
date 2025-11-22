import { Globe, Users, GraduationCap, School, Flag } from "lucide-react";
import Image from 'next/image';
import styles from './team.module.css';
import { teamData } from "./teamdata";
import MemberCard from './MemberCard';

interface TeamStatProps {
  icon: React.ReactNode;
  label: string;
}

function TeamStat({ icon, label }: TeamStatProps) {
  return (
    <li className="flex flex-col items-center gap-2">
      {icon}
      {label}
    </li>
  );
}

function getSubteamDescription(team: string): string {
  const descriptions: Record<string, string> = {
    'Hardware': 'Hardware designs and manufactures the boat\'s electromechanical system! This involves doing CAD and ECAD, running simulations, machining, working with composites, working with power tools, soldering and assembling electrical components, among other technical skills. Members of the hardware team gain a lot of valuable hands-on experience, while also being able to apply concepts learned in class to their work during the design process.',
    'Software': 'Software is responsible for researching, developing, and testing all computer programs which enable the boat to operate autonomously! This includes building computer vision systems, implementing AI-driven navigation and control algorithms, designing microcontroller software, integrating different processes through ROS, and developing simulation frameworks for testing. Members on Software are primarily CS and ECE majors with interdisciplinary interests, a passion for innovation, and dedication to see their projects through.',
    'Business and Outreach': 'Business organizes the team\'s funding for supplies, apparel, software licensing, and works with Outreach as the team\'s public facing arm. Outreach organizes events with local schools and organizations to link our team with the Ithaca community, as well as to inspire the next generation of engineers and scientists.',
  };
  return descriptions[team] || '';
}

export default function Team() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.teamIntro}>
        <div className={styles.teamIntroText}>
          <h2 className="text-primary font-bold text-header-xlg pt-18 mb-0">
            Meet our Team!
          </h2>
          <p className="text-primary text-descr-lg font-light mb-8">
            Our team consists of four subteams: Hardware, Software, Business and Outreach, and Team Leads.
          </p>
        </div>

        <ul className={styles.teamIntroBand} role="list">
          <TeamStat icon={<Flag size={48} aria-hidden="true" />} label="Founded in 2021" />
          <TeamStat icon={<Users size={48} aria-hidden="true" />} label="60+ members" />
          <TeamStat icon={<GraduationCap size={48} aria-hidden="true" />} label="14 different majors" />
          <TeamStat icon={<School size={48} aria-hidden="true" />} label="3 different Cornell colleges" />
          <TeamStat icon={<Globe size={48} aria-hidden="true" />} label="6 different home countries" />
        </ul>
      </div>

      <div className={styles.dividerWrapper}>
        <Image
          src="/dividers/divider1.svg"
          alt=""
          width={2400}
          height={200}
          className={styles.divider}
          quality={100}
          priority
          aria-hidden="true"
        />
      </div>

      {/* SUBTEAM SECTION */}
      <section className={styles.subTeamWrapper} aria-labelledby="subteams-heading">
        <div className={styles.subTeam}>
          {teamData.map((subteam, index) => (
            <div key={subteam.team} className={`${styles.subTeamSection} ${styles[`subTeamSection${index + 1}`]}`}>
              <div className={styles.terminalHeader}>
                <div className={styles.gateInfo}>
                  <div className={styles.gateNumber}>GATE {String(index + 1).padStart(2, '0')}</div>
                  <div className={styles.gateDestination}>
                    <span className={styles.destinationLabel}>DESTINATION:</span>
                    <span className={styles.destinationName}>
                      {subteam.team === "Business and Outreach" ? "Business" : subteam.team}
                    </span>
                  </div>
                </div>
                <div className={styles.boardingDisplay}>
                  <div className={styles.boardingStatus}>
                    <span className={styles.statusLight}></span>
                    <span className={styles.statusText}>NOW BOARDING</span>
                  </div>
                  <div className={styles.boardingTime}>ALL ABOARD</div>
                </div>
              </div>
              <div className={styles.terminalContent}>
                {getSubteamDescription(subteam.team) && (
                  <div className={styles.terminalInfoBoard}>
                    <div className={styles.infoBoardContent}>
                      <p className={styles.terminalDescription}>{getSubteamDescription(subteam.team)}</p>
                    </div>
                  </div>
                )}
                <div className={styles.subTeamGrid} role="list">
                  {subteam.members.map((member) => (
                    <MemberCard key={member.name} member={member} />
                  ))}
                </div>
              </div>
              <div className={styles.terminalFooter}>
                <div className={styles.terminalInfoFooter}>
                  <span>Cornell AutoBoat Terminal • Gate {String(index + 1).padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}