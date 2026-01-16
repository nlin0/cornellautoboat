import Image from "next/image";
import styles from "../technical.module.css";
import TechnicalHero from "../TechnicalHero";
import Divider from "../Divider";
import ImageGallery from "../ImageGallery";

export default function ElectricalSystems() {
  return (
    <div className={styles.wrapper}>
      <TechnicalHero title="Electrical Systems" subteam="esys" />
      <Divider />
      <div className={styles.techSection}>
        <p className={styles.descr}>
          E-Systems coordinates the flow of information and power between all
          the boat's components, from designing custom PCBs for power
          distribution, critical safety mechanisms and digital communication,
          serving as the vital bridge between hardware and software.
        </p>
        <p className={styles.descr}>
          At the heart of E-Systems lies the power distribution board, which
          routes power at appropriate and precise voltage levels to our boat's
          low-power components including microcontrollers, remote control
          receiver, and high power relay coils. The board takes an input of
          14.8V from our BlueRobotics Lithium-Ion battery, and 12V from a DC-DC
          buck converter. Next, voltage regulators step down the input voltage
          to 5V and 3.3V for the components mentioned above. The high power
          inputs of 14.8V and 12V are distributed across multiple outputs,
          including the Robotic skeeball and watergun, Jetson Nano computer and
          LIDAR. The board also contains a 14.8V to 24V boost converter which
          works by periodically connecting an inductor to a lower input voltage
          which stores energy in its magnetic field and then disconnects it to
          release stored energy to charge an output capacitor to a higher
          voltage. The 24V is then injected over ethernet to facilitate the
          delivery of power and data to our onboard bullet antenna, which is
          connected through Wi-Fi to an onshore computer.
        </p>
        <ImageGallery
          images={[
            {
              src: "/technical/esys_2025_1.png",
              alt: "Power distribution board",
              width: 600,
              height: 400,
            },
            {
              src: "/technical/esys_2025_2.png",
              alt: "Electrical systems diagram",
              width: 600,
              height: 400,
            },
          ]}
        />
        <h3 className={styles.techHeading}>Safety Feature</h3>
        <p className={styles.descr}>
          Another critical power system E-systems is responsible for is our
          killswitch, a critical safety feature for our high-power electronics.
          The PCB contains two 90A 1 Form A switching relays which allow us to
          “kill” or disconnect our thrusters from our 24V LiPo battery and stop
          all robotics components with the press of an emergency button on the
          boat or on the remote controller. Large power planes are stitched
          together with vias to facilitate the large peak current draw, and keep
          temperature rises low. When the kill button is pressed, the relays are
          flipped when a MOSFET is turned on via a charge pump which increases
          the voltage at the gate, allowing current to flow from the drain to
          the source and sending a 3.3V signal to our microcontroller, letting
          it know that the killswitch was activated.
        </p>
        <ImageGallery
          images={[
            {
              src: "/technical/esys_safety1.png",
              alt: "Power distribution board",
              width: 600,
              height: 400,
            },
            {
              src: "/technical/esys_safety2.png",
              alt: "Electrical systems diagram",
              width: 600,
              height: 400,
            },
          ]}
        />
        <p className={styles.descr}>
          Lithium ion batteries are prone to thermal runaway, which is a danger
          to all systems on the boat. For that reason, we are in the process of
          integrating a Battery Management System, which has the potential to
          disconnect via two high power mosfets the 14.8 Li-ion battery when
          charging or discharging in the face of short-circuits, over/under
          voltage, current or temperatures. Additionally the board can passively
          balance voltage levels across the four battery cells and provide us
          with real-time state of charge, health and voltage information via an
          embedded OLED display and RP2040 IC which can read and write register
          values from the BQ40Z50 chip.
        </p>
        <ImageGallery
          images={[
            {
              src: "/technical/esys_battery1.png",
              alt: "Power distribution board",
              width: 600,
              height: 400,
            },
            {
              src: "/technical/esys_battery2.png",
              alt: "Electrical systems diagram",
              width: 600,
              height: 400,
            },
          ]}
        />
        <p className={styles.descr}>
          Beyond power, E-Systems oversees communication, via our custom
          microcontroller PCB based around a RP2040 chip. These devices
          facilitate communication with our remote control, and ensure that
          correct signals are sent to our thrusters, robotics motors and servos,
          SPI devices and relays.
        </p>
        <ImageGallery
          images={[
            {
              src: "/technical/esys_power1.png",
              alt: "Power distribution board",
              width: 600,
              height: 400,
            },
            {
              src: "/technical/esys_power2.png",
              alt: "Electrical systems diagram",
              width: 600,
              height: 400,
            },
          ]}
        />
        
        <p className={styles.descr}>
          Looking into the future we are excited to integrate sensors and
        controllers for our advanced capabilities in Robotics, such as the
        robotic arm, and we have already designed a custom power distribution
        system for the robotics components. The electrical team is also working
        on interesting new circuit board designs, one of which being custom
        Electronic Speed Converters (ESCs) to control our T500 thrusters.
        </p>
        <ImageGallery
          images={[
            {
              src: "/technical/esys_future1.png",
              alt: "Power distribution board",
              width: 600,
              height: 400,
            },
            {
              src: "/technical/esys_future2.png",
              alt: "Electrical systems diagram",
              width: 600,
              height: 400,
            },
          ]}
        />
      </div>
    </div>
  );
}
