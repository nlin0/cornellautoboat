import Image from 'next/image';
import styles from '../technical.module.css';
import TechnicalHero from '../TechnicalHero';
import Divider from '../Divider';

export default function ArtificialIntelligence() {
  return (
    <div className={styles.wrapper}>
        <TechnicalHero title="Artificial Intelligence" subteam="AI" />
      <Divider />
      <div className={styles.techSection}>
        <p className={`${styles.descr} ${styles.descrWithMargin}`}>
          The AI team writes the code for the autonomous decision making
          abilities of the boat. Their responsibilities include researching,
          developing, and testing algorithms for motion planning while
          brainstorming efficient strategies to tackle the competition tasks and
          transitions between tasks. This group works the most closely with our
          codebase, continuously improving it each year by focusing on great
          code quality, efficiency, and test coverage.
        </p>
        <p className={`${styles.descr} ${styles.descrWithMargin}`}>
          The job of the AI team can be seen from an input/output perspective:
          the AI node receives input from the sensors regarding where the boat
          is and what it sees, and outputs a path of waypoints. Waypoints can be
          thought of as GPS coordinates the boat should follow to accomplish the
          task at hand. Waypoints are selected with specialized task-specific
          algorithms.
        </p>

        <div className={styles.techImg}>
          <Image
            src="/technical/AI1.png"
            alt="AI path planning visualization"
            width={600}
            height={500}
            className={styles.techImage}
          />
        </div>
        <p className={`${styles.descr} ${styles.descrWithMargin}`}>
          A large part of the AI team’s work is testing their code. This
          includes unit testing our math-heavy functions, generating
          visualizations of static path planning examples, running the code in
          simulation frameworks, and observing the behavior of the boat during
          water testing.
        </p>

        <video
          src="/technical/AI-VID.mov"
          className={styles.techVideo}
          controls
          loop
          muted
          playsInline
        />

        <p className={styles.descr}>
          Future goals of the AI team include improving our collision detection
          and avoidance techniques and incorporating more advanced path planning
          algorithms across all tasks.
        </p>
      </div>
    </div>
  );
}
