import Image from "next/image";
import styles from "../technical.module.css";

export default function RosAndSimulations() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heroImg}>

        <div className={styles.boatImg}>
          <Image
            src="/clifford2.png"
            alt="Clifford the boat"
            fill               // ← key: image fills parent
            priority
            className={styles.boatImage}
          />
        </div>
        <div className={styles.overlay}> </div>
        <div className={styles.titleBlock}>
          <h2 className={styles.technicalTitle}>Ros & Simulations</h2>
        </div>


      </div>

      <div className={styles.techSection}>


        <h3 className={styles.techHeading}>Robot Operating System</h3>
        <p className={styles.descr}>
          This year we made a couple major changes to our ROS framework, and
          we also had immense progress on the simulations front. With ROS, we
          upgraded to a Jetson Orin AGX with Ubuntu 22.04 and thus migrated
          our entire system to ROS2. Further, to incorporate the new LiDAR
          sensor, we created a new LiDAR node that handles point cloud data
          and its associated processing algorithms. Below is a schematic of
          our current setup, which is still subject to change.
        </p>

        <div className={styles.techImg}>
          <Image
            src="/clifford2.png"
            alt="Clifford the boat"
            width={600}
            height={400}
            className={styles.techImage}
          />
        </div>

        <h3 className={styles.techHeading}>Simulations</h3>
        <p className={styles.descr}>
          With simulations, we created version 1 of our RoboBoat simulation.
          This version is created in Unity and uses a ROS TCP connection node
          to connect our codebase to the Unity client. More specifically, this
          simulation mocks perception and controls code so that the AI team
          can test path planning code in isolation. It includes a generic map
          of the RoboBoat competition course, as well as basic capability
          for level making. Below is an example of path planning code (i.e.
          follow the buoy) running in our simulation.
        </p>

        <div className={styles.techImg}>
          <Image
            src="/clifford2.png"
            alt="Clifford the boat"
            width={600}
            height={400}
            className={styles.techImage}
          />
        </div>

        <p className={styles.descr}>
          In the future, the ROS & Simulations team hopes to flesh out and
          refine the codebase to be cross-compatible with both ROS and ROS2.
          We also anticipate building upon the simulations, perhaps
          incorporating 3D rendering, so LIDAR-based navigation can be
          tested as well.
        </p>
      </div>
    </div>
  );
}
