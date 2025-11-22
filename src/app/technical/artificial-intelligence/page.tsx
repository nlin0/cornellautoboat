import Image from 'next/image';
import styles from '../technical.module.css';

export default function ArtificialIntelligence() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heroImg}>
        <div className={styles.boatImg}>
          <Image
            src="/clifford2.png"
            alt="Cornell AutoBoat team boat"
            fill
            priority
            className={styles.boatImage}
          />
        </div>
        <div className={styles.overlay} aria-hidden="true" />
        <div className={styles.titleBlock}>
          <h2 className={styles.technicalTitle}>Artificial Intelligence</h2>
        </div>
      </div>

      <div className={styles.techSection}>
        <p className={styles.descr}>
          The AI team writes all the code behind the autonomous decision making
          abilities of the boat. Their responsibilities include researching,
          developing, and testing algorithms for motion planning while
          brainstorming efficient strategies to tackle the competition tasks and
          transitions between tasks. This group works the most closely with our
          codebase, continuously improving it each year by focusing on great
          code quality, efficiency, and test coverage.
        </p>
        <p className={styles.descr}>
          The job of the AI team can be seen from an input/output perspective:
          the code receives input from the sensors regarding where the boat is
          and what it sees, and outputs a path of waypoints. Waypoints can be
          thought of as GPS coordinates the boat should follow to accomplish the
          task at hand. Waypoints are selected with the A* algorithm or
          specialized task-specific algorithms. After selecting the main
          path-defining waypoints, we apply algorithms to inject waypoints every
          meter and smooth the resulting path to eliminate any harsh angles.
        </p>

        <div className={styles.techImg}>
          <Image
            src="/clifford2.png"
            alt="Artificial intelligence path planning visualization"
            width={500}
            height={200}
            className={styles.techImage}
          />
        </div>
        <p className={styles.descr}>
          A large part of the AI team’s work is testing their code. This
          includes unit testing our math-heavy functions, generating
          visualizations of static path planning examples, running the code in
          simulation frameworks, and observing the behavior of the boat during
          water testing.
        </p>
        <div className={styles.techImg}>
          <Image
            src="/clifford2.png"
            alt="Artificial intelligence path planning visualization"
            width={500}
            height={200}
            className={styles.techImage}
          />
        </div>
        <p className={styles.descr}>
          Future goals of the AI team include improving our collision detection
          and avoidance techniques and incorporating more advanced path planning
          algorithms across all tasks.
        </p>

        <p>UNFINISHED... waiting for updates</p>
      </div>
    </div>
  );
}
