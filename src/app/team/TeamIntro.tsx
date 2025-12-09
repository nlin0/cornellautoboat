'use client';

import { useState, useEffect } from 'react';
import { Globe, Users, GraduationCap, School, Flag } from "lucide-react";
import styles from './team.module.css';

interface TeamStatProps {
  icon: React.ReactNode;
  label: string;
  delay?: number;
}

function TeamStat({ icon, label, delay = 0 }: TeamStatProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <li
      className={`${styles.statItem} ${isVisible ? styles.statVisible : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${styles.statIconWrapper} ${isHovered ? styles.statHovered : ''}`}>
        {icon}
      </div>
      <span className={styles.statLabel}>{label}</span>
    </li>
  );
}

export default function TeamIntro() {
  const stats = [
    { icon: <Flag size={48} aria-hidden="true" />, label: "Founded in 2021" },
    { icon: <Users size={48} aria-hidden="true" />, label: "60+ members" },
    { icon: <GraduationCap size={48} aria-hidden="true" />, label: "14 different majors" },
    { icon: <School size={48} aria-hidden="true" />, label: "3 different Cornell colleges" },
    { icon: <Globe size={48} aria-hidden="true" />, label: "6 different home countries" },
  ];

  return (
    <div className={styles.teamIntro}>
      <div className={styles.teamIntroText}>
        <h2 className={`${styles.teamTitle} ${styles.titleAnimated}`}>
          Meet our Team!
        </h2>
        <p className={`${styles.teamDescription} ${styles.descriptionAnimated}`}>
          Our team consists of three subteams: Hardware, Software, and Business.
        </p>
      </div>

      <div className={styles.scrollContainer}>
        <ul className={styles.teamIntroBand} role="list">
          {/* First set */}
          {stats.map((stat, index) => (
            <TeamStat
              key={`first-${index}`}
              icon={stat.icon}
              label={stat.label}
              delay={100 * (index + 1)}
            />
          ))}
          {/* Duplicate set for seamless loop */}
          {stats.map((stat, index) => (
            <TeamStat
              key={`second-${index}`}
              icon={stat.icon}
              label={stat.label}
              delay={0}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

