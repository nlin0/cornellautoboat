import Link from 'next/link';
import styles from './technical.module.css';
import TechnicalHero from './TechnicalHero';
import Divider from './Divider';

export default function TechnicalMain() {
  return (
    <div className={styles.wrapper}>
      <TechnicalHero title="Meet the Subteams" />
      <Divider />
      <div className={styles.techSection}>
        <section className={styles.subteamSection}>
          <h3 className={styles.techHeading}>Software</h3>

          <p className={styles.techdescr}>
            The software team on AutoBoat is responsible for researching,
            developing, and testing all computer programs which enable the boat
            to operate autonomously. Our team is made up of several main
            projects each with a different focus: Perception, Artificial
            Intelligence, Controls & Microcontroller Design, and ROS &
            Simulations. You can think of the first three teams as answering the
            following questions:
          </p>

          <ul className={styles.techdescr}>
            <li>
              <strong>Perception:</strong> What do we see? Where are we?
            </li>
            <li>
              <strong>AI:</strong> Based on what we see, where do we go? How
              should we move?
            </li>
            <li>
              <strong>Controls:</strong> Based on how we want to move, how do we
              control our motors to achieve that movement?
            </li>
          </ul>

          <p className={styles.techdescr}>
            ROS is the glue that holds everything together: it provides
            concurrency in the “eyes” (perception), “brains” (AI), and “muscles”
            (controls) of the boat and allows them to communicate with each
            other. Simulations enable us to test our code and analyze the boat’s
            behavior when not on the water.
          </p>

          <p className={styles.techdescr}>
            Working on the Software subteam gives students the opportunity to
            get hands-on experience with complex engineering problems. Members
            are pushed to gain new technical skills, take initiative, and learn
            to collaborate effectively. These skills enable our members to grow
            as engineers and individuals, ultimately excelling in their careers.
          </p>

          <div className={styles.linkContainer}>
            {[
              'Perception',
              'Artificial Intelligence',
              'Controls & Microcontroller Design',
              'ROS & Simulations',
            ].map((subteam) => (
              <Link
                key={subteam}
                href={`/technical/${subteam
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
                className={styles.techButton}
              >
                {subteam}
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.subteamSection}>
          <h3 className={styles.techHeading}>Hardware</h3>

          <p className={styles.techdescr}>
            The hardware team is responsible for the design, manufacturing,
            integration, and testing of all the physical components of the boat.
            Mechanical tackles all the major hydrodynamic, structural, and
            waterproofing systems that make up our boat. Robotics encompasses
            all the advanced capability systems such as the skeeball shooter,
            watergun, and robotic arm that allow the boat to interact with its
            environment. Finally, E-Systems connects everything together,
            handling power distribution, signal communication between
            components, and sensor integration, forming the vital bridge between
            the hardware and software systems.
          </p>

          <div className={styles.linkContainer}>
            {['Mechanical', 'Robotics', 'Electrical Systems'].map((subteam) => (
              <Link
                key={subteam}
                href={`/technical/${subteam
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
                className={styles.techButton}
              >
                {subteam}
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.subteamSection}>
          <h3 className={styles.techHeading}>Business</h3>

          <p className={styles.techdescr}>
            The business team supports the team by managing operations,
            outreach, and finances. Key responsibilities include fundraising and
            sponsorship outreach, producing videos for competition submissions,
            maintaining and updating the team website (including the site you’re
            viewing right now :D), and managing budgets and spending. By
            handling external communication and financial planning, the business
            team allows the technical subteams to focus on design and
            manufacturing while ensuring the team operates efficiently,
            professionally, and competitively.
          </p>
        </section>
      </div>
    </div>
  );
}
