'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import './globals.css';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.fadeInUp);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const refs = contentRefs.current;
    refs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHome} ref={heroRef}>
        <Image
          src="/background.svg"
          alt="Cornell AutoBoat team background"
          fill
          quality={100}
          priority
          className={styles.heroHomeImage}
          style={{ objectFit: 'cover' }}
        />

        <div className={styles.heroHomeContent}>
          <div className={`${styles.homeHeroText} ${isVisible ? styles.fadeInDown : ''}`}>
            <h1 className={styles.homeTitle}>Cornell AutoBoat</h1>
            <h2 className={styles.homeTitle2}>Project Team</h2>
            <p className={styles.homeDescr}>
              Boats are cool. So are we.{' '}
              <span className={styles.speechBubble}>
                <span className={styles.speechText}>Click a boat!</span>
              </span>
            </p>
          </div>

          <div className={styles.homeHeroBoat}>
            <Image
              src="/cliffordart.svg"
              alt="Clifford the Big Red Boat"
              width={600}
              height={600}
              className={styles.cliffordBoat}
              onClick={() => setIsModalOpen(true)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>


      {/* Block Section */}
      <main className={styles.homeContent}>
        <section className={styles.blockSection}>
          <div
            className={`${styles.aboutCrewTitle} ${styles.scrollFadeIn}`}
            ref={(el) => { contentRefs.current[0] = el; }}
          >
            <h2>Aboat</h2>
            <h2 className={styles.aboutCrewTitle2}>the Crew</h2>
          </div>

          <div
            className={styles.sectionContent}
            ref={(el) => { contentRefs.current[1] = el; }}
          >
            <div className={styles.container}>
              <div className={styles.descrBlock}>
                <h2 className={styles.blockHeader}>Something</h2>
                <p className={styles.descr}>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                </p>
              </div>
            </div>
            <div className={styles.container}>
              <div className={styles.techImg}>
              </div>
            </div>
          </div>

          <div
            className={styles.sectionContent}
            ref={(el) => { contentRefs.current[2] = el; }}
          >
            <div className={styles.container}>
              <div className={styles.techImg}>
              </div>
            </div>
            <div className={styles.container}>
              <div className={styles.descrBlock}>
                <h2 className={styles.blockHeader}>Something</h2>
                <p className={styles.descr}>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                </p>
              </div>
            </div>
          </div>

          <div
            className={styles.sectionContent}
            ref={(el) => { contentRefs.current[3] = el; }}
          >
            <div className={styles.container}>
              <div className={styles.descrBlock}>
                <h2 className={styles.blockHeader}>Something</h2>
                <p className={styles.descr}>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                </p>
              </div>
            </div>
            <div className={styles.container}>
              <div className={styles.techImg}>
              </div>
            </div>
          </div>
          <div
            className={styles.videoCont}
            ref={(el) => { contentRefs.current[4] = el; }}
          >
            <p>Video will go here</p>
          </div>
        </section>
      </main>

      {/* Boat Modal Popup */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              ×
            </button>
            <div className={styles.modalImageFloating}>
              <Image
                src="/cliffordart.svg"
                alt="Clifford the Big Red Boat"
                width={600}
                height={600}
                className={styles.modalImage}
              />
            </div>
            <div className={styles.modalTextContent}>
              <h2 className={styles.modalTitle}>Clifford the Big Red Boat</h2>
              <p className={styles.modalDescription}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}