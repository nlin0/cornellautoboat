'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import './globals.css';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesignOpen, setIsDesignOpen] = useState(false);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
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
              Design, build, test and compete with autonomous boats{' '}
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
            className={styles.aboutCrewSection}
            ref={(el) => { contentRefs.current[0] = el; }}
          >
            <div className={styles.aboutCrewTitleContainer}>
              <div
                className={`${styles.aboutCrewTitle} ${styles.scrollFadeIn}`}
              >
                <h2>Aboat</h2>
                <h2 className={styles.aboutCrewTitle2}>the Crew</h2>
              </div>
              <div className={styles.aboutCrewDescription}>
                <p className={styles.descr}>
                  We are a student-run team of hardware and software engineers, dedicated to building and innovating in the field of naval architecture and marine robotics.
                  Our driven members challenge themselves in a fast-paced work environment and make lifelong connections.
                </p>
              </div>
            </div>
          </div>

          <div
            className={styles.sectionContent}
            ref={(el) => { contentRefs.current[1] = el; }}
          >
            <div className={styles.container}>
              <div className={styles.techImg}>
              </div>
            </div>
            <div className={styles.container}>
              <div className={styles.descrBlock}>
                <h2 className={styles.blockHeader}>Design</h2>
                <p className={styles.descr}>
                  This year&apos;s design cycle is centered on a complete rebuild of the boat, incorporating improvements identified during the previous cycle. The focus spans both hardware and software, with a redesigned hull and upgraded internal systems paired with significant changes to the codebase to improve autonomous performance.
                </p>
                <button
                  className={styles.dropdownHeader}
                  onClick={() => setIsDesignOpen(!isDesignOpen)}
                  aria-expanded={isDesignOpen}
                >
                  <span className={styles.dropdownTriggerText}>Key projects</span>
                  <span className={`${styles.dropdownIcon} ${isDesignOpen ? styles.dropdownIconOpen : ''}`}>
                    ▼
                  </span>
                </button>
                <div className={`${styles.dropdownContent} ${isDesignOpen ? styles.dropdownContentOpen : ''}`}>
                  <ul className={styles.descrList}>
                    <li>New main hatch design for increased access and improved ergonomics</li>
                    <li>Integrated bridge deck and ama beams to improve structural integrity</li>
                    <li>Simplified modular electrical bay design to streamline setup and troubleshooting</li>
                    <li>New computer vision mast for a redesigned sensor suite</li>
                    <li>Buoy deflectors for improved navigation capabilities</li>
                    <li>Higher power thrusters for increased speed</li>
                    <li>Upgraded and specialized PCBs for power distribution, kill switch, and POE injection</li>
                    <li>Custom microcontroller board for reliability and flexibility</li>
                    <li>Custom battery monitoring system to improve safety</li>
                    <li>More robust power distribution relays for up to 60A of current</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div
            className={styles.sectionContent}
            ref={(el) => { contentRefs.current[2] = el; }}
          >
            <div className={styles.container}>
              <div className={styles.descrBlock}>
                <h2 className={styles.blockHeader}>Manufacturing</h2>
                <p className={styles.descr}>
                  This year&apos;s competition cycle involves the development of a new boat, with significant updates to both the hull and internal systems. We are also revamping our manufacturing method, using a single female mold for the hull instead of multiple male molds. Manufacturing spans a range of processes, including large-scale composite work for the hull, as well as sheet metal bending, laser cutting, and CNC machining. Shown below is a time-lapse of our manufacturing team completing the fiberglass layup for our previous main hull mold!
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
            ref={(el) => { contentRefs.current[3] = el; }}
          >
            <div className={styles.container}>
              <div className={styles.techImg}>
              </div>
            </div>
            <div className={styles.container}>
              <div className={styles.descrBlock}>
                <h2 className={styles.blockHeader}>Testing</h2>
                <p className={styles.descr}>
                  On-water testing is the team&apos;s main priority this year. This gives the software team as much time as possible to develop and troubleshoot AI, CV, and Controls code in an environment similar to competition. We test outdoors on a lake as much as possible. However, when weather conditions don&apos;t allow it, indoor pool testing is crucial to stay on top of our timeline. In these cases, we use an ultrasonic positioning system in lieu of a GPS for positional tracking.
                </p>
              </div>
            </div>
          </div>

          <div
            className={styles.sectionContent}
            ref={(el) => { contentRefs.current[4] = el; }}
          >
            <div className={styles.container}>
              <div className={styles.descrBlock}>
                <h2 className={styles.blockHeader}>Research</h2>
                <p className={styles.descr}>
                  Our team is focused on preparing for RoboBoat 2026, with a few members doing research and early-stage design for more complex, longer term projects.
                </p>
                <button
                  className={styles.dropdownHeader}
                  onClick={() => setIsResearchOpen(!isResearchOpen)}
                  aria-expanded={isResearchOpen}
                >
                  <span className={styles.dropdownTriggerText}>Current projects</span>
                  <span className={`${styles.dropdownIcon} ${isResearchOpen ? styles.dropdownIconOpen : ''}`}>
                    ▼
                  </span>
                </button>
                <div className={`${styles.dropdownContent} ${isResearchOpen ? styles.dropdownContentOpen : ''}`}>
                  <ul className={styles.descrList}>
                    <li>Holonomic propulsion system</li>
                    <li>3-DOF robotic arm</li>
                    <li>Custom motor ESCs</li>
                    <li>Custom buck-boost converters</li>
                    <li>Active water cooling system</li>
                    <li>LiDAR integration</li>
                    <li>Obstacle Avoidance algorithms</li>
                    <li>Non-ideal Sims perception</li>
                    <li>3D virtual simulations</li>
                    <li>YOLO hyperparameter tuning</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.container}>
              <div className={styles.techImg}>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Red divider box before footer */}
      <div className={styles.redDividerBox}></div>

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
                Clifford the Big Red Boat is our autonomous vessel, designed and built by the Cornell AutoBoat team. Named after Cornell&apos;s beloved mascot, Clifford represents our dedication to innovation in marine robotics and autonomous navigation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}