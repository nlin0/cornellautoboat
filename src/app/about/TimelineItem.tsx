import Image from 'next/image';
import styles from './about.module.css';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  reversed?: boolean;
}

export default function TimelineItem({
  year,
  title,
  description,
  imageSrc,
  imageAlt,
  imageWidth = 400,
  imageHeight = 300,
  reversed = false,
}: TimelineItemProps) {
  return (
    <section
      className={`${styles.timelineSection} ${reversed ? styles.reverse : ''}`}
    >
      <div className={styles.textBlock}>
        <div className={styles.year}>{year}</div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{description}</p>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className={styles.timelineImage}
        />
      </div>
    </section>
  );
}

