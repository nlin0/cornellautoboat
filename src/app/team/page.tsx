import { Globe, Users, GraduationCap, School, Flag } from "lucide-react";
import Image from 'next/image';
import styles from './team.module.css';
import { teamData } from "./teamdata";


export default function Team() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.teamIntro}>

        <div className={styles.teamIntroText}>
          <h2 className="text-primary font-bold text-header-xlg pt-18 mb-0">Meet our Team!</h2>
          <p className="text-primary text-descr-lg font-light mb-8">Our team consists of three subteams: Hardware, Software, and Business.</p>
        </div>

        <ul className={styles.teamIntroBand}>
          <li className="flex flex-col items-center gap-2">
            <Flag size={48} />
            Founded in 2021</li>
          <li className="flex flex-col items-center gap-2">
            <Users size={48} />
            60+ members</li>
          <li className="flex flex-col items-center gap-2">
            <GraduationCap size={48} />
            14 different majors</li>
          <li className="flex flex-col items-center gap-2">
            <School size={48} />
            3 different Cornell colleges</li>
          <li className="flex flex-col items-center gap-2">
            <Globe size={48} />
            6 different home countries</li>
        </ul>

      </div>

      <div className={styles.dividerWrapper}>
        <img src="/divider1.svg" alt="" className={styles.divider} />
      </div>

      {/* SUBTEAM SECTION */}
      <div className={styles.subTeamWrapper}>
        <div className={styles.subTeam}>

          {teamData.map((subteam) => (
            <div key={subteam.team} className={styles.subTeamWrapper}>
              <h3>{subteam.team}</h3>

              <div className={styles.subTeamGrid}>
                {/* TEAM MEMBER CARDS SECTION */}
                {subteam.members.map((member) => (
                  <div key={member.name} className={styles.memberCard}>


                    <div className={styles.memberCardLeft}>
                      {/* IMAGE SECTION */}
                      <p className="text-secondary2 text-header-sm font-bold">
                        {member.name}
                      </p>
                      <div className={styles.memberCardImageWrapper}>
                        <img
                          src={member.image ?? "/defaultImg.png"}
                          alt={member.name}
                          className={styles.memberCardImage}
                        />
                      </div>
                    </div>


                    <div className={styles.memberCardRight}>
                      {/* HEADER SECTION */}
                      <div className={styles.memberCardHeader}>
                        <p className="text-secondary2 font-light">
                          {member.role}
                        </p>

                        <p className="text-secondary2 font-bold pt-0 mt-0">
                          {member.subteam}
                        </p>
                      </div>
                      {/* INFO LIST */}
                      <div className={styles.memberCardText}>

                        <ul className={styles.memberCardTextList}>
                          <li>{member.major}</li>
                          <li>Class of {member.year}</li>
                          <li>{member.hometown}</li>
                        </ul>
                      </div>

                      {/* ICONS */}
                      <div className={styles.memberCardIcons}>
                        {/* EMAIL */}
                        {member.email && (
                          <a href={`mailto:${member.email}`}>
                            <img className={styles.iconmini} src="/linkedin.jpg" alt="email icon" />
                          </a>
                        )}

                        {/* LINKEDIN */}
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank">
                            <img className={styles.iconmini} src="/linkedin.jpg" alt="linkedin icon" />
                          </a>
                        )}

                        {/* PERSONAL WEBSITE */}
                        {member.portfolio && (
                          <a href={member.portfolio} target="_blank">
                            <img className={styles.iconmini} src="/linkedin.jpg" alt="website icon" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  )
}