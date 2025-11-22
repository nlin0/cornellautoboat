import Image from 'next/image';
import styles from '../technical.module.css';

export default function ControlsAndMicrocontrollerDesigns() {
  return (
    <div className={styles.wrapper}>
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
        <div className={styles.overlay}> </div>
        <div className={styles.titleBlock}>
          <h2 className={styles.technicalTitle}>
            Controls & Microcontroller Design
          </h2>
        </div>
      </div>

      <div className={styles.techSection}>
        <p className={styles.descr}>
          The Controls & Microcontrollers team is responsible for all the
          software involved in moving the boat’s motors based on a desired
          movement. This is split into two pieces: control algorithms and
          microcontroller design. In addition, the team works on the sensors
          that feed data into the algorithms used.
        </p>
        <h3 className={styles.techHeading}>Sensors</h3>
        <p className={styles.descr}>
          The team currently uses a VN-300 INS sensor to obtain positional and
          heading data. Given the narrow paths the boat must pass through,
          obtaining reliable, accurate positional data is key. Out of the box
          GPS systems are typically not accurate enough for this use case, so
          the team is experimenting with methods such as RTK positioning and
          Kalman filtering.
        </p>
        <h3 className={styles.techHeading}>Controls</h3>
        <p className={styles.descr}>
          The group designs, implements, and tunes our own control algorithms to
          determine what signals need to be sent to the motors to follow the
          path outlined by AI. We use a combination of pure pursuit and PID.
          Pure pursuit is a path tracking algorithm which maintains a
          “lookahead” point on the path some set distance away from the boat. As
          the boat moves, the point advances along the path, so the boat is
          always chasing it. This results in a more natural, smooth path of
          movement.
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
          Pure pursuit typically outputs the linear and angular velocity the
          vehicle should move at in order to head towards the lookahead point.
          However, we found that controlling on velocity produces rough and
          shaky movements due to the sensitivity of our IMU, a sensor which
          produces velocity readings. This year we decided to transition to
          using heading as the variable we monitor. The algorithm calculates the
          error in heading as the difference between the boat’s current heading
          and its heading if it were pointed directly at the lookahead point. We
          then apply PID control to reduce this error. PID (proportional,
          integrative, derivative) control is a tunable equation which takes an
          error as input, multiplies the error, integral of error, and
          derivative of error by some constants, and outputs the offset which is
          then converted into PWM signals sent to move the thrusters.
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
          When new features eventually get introduced onto the boat, such as a
          robotic arm, the controls group will experiment with more complex
          control mechanisms.
        </p>
        <h3 className={styles.techHeading}>Microcontrollers</h3>
        <p className={styles.descr}>
          This group also writes our microcontroller firmware. This code
          facilitates communication between the remote controller, the main
          onboard computer, and the motors by translating commands to PWM
          signals that are sent directly to the motors. With each new capability
          added to the boat, such as the skeeball shooter and water gun, new
          features are coded onto the microcontrollers. Currently, we use an
          RP2040-based custom microcontroller for receiving signals from the
          remote controller and writing signals to motors.
        </p>
        <p>UNFINISHED... waiting for updates</p>
      </div>
    </div>
  );
}
