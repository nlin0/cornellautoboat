import { Globe, Users, GraduationCap, School, Flag } from "lucide-react";
import Image from 'next/image';
import styles from './team.module.css';
import { teamData, type TeamMember } from "./teamdata";

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

export default function Team() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.teamIntro}>
        <div className={styles.teamIntroText}>
          <h2 className="text-primary font-bold text-header-xlg pt-18 mb-0">
            Meet our Team!
          </h2>
          <p className="text-primary text-descr-lg font-light mb-8">
            Our team consists of three subteams: Hardware, Software, and Business.
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
          width={1200}
          height={100}
          className={styles.divider}
          aria-hidden="true"
        />
      </div>

      {/* SUBTEAM SECTION */}
      <section className={styles.subTeamWrapper} aria-labelledby="subteams-heading">
        <div className={styles.subTeam}>
          {teamData.map((subteam) => (
            <div key={subteam.team} className={styles.subTeamWrapper}>
              <h3 id={`${subteam.team.toLowerCase().replace(/\s+/g, '-')}-heading`}>
                {subteam.team}
              </h3>

              <div className={styles.subTeamGrid} role="list">
                {subteam.members.map((member) => (
                  <article key={member.name} className={styles.memberCard} role="listitem">
                    <div className={styles.memberCardLeft}>
                      <h4 className="text-secondary2 text-header-sm font-bold">
                        {member.name}
                      </h4>
                      <div className={styles.memberCardImageWrapper}>
                        <Image
                          src={member.image ?? "/team/ABteam2.JPG"}
                          alt={`${member.name}, ${member.role}`}
                          width={200}
                          height={200}
                          className={styles.memberCardImage}
                        />
                      </div>
                    </div>

                    <div className={styles.memberCardRight}>
                      <div className={styles.memberCardHeader}>
                        <p className="text-secondary2 font-light">
                          {member.role}
                        </p>
                        <p className="text-secondary2 font-bold pt-0 mt-0">
                          {member.subteam}
                        </p>
                      </div>
                      <div className={styles.memberCardText}>
                        <ul className={styles.memberCardTextList}>
                          <li>{member.major}</li>
                          <li>Class of {member.year}</li>
                          <li>{member.hometown}</li>
                        </ul>
                      </div>

                      <div className={styles.memberCardIcons} role="list">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            aria-label={`Email ${member.name}`}
                            role="listitem"
                          >
                            <Image
                              className={styles.iconmini}
                              src="/linkedin.jpg"
                              alt=""
                              width={24}
                              height={24}
                              aria-hidden="true"
                            />
                          </a>
                        )}

                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s LinkedIn profile`}
                            role="listitem"
                          >
                            <Image
                              className={styles.iconmini}
                              src="/linkedin.jpg"
                              alt=""
                              width={24}
                              height={24}
                              aria-hidden="true"
                            />
                          </a>
                        )}

                        {member.portfolio && (
                          <a
                            href={member.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s portfolio`}
                            role="listitem"
                          >
                            <Image
                              className={styles.iconmini}
                              src="/linkedin.jpg"
                              alt=""
                              width={24}
                              height={24}
                              aria-hidden="true"
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}