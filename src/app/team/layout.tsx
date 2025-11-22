import { ReactNode } from 'react';
import styles from './team.module.css';

interface TeamLayoutProps {
  children: ReactNode;
}

export default function TeamLayout({ children }: TeamLayoutProps) {
  return <div className={styles.wrapper}>{children}</div>;
}
