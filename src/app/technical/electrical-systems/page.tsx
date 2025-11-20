import Image from 'next/image';
import styles from '../technical.module.css';

export default function ElectricalSys() {
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
          <h2 className={styles.technicalTitle}>Electrical Systems</h2>
        </div>
        <div className={styles.dividerWrapper}>
          <img src="/divider5.png" alt="divider" className={styles.divider} />
        </div>
      </div>

      <div className={styles.techSection}>
        <p className={styles.descr}>
          E-Systems coordinate the flow of information and power between all the
          boat's components, by developing custom PCBs and implementing
          electrical infrastructure, serving as the vital bridge between
          hardware and software.
        </p>

        <p className={styles.descr}>
          At the heart of E-Systems lies the power distribution board, which
          routes power at appropriate and precise voltage levels to our boat's
          low-power components including microcontrollers, our kill switch
          relay, and our transceiver. The board takes an input of 14.8V from our
          BlueRobotics Lithium-Ion battery, which is then routed through an
          input protection IC, ensuring that our sensitive components are not
          exposed to overvoltage or a surge of current. Next, voltage regulators
          step down the input voltage to 12V and 5V for the components mentioned
          above
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
          Another critical power system E-systems is responsible for is our
          killswitch, a needed safety feature for our high-power electronics.
          Our killswitch PCB features a two-form 45A/50A switching relay, which
          allows us to kill our thrusters and robotic motors with the press of a
          button. Additionally, when the kill button is pressed, a MOSFET is
          turned on, allowing current to flow from the drain to the source and
          sending a 5V signal to our Arduino microcontroller, letting it know
          that the killswitch was activated.
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
          Beyond power, E-Systems oversees communication, selecting and
          implementing transceivers and microcontrollers. These devices
          facilitate remote control capabilities, and ensure that all of the
          intricate control pathways between the computer and the motors are
          operating smoothly.
        </p>

        <p className={styles.descr}>
          E-Systems is also responsible for facilitating WiFi communication with
          our on-shore control system. Our custom power over ethernet PCB gives
          our mounted bullet antenna power, and transfers data to our main
          on-board computer.
        </p>

        <p className={styles.descr}>
          Looking into the future we are excited to integrate sensors and
          controllers for our advanced capabilities on Robotics, such as the
          robotic arm. The electrical team is also working on interesting new
          circuit board designs, such as custom ESCs and boost converters.
        </p>
      </div>
    </div>
  );
}
