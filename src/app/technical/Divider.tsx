import Image from 'next/image';
import styles from './technical.module.css';

export default function Divider() {
  return (
    <div className={styles.dividerWrapper}>
      <Image
        src="/dividers/divider5.svg"
        alt=""
        width={1800}
        height={100}
        className={styles.divider}
        quality={100}
        priority
        aria-hidden="true"
      />
    </div>
  );
}

