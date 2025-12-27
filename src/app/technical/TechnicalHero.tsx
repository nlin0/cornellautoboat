import Image from 'next/image';
import Divider from './Divider';
import styles from './technical.module.css';

type Subteam =
  | 'AI'
  | 'controls'
  | 'esys'
  | 'mechanical'
  | 'perception'
  | 'robotics'
  | 'ROS';

const HERO_IMAGES: Record<Subteam, string> = {
  AI: '/technical/roboticsHero2.png',
  controls: '/technical/Controls.JPG',
  esys: '/technical/esys3.png',
  mechanical: '/technical/mechanical.JPG',
  perception: '/technical/perceptionHero.JPG',
  robotics: '/technical/roboticsHero2.png',
  ROS: '/technical/roboticsHero2.png',
};

interface TechnicalHeroProps {
  title: string;
  subteam: Subteam;
}

export default function TechnicalHero({ title, subteam }: TechnicalHeroProps) {
  return (
    <div className={styles.heroWrapper}>
      {/* IMAGE PANEL */}
      <section className={styles.heroImage}>
        <Image
          src={HERO_IMAGES[subteam]}
          alt={title}
          fill
          priority
          className={styles.boatImage}
        />
      </section>

      {/* OVERLAY PANEL */}
      <section className={styles.heroOverlay}>
        <h1 className={styles.heroTitle}>{title}</h1>
      </section>

      {/* DIVIDER BELOW HERO */}
      <Divider />
    </div>
  );
}
