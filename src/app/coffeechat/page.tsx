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
    bookingUrl: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ17RPPoh58nahSKVd8Nw2y0HR53v2XDoexWBGQAGSUeMaF78e0TIQ5o_Nbh9ho0qEDQvs9GzUEK",
  },
  {
    name: "James Xiao",
    subteam: "Team Lead",
    bookingUrl: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2UozhGrwfG8wNf5dI2pqG44uc56U386-CRNsTahVIWjRTr941Kq_ISoQBQpV8r4YWvWuhb13lM",
  },
  {
    name: "Liz Tipton",
    subteam: "Design Lead",
    bookingUrl: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ08q83fuJYVxxakWcoqx8a5cHPHcfh7W73E8PaYcLI9oH6pgOWHCR7JhTAoDZ54_MizgHG4AYg7",
  },
  {
    name: "Calvin Stern",
    subteam: "Manufacturing Lead",
    bookingUrl: "https://calendar.app.google/Sgq4aZt6rpR3pw539",
  },
  {
    name: "Ivan Zheng",
    subteam: "Electrical Lead",
    bookingUrl: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0pN4cEWnOeJeX9Ya1GTMyjqCuvMiYBO-IQsAWDCxHjWar7iQKQEZ9DEB3w1D_x2vD55nILX_Jr",
  },
  {
    name: "Keya Cillenwater",
    subteam: "Electrical Lead",
    bookingUrl: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ33eiz6M6LONLwwCy3YTubiDXqXpBscLWIS7B300v-J1Lbe1eW_XATHUYeXwm3ITVcoz7kqQbgZ",
  },
  {
    name: "Michelle Paszek",
    subteam: "Robotics Lead",
    bookingUrl: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2bGBtlx9dIbTXOgpBF-tHCH6pTL7A30BcYtgW-okMI1oF0IUMNbTxrZVRgYVh-cMmv0am8WStA",
  },
  {
    name: "Raymond Lin",
    subteam: "Autonomy Lead",
    bookingUrl: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1AP_jQ6pYxS8iaLwZD0BQN6rt8yIMOhZDg3WAVXnWLgMwwO8p6mGHWxbaUVXVSCCPbiKyekROt",
  },
  {
    name: "Kevin Peng",
    subteam: "Perception Lead",
    bookingUrl: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3iSQpH9k-qYZ9SpnddpMcODVJefQprOJrSSjS4kBxwFZ-v6z7xC2-od-yVPEvQUyrazQkchAiv",
  },
  {
    name: "Vivien Chen",
    subteam: "Perception Lead",
    bookingUrl: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ23Wl9smWgsf5xLMe20KcF9xMT-MIM3AbiZvuxOR1UvPhrKkd-NFTrLVMG-H0qKJq-2u1JkcGzX",
  },
  {
    name: "Ty Galasinski",
    subteam: "Sims Lead",
    bookingUrl: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0rivQ90jqDMGbz0njkQtVlr5va074pklP0XnK91_E-MLKE_c90beW9dSbhf3aQ_AplNNbR-sg0",
  },
  {
    name: "Neha Naveen",
    subteam: "Business Lead",
    bookingUrl: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2bHXszqWzwfpacTKptJKKbwW8z5OL6UkvinVT2N58fpFTDpmF_-GIGaEBN-gasNl7Sa0PO3LrD",
  },
];

export default function CoffeeChat() {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
//comment here just want to push now
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
                          Book here!
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