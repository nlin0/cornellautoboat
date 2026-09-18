import MemberCard from '../MemberCard';
import styles from '../team.module.css';

const previewMember = {
  name: 'Michelle Zhang',
  role: 'Website Developer',
  subteam: 'Software',
  major: 'Computer Science',
  year: 'Junior',
  hometown: 'Ithaca, NY',
  email: 'test@example.com',
  linkedin: 'https://www.linkedin.com',
};

export default function TeamPreview() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.subTeamWrapper}>
        <div className={styles.subTeam}>
          <div className={styles.subTeamSection}>

            <div className={styles.terminalHeader}>
              <div className={styles.gateInfo}>
                <div className={styles.gateDestination}>
                  <span className={styles.destinationLabel}>
                    DESTINATION:
                  </span>

                  <span className={styles.destinationName}>
                    SOFTWARE
                  </span>
                </div>
              </div>

              <div className={styles.boardingDisplay}>
                <div className={styles.boardingStatus}>
                  <span className={styles.statusLight}></span>
                  <span className={styles.statusText}>
                    NOW BOARDING
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.terminalContent}>
              <div className={styles.subTeamGrid} role="list">
                <MemberCard member={previewMember} />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}