import Image from 'next/image';
import styles from './technical.module.css';

export default function Divider() {
  return (
    <div className={styles.dividerWrapper}>
      <Image
        src="/dividers/divider5.png"
        alt=""
        width={1200}
        height={100}
        className={styles.divider}
        aria-hidden="true"
      />
    </div>
  );
}

