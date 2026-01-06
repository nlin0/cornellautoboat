"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import "./globals.css";
import {
  FlaskConical,
  DraftingCompass,
  Factory,
  Lightbulb,
} from "lucide-react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesignOpen, setIsDesignOpen] = useState(false);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsVisible(true);

    // INTERSCTION OBSERVER FOR SCROLL ANIMATIONS
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
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

    // FOR NODE JS NULL ERROR
    return () => {
      // disconnect observer first to prevent any issues
      try {
        observer.disconnect();
      } catch (error) {
      }
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
          style={{ objectFit: "cover" }}
        />

        <div className={styles.heroHomeContent}>
          <div
            className={`${styles.homeHeroText} ${
              isVisible ? styles.fadeInDown : ""
            }`}
          >
            <h1 className={styles.homeTitle}>Cornell AutoBoat</h1>
            <h2 className={styles.homeTitle2}>Project Team</h2>
            <p className={styles.homeDescr}>
              Where Innovation meets Passion{" "}
              <span className={styles.speechBubble}>
                <span className={styles.speechText}>Click a boat!</span>
              </span>
            </p>
            <a href="https://forms.gle/2Y3BycZK8QUAHsuYA" className={styles.applyButton}>
              Apply Now! 
            </a>
          </div>

          <div className={styles.homeHeroBoat}>
            <Image
              src="/cliffordart.svg"
              alt="Clifford the Big Red Boat"
              width={600}
              height={600}
              className={styles.cliffordBoat}
              onClick={() => setIsModalOpen(true)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      {/* BLOCK SECTION */}
      <main className={styles.homeContent}>
        <section className={styles.blockSection}>
          <div
            className={styles.aboutCrewSection}
            ref={(el) => {
              contentRefs.current[0] = el;
            }}
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
                  We are a student-run team of hardware and software engineers,
                  dedicated to building and innovating in the field of naval
                  architecture and marine robotics. Our driven members challenge
                  themselves in a fast-paced work environment and make lifelong
                  connections.
                </p>
              </div>
            </div>
          </div>

          {/* TEAM VIDEO */}
          <div
            className={styles.teamVideoSection}
            ref={(el) => {
              contentRefs.current[1] = el;
            }}
          >
            <button
              className={styles.teamVideoButton}
              onClick={() => setIsVideoOpen(!isVideoOpen)}
              aria-expanded={isVideoOpen}
            >
              <span>Watch our team video!</span>
              <span
                className={`${styles.teamVideoButtonIcon} ${
                  isVideoOpen ? styles.teamVideoButtonIconOpen : ""
                }`}
              >
                ▼
              </span>
            </button>
            <div
              className={`${styles.teamVideoDropdown} ${
                isVideoOpen ? styles.teamVideoDropdownOpen : ""
              }`}
            >
              <div className={styles.teamVideoContainer}>
                <iframe
                  className={styles.teamVideo}
                  src="https://www.youtube.com/embed/diU5pqHvO5w"
                  title="Cornell AutoBoat Team Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {/* COMPETITION CYCLE SECTION */}
          <div
            className={styles.competitionCycleSection}
            ref={(el) => {
              contentRefs.current[2] = el as HTMLDivElement | null;
            }}
          >
            <div className={styles.competitionCycleContent}>
              <h2 className={styles.competitionCycleTitle}>
                The 2025-2026 Competition Cycle
              </h2>
              <p className={styles.competitionCycleSubtitle}>
                Incremental hardware updates, significant software changes, and
                an emphasis on testing.
              </p>
              <div className={styles.cycleLinks}>
                <a
                  href="#testing"
                  className={styles.cycleLink}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(
                      '[data-section="testing"]'
                    );
                    element?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  <FlaskConical className={styles.cycleIcon} />
                  <span>Testing</span>
                </a>
                <a
                  href="#design"
                  className={styles.cycleLink}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(
                      '[data-section="design"]'
                    );
                    element?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  <DraftingCompass className={styles.cycleIcon} />
                  <span>Design</span>
                </a>
                <a
                  href="#manufacturing"
                  className={styles.cycleLink}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(
                      '[data-section="manufacturing"]'
                    );
                    element?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  <Factory className={styles.cycleIcon} />
                  <span>Manufacturing</span>
                </a>
                <a
                  href="#research"
                  className={styles.cycleLink}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(
                      '[data-section="research"]'
                    );
                    element?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  <Lightbulb className={styles.cycleIcon} />
                  <span>Research</span>
                </a>
              </div>
            </div>
          </div>

          <div
            className={styles.sectionContent}
            ref={(el) => {
              contentRefs.current[3] = el as HTMLDivElement | null;
            }}
            data-section="design"
          >
            <div className={styles.container}>
              <div className={styles.techImg}>
                <Image
                  src="/home/design.png"
                  alt="Design"
                  fill
                  className={styles.techImage}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                    borderRadius: "30px",
                  }}
                />
              </div>
            </div>
            <div className={styles.container}>
              <div className={styles.descrBlock}>
                <h2 className={styles.blockHeader}>Design</h2>
                <p className={styles.descr}>
                  This year&apos;s design cycle is centered on a complete
                  rebuild of the boat, incorporating improvements identified
                  during the previous cycle. The focus spans both hardware and
                  software, with a redesigned hull and upgraded internal systems
                  paired with significant changes to the codebase to improve
                  autonomous performance.
                </p>
                <button
                  className={styles.dropdownHeader}
                  onClick={() => setIsDesignOpen(!isDesignOpen)}
                  aria-expanded={isDesignOpen}
                >
                  <span className={styles.dropdownTriggerText}>
                    Key projects
                  </span>
                  <span
                    className={`${styles.dropdownIcon} ${
                      isDesignOpen ? styles.dropdownIconOpen : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`${styles.dropdownContent} ${
                    isDesignOpen ? styles.dropdownContentOpen : ""
                  }`}
                >
                  <ul className={styles.descrList}>
                    <li>
                      New main hatch design for increased access and improved
                      ergonomics
                    </li>
                    <li>
                      Integrated bridge deck and ama beams to improve structural
                      integrity
                    </li>
                    <li>
                      Simplified modular electrical bay design to streamline
                      setup and troubleshooting
                    </li>
                    <li>
                      New computer vision mast for a redesigned sensor suite
                    </li>
                    <li>
                      Buoy deflectors for improved navigation capabilities
                    </li>
                    <li>Higher power thrusters for increased speed</li>
                    <li>
                      Upgraded and specialized PCBs for power distribution, kill
                      switch, and POE injection
                    </li>
                    <li>
                      Custom microcontroller board for reliability and
                      flexibility
                    </li>
                    <li>Custom battery monitoring system to improve safety</li>
                    <li>
                      More robust power distribution relays for up to 60A of
                      current
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div
            className={styles.sectionContent}
            ref={(el) => {
              contentRefs.current[4] = el as HTMLDivElement | null;
            }}
            data-section="manufacturing"
          >
            <div className={styles.container}>
              <div className={styles.descrBlock}>
                <h2 className={styles.blockHeader}>Manufacturing</h2>
                <p className={styles.descr}>
                  This year&apos;s competition cycle involves the development of
                  a new boat, with significant updates to both the hull and
                  internal systems. We are also revamping our manufacturing
                  method, using a single female mold for the hull instead of
                  multiple male molds. Manufacturing spans a range of processes,
                  including large-scale composite work for the hull, as well as
                  sheet metal bending, laser cutting, and CNC machining. Shown
                  below is a time-lapse of our manufacturing team completing the
                  fiberglass layup for our previous main hull mold!
                </p>
              </div>
            </div>
            <div className={styles.container}>
              <div className={`${styles.techImg} ${styles.techImgVideo}`}>
                <video
                  src="/home/manufacturing.mp4"
                  className={styles.techVideo}
                  controls
                  loop
                  muted
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "30px",
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className={styles.sectionContent}
            ref={(el) => {
              contentRefs.current[5] = el as HTMLDivElement | null;
            }}
            data-section="testing"
          >
            <div className={styles.container}>
              <div className={styles.techImg}>
                <Image
                  src="/home/testing.jpg"
                  alt="Testing"
                  fill
                  className={styles.techImage}
                  style={{ objectFit: "cover", borderRadius: "30px" }}
                />
              </div>
            </div>
            <div className={styles.container}>
              <div className={styles.descrBlock}>
                <h2 className={styles.blockHeader}>Testing</h2>
                <p className={styles.descr}>
                  On-water testing is the team&apos;s main priority this year.
                  This gives the software team as much time as possible to
                  develop and troubleshoot AI, CV, and Controls code in an
                  environment similar to competition. We test outdoors on a lake
                  as much as possible. However, when weather conditions
                  don&apos;t allow it, indoor pool testing is crucial to stay on
                  top of our timeline. In these cases, we use an ultrasonic
                  positioning system in lieu of a GPS for positional tracking.
                </p>
              </div>
            </div>
          </div>

          <div
            className={styles.sectionContent}
            ref={(el) => {
              contentRefs.current[6] = el as HTMLDivElement | null;
            }}
            data-section="research"
          >
            <div className={styles.container}>
              <div className={styles.descrBlock}>
                <h2 className={styles.blockHeader}>Research</h2>
                <p className={styles.descr}>
                  Our team is focused on preparing for RoboBoat 2026, with a few
                  members doing research and early-stage design for more
                  complex, longer term projects.
                </p>
                <button
                  className={styles.dropdownHeader}
                  onClick={() => setIsResearchOpen(!isResearchOpen)}
                  aria-expanded={isResearchOpen}
                >
                  <span className={styles.dropdownTriggerText}>
                    Current projects
                  </span>
                  <span
                    className={`${styles.dropdownIcon} ${
                      isResearchOpen ? styles.dropdownIconOpen : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`${styles.dropdownContent} ${
                    isResearchOpen ? styles.dropdownContentOpen : ""
                  }`}
                >
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
                <Image
                  src="/home/research.png"
                  alt="Research"
                  fill
                  className={styles.techImage}
                  style={{ objectFit: "cover", borderRadius: "30px" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SPONSORS SECTION */}
        <section
          className={styles.sponsorsSection}
          ref={(el) => {
            contentRefs.current[7] = el as HTMLDivElement | null;
          }}
        >
          <div className={styles.sponsorsContent}>
            <h2 className={styles.sponsorsTitle}>Our Network</h2>
            <p className={styles.sponsorsDescription}>
              For many of our members, AutoBoat has served as a gateway to
              incredible opportunities in industry. Check out some of companies
              our current members and alumni have worked at.
            </p>
            <div className={styles.sponsorsImageContainer}>
              <div className={styles.tapeTape1}></div>
              <div className={styles.tapeTape2}></div>
              <Image
                src="/logo1.png"
                alt="Our Network - Companies our members and alumni have worked at"
                width={1200}
                height={800}
                className={styles.sponsorsImage}
              />
            </div>
          </div>
        </section>
      </main>

      {/* BOAT MODEL POPUP */}
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
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
                Clifford the Big Red Boat is our autonomous vessel, designed and
                built by the Cornell AutoBoat team. Named after Cornell&apos;s
                beloved mascot, Clifford represents our dedication to innovation
                in marine robotics and autonomous navigation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
