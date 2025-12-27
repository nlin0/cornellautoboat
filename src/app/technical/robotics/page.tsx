import Image from 'next/image';
import styles from '../technical.module.css';
import TechnicalHero from '../TechnicalHero';
import Divider from '../Divider';

export default function Robotics() {
  return (
    <div className={styles.wrapper}>
        <TechnicalHero title="Robotics" subteam="robotics" />
      <Divider />
      <div className={styles.techSection}>
        
        <p className={styles.descr}>
          The Robotics subteam builds everything on the boat that moves,
          launches, grabs, or interacts with the world. We are a hardware-first
          team of mechanical and electrical engineers who believe in rapid
          prototyping, fast iteration, and learning by trying. While we
          collaborate with the Controls subteam for ROS integration, our primary
          focus is mechanisms, materials, testing, and building real systems.
        </p>
        <p className={styles.descrList}>
          We own the three major interaction tasks for the Roboboat competition:
        </p>
        <ul className={styles.descrList}>
          <li>Watergun system</li>
          <li>Skeeball shooter</li>
          <li>Robotic arm</li>
        </ul>

        {/* Water Shooter */}
        <h3 className={styles.techHeading}>Watergun System</h3>
        <p className={styles.descr}>
          Our watergun is now in its second iteration and was the first robotics
          system ready for competition. A compact, self-priming pump pulls water
          through the stabilizer hull and fires a stream up to 20 feet. A
          waterproof servo enclosure allows automated aiming for precise
          targeting during autonomous runs.
        </p>
        <p className={styles.descr}>
          This year, we are refining the entire watergun setup to work with our
          new single-shell fiberglass trimaran hull, including redesigned tube
          routing, improved waterproofing, and a more robust enclosure for the
          pump. This system embodies our philosophy: build fast, test fast,
          improve fast.
        </p>
        <div className={styles.techImg}>
          <Image
            src="/technical/robotics1.avif"
            alt="Water shooter"
            width={600}
            height={600}
            className={styles.techImage}
          />
        </div>

        <h3 className={styles.techHeading}>Skeeball Shooter</h3>
        <p className={styles.descrList}>
          Our skeeball shooter consists of two systems: a reliable feeder
          mechanism and a high-speed flywheel that launches skeeballs toward the
          target.
        </p>
        <ul className={styles.descrList}>
          <li>
            The feeder uses a rotating two-plate design to drop balls into the
            shooter on command.
          </li>
          <li>
            The flywheel spins at roughly 4500 RPM, gripping each ball and
            accelerating it down the ramp toward the target.
          </li>
          <li>
            The rubber flywheel conforms slightly to the ball for better grip,
            and the rigid aluminum chassis minimizes vibration.
          </li>
        </ul>

        <div className={styles.techImg}>
          <Image
            src="/technical/robotics2.png"
            alt="Shooter mechanism"
            width={500}
            height={300}
            className={styles.techImage}
          />
        </div>
        <p className={styles.descr}>
          We are currently working on Version 2.5, focused on reducing vibration
          through drivetrain refinements and condensing the overall footprint so
          the shooter integrates smoothly with its new neighbor on deck: the
          robotic arm.
        </p>

        {/* Robotic Arm */}
        <h3 className={styles.techHeading}>Robotic Arm</h3>
        <p className={styles.descrList}>
          Our largest ongoing project is a three-degree-of-freedom robotic arm
          with a rotating base and two joints designed for object manipulation
          on the water. Now in its second prototype, the arm is undergoing
          iterative development across several subsystems, including:
        </p>
        <ul className={styles.descrList}>
          <li>Custom magnetic encoder finalizing</li>
          <li>Belt tensioning and drivetrain optimization</li>
          <li>Waterproofing strategies for the final design</li>
          <li>
            Early closed-loop control testing with our 12 V peripherals suite
          </li>
        </ul>

        <div className={styles.techImg}>
          <Image
            src="/clifford2.png"
            alt="Robotic arm"
            width={500}
            height={200}
            className={styles.techImage}
          />
        </div>
        <h3 className={styles.techHeading}>
          New for 2026: Acoustic Sensing System
        </h3>
        <p className={styles.descr}>
          We are developing a microphone-based detection system to identify
          competition-specific audio cues used for sudden task switching.
          Robotics owns both the hardware side (waterproof microphone selection,
          signal conditioning) and the ROS (robot operating system) interface
          that connects to Software’s Controls subteam. This system is our first
          venture into acoustic sensing and ROS, and we are excited to bring it
          to the 2026 competition!
        </p>
        <h3 className={styles.techHeading}>Our Philosophy</h3>
        <p className={styles.descr}>
          Robotics is built on trial, error, and iteration. We prototype fast,
          test aggressively, and refine based on data. Students interested in
          mechanical design, machining, CAD, hardware testing, and system
          integration will find a perfect home here. Although we collaborate
          with software, Robotics is fundamentally a hardware-driven,
          build-focused subteam.
        </p>
      </div>
    </div>
  );
}
