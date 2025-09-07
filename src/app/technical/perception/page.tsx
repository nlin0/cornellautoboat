import Image from 'next/image';
import styles from '../technical.module.css';

export default function Perception() {
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
          <h2 className={styles.technicalTitle}>Perception</h2>
        </div>
      </div>

      <div className={styles.techSection}>
        <p className={styles.descr}>
          The Perception team is responsible for translating the boat’s
          surroundings, position, and orientation into information useful for
          decision making. This encompasses both computer vision and sensors.
        </p>

        <h3 className={styles.techHeading}>Computer Vision</h3>
        <p className={styles.descr}>
          Members working on computer vision spend time researching neural
          networks, building and training an object detection model, augmenting
          and annotating data, and integrating the model with our ZED 2i camera.
          The CV group had one main goal this semester: to make our model more
          robust. Some of the annotations were inaccurate leading the model to
          recognize objects incorrectly. We worked on correcting these
          annotations to ensure the model was given the best possible data to be
          trained on.
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
          A big project the CV group has been working on is creating a testing
          plan to go about choosing the best YOLO model that suits our needs and
          produces the best results. We researched each YOLO model version and
          size and noted their advantages and disadvantages. We then went out
          testing these YOLO model versions and sizes and ultimately saw that
          YOLOv8 yielded the best results.
        </p>
        <p className={styles.descr}>
          A future goal of the CV group is building a neural network from
          scratch to serve as our new object detection model. There has been
          some progress on this but it is still in its elementary development
          phase.
        </p>
        <h3 className={styles.techHeading}>Sensors</h3>
        <p className={styles.descr}>
          Our sensor suite includes a ZED2i stereo camera, SparkFun MicroMod
          GNSS boards, and a Vectornav VN-300 GPS/IMU. The sensors group works
          closely with members of the Controls & Microcontrollers and Electrical
          Systems groups to integrate the sensors into our microcontroller
          framework.
        </p>
        <p className={styles.descr}>
          In the future, we hope to integrate LiDAR into our sensor suite for
          more robust depth sensing and confirmation of the objects detected by
          CV.
        </p>
        <p>UNFINISHED... waiting for updates</p>
      </div>
    </div>
  );
}
