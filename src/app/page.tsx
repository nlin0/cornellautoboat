import Image from 'next/image';
import styles from './home.module.css';
import './globals.css';

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHome}>
        <Image
          src="/background.svg"
          alt="background"
          fill
          quality={100}
          priority
          className={styles.heroHomeImage}
          style={{ objectFit: 'cover' }}
        />

        <div className={styles.heroHomeContent}>
          <div className={styles.homeHeroText}>
            <h2 className={styles.homeTitle}>Cornell AutoBoat</h2>
            <h2 className={styles.homeTitle2}>Project Team</h2>
            <p className={styles.homeDescr}>
              Boats are cool. Idk what to put here.
            </p>
          </div>

          <div className={styles.homeHeroBoat}>
            <Image
              src="/cliffordart.svg"
              alt="Clifford Boat"
              width={600}
              height={600}
              className={styles.cliffordBoat}
            />
          </div>
        </div>
      </div>

      {/* Block Section */}
      <div className={styles.homeContent}>
        <div className={styles.blockSection}>
          <div className={styles.aboutCrewTitle}>
            <h3>Aboat</h3>
            <h3 className={styles.aboutCrewTitle2}>the Crew</h3>
          </div>
          <p
            className={styles.descrMain}
            style={{
              marginLeft: '50px',
              marginRight: '50px',
              marginBottom: '20px',
            }}
          >
            We are a student-run team of hardware and software engineers,
            dedicated to building and innovating in the field of naval
            architecture and marine robotics. Our driven members challenge
            themselves in a fast-paced work environment, while also making
            lifelong connections with incredible people.
          </p>
          <div className={styles.videoCont} style={{ marginBottom: '50px' }}>
            <p>video will go here</p>
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.container}>
              <div className={styles.descrBlock}>
                <h2 className={styles.blockHeader}>Design</h2>
                 <p  className={styles.descr}>
                    This year’s design cycle is centered on a complete rebuild
                    of the boat, incorporating improvements identified during
                    the previous cycle. The focus spans both hardware and
                    software, with a redesigned hull and upgraded internal
                    systems paired with significant changes to the codebase to
                    improve autonomous performance. Key projects include:
                  </p>
                <ul className={styles.descrList}>
                 
                  <li>
                    New main hatch design for increased access and improved
                    ergonomics
                  </li>
                  <li>
                    Integrated bridge deck and ama beams to improve stability
                  </li>
                  <li>
                    Simplified modular electrical bay design to streamline setup
                    and troubleshooting
                  </li>
                  <li>
                    New computer vision mast for a redesigned sensor suite
                  </li>
                  <li>Buoy deflectors for improved navigation capabilities</li>
                  <li>Higher power thrusters for increased speed</li>
                  <li>
                    Upgraded and specialized PCBs for power distribution, kill
                    switch, and POE injection
                  </li>
                  <li>
                    Custom microcontroller board for reliability and flexibility
                  </li>
                  <li>Custom battery monitoring system to improve safety</li>
                  <li>
                    More robust power distribution relays for handling up to 60A
                    of current
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.container}>
              <div className={styles.techImg}></div>
            </div>
          </div>

          <div className={styles.sectionContent}>
            <div className={styles.container}>
              <div className={styles.techImg}></div>
            </div>
            <div className={styles.container}>
              <div className={styles.descrBlock}>
                <h2 className={styles.blockHeader}>Manufacturing</h2>
                <p className={styles.descr}>
                  This year’s competition cycle involves the development of a
                  new boat, with significant updates to both the hull and
                  internal systems. We are also revamping our manufacturing
                  method, using a single female mold for the hull instead of
                  multiple male molds. Manufacturing spans a range of processes,
                  including large-scale composite work for the hull, as well as
                  sheet metal bending, laser cutting, and CNC machining. Shown
                  is a time-lapse of our manufacturing team completing the
                  fiberglass layup for our previous main hull mold!
                </p>
              </div>
            </div>
          </div>

          <div className={styles.sectionContent}>
            <div className={styles.container}>
              <div className={styles.descrBlock}>
                <h2 className={styles.blockHeader}>Testing</h2>
                <p className={styles.descr}>
                  On-water testing is the team's main priority this year. This
                  gives the software team as much time as possible to develop
                  and troubleshoot AI, CV, and Controls code in an environment
                  similar to competition. We test outdoors on a lake as much as
                  possible. However, when weather conditions don't allow it,
                  indoor pool testing is crucial to stay on top of our timeline.
                  In these cases, we use an ultrasonic positioning system in
                  lieu of a GPS for positional tracking.
                </p>
              </div>
            </div>
            <div className={styles.container}>
              <div className={styles.techImg}></div>
            </div>
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.container}>
              <div className={styles.techImg}></div>
            </div>
            <div className={styles.container}>
              <div className={styles.descrBlock}>
                <h2 className={styles.blockHeader}>Research</h2>
                <p className={styles.descr}>
                  Our team is focused on preparing for RoboBoat 2026, with a few
                  members doing research and early-stage design for more
                  complex, longer-term projects. These projects include:
                </p>
                <ul className={styles.descrList}>
                  <li>Holonomic propulsion system</li>
                  <li>3-DOF robotic arm</li>
                  <li>Custom motor ESCs</li>
                  <li>Custom buck-boost converters</li>
                  <li>Active water cooling system</li>
                  <li>LiDAR integration</li>
                  <li>Obstacle avoidance algorithms</li>
                  <li>Non-ideal Sims perception</li>
                  <li>3D virtual simulations</li>
                  <li>YOLO hyperparameter tuning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
