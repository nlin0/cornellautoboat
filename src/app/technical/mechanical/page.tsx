import Image from 'next/image';
import styles from '../technical.module.css';
import TechnicalHero from '../TechnicalHero';
import Divider from '../Divider';
import ImageGallery from '../ImageGallery';

export default function Mechanical() {
  return (
    <div className={styles.wrapper}>
      <TechnicalHero title="Design & Manufacturing" subteam="mechanical" />
      <Divider />

      <div className={styles.techSection}>
        <div className={styles.techImg}>
          <Image
            src="/technical/mechanical1.png"
            alt="mechanical1"
            width={500}
            height={500}
            className={styles.techImage}
          />
        </div>
        <p className={styles.descr}>
          Our unique trimaran design has a hollow center hull that houses all
          the electronics, maximizing stability while minimizing weight. We
          leverage simulation tools like Ansys Fluent and Orca to optimize the
          boat’s performance on the water, ensuring stability, efficiency, and
          speed. Each structural component is designed with a high factor of
          safety for reliability. We employ Ansys static structural and modal
          analysis tools to verify our designs, followed by testing to validate
          their performance. The electronics bay is accessed through sealed
          openings, designed with redundancy, and tested for waterproofing. Most
          components are custom-made, utilizing a variety of techniques,
          including composite fabrication, machining, laser cutting, and 3D
          printing.
        </p>
        <ImageGallery
          images={[
            { src: '/technical/mechanical2.png', alt: 'Boat design analysis', width: 600, height: 400 },
            { src: '/technical/mechanical3.png', alt: 'Structural components', width: 600, height: 400 },
          ]}
        />
        <p className={styles.descr}>
          Our future goals include developing repeatable mold systems,
          fabricating forged composite parts, developing composite sandwiches
          with superior strength-to-weight ratios for the frame, and building a
          framework within LS-DYNA for crash simulations.
        </p>

        <div className={styles.techImg}>
          <Image
            src="/technical/mechanical4.png"
            alt="mechancial4"
            width={500}
            height={200}
            className={styles.techImage}
          />
        </div>
        <ImageGallery
          images={[
            { src: '/technical/mechanical5.png', alt: 'Manufacturing process', width: 600, height: 400 },
            { src: '/technical/mechanical6.png', alt: 'Composite layup', width: 600, height: 400 },
          ]}
        />
     
        <h3 className={styles.techHeading}>Hull Manufacturing</h3>
        <p className={styles.descr}>
          This year the amas and main hull were manufactured using a single,
          unified foam mold rather than being built separately. The mold was
          created from stacked sections of XPS foam, each CNC-machined to the
          correct profile and aligned using dowels to ensure symmetry and
          accuracy across the full assembly. After machining, the foam sections
          were adhered together and lightly sanded to achieve a smooth,
          continuous mold surface.
        </p>
             <div className={styles.techImg}>
          <Image
            src="/technical/mechanical_sand.jpg"
            alt="mechanical7"
            width={700}
            height={400}
            className={styles.techImage}
          />
        </div>
        <p className={styles.descr}>
          Because polyester resin cannot directly contact the foam, the entire
          mold was first covered in Tyvek tape, then coated with a thin,
          completely dried layer of epoxy fairing compound to create a smooth,
          stable base for the layup.
        </p>
        <p className={styles.descr}>
          For the fiberglass layup, we used a Mat–Weave–Mat sandwich strategy.
          The chopped-strand mat on the inner and outer surfaces ensured
          smoothness and good resin wet-out, while the biaxial weave layer in
          the center provided most of the structural strength for both the ama
          sections and the main hull.
        </p>
        <div className={styles.techImg}>
          <Image
            src="/technical/mechanical_hull.jpg"
            alt="mechanical7"
            width={700}
            height={400}
            className={styles.techImage}
          />
        </div>
        <p className={styles.descr}>
          After curing, the composite surface was sanded, any small gaps were
          filled with fairing compound, and the hull was brought to a uniform
          smoothness. A barrier coat was then applied, followed by spray paint
          for appearance and UV protection.
        </p>
        <h3 className={styles.techHeading}>Internal Structure & Deck</h3>
        <p className={styles.descr}>
          After demolding, a wooden internal frame was installed. The frame
          consisted of laser-cut plywood ribs, a notched wooden beam for
          alignment, and a CNC-cut plywood deck with precise slots for each rib.
        </p>
        <p className={styles.descr}>
          The wooden frame was glued together for strength and bonded inside the
          composite shell using fiberglass tabbing. After fitting the deck, the
          top edges of the hull were trimmed and sanded, and a final layer of
          chopped-strand mat fiberglass was added along the seam between the
          deck and hull to waterproof the joint.
        </p>
        <div className={styles.techImg}>
          <Image
            src="/technical/mechanical_frame.jpg"
            alt="mechanical8"
            width={1000}
            height={1000}
            className={styles.techImage}
          />
        </div>
        <p className={styles.descr}>
          Any final imperfections were faired and sanded, then the entire
          assembly received a protective barrier coat before being spray
          painted.
        </p>
        <div className={styles.techImg}>
          <Image
            src="/technical/mechanical_paint.jpg"
            alt="mechanical9"
            width={800}
            height={800}
            className={styles.techImage}
          />
        </div>
        <h3 className={styles.techHeading}>Testing</h3>
        <p className={styles.descr}>
          This semester we focused on evaluating both laminate strength and
          mold-release reliability. Several small test panels were produced to
          compare different fiberglass sequences, cure behavior, and surface
          quality. These tests helped us identify the Mat–Weave–Mat stack as the
          best balance of stiffness, durability, and workable thickness.
        </p>
        <p className={styles.descr}>
          We also tested various mold-prep methods to ensure clean and
          consistent demolding from the foam mold. Trials using Tyvek tape,
          fairing compound, and different release layers allowed us to assess
          how easily panels separated after curing and how smooth the resulting
          surface was. These results guided the final mold-protection and layup
          approach used for the full-scale hull.
        </p>
      </div>
    </div>
  );
}
