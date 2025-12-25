'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './sponsors.module.css';

export default function Sponsors() {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target) {
            try {
              entry.target.classList.add(styles.fadeInUp);
            } catch (error) {
              // Element might have been removed, ignore error
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const refs = contentRefs.current;
    const observedElements: Element[] = [];

    refs.forEach((ref) => {
      if (ref && ref.isConnected && ref instanceof Element) {
        try {
          observer.observe(ref);
          observedElements.push(ref);
        } catch (error) {
          // Element might not be ready, ignore error
        }
      }
    });

    return () => {
      // Disconnect observer first to prevent any issues
      try {
        observer.disconnect();
      } catch (error) {
        // Observer might already be disconnected, ignore error
      }
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Header Section */}
      <div className={`${styles.competitionIntro} ${styles.fadeInDown}`}>
        <h1 className={styles.competitionTitle}>Thank You to Our Sponsors</h1>
        <p className={styles.competitionSubtitle}>
          Cornell Autoboat is always grateful to all of our sponsors for their
          support. Our team is able to grow, learn, and succeed due to your
          generosity and assistance – we would not be the team we are today!
        </p>
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
                  src="/sponsors/asml.png"
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
                  src="/sponsors/saronic.png"
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
                  src="/sponsors/cornell.png"
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
                  src="/sponsors/vectornav.png"
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
                  src="/sponsors/orca3d.png"
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
