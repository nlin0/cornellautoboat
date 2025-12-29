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
  | 'ROS'
  | 'main';

const HERO_IMAGES: Record<Subteam, string> = {
  AI: '/technical/AIHero4.png',
  controls: '/technical/Controls.JPG',
  esys: '/technical/esys3.png',
  mechanical: '/technical/mechanical.JPG',
  perception: '/technical/perceptionHero.JPG',
  robotics: '/technical/roboticsHero3.png',
  ROS: '/technical/Ros_Sims.JPG',
  main: '/technical/fullteam3.svg',
};

interface TechnicalHeroProps {
  title: string;
  subteam?: Subteam; // optional
}

export default function TechnicalHero({ title, subteam }: TechnicalHeroProps) {
  return (
    <div className={styles.heroWrapper}>
   
      {subteam && (
        <section className={styles.heroImage}>
          <Image
            src={HERO_IMAGES[subteam]}
            alt={title}
            fill
            priority
            className={styles.boatImage}
          />
        </section>
      )}


      <section className={styles.heroOverlay}>
        <h1 className={styles.heroTitle}>{title}</h1>
      </section>

    
      <Divider />
    </div>
  );
}
