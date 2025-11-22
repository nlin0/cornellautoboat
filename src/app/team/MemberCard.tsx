import Image from 'next/image';
import styles from './team.module.css';
import type { TeamMember } from './teamdata';

interface MemberCardProps {
  member: TeamMember;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <article className={styles.memberCardContainer} role="listitem">
      <div className={styles.memberCardInner}>
        {/* Front of boarding pass */}
        <div className={styles.memberCardFront}>
          {/* Ticket Header */}
          <div className={styles.ticketHeader}>
            <div className={styles.ticketHeaderTop}>
              <div className={styles.ticketAirline}>
                <span className={styles.ticketAirlineName}>CORNELL AUTOBOAT</span>
                <span className={styles.ticketType}>BOARDING PASS</span>
              </div>
              <div className={styles.ticketSubteamBadge}>{member.subteam}</div>
            </div>
          </div>

          {/* Large Member Photo - Dominant Element */}
          <div className={styles.ticketPhotoSection}>
            <div className={styles.ticketPhotoWrapper}>
              <Image
                src={member.image ?? "/team/ABteam2.JPG"}
                alt={`${member.name}, ${member.role}`}
                fill
                className={styles.ticketPhoto}
                priority
              />
            </div>
          </div>

          {/* Ticket Info Section Below Image */}
          <div className={styles.ticketInfoSection}>
            <div className={styles.ticketField}>
              <span className={styles.ticketLabel}>PASSENGER</span>
              <span className={styles.ticketValue}>{member.name}</span>
            </div>
            <div className={styles.ticketRoleValue}>{member.role}</div>
            <div className={styles.ticketNumber}>
              <span className={styles.ticketNumberLabel}>TICKET NO.</span>
              <span className={styles.ticketNumberValue}>
                {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                {member.year?.toString().slice(-2) || 'XX'}
              </span>
            </div>
          </div>

          {/* Ticket Footer with Barcode */}
          <div className={styles.ticketFooterSection}>
            <div className={styles.ticketBarcode}>
              <div className={styles.barcodeLine}></div>
              <div className={styles.barcodeLine}></div>
              <div className={styles.barcodeLine}></div>
              <div className={styles.barcodeLine}></div>
              <div className={styles.barcodeLine}></div>
              <div className={styles.barcodeLine}></div>
              <div className={styles.barcodeLine}></div>
              <div className={styles.barcodeLine}></div>
              <div className={styles.barcodeLine}></div>
              <div className={styles.barcodeLine}></div>
            </div>
            <div className={styles.ticketPerforation}>
              <div className={styles.ticketHole}></div>
              <div className={styles.ticketHole}></div>
              <div className={styles.ticketHole}></div>
            </div>
          </div>
        </div>

        {/* Back of boarding pass */}
        <div className={styles.memberCardBack}>
          <div className={styles.boardingPassHeader}>
            <div className={styles.passAirline}>
              <span className={styles.airlineName}>CORNELL AUTOBOAT</span>
              <span className={styles.passType}>PASSENGER INFO</span>
            </div>
            <div className={styles.passSubteam}>{member.subteam}</div>
          </div>

          <div className={styles.ticketBody}>
            <div className={styles.memberCardBackContent}>
              <h4 className={styles.memberCardName}>{member.name}</h4>
              <div className={styles.ticketDivider}></div>
              <div className={styles.ticketDetails}>
                <div className={styles.ticketDetailRow}>
                  <span className={styles.ticketDetailLabel}>Major</span>
                  <span className={styles.ticketDetailValue}>{member.major}</span>
                </div>
                <div className={styles.ticketDetailRow}>
                  <span className={styles.ticketDetailLabel}>Class</span>
                  <span className={styles.ticketDetailValue}>{member.year}</span>
                </div>
                <div className={styles.ticketDetailRow}>
                  <span className={styles.ticketDetailLabel}>Hometown</span>
                  <span className={styles.ticketDetailValue}>{member.hometown}</span>
                </div>
              </div>
              <div className={styles.memberCardIcons} role="list">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    aria-label={`Coffee chat with ${member.name}`}
                    role="listitem"
                    className={styles.iconLink}
                  >
                    <svg
                      className={styles.iconmini}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                      <line x1="6" y1="1" x2="6" y2="4" />
                      <line x1="10" y1="1" x2="10" y2="4" />
                      <line x1="14" y1="1" x2="14" y2="4" />
                    </svg>
                  </a>
                )}

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s LinkedIn profile`}
                    role="listitem"
                    className={styles.iconLink}
                  >
                    <svg
                      className={styles.iconmini}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className={styles.ticketFooter}>
            <div className={styles.ticketPerforation}>
              <div className={styles.ticketHole}></div>
              <div className={styles.ticketHole}></div>
              <div className={styles.ticketHole}></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

