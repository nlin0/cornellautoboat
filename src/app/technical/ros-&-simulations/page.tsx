import Image from 'next/image';
import styles from '../technical.module.css';

export default function Rossims() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heroImg}>
        <div className={styles.boatImg}>
          <Image
            src="/clifford2.png"
            alt="Clifford the boat"
            fill // ← key: image fills parent
            priority
            className={styles.boatImage}
          />
        </div>
        <div className={styles.overlay}> </div>
        <div className={styles.titleBlock}>
          <h2 className={styles.technicalTitle}>Ros & Simulations</h2>
        </div>
      </div>
      <div className={styles.dividerWrapper}>
        <img src="/divider5.png" alt="divider" className={styles.divider} />
      </div>
      <div className={styles.techSection}>
        <p className={styles.descr}>
          The ROS (Robot Operating System) and Simulations team uses the ROS
          software libraries and tools to enable communication between the
          Perception, AI, and Controls code. Members spend a lot of time
          thinking about the big picture of our codebase, optimizing its design
          and usability, troubleshooting integration issues, and ensuring the
          rest of the team’s code is compatible. Additionally, this team is
          responsible for creating a simulations framework for the AI and
          controls team to test their code in isolation. ​
        </p>
        <h3 className={styles.techHeading}>Robot Operating System</h3>
        <p className={styles.descr}>
          This year we made a couple major changes to our ROS framework, and we
          also had immense progress on the simulations front. With ROS, we
          upgraded to a Jetson Orin AGX with Ubuntu 22.04 and thus migrated our
          entire system to ROS2. Further, to incorporate the new LiDAR sensor,
          we created a new LiDAR node that handles point cloud data and its
          associated processing algorithms. Below is a schematic of our current
          setup, which is still subject to change.ms. Below is a schematic of
          our current setup, which is still subject to change.
        </p>

        <div className={styles.techImg}>
          <Image
            src="/ROS1.png"
            alt="ROS1"
            width={600}
            height={550}
            className={styles.techImage}
          />
        </div>

        <h3 className={styles.techHeading}>Simulations</h3>
        <p className={styles.descr}>
          With simulations, we created version 1 of our RoboBoat simulation.
          This version is created in Unity and uses a ROS TCP connection node to
          connect our codebase to the Unity client. More specifically, this
          simulation is capable of testing AI path planning, controls pure
          pursuit, or both at the same time.. It includes a generic map of the
          RoboBoat competition course, as well as basic capability for level
          making. Below is an example of path planning code (i.e. follow the
          buoy) running in our simulation.
        </p>

        <div className={styles.techImg}>
          <Image
            src="/ROS2.png"
            alt="ROS2"
            width={600}
            height={500}
            className={styles.techImage}
          />
        </div>

        <p className={styles.descr}>
          This semester, we also developed a 3D LiDAR simulation to generate all
          sorts of LiDAR data for the LiDAR team to iterate their algorithms on.
          We hope that this new project can serve as the basis of an eventual
          full 3D simulation.
        </p>
      </div>
    </div>
  );
}
