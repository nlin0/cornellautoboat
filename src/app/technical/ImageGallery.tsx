import Image from 'next/image';
import styles from './technical.module.css';

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className={styles.imageGallery}>
      {images.map((image, index) => (
        <div key={index} className={styles.techImg}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width ?? 600}
            height={image.height ?? 400}
            className={styles.techImage}
          />
        </div>
      ))}
    </div>
  );
}

