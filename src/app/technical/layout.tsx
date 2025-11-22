import { ReactNode } from 'react';
import styles from "./technical.module.css";

interface TechnicalLayoutProps {
  children: ReactNode;
}

export default function TechnicalLayout({ children }: TechnicalLayoutProps) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
}
