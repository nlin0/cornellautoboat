import Image from 'next/image';
import styles from '../technical.module.css';
import TechnicalHero from '../TechnicalHero';
import Divider from '../Divider';

export default function Perception() {
  return (
    <div className={styles.wrapper}>
      <TechnicalHero title="Perception" />
      <Divider />
      <div className={styles.techSection}>
        <p className={styles.descr}>
          The Perception team is responsible for classifying objects detected by
          our LIDAR system.
        </p>

        <h3 className={styles.techHeading}>Computer Vision</h3>
        <p className={styles.descr}>
          This year, our perception pipeline underwent a major architectural
          shift by integrating Light Detection and Ranging (LIDAR) as a primary
          detection modality alongside our existing computer vision (CV) stack.
          Instead of relying exclusively on You Only Look Once (YOLO) neural
          networks for both detection and classification, as we have done in
          previous years, we now decouple these tasks across two specialized
          subsystems: LIDAR handles object detection and localization. At the
          same time, our CV models are used solely for classifying pre-detected
          regions of interest.
        </p>
        <div className={styles.techImg}>
          <Image
            src="/technical/perception1.png"
            alt="perception1"
            width={500}
            height={200}
            className={styles.techImage}
          />
        </div>
        <p className={styles.descr}>
          Our CV model combines 3 separate models: buoy classification, sign
          classification, and beacon classification. For the buoy classification
          model (YOLOv8 neural network), our data comprises images that we have
          gotten from previous competitions and current testing videos that we
          have recorded through our Zed 2i camera. For the sign classification
          model (YOLOv8 neural network), we do have the black triangle, cross,
          and circle image data from the last competition, but we used a public
          TMNIST dataset for images of black font 1, 2, and 3s on a white
          background, analogous to the numerical signs that we will see. For
          classifying the beacons by color, we use OpenCV to get the average
          color inside the passed ‘bounding box’ and sequentially classify it as
          red or green.
        </p>

        <h3 className={styles.techHeading}>Lidar</h3>
        <p className={styles.descr}>
          We expand our ROS infrastructure to support the multi-model system: we
          start with the main_perception node, which is the central orchestrator
          of the perception pipeline via launching and managing all
          perception-related nodes. Requests are routed between LiDAR, the
          classifiers’ specific nodes, and the buffer service. Using
          synchronized timestamps across all sensor inputs, when LiDAR detects
          an object, it will request a ‘service’ from the appropriate
          classifier’s node to give back a classification. Synchronized
          timestamps enable LiDAR and CV to communicate while referencing the
          same frame.
        </p>
        <div className={styles.techImg}>
          <Image
            src="/technical/perception2.png"
            alt="perception2"
            width={500}
            height={200}
            className={styles.techImage}
          />
        </div>
        <p className={styles.descr}>
          The LIDAR team works closely with the controls subteam in order to
          develop sensor fusion algorithms, which not only merges the LIDAR data
          with the other sensor data to evaluate game state, but also to
          leverage the LIDAR data to enhance the capabilities of our other
          sensors. For example, the LIDAR provides accurate information about
          regions of interest for our computer vision models.
        </p>
        <p className={styles.descr}>
          The LIDAR project catalyzed the development of our 3D simulation
          system, which is able to provide simulated LIDAR, positioning, and
          image data in order to test our code despite limitations in our indoor
          and outdoor testing environments.
        </p>
      </div>
    </div>
  );
}
