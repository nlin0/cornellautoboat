import Image from 'next/image';
import styles from './about.module.css';

interface AboutHeroProps {
  title: string;
}

export default function AboutHero({ title }: AboutHeroProps) {
  return (
    <div className={styles.heroImg}>
      <div className={styles.boatImg}>
        <Image
          src="/about/aboutmain.avif"
          alt="teampic"
          fill
          priority
          className={styles.boatImage}
        />
      </div>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.titleBlock}>
        <h2 className={styles.aboutTitle}>{title}</h2>
      </div>
    </div>
  );
}

