'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './team.module.css';
import type { TeamMember } from './teamtypes';
import { getMemberImage } from './teamtypes';
import { getBlobUrl } from './blobImageMap';

interface MemberCardProps {
  member: TeamMember;
}

const PLACEHOLDER_IMAGE = '/team/teamPhotos/Full_Team_2.webp';

export default function MemberCard({ member }: MemberCardProps) {
  // Convert local path to blob URL if available
  const initialImagePath = getMemberImage(member);
  const [imageSrc, setImageSrc] = useState(getBlobUrl(initialImagePath));
  const [attemptCount, setAttemptCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  // preload placeholder image for faster fallback (use blob URL if available)
  useEffect(() => {
    const placeholderBlobUrl = getBlobUrl(PLACEHOLDER_IMAGE);
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = placeholderBlobUrl;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleImageError = () => {
    // if we've already reached placeholder, mark as error and stop trying
    const placeholderBlobUrl = getBlobUrl(PLACEHOLDER_IMAGE);
    if (imageSrc === placeholderBlobUrl || imageSrc === PLACEHOLDER_IMAGE) {
      setHasError(true);
      return;
    }

    // fallback: try placeholder (as blob URL)
    setImageSrc(placeholderBlobUrl);
    setAttemptCount(1);
  };

  return (
    <article className={styles.memberCardContainer} role="listitem">
      <div className={styles.memberCardInner}>
        {/* FRONT OF BOARDING PASS */}
        <div className={styles.memberCardFront}>
          {/* Ticket Header */}
          <div className={styles.ticketHeader}>
            <div className={styles.ticketHeaderTop}>
              <div className={styles.ticketAirline}>
                <span className={styles.ticketType}>BOARDING PASS</span>
              </div>
              <div className={styles.ticketSubteamBadge}>
                {member.subteam === 'Business and Outreach' ? 'Business'
                  : member.subteam}
              </div>
            </div>
          </div>

          {/* Large Member Photo - Dominant Element */}
          <div className={styles.ticketPhotoSection}>
            <div className={styles.ticketPhotoWrapper}>
              <Image
                src={imageSrc}
                alt={`${member.name}, ${member.role}`}
                fill
                className={styles.ticketPhoto}
                priority={imageSrc !== getBlobUrl(PLACEHOLDER_IMAGE) && imageSrc !== PLACEHOLDER_IMAGE}
                onError={handleImageError}
                loading={imageSrc === getBlobUrl(PLACEHOLDER_IMAGE) || imageSrc === PLACEHOLDER_IMAGE ? 'eager' : undefined}
              />
            </div>
          </div>

          {/* TICKET INFO SESSION BELOW IMAGE */}
          <div className={styles.ticketInfoSection}>
            <div className={styles.ticketField}>
              <span className={styles.ticketLabel}>CREW MEMBER</span>
              <span className={styles.ticketValue}>{member.name}</span>
            </div>
            <div className={styles.ticketField}>
              <span className={styles.ticketRoleValue}>{member.role}</span>
            </div>
            <div className={styles.ticketNumber}>
              <span className={styles.ticketNumberLabel}>TICKET NO.</span>
              <span className={styles.ticketNumberValue}>CUAB26</span>
            </div>
          </div>

          {/* TICKET FOOTER (with barcode lol) */}
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

        {/* BACK OF BOARDING PASS */}
        <div className={styles.memberCardBack}>
          <div className={styles.boardingPassHeader}>
            <div className={styles.passAirline}>
              <span className={styles.passType}>MEMBER INFO</span>
            </div>
            <div className={styles.passSubteam}>
              {member.subteam === 'Business and Outreach'
                  ? 'Business'
                  : member.subteam}
            </div>
          </div>

          <div className={styles.ticketBody}>
            <div className={styles.memberCardBackContent}>
              <h4 className={styles.memberCardName}>{member.name}</h4>
              <div className={styles.ticketDivider}></div>
              <div className={styles.ticketDetails}>
                <div className={styles.ticketDetailRow}>
                  <span className={styles.ticketDetailLabel}>Major</span>
                  <span className={styles.ticketDetailValue}>
                    {member.major}
                  </span>
                </div>
                <div className={styles.ticketDetailRow}>
                  <span className={styles.ticketDetailLabel}>Class</span>
                  <span className={styles.ticketDetailValue}>
                    {member.year}
                  </span>
                </div>
                <div className={styles.ticketDetailRow}>
                  <span className={styles.ticketDetailLabel}>Hometown</span>
                  <span className={styles.ticketDetailValue}>
                    {member.hometown}
                  </span>
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
