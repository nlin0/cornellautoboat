import Image from 'next/image';
import styles from './page.module.css';
import './globals.css';

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHome}>
        <Image
          src="/background.svg"
          alt="Cornell AutoBoat team background"
          fill
          quality={100}
          priority
          className={styles.heroHomeImage}
          style={{ objectFit: 'cover' }}
        />

        <div className={styles.heroHomeContent}>
          <div className={styles.homeHeroText}>
            <h1 className={styles.homeTitle}>Cornell AutoBoat</h1>
            <h2 className={styles.homeTitle2}>Project Team</h2>
            <p className={styles.homeDescr}>
              Boats are cool. So are we.
            </p>
          </div>

          <div className={styles.homeHeroBoat}>
            <Image
              src="/cliffordart.svg"
              alt="Clifford Boat"
              width={600}
              height={600}
              className={styles.cliffordBoat}
            />
          </div>
        </div>
      </div>


      {/* Block Section */}
      <main className={styles.homeContent}>
        <section className={styles.blockSection}>
          <div className={styles.aboutCrewTitle}>
            <h2>Aboat</h2>
            <h2 className={styles.aboutCrewTitle2}>the Crew</h2>
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
            <p>Video will go here</p>
          </div>
        </section>
      </main>
    </div>
  );
}