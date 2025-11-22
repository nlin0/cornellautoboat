import Image from 'next/image';
import styles from '../technical.module.css';
import TechnicalHero from '../TechnicalHero';
import Divider from '../Divider';
import ImageGallery from '../ImageGallery';

export default function ElectricalSystems() {
  return (
    <div className={styles.wrapper}>
      <TechnicalHero title="Electrical Systems" />
      <Divider />
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
          above. The power distribution system also holds a 14.8V to 24V boost
          converter, along with power over ethernet capabilities to facilitate
          the delivery of power and data to our onboard bullet antenna, which is
          connected through Wi-Fi to an onshore computer.
        </p>
        <ImageGallery
          images={[
            { src: '/technical/electrical1.png', alt: 'Power distribution board', width: 600, height: 400 },
            { src: '/technical/electrical2.png', alt: 'Electrical systems diagram', width: 600, height: 400 },
          ]}
        />

        <h3 className={styles.techHeading}>Safety Feature</h3>
        <p className={styles.descr}>
          Another critical power system E-systems is responsible for is our
          killswitch, a needed safety feature for our high-power electronics.
          Our killswitch PCB is a power distribution that takes input from a 20V
          drill battery, and features a two-form 45A/50A switching relay, which
          allows us to kill our thrusters and robotic motors with the press of a
          button. Large power planes are stitched together with vias to
          facilitate the large peak current draw, and keep temperature rises
          low. When the kill button is pressed, the relays are flipped and a
          MOSFET is turned on, allowing current to flow from the drain to the
          source and sending a 5V signal to our microcontroller, letting it know
          that the killswitch was activated. This system also uses a charge pump
          to boost a GPIO output from our microcontroller to 12V, letting us
          have digital-physical kill capabilities.
        </p>

        <div className={styles.techImg}>
          <Image
            src="/technical/electrical3.png"
            alt="electrical3"
            width={600}
            height={400}
            className={styles.techImage}
          />
        </div>

        <p className={styles.descr}>
          Beyond power, E-Systems oversees communication, selecting and
          implementing transceivers and microcontrollers, including an inhouse
          designed microcontroller PCB based around a RP2040 chip. These devices
          facilitate remote control capabilities, and ensure that all of the
          intricate control pathways between the computer and the motors are
          operating smoothly.
        </p>
        <ImageGallery
          images={[
            { src: '/technical/electrical4.png', alt: 'Microcontroller PCB design', width: 800, height: 1000 },
          ]}
        />

        <p className={styles.descr}>
          Looking into the future we are excited to integrate sensors and
          controllers for our advanced capabilities on Robotics, such as the
          robotic arm, and we have already designed a custom power distribution
          system for the robotics components. The electrical team is also
          working on interesting new circuit board designs, such as custom ESCs
          and a Battery Monitoring System.
        </p>

        <div className={styles.techImg}>
          <Image
            src="/technical/electrical5.png"
            alt="electrical5"
            width={600}
            height={400}
            className={styles.techImage}
          />
        </div>
      </div>
    </div>
  );
}
