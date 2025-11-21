import Image from 'next/image';
import styles from '../technical.module.css';

export default function ArtificialIntelligence() {
  return (
    <div className={styles.wrapper}>
      {/* HERO IMAGE SECTION */}
      <div className={styles.heroImg}>
        <div className={styles.boatImg}>
          <Image
            src="/clifford2.png"
            alt="Clifford the boat"
            fill
            priority
            className={styles.boatImage}
          />
        </div>
        <div className={styles.overlay}></div>
        <div className={styles.titleBlock}>
          <h2 className={styles.technicalTitle}>Artificial Intelligence</h2>
        </div>
      </div>
      <div className={styles.dividerWrapper}>
        <img src="/divider5.png" alt="divider" className={styles.divider} />
      </div>
      {/* TECH CONTENT SECTION */}
      <div className={styles.techSection}>
        <p className={styles.descr} style={{ marginBottom: '20px' }}>
          The AI team writes the code for the autonomous decision making
          abilities of the boat. Their responsibilities include researching,
          developing, and testing algorithms for motion planning while
          brainstorming efficient strategies to tackle the competition tasks and
          transitions between tasks. This group works the most closely with our
          codebase, continuously improving it each year by focusing on great
          code quality, efficiency, and test coverage ​
        </p>
        <p className={styles.descr} style={{ marginBottom: '20px' }}>
          The job of the AI team can be seen from an input/output perspective:
          the AI node receives input from the sensors regarding where the boat
          is and what it sees, and outputs a path of waypoints. Waypoints can be
          thought of as GPS coordinates the boat should follow to accomplish the
          task at hand. Waypoints are selected with specialized task-specific
          algorithms.
        </p>

        <div className={styles.techImg}>
          <Image
            src="/AI1.png"
            alt="AI path planning visualization"
            width={600}
            height={500}
            className={styles.techImage}
          />
        </div>
        <p className={styles.descr} style={{ marginBottom: '20px' }}>
          A large part of the AI team’s work is testing their code. This
          includes unit testing our math-heavy functions, generating
          visualizations of static path planning examples, running the code in
          simulation frameworks, and observing the behavior of the boat during
          water testing.
        </p>

        <div className={styles.techImg}>
          <Image
            src="/AI1.png"
            alt="AI path planning visualization"
            width={600}
            height={300}
            className={styles.techImage}
          />
        </div>

        <p className={styles.descr}>
          Future goals of the AI team include improving our collision detection
          and avoidance techniques and incorporating more advanced path planning
          algorithms across all tasks.
        </p>
      </div>
    </div>
  );
}
