import Image from 'next/image';
import styles from '../technical.module.css';
import TechnicalHero from '../TechnicalHero';
import Divider from '../Divider';

export default function ArtificialIntelligence() {
  return (
    <div className={styles.wrapper}>
        <TechnicalHero title="Artificial Intelligence" subteam="autonomy" />
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

        <h3 className={styles.techHeading}>Water Gun + Racquetball</h3>
<p className={styles.descr}>
  The boat is equipped with a water gun and a Racquetball shooter, which are
  used to shoot stationary targets during certain tasks. We use our sensor
  suite to locate the targets, and then maneuver the boat to aim and fire.
</p>

<ul className={styles.descr}>
  <li>
    Calculate projectile trajectories while accounting for the movement of
    the boat.
  </li>
  <li>
    Make the system robust to real-life hardware variability.
  </li>
  <li>
    <strong>Technologies:</strong> LIDAR, Python, Control Theory, Physics
  </li>
</ul>

<p className={styles.descr}>
  <strong>Next steps:</strong> We plan on implementing more complex motion
  planning algorithms for determining the trajectory of the payload.
</p>
<h3 className={styles.techHeading}>Water Gun + Racquetball</h3>
<p className={styles.descr}>
  The boat is equipped with a water gun and a Racquetball shooter, which are
  used to shoot stationary targets during certain tasks. We use our sensor
  suite to locate the targets, and then maneuver the boat to aim and fire.
</p>

<ul className={styles.descrList}>
  <li>
    Calculating trajectory of the projectiles considering the movement of the
    boat
  </li>
  <li>
    Making the system robust to real-life hardware variability
  </li>
  <li>
    <strong>Technologies:</strong> LIDAR, Python, Control Theory, Physics
  </li>
</ul>

<p className={styles.descr}>
  <strong>Next steps:</strong> We plan on implementing more complex motion
  planning algorithms for determining the trajectory of the payload.
</p>

<h3 className={styles.techHeading}>Holonomic Controls</h3>
<p className={styles.descr}>
  Traditionally, our boat uses two parallel thrusters, which limits our
  movement to two degrees of freedom. We plan on implementing two additional
  thrusters oriented diagonal to the centerline, which provides for a third
  degree of freedom, lateral movement.
</p>

<ul className={styles.descrList}>
  <li>
    Defining closed-form equations for thrust allocation mapping to intended
    movement
  </li>
  <li>
    Testing and simulating hydrodynamic constants of the boat in motion
  </li>
  <li>
    <strong>Technologies:</strong> Python, C++, Raspberry Pi, Control Theory
  </li>
</ul>

<p className={styles.descr}>
  <strong>Next steps:</strong> The addition of holonomic controls allows us to
  use a much wider range of pathing options. An open challenge that we
  currently face is creating algorithms which take advantage of holonomic
  motion, and integrating it with the rest of our boat's decision-making.
  Furthermore, efforts must be made to correctly evaluate and simulate
  holonomic motion.
</p>

<h3 className={styles.techHeading}>Pathfinding</h3>
<p className={styles.descr}>
  Based on the objects detected by our sensors, the boat calculates a path (a
  series of waypoints) using various algorithms specific to each task.
</p>

<ul className={styles.descrList}>
  <li>Identifying tasks and moving between them</li>
  <li>On-the-fly scoring decision-making</li>
  <li>
    <strong>Technologies:</strong> Python
  </li>
</ul>

<p className={styles.descr}>
  <strong>Next steps:</strong> Currently, we only have a static understanding
  of obstacles. We plan on using A* to dynamically avoid obstacles in the
  planned path. We also plan on investigating reinforcement learning to
  replace our handwritten pathfinding algorithms.
</p>
      </div>
    </div>
  );
}
