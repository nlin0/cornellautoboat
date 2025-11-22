import Image from 'next/image';
import styles from './about.module.css';
import TimelineItem from './TimelineItem';

export default function About() {
  return (
    <div className="min-h-screen font-sans text-f6eded w-full">
      {/* HERO IMAGE */}
      <header className="relative w-full min-h-[300px] md:min-h-[400px]">
        <Image
          src="/clifford2.png"
          alt="Cornell AutoBoat team boat, Clifford"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />

        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(117, 65, 65, 0.57)' }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5">
          <h1 className="tracking-wider text-9xl font-bold">Team History</h1>
        </div>
      </header>

      {/* TIMELINE SECTIONS */}
      <main className={styles.wrapper}>
        <TimelineItem
          year="FALL 2021"
          title="AutoBoat Was Founded"
          description="The team previously competed in NASA's Micro-G competition which had a mechanical focus. In 2021 the team pivoted to a more software-heavy competition, RoboBoat."
          imageSrc="/clifford2.png"
          imageAlt="AutoBoat team in Fall 2021"
        />
        <TimelineItem
          year="FALL 2022"
          title="The First Boat Prototype"
          description="We built the first prototype of our boat, transitioning from a catamaran to a more stable trimaran design. While the mechanical team led this shift, the software team focused on developing path planning algorithms and a computer vision model. We also began integrating ROS into our system."
          imageSrc="/clifford2.png"
          imageAlt="First boat prototype in Fall 2022"
          imageWidth={500}
          imageHeight={500}
          reversed
        />
        <TimelineItem
          year="SPRING 2023"
          title="George"
          description="Our first competition boat, George, was built. Our CV model was completed, and the code for the navigational tasks was finished. We competed in-person at RoboBoat for the first time, and qualified for finals. We learned so much from the competition and came back with many ideas to improve the team moving forward."
          imageSrc="/clifford2.png"
          imageAlt="George, the first competition boat in Spring 2023"
        />
        <TimelineItem
          year="FALL 2023 - SPRING 2024"
          title="Clifford"
          description="RoboBoat 2024 would take place nearly two months earlier than expected. Despite this, we still decided to build an entirely new boat, Clifford, which was fully designed and manufactured in just one semester. Clifford is stronger, faster, and more stable than George, providing the team with a more reliable hardware platform to build upon in the future. The software team revamped the codebase, integrated a compass and GPS, and improved the vision models. Additionally, the Ground Station project and virtual simulations were developed. At competition, we qualified for finals again, and we won a design documentation award for our website."
          imageSrc="/clifford2.png"
          imageAlt="Clifford boat in Fall 2023 - Spring 2024"
          reversed
        />
        <TimelineItem
          year="SPRING 2025"
          title="International Champions"
          description="AutoBoat earns the international fifth place title"
          imageSrc="/clifford2.png"
          imageAlt="Cornell AutoBoat team celebrating international fifth place in Spring 2025"
        />
      </main>
    </div>
  );
}
