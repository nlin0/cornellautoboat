// app/technical/layout.tsx
import styles from './team.module.css';

export default function TechnicalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.wrapper}>{children}</div>;
}
