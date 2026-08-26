"use client";

import { useEffect, useRef } from "react";
import styles from "./coffeechat.module.css";

interface CoffeeChatRow {
  name: string;
  subteam: string;
  bookingUrl?: string;
}

const coffeeChatRows: CoffeeChatRow[] = [
  {
    name: "Anthony Wang",
    subteam: "Team Lead",
    bookingUrl: "https://calendly.com/anthony-wang/coffee-chat",
  },
  {
    name: "James Xiao",
    subteam: "Team Lead",
    bookingUrl: "https://calendly.com/james-xiao/coffee-chat",
  },
  {
    name: "Liz Tipton",
    subteam: "Design Lead",
    bookingUrl: "https://calendly.com/liz-tipton/coffee-chat",
  },
  {
    name: "Calvin Stern",
    subteam: "Manufacturing Lead",
    bookingUrl: "https://calendly.com/calvin-stern/coffee-chat",
  },
  {
    name: "Ivan Zheng",
    subteam: "Electrical Lead",
    bookingUrl: "https://calendly.com/ivan-zheng/coffee-chat",
  },
  {
    name: "Keya Cillenwater",
    subteam: "Electrical Lead",
    bookingUrl: "https://calendly.com/keya-cillenwater/coffee-chat",
  },
  {
    name: "Michelle Paszek",
    subteam: "Robotics Lead",
    bookingUrl: "https://calendly.com/michelle-paszek/coffee-chat",
  },
  {
    name: "Raymond Lin",
    subteam: "Autonomy Lead",
    bookingUrl: "https://calendly.com/raymond-lin/coffee-chat",
  },
  {
    name: "Kevin Peng",
    subteam: "Perception Lead",
    bookingUrl: "https://calendly.com/kevin-peng/coffee-chat",
  },
  {
    name: "Vivien Chen",
    subteam: "Perception Lead",
    bookingUrl: "https://calendly.com/vivien-chen/coffee-chat",
  },
  {
    name: "Ty Galasinki",
    subteam: "Sims Lead",
    bookingUrl: "https://calendly.com/ty-galasinki/coffee-chat",
  },
  {
    name: "Neha Naveen",
    subteam: "Business Lead",
    bookingUrl: "https://calendly.com/neha-naveen/coffee-chat",
  },
];

export default function CoffeeChat() {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target) {
            try {
              entry.target.classList.add(styles.fadeInUp);
            } catch (error) {
              // Element might have been removed, ignore error
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const refs = contentRefs.current;

    refs.forEach((ref) => {
      if (ref && ref.isConnected && ref instanceof Element) {
        try {
          observer.observe(ref);
        } catch (error) {
          // Element might not be ready, ignore error
        }
      }
    });

    return () => {
      try {
        observer.disconnect();
      } catch (error) {
        // Observer might already be disconnected, ignore error
      }
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Header Section */}
      <div className={`${styles.coffeeIntro} ${styles.fadeInDown}`}>
        <span className={styles.coffeeEyebrow}>Ask us anything!</span>

        <h1 className={styles.coffeeTitle}>Coffee Chats</h1>

        <p className={styles.coffeeSubtitle}>
          Schedule an informal 30-minute conversation with any of our team
          leads! Ask questions about the team, their experience, technical
          projects, the application process, or anything else you’re curious
          about.
        </p>
      </div>

      {/* Booking Table Section */}
      <section className={styles.tableSection}>
        <div className={styles.container}>
          <div
            className={styles.sectionHeader}
            ref={(el) => {
              contentRefs.current[1] = el;
            }}
          >
            <h2 className={styles.sectionTitle}>Book a Chat</h2>

          </div>

          <div
            className={styles.tableWrapper}
            ref={(el) => {
              contentRefs.current[2] = el;
            }}
          >
            <table className={styles.bookingTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Subteam</th>
                  <th>Booking</th>
                </tr>
              </thead>

              <tbody>
                {coffeeChatRows.map((row) => (
                  <tr key={row.name}>
                    <td data-label="Name" className={styles.nameCell}>
                      {row.name}
                    </td>

                    <td data-label="Subteam">
                      <span className={styles.subteamBadge}>
                        {row.subteam}
                      </span>
                    </td>

                    <td data-label="Booking">
                      {row.bookingUrl ? (
                        <a
                          href={row.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.bookButton}
                        >
                          Coming soon!
                        </a>
                      ) : (
                        <span className={styles.bookedLabel}>
                          Fully booked
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}