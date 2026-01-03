"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./competition.module.css";

export default function Competition() {
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
        <h1 className={styles.competitionTitle}>RoboBoat Competition</h1>
      </div>

      <div className={styles.dividerWrapper}>
        <Image
          src="/dividers/divider10.svg"
          alt=""
          width={2400}
          height={200}
          className={styles.divider}
          quality={100}
          priority
          aria-hidden="true"
        />
      </div>

      {/* RoboBoat Overview Section */}
      <section className={styles.overviewSection}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            <div
              className={styles.textContent}
              ref={(el) => {
                contentRefs.current[0] = el;
              }}
            >
              <h2 className={styles.sectionTitle}>RoboBoat 2026</h2>
              <p className={styles.bodyText}>
                RoboBoat is an international marine robotics competition, run by
                RoboNation. Each team builds an Autonomous Surface Vehicle (ASV)
                around 3 feet wide and 5 feet long. Over the course of a week,
                each ASV must complete a variety of different challenges.
              </p>
              <a
                href="https://www.robonation.org/competition/roboboat"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.learnMoreButton}
              >
                Learn More About RoboBoat
              </a>
            </div>
            <div
              className={styles.imageWrapper}
              ref={(el) => {
                contentRefs.current[1] = el;
              }}
            >
              <Image
                src="/clifford2.png"
                alt="Autonomous Surface Vehicle (ASV) in competition"
                width={600}
                height={400}
                className={styles.overviewImage}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigational Tasks Section */}
      <section className={styles.tasksSection}>
        <div className={styles.container}>
          <div
            className={styles.sectionHeader}
            ref={(el) => {
              contentRefs.current[2] = el;
            }}
          >
            <h2 className={styles.sectionTitle}>Navigational Tasks</h2>
            <p className={styles.sectionDescription}>
              Testing precision, perception, and autonomous navigation
              capabilities
            </p>
          </div>
          <div className={styles.tasksGrid}>
            {/* Card 1 */}
            <div
              className={styles.taskCard}
              ref={(el) => {
                contentRefs.current[3] = el;
              }}
            >
              <div className={styles.taskImageWrapper}>
                <Image
                  src="/competition/evacuation_route.png"
                  alt="evacuation"
                  width={400}
                  height={500}
                  className={styles.taskImage}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  unoptimized
                />
              </div>
              <div className={styles.taskContent}>
                <h3 className={styles.taskTitle}>Evacuation Route</h3>
                <p className={styles.taskDescription}>
                  ASV safely transits through entrance and exit gates at
                  start/end of run.
                </p>
              </div>
            </div>
            {/* Card 2 */}
            <div
              className={styles.taskCard}
              ref={(el) => {
                contentRefs.current[4] = el;
              }}
            >
              <div className={styles.taskImageWrapper}>
                <Image
                  src="/competition/debris.png"
                  alt="Boat docking autonomously"
                  width={400}
                  height={300}
                  className={styles.taskImage}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
              <div className={styles.taskContent}>
                <h3 className={styles.taskTitle}>Debris Clearance</h3>
                <p className={styles.taskDescription}>
                  ASV navigates through channel to debris field, and scans for
                  floating hazards.
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div
              className={styles.taskCard}
              ref={(el) => {
                contentRefs.current[5] = el;
              }}
            >
              <div className={styles.taskImageWrapper}>
                <Image
                  src="/competition/emergency.png"
                  alt="Boat navigating around buoys"
                  width={400}
                  height={300}
                  className={styles.taskImage}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
              <div className={styles.taskContent}>
                <h3 className={styles.taskTitle}>Emergency Response Sprint</h3>
                <p className={styles.taskDescription}>
                  ASV sprints to the distress zone, circles the light buoy
                  correctly, and exits back through the buoys.
                </p>
              </div>
            </div>
            {/* Card 4 */}
            <div
              className={styles.taskCard}
              ref={(el) => {
                contentRefs.current[6] = el;
              }}
            >
              <div className={styles.taskImageWrapper}>
                <Image
                  src="/competition/supply.avif"
                  alt="Boat navigating around buoys"
                  width={400}
                  height={300}
                  className={styles.taskImage}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
              <div className={styles.taskContent}>
                <h3 className={styles.taskTitle}>Supply Drop</h3>
                <p className={styles.taskDescription}>
                  ASV delivers water and racquetball supplies to stationary
                  vessels throughout course.
                </p>
              </div>
            </div>
            {/* Card 5 */}
            <div
              className={styles.taskCard}
              ref={(el) => {
                contentRefs.current[7] = el;
              }}
            >
              <div className={styles.taskImageWrapper}>
                <Image
                  src="/competition/navigate.png"
                  alt="Boat navigating around buoys"
                  width={400}
                  height={300}
                  className={styles.taskImage}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
              <div className={styles.taskContent}>
                <h3 className={styles.taskTitle}>Navigate the Marina</h3>
                <p className={styles.taskDescription}>
                  ASV enters marina and docks in an unoccupied slip.
                </p>
              </div>
            </div>
            {/* Card 6 */}
            <div
              className={styles.taskCard}
              ref={(el) => {
                contentRefs.current[8] = el;
              }}
            >
              <div className={styles.taskImageWrapper}>
                <Image
                  src="/competition/comm2.png"
                  alt="Boat navigating around buoys"
                  width={400}
                  height={300}
                  className={styles.taskImage}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>

              <div className={styles.taskContent}>
                <h3 className={styles.taskTitle}>Communications & Reporting</h3>
                <p className={styles.taskDescription}>
                  ASV reports on any given task: time stamp, lat/long locations,
                  number or color of object.
                </p>
              </div>
            </div>
            {/* Card 7 */}
            <div
              className={styles.taskCard}
              ref={(el) => {
                contentRefs.current[9] = el;
              }}
            >
              <div className={styles.taskImageWrapper}>
                <Image
                  src="/competition/alert.png"
                  alt="Boat navigating around buoys"
                  width={400}
                  height={300}
                  className={styles.taskImage}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>

              <div className={styles.taskContent}>
                <h3 className={styles.taskTitle}>Navigate the Marina</h3>
                <p className={styles.taskDescription}>
                  ASV responds to emergency audio signal.
                </p>
              </div>
            </div>
          </div>

          {/* Detail box*/}
          <div
            className={styles.detailBox}
            ref={(el) => {
              contentRefs.current[10] = el;
            }}
          >
            <p className={styles.detailText}>
              The navigational tasks test the boat&apos;s ability to see and
              recognize obstacles, plan a path around them, and then execute
              that plan. In order to successfully complete these challenges, the
              computer vision, path planning, and path execution/controls
              algorithms must be working perfectly in sync within the onboard
              operating system. Mechanically, the boat must remain stable in
              order for the cameras and sensors to be able to see clearly, and
              the propulsion systems must be able to produce consistent and
              reliable thrust.
            </p>
          </div>
        </div>
      </section>

      {/* Robotic Tasks Section */}
      <section className={styles.roboticSection}>
        <div className={styles.container}>
          <div
            className={styles.sectionHeader}
            ref={(el) => {
              contentRefs.current[11] = el;
            }}
          >
            <h2 className={styles.sectionTitle}>Robotic Tasks</h2>
            <p className={styles.sectionDescription}>
              Physical interaction and manipulation in aquatic environments
            </p>
          </div>
          <div className={styles.tasksGrid}>
            <div
              className={styles.taskCard}
              ref={(el) => {
                contentRefs.current[12] = el;
              }}
            >
              <div className={styles.taskImageWrapper}>
                <Image
                  src="/clifford2.png"
                  alt="Boat collecting objects from water"
                  width={400}
                  height={300}
                  className={styles.taskImage}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
              <div className={styles.taskContent}>
                <h3 className={styles.taskTitle}>Object Collection</h3>
                <p className={styles.taskDescription}>
                  Collecting objects from the water and placing them in specific
                  areas
                </p>
              </div>
            </div>
            <div
              className={styles.taskCard}
              ref={(el) => {
                contentRefs.current[13] = el;
              }}
            >
              <div className={styles.taskImageWrapper}>
                <Image
                  src="/clifford2.png"
                  alt="Boat shooting water at targets"
                  width={400}
                  height={300}
                  className={styles.taskImage}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
              <div className={styles.taskContent}>
                <h3 className={styles.taskTitle}>Water Target</h3>
                <p className={styles.taskDescription}>
                  Shooting water at targets with precision and accuracy
                </p>
              </div>
            </div>
            <div
              className={styles.taskCard}
              ref={(el) => {
                contentRefs.current[14] = el;
              }}
            >
              <div className={styles.taskImageWrapper}>
                <Image
                  src="/clifford2.png"
                  alt="Boat shooting skeeballs at targets"
                  width={400}
                  height={300}
                  className={styles.taskImage}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
              <div className={styles.taskContent}>
                <h3 className={styles.taskTitle}>Skeeball</h3>
                <p className={styles.taskDescription}>
                  Shooting skeeballs at targets with mechanical precision
                </p>
              </div>
            </div>
          </div>
          <div
            className={styles.detailBox}
            ref={(el) => {
              contentRefs.current[15] = el;
            }}
          >
            <p className={styles.detailText}>
              The robotic tasks test the boat&apos;s ability to physically
              interact with its environment. In order to successfully complete
              these challenges, mechanical and electrical robotics components
              must be working together seamlessly to execute precise movements.
              On the software side, the cameras and sensors process data about
              the boat&apos;s surroundings, which is then used by the motion
              planning algorithms and motor control code to manipulate onboard
              actuators.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
