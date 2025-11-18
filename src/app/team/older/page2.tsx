import Image from 'next/image';
import styles from './team.module.css';
import { teamLeads } from './teamdata';
import { hardware } from './teamdata';
import { software } from './teamdata';
export default function Team() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heroImageContainer}>
        <Image
          src="/ABteam2.jpg"
          alt="Team Banner"
          fill
          className={styles.topImage}
        />
      </div>
      <div className={styles.teamIntro}>
        <h2>Meet Our Team!</h2>
        <p>
          Our team consists of three subteams: Hardware, Software, and Business.
        </p>

        <div className={styles.statsContainer}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>2021</div>
            <div className={styles.statLabel}>Founded</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>Members</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>14</div>
            <div className={styles.statLabel}>Different Majors</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>3</div>
            <div className={styles.statLabel}>Different Cornell Colleges</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>4</div>
            <div className={styles.statLabel}>Different Home Countries</div>
          </div>
        </div>
      </div>
      <div>
        <h2 className={styles.sectionTitle}>Team Leads</h2>

        <div className={styles.container}>
          <div className={styles.grid}>
            {teamLeads.map((member, index) => (
              <div className={styles.card} key={index}>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={180}
                  height={200}
                  className={styles.profileImage}
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.textContent}>
                  <div className={styles.name}>{member.name}</div>
                  <div className={styles.teamLead}>{member.title}</div>
                  <div className={styles.nameSubteam}>{member.subteam}</div>

                  {member.major} <br />
                  Class of {member.classYear} <br />
                  Hometown: {member.hometown} <br />
                  Email: {member.email} <br />

                  <div className={styles.iconRow}>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={` ${styles.linkedinIcon}`}
                    ></a>

                    {member.portfolio && (
                      <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={` ${styles.portfolioIcon}`}
                      ></a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* hardware */}
      <div>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Hardware</h2>

          <div className={styles.grid}>
            {hardware.map((member, index) => (
              <div className={styles.card} key={index}>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={180}
                  height={200}
                  className={styles.profileImage}
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.textContent}>
                  <div className={styles.name}>{member.name}</div>
                  <div className={styles.nameSubteam}>{member.subteam}</div>

                  {member.major}
                  <br />
                  Class of {member.classYear} <br />
                  Hometown: {member.hometown} <br />
                  Email: {member.email} <br />

                  <div className={styles.iconRow}>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={` ${styles.linkedinIcon}`}
                    ></a>

                    {member.portfolio && (
                      <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={` ${styles.portfolioIcon}`}
                      ></a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* software */}
      <div>
        <h2 className={styles.sectionTitle}>Software</h2>

        <div className={styles.container}>
          <div className={styles.grid}>
            {software.map((member, index) => (
              <div className={styles.card} key={index}>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={180}
                  height={200}
                  className={styles.profileImage}
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.textContent}>
                  <div className={styles.name}>{member.name}</div>
                  <div className={styles.nameSubteam}>{member.subteam}</div>
                  {member.major}
                  <br />
                  Class of {member.classYear} <br />
                  Hometown: {member.hometown} <br />
                  Email: {member.email} <br />
                  <div className={styles.iconRow}>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={` ${styles.linkedinIcon}`}
                    ></a>

                    {member.portfolio && (
                      <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={` ${styles.githubIcon}`}
                      ></a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
