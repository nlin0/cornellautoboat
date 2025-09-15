import Image from 'next/image';
import styles from "./home.module.css";
import './globals.css';

export default function Home() {
  return (

    // hero image
    <div className={styles.wrapper}>

      <div className={styles.heroDuo}>
        <div className={styles.leftHero}>

          <div className={styles.styleBox1}>
            <div className={styles.styleBox2}>
              <div className={styles.styleBox3}>
                <h3 className={styles.staticText} id="staticText">
                  placeholder
                </h3>
                <h3 className={styles.dynamicText} id="dynamicText">
                  This text is dynamic |
                </h3>

              </div>
            </div>
          </div>

        </div>
        {/* clifford picture */}
        <div className={styles.rightHero}>
          <Image
            src="/clifford2.png"
            alt="Clifford"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.overlay}></div>

          <div className={styles.cornellAB}>
            <h2 className={styles.biggerHeader}>Cornell Autoboat</h2>
            <h3 className={styles.smallerHeader}>Project Team</h3>
          </div>
        </div>
      </div>

      {/* Block Section */}
      <div className={styles.blockSection}>
        <div className={styles.sectionContent}>
          <div className={styles.container}>

            <div className={styles.descrBlock}>
              <h2 className={styles.blockHeader}>Something</h2>
              <p className={styles.descr}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>

            </div>

          </div>
          <div className={styles.container}>
            <div className={styles.techImg}>

            </div>

          </div>
        </div>

        <div className={styles.sectionContent}>
          <div className={styles.container}>
            <div className={styles.techImg}>

            </div>
          </div>
          <div className={styles.container}>

            <div className={styles.descrBlock}>
              <h2 className={styles.blockHeader}>Something</h2>
              <p className={styles.descr}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>

            </div>
          </div>
        </div>

        <div className={styles.sectionContent}>
          <div className={styles.container}>

            <div className={styles.descrBlock}>
              <h2 className={styles.blockHeader}>Something</h2>
              <p className={styles.descr}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>

            </div>

          </div>
          <div className={styles.container}>
            <div className={styles.techImg}>

            </div>
          </div>
        </div>

        <div className={styles.videoCont}>
          <p>video will go here</p>

        </div>
      </div>

      <div className={styles.blockSection2}>

        <h2 className={styles.compHeader}>The 2025-2026 Competition Cycle</h2>
        <p className={styles.compDescr}>Incremental hardware updates, significant software changes, and an emphasis on testing. Add more things here. Blah blahblah blah. Lorem something something.</p>
        <div className={styles.processBar}>
          <p className={styles.processblock}>Testing</p>

          <p className={styles.processblock}>Design</p>
          <p className={styles.processblock}>Manufacturing</p>
          <p className={styles.processblock}>Research</p>
        </div>
        
        <div className={styles.infoContainer}>
          <p>changes depending on tab</p>

        </div>

      </div>



    </div>



  )
}