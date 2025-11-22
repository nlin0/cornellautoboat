import Image from 'next/image';
import styles from '../technical.module.css';
import TechnicalHero from '../TechnicalHero';

export default function Mechanical() {
  return (
    <div className={styles.wrapper}>
      <TechnicalHero title="Design & Manufacturing" />

      <div className={styles.techSection}>
        <p className={styles.descr}>
          Our unique trimaran design has a hollow center hull that houses all
          the electronics, maximizing stability while minimizing weight. We
          leverage simulation tools like Ansys Fluent and Orca to optimize the
          boat’s performance on the water, ensuring stability, efficiency, and
          speed. Each structural component is designed with a high factor of
          safety for reliability. We employ Ansys static structural and modal
          analysis tools to verify our designs, followed by testing to validate
          their performance. The electronics bay is accessed through sealed
          openings, designed with redundancy, and tested for waterproofing.
          Most components are custom-made, utilizing a variety of techniques,
          including composite fabrication, machining, laser cutting, and 3D
          printing.
        </p>
        <p className={styles.descr}>
          Our future goals include transitioning from hand layups to vacuum
          infusion to make lighter and stronger hulls, fabricating forged
          composite parts, developing composite sandwiches with superior
          strength-to-weight ratios for the frame, and building a framework
          within LS-DYNA for crash simulations.
        </p>

        <div className={styles.techImg}>
          <Image
            src="/clifford2.png"
            alt="Clifford the boat"
            width={500}
            height={200}
            className={styles.techImage}
          />
        </div>

        <h3 className={styles.techHeading}>Hull Manufacturing</h3>
        <p className={styles.descr}>
          AMAS. The amas were made using foam cores with wooden tops and bottoms that
          were carefully cut and sanded to the desired shape. These foam cores
          were then used in a fiberglass layup to provide waterproofing and
          strength for use in the water. After more sanding, the amas were then
          coated with an epoxy barrier coat and spray painted to our final
          desired result. We started by cutting and sanding four individual
          profiles using insulation foam. Each profile was two inches thick,
          which added up to our desired height of eight inches per ama.
        </p>

        <p>
          UNFINISHED... waiting for updates
        </p>
      </div>
    </div>
  );
}
