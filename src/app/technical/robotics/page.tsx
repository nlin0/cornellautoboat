import Image from "next/image";
import styles from "../technical.module.css";

export default function Mechanical() {
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
          <h2 className={styles.technicalTitle}>Robotics</h2>
        </div>
      </div>

      <div className={styles.techSection}>
        <p className={`${styles.descr} mt-0`}>
          The Robotics subteam gives our boat all of its advanced capabilities,
          creating all the mechanical systems that enable it to move & interact
          with its environment. The roboboat competition currently has three
          robotics-focused tasks: shooting water at a target, shooting skeeballs
          at a target, and picking up objects out of the water and moving them
          to different areas.
        </p>

        <div className={styles.horizontalContainer}>
          <div className={styles.leftContainer}>
            <p className={styles.descr}>
              The feeder mechanism sits on top and drops skeeballs into the
              launcher when we are ready to shoot. It has two plates, one with
              three skeeball slots and one with a singular slot. When the shoot
              command is sent, the top plate rotates, pushing a skeeball into
              the hole in the bottom plate, and subsequently into the launcher.
            </p>
          </div>

          <div className={styles.rightContainer}>
            <Image
              src="/clifford2.png"
              alt="Clifford the boat"
              width={500}
              height={200}
              className={styles.conImage}
            />
          </div>
        </div>

        <div className={styles.horizontalContainer}>
          <div className={styles.leftContainer}>
            <Image
              src="/clifford2.png"
              alt="Clifford the boat"
              width={500}
              height={200}
              className={styles.conImage}
            />
          </div>

          <div className={styles.rightContainer}>
            <p className={styles.descr}>
              The launching mechanism itself is a rubber flywheel that is
              rotated at roughly 4500 RPM by a DC motor mounted to the side of
              the structure. As the ball comes down the ramp, it is sped up
              dramatically by the flywheel and launched toward the target.
              Since the flywheel is rubber, it conforms to the shape of the
              ball, giving it more grip as it launches. The chassis of the
              launcher is made from machined aluminum to make it as rigid as
              possible, counteracting all of the vibrations coming from the motor.
            </p>
          </div>
        </div>

        <p className={styles.descr}>
          The team is also currently developing a robotic arm with three degrees
          of freedom—two joints and a rotating base—designed to manipulate
          objects in and around the lake. This project is currently in its
          second prototype, with final completion scheduled for March 2026.
        </p>


        <div className={styles.horizontalContainer}>
          <div className={styles.leftContainer}>
            <p className={styles.descr}>
              In the fall semester, the team integrated and tested a new
              holonomic propulsion system, which allows the boat to travel
              in all directions without turning. This was accomplished by
              mounting 4 motors to the bottom of the boat at 30 degree angles
              with respect to the centerline.
            </p>
          </div>

          <div className={styles.rightContainer}>
            <Image
              src="/clifford2.png"
              alt="Clifford the boat"
              width={500}
              height={200}
              className={styles.conImage}
            />
          </div>
        </div>

        <p className={styles.descr}>
          Controller inputs were then mapped to each motor using a simple
          system of linear equations, allowing us to control forward, lateral,
          and rotational movement independently.
        </p>

        <div className={styles.techImg}>
          <Image
            src="/clifford2.png"
            alt="Clifford the boat"
            width={500}
            height={200}
            className={styles.techImage}
          />
        </div>

        <p className={styles.descr}>
          UNFINISHED... want to change the style of what is displayed on og site
        </p>


      </div>
    </div>
  );
}
