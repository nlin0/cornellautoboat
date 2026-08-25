import Image from "next/image";
import styles from "../technical.module.css";
import TechnicalHero from "../TechnicalHero";
import Divider from "../Divider";

export default function Perception() {
  return (
    <div className={styles.wrapper}>
      <TechnicalHero title="Perception" subteam="perception" />
      <Divider />
      <div className={styles.techSection}>
        <p className={styles.descr}>
          The Perception team is responsible for classifying objects detected by
          our LIDAR system.
        </p>

        <h3 className={styles.techHeading}>Computer Vision</h3>
        <p className={styles.descr}>
          Our boat currently uses a front-facing camera to collect image data,
          and we run both classical and machine learning algorithms to detect
          and classify objects in our field of view. To better utilize LIDAR
          data, we will add auxiliary cameras to our boat. Synthesize data from
          multiple camera inputs to provide 360-degree computer vision
          Train/evaluate YOLO models and interface with camera and sensor fusion
          Technologies: Python, machine learning, ROS2, Pytorch, YOLO Next
          steps: We would like to work more closely with LIDAR, creating
          multimodal models that integrate both LIDAR and camera data to produce
          more accurate predictions.
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

        <h3 className={styles.techHeading}>Lidar</h3>
        <p className={styles.descr}>
          Our boat uses a LIDAR sensor that returns point cloud data that we can
          use for object detection. We currently use geometric fitting
          algorithms to classify objects. We are exploring further strategies to
          improve our classification. Train neural networks on simulated point
          cloud data to classify objects Implement temporal object mapping by
          overlaying all same-cluster scans and building a map of all individual
          clusters with accumulated data Technologies: Python, Pytorch, C++,
          Point Cloud Library Next steps: We would like to explore semantic
          segmentation models to classify and detect objects in our point cloud,
          as well as explore early and late fusion models with camera data.
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
        <h3 className={styles.techHeading}>Sensor Fusion </h3>
        <p className={styles.descr}>
          Our boat fuses LIDAR and computer vision inputs into a cohesive global
          game state using spatial-temporal bookkeeping and layout-aware
          coordinate transforms. We handle uncertainty, strict performance
          requirements, and synchronization across sensor inputs.
        </p>

        <ul className={styles.descr}>
          <li>
            Implement aggregation over all characteristics of objects, including
            color, size, position, and type, over time.
          </li>
          <li>
            Implement frontier/production-style object tracking using
            probabilistic methods while reducing reliance on permanent object
            memory.
          </li>
          <li>
            Explore algorithmic performance improvements for object equivalence
            checking.
          </li>
          <li>
            <strong>Technologies:</strong> Python, ROS2, Linear Algebra
          </li>
        </ul>
      </div>
    </div>
  );
}
