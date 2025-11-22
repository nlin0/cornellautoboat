import Image from 'next/image';
import styles from './team.module.css';
import type { TeamMember } from './teamdata';

interface MemberCardProps {
  member: TeamMember;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <article className={styles.memberCard} role="listitem">
      <div className={styles.memberCardLeft}>
        <h4 className="text-secondary2 text-header-sm font-bold">
          {member.name}
        </h4>
        <div className={styles.memberCardImageWrapper}>
          <Image
            src={member.image ?? "/ABteam2.JPG"}
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
  );
}

