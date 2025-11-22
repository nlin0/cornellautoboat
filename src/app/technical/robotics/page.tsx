import Image from 'next/image';
import styles from '../technical.module.css';
import TechnicalHero from '../TechnicalHero';
import Divider from '../Divider';

export default function Robotics() {
  return (
    <div className={styles.wrapper}>
      <TechnicalHero title="Robotics" />
      <Divider />
      <div className={styles.techSection}>
        <p className={styles.descr}>
          The Robotics subteam gives our boat all of its advanced capabilities,
          creating all the mechanical systems that enable it to move & interact
          with its environment. The roboboat competition currently has three
          robotics-focused tasks: shooting water at a target, shooting skeeballs
          at a target, and picking up objects out of the water and moving them
          to different areas.
        </p>

        <div className={styles.sectionContent}>
          <div className={styles.container}>
            <div className={styles.descrBlock}>
              <p className={styles.descr}>
                The water shooter, now in its second iteration, was the first
                project that our robotics team finalized for competition. A
                self-priming pump sits on the boat deck and pulls water up
                through the left stabilizer hull, propelling it up to 20 feet
                forward. A servo encased in a compact waterproof enclosure
                allows the stream angle to be adjusted automatically, giving us
                more control and precision when attempting to complete the task
                autonomously.
              </p>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.techImg}>
              <Image
                src="/clifford2.png"
                alt="Feeder mechanism"
                width={500}
                height={300}
                className={styles.techImage}
              />
            </div>
          </div>
        </div>
        <div className={styles.sectionContent}>
          <div className={styles.container}>
            <div className={styles.techImg}>
              <Image
                src="/clifford2.png"
                alt="Feeder mechanism"
                width={500}
                height={300}
                className={styles.techImage}
              />
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.descrBlock}>
              <p className={styles.descr}>
                In addition to the water shooter, the first iteration of our
                skeeball launcher is reaching completion. The launcher has two
                parts: a feeder mechanism and the launching mechanism.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.sectionContent}>
          <div className={styles.container}>
            <div className={styles.descrBlock}>
              <p className={styles.descr}>
                The feeder mechanism sits on top and drops skeeballs into the
                launcher when we are ready to shoot. It has two plates, one with
                three skeeball slots and one with a singular slot. When the
                shoot command is sent, the top plate rotates, pushing a skeeball
                into the hole in the bottom plate, and subsequently into the
                launcher.
              </p>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.techImg}>
              <Image
                src="/clifford2.png"
                alt="Feeder mechanism"
                width={500}
                height={300}
                className={styles.techImage}
              />
            </div>
          </div>
        </div>
        <div className={styles.sectionContent}>
          <div className={styles.container}>
            <div className={styles.techImg}>
              <Image
                src="/clifford2.png"
                alt="Feeder mechanism"
                width={500}
                height={300}
                className={styles.techImage}
              />
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.descrBlock}>
              <p className={styles.descr}>
                The launching mechanism itself is a rubber flywheel that is
                rotated at roughly 4500 RPM by a DC motor mounted to the side of
                the structure. As the ball comes down the ramp, it is sped up
                dramatically by the flywheel and launched toward the target.
                Since the flywheel is rubber, it conforms to the shape of the
                ball, giving it more grip as it launches. The chassis of the
                launcher is made from machined aluminum to make it as rigid as
                possible, counteracting all of the vibrations coming from the
                motor.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.sectionContent}>
          <div className={styles.container}>
            <div className={styles.descrBlock}>
              <p className={styles.descr}>
                The feeder mechanism sits on top and drops skeeballs into the
                launcher when we are ready to shoot. It has two plates, one with
                three skeeball slots and one with a singular slot. When the
                shoot command is sent, the top plate rotates, pushing a skeeball
                into the hole in the bottom plate, and subsequently into the
                launcher.
              </p>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.techImg}>
              <Image
                src="/clifford2.png"
                alt="Feeder mechanism"
                width={500}
                height={300}
                className={styles.techImage}
              />
            </div>
          </div>
        </div>

        <p className={styles.descr}>
          The team is also currently developing a robotic arm with three degrees
          of freedom—two joints and a rotating base—designed to manipulate
          objects in and around the lake. This project is currently in its
          second prototype, with final completion scheduled for March 2026.
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
        <div className={styles.sectionContent}>
          <div className={styles.container}>
            <div className={styles.techImg}>
              <Image
                src="/clifford2.png"
                alt="Feeder mechanism"
                width={500}
                height={300}
                className={styles.techImage}
              />
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.descrBlock}>
              <p className={styles.descr}>
                In the fall semester, the team integrated and tested a new
                holonomic propulsion system, which allows the boat to travel in
                all directions without turning. This was accomplished by
                mounting 4 motors to the bottom of the boat at 30 degree angles
                with respect to the centerline.
              </p>
            </div>
          </div>
        </div>

        <p className={styles.descr}>
          Controller inputs were then mapped to each motor using a simple system
          of linear equations, allowing us to control forward, lateral, and
          rotational movement independently.
        </p>
        <div className={styles.techImg}>
          <Image
            src="/clifford2.png"
            alt="Feeder mechanism"
            width={500}
            height={300}
            className={styles.techImage}
          />
        </div>
        <p className={styles.descr}>
          This holonomic propulsion system makes it much easier for the boat to
          stay in one place in the water, counteracting currents or wind without
          needing to turn around. This makes it easier to complete the
          robotics-focused tasks (shooting at targets and picking objects up) as
          the boat needs to be steady to be as accurate as possible.
        </p>
        <p className={styles.descr} style={{ marginTop: "20px" }}>
          Here is a video from our holonomic propulsion testing session:
        </p>

        <div className={styles.techImg}>
          <Image
            src="/clifford2.png"
            alt="Feeder mechanism"
            width={500}
            height={300}
            className={styles.techImage}
          />
        </div>
      </div>
    </div>
  );
}
