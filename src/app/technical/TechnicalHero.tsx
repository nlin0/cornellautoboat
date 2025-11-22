import Image from 'next/image';
import styles from './technical.module.css';

interface TechnicalHeroProps {
  title: string;
}

export default function TechnicalHero({ title }: TechnicalHeroProps) {
  return (
    <div className={styles.heroImg}>
      <div className={styles.boatImg}>
        <Image
          src="/clifford2.png"
          alt="Cornell AutoBoat team boat"
          fill
          priority
          className={styles.boatImage}
        />
      </div>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.titleBlock}>
        <h2 className={styles.technicalTitle}>{title}</h2>
      </div>
    </div>
  );
}

