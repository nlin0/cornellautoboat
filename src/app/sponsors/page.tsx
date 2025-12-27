'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './sponsors.module.css';

export default function Sponsors() {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target) {
            try {
              entry.target.classList.add(styles.fadeInUp);
            } catch (error) {}
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    contentRefs.current.forEach((ref) => {
      if (ref && ref.isConnected && ref instanceof Element) {
        try {
          observer.observe(ref);
        } catch (error) {}
      }
    });

    return () => {
      try {
        observer.disconnect();
      } catch (error) {}
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Thank You Header */}
      <div className={`${styles.competitionIntro} ${styles.fadeInDown}`}>
        <h1 className={styles.competitionTitle}>Thank You to Our Sponsors</h1>
        <p className={styles.competitionSubtitle}>
          Cornell Autoboat is always grateful to all of our sponsors for their
          support. Our team is able to grow, learn, and succeed due to your
          generosity and assistance – we would not be the team we are today!
        </p>
      </div>

      {/* Sponsorship Info Card */}
      <div className={styles.sponsorInfoCard}>
        <h2>Interested in Sponsoring?</h2>
        <p>
          Help us reach our goal! As a student-run project team, Cornell
          Autoboat benefits greatly from any kind of donation or contribution.
          Your support allows us to purchase materials for the boat and send our
          team to the annual Roboboat competition!
        </p>
        <p>
          {' '}
          <strong>There are two methods for giving funds:</strong>
        </p>
        <ol>
          <li>
            <strong>Cornell Autoboat Gift Fund:</strong> You can sponsor us
            through our Giving to Cornell page:{' '}
            <a
              href="https://tinyurl.com/cornellautoboatgiftfund"
              target="_blank"
              rel="noreferrer"
            >
              https://tinyurl.com/cornellautoboatgiftfund
            </a>
          </li>
          <li>
            <strong>Invoice:</strong> Contact our Business Lead, Jessie Yung, at{' '}
            <a href="mailto:jy869@cornell.edu">jy869@cornell.edu</a> and we can
            send invoice instructions. Please be sure to CC our team email{' '}
            <a href="mailto:cornellautoboat@gmail.com">
              cornellautoboat@gmail.com
            </a>
            .
          </li>
        </ol>
        <a
          href="https://drive.google.com/file/d/1UfJ1NOWKrZWKSqS2qA3Xqw5ZbyVaHurO/view?usp=share_link"
          target="_blank"
          rel="noreferrer"
           className={styles.customSponsorLink}
        >
          Our Sponsorship Packet
        </a>
      </div>

      {/* Captains - Platinum Tier */}
      <section className={styles.sponsorSection}>
        <div className={styles.container}>
          <div
            className={styles.tierHeader}
            ref={(el) => {
              contentRefs.current[0] = el;
            }}
          >
            <div className={styles.tierIcon}>
              <div className={styles.iconCircle}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M20 5L25 15H35L27.5 22L30 32L20 25L10 32L12.5 22L5 15H15L20 5Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <h2 className={styles.tierTitle}>Captains</h2>
          </div>
          <div className={styles.sponsorGrid}>
            <div
              className={styles.sponsorCard}
              ref={(el) => {
                contentRefs.current[1] = el;
              }}
            >
              <div className={styles.sponsorLogoWrapper}>
                <Image
                  src="/sponsors/ASML_sponsor.avif"
                  alt="ASML"
                  width={400}
                  height={200}
                  className={styles.sponsorLogo}
                />
              </div>
            </div>
            <div
              className={styles.sponsorCard}
              ref={(el) => {
                contentRefs.current[2] = el;
              }}
            >
              <div className={styles.sponsorLogoWrapper}>
                <Image
                  src="/sponsors/saronic_sponsor.avif"
                  alt="Saronic"
                  width={400}
                  height={200}
                  className={styles.sponsorLogo}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First Mates - Gold Tier */}
      <section className={styles.sponsorSection}>
        <div className={styles.container}>
          <div
            className={styles.tierHeader}
            ref={(el) => {
              contentRefs.current[3] = el;
            }}
          >
            <div className={styles.tierIcon}>
              <div className={styles.iconCircle}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M20 8L18 18L8 20L18 22L20 32L22 22L32 20L22 18L20 8Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <h2 className={styles.tierTitle}>First Mates</h2>
          </div>
          <div className={styles.sponsorGrid}>
            <div
              className={styles.sponsorCard}
              ref={(el) => {
                contentRefs.current[4] = el;
              }}
            >
              <div className={styles.sponsorLogoWrapper}>
                <Image
                  src="/sponsors/cornell-logo.avif"
                  alt="Cornell Engineering"
                  width={400}
                  height={200}
                  className={styles.sponsorLogo}
                />
              </div>
            </div>
            <div
              className={styles.sponsorCard}
              ref={(el) => {
                contentRefs.current[5] = el;
              }}
            >
              <div className={styles.sponsorLogoWrapper}>
                <Image
                  src="/sponsors/vectorn_sponsor.avif"
                  alt="VectorNav"
                  width={400}
                  height={200}
                  className={styles.sponsorLogo}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deckhands - Silver Tier */}
      <section className={styles.sponsorSection}>
        <div className={styles.container}>
          <div
            className={styles.tierHeader}
            ref={(el) => {
              contentRefs.current[6] = el;
            }}
          >
            <div className={styles.tierIcon}>
              <div className={styles.iconCircle}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M10 15C10 15 15 10 20 10C25 10 30 15 30 15M10 25C10 25 15 30 20 30C25 30 30 25 30 25"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
            <h2 className={styles.tierTitle}>Deckhands</h2>
          </div>
          <div className={styles.sponsorGrid}>
            <div
              className={styles.sponsorCard}
              ref={(el) => {
                contentRefs.current[7] = el;
              }}
            >
              <div className={styles.sponsorLogoWrapper}>
                <Image
                  src="/sponsors/orca_sponsor.gif"
                  alt="Orca3D"
                  width={400}
                  height={200}
                  className={styles.sponsorLogo}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
