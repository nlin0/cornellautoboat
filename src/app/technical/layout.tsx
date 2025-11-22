// app/technical/layout.tsx
import styles from "./technical.module.css";

export default function TechnicalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
}
