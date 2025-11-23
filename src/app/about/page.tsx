import Image from 'next/image';
import styles from './about.module.css';

export default function About() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.aboutIntro}>
        <h2 className={styles.aboutTitle}>
          Team History
        </h2>
        <p className={styles.aboutSubtitle}>
          Continuing to make history
        </p>
        </div>
      <div className={styles.dividerWrapper}>
        <img src="/dividers/divider1.svg" alt="" className={styles.divider} />
      </div>
      {/* --- TIMELINE SECTIONS --- */}
      <div className={styles.timelineContainer}>
        {/* SECTION 1 */}
        <div className={styles.timelineSection}>
          <div className={styles.textBlock}>
            <div className={styles.year}>FALL 2021</div>
            <h2 className={styles.title}>AutoBoat Was Founded</h2>
            <p className={styles.subtitle}>
              The team previously competed in NASA’s Micro-G competition which
              had a mechanical focus. In 2021 the team pivoted to a more
              software-heavy competition, RoboBoat.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/about/about1.png"
              alt="fall2021"
              width={400}
              height={300}
              className={styles.timelineImage}
            />
          </div>
        </div>
      </div>

      <div className={styles.dividerWrapper}>
        <img src="/dividers/divider2.png" alt="" className={styles.divider} />
        </div>

      {/* SECTION 2 */}
      <div className={styles.timelineContainer2}>
        <div className={`${styles.timelineSection} ${styles.reverse}`}>
          <div className={styles.textBlock2}>
            <div className={styles.year2}>FALL 2022</div>
            <h2 className={styles.title}>The First Boat Prototype</h2>
            <p className={styles.subtitle}>
              We built the first prototype of our boat, transitioning from a
              catamaran to a more stable trimaran design. While the mechanical
              team led this shift, the software team focused on developing path
              planning algorithms and a computer vision model. We also began
              integrating ROS into our system.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/about/about2.png"
              alt="fall2022"
              width={500}
              height={500}
              className={styles.timelineImage}
            />
          </div>
        </div>
      </div>

      <div className={styles.dividerWrapper}>
        <img src="/dividers/divider1.svg" alt="" className={styles.divider} />
        </div>

        {/* SECTION 3 */}
      <div className={styles.timelineContainer}>
        <div className={styles.timelineSection}>
          <div className={styles.textBlock}>
            <div className={styles.year}>SPRING 2023</div>
            <h2 className={styles.title}>George</h2>
            <p className={styles.subtitle}>
              Our first competition boat, George, was built. Our CV model was
              completed, and the code for the navigational tasks was finished.
              We competed in-person at RoboBoat for the first time, and
              qualified for finals. We learned so much from the competition and
              came back with many ideas to improve the team moving forward.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/about/about3.png"
              alt="spring2023"
              width={400}
              height={300}
              className={styles.timelineImage}
            />
          </div>
        </div>
      </div>

      <div className={styles.dividerWrapper}>
        <img src="/dividers/divider2.png" alt="" className={styles.divider} />
        </div>

      {/* SECTION 4 */}
      <div className={styles.timelineContainer2}>
        <div className={`${styles.timelineSection} ${styles.reverse}`}>
          <div className={styles.textBlock2}>
            <div className={styles.year2}>FALL 2023 - SPRING 2024</div>
            <h2 className={styles.title}>Clifford</h2>
            <p className={styles.subtitle}>
              RoboBoat 2024 would take place nearly two months earlier than
              expected. Despite this, we still decided to build an entirely new
              boat, Clifford, which was fully designed and manufactured in just
              one semester. Clifford is stronger, faster, and more stable than
              George, providing the team with a more reliable hardware platform
              to build upon in the future. The software team revamped the
              codebase, integrated a compass and GPS, and improved the vision
              models. Additionally, the Ground Station project and virtual
              simulations were developed. At competition, we qualified for
              finals again, and we won a design documentation award for our
              website.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/about/about4.png"
              alt="fall2023"
              width={400}
              height={300}
              className={styles.timelineImage}
            />
          </div>
        </div>
      </div>

      {/* FULL-WIDTH DIVIDER */}
      <div className={styles.dividerWrapper}>
        <img src="/dividers/divider1.svg" alt="" className={styles.divider} />
        </div>

        {/* SECTION 5 */}
      <div className={styles.timelineContainer}>
        <div className={styles.timelineSection}>
          <div className={styles.textBlock}>
            <div className={styles.year}>SPRING 2025</div>
            <h2 className={styles.title}>International Champions</h2>
            <p className={styles.subtitle}>
              We earned the international fifth place title.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/clifford2.png"
              alt="spring2025"
              width={400}
              height={300}
              className={styles.timelineImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}