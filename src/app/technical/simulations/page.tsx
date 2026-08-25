import Image from "next/image";
import styles from "../technical.module.css";
import TechnicalHero from "../TechnicalHero";
import Divider from "../Divider";

export default function RosAndSimulations() {
  return (
    <div className={styles.wrapper}>
      <TechnicalHero title="Simulations" subteam="simulations" />
      <Divider />
      <div className={styles.techSection}>
        <p className={styles.descr}>
          The ROS (Robot Operating System) and Simulations team uses the ROS
          software libraries and tools to enable communication between the
          Perception, AI, and Controls code. Members spend a lot of time
          thinking about the big picture of our codebase, optimizing its design
          and usability, troubleshooting integration issues, and ensuring the
          rest of the team’s code is compatible. Additionally, this team is
          responsible for creating a simulations framework for the AI and
          controls team to test their code in isolation.
        </p>
        <h3 className={styles.techHeading}>Synthetic Image Data</h3>

        <p className={styles.descr}>
          We use cameras to identify obstacles in the water. However, our
          location limits our ability to test our vision models throughout the
          year, so we need another way to gather realistic data.
        </p>

        <ul className={styles.descrList}>
          <li>
            Use Blender's Python bindings to create scripts that generate
            realistic scenes on which to train our YOLO model
          </li>
          <li>
            Use Blender to hand-create 3D models of the buoys, docks, color
            indicators, and boats
          </li>
          <li>Create realistic scenes and water in Blender</li>
          <li>
            <strong>Technologies:</strong> Python, Blender, YOLO
          </li>
        </ul>

        <p className={styles.descr}>
          <strong>Next steps:</strong> The Sim-to-Real gap is a major open
          question in robotics research. We hope to leverage new research in
          this field to apply it to the maritime domain, which remains mostly
          unexplored.
        </p>
        <h3 className={styles.techHeading}>Reinforcement Learning Sim</h3>

        <p className={styles.descr}>
          As part of our efforts to improve our boat's pathfinding abilities, we
          are implementing Reinforcement Learning to control the boat's
          decision-making to complete each task.
        </p>

        <ul className={styles.descrList}>
          <li>
            Create simulated environments to represent the different tasks we
            perform at competition
          </li>
          <li>Accurately and cheaply model obstacle collision</li>
          <li>Implement stochastic model for perception data</li>
          <li>
            <strong>Technologies:</strong> Python, NumPy, Shapely, MatPlot,
            Pytorch
          </li>
        </ul>
        <h3 className={styles.techHeading}>3D Simulation</h3>

        <p className={styles.descr}>
          Currently, we use a Unity-based 3D simulation for testing our boat.
          However, the buoyancy physics for the model are relatively simplistic.
        </p>

        <ul className={styles.descrList}>
          <li>
            Implement the Fossen 6-DOF Marine Craft model for accurately
            representing boat buoyancy physics
          </li>
          <li>
            Improve physical modeling of the Racquetball Launcher and Water Gun
            to better match their real-life counterparts
          </li>
          <li>
            <strong>Technologies:</strong> Linear Algebra, Physics, Unity, C#
          </li>
        </ul>
      </div>
    </div>
  );
}
