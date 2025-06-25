import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen font-sans text-white w-full">
      <div className="relative w-full min-h-[300px] md:min-h-[400px]">
        <Image
          src="/clifford2.png"
          alt="Clifford"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(117, 65, 65, 0.57)' }}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5 ">
          <h1 className="tracking-wider text-7xl font-bold">Team History</h1>
        </div>
      </div>

      <div className="bg-[#8a1620] py-10">
        <div className="max-w-4xl mx-auto px-6">
          <section className="flex flex-col md:flex-row-reverse items-stretch gap-8">
            <div className="text-left md:w-1/2 self-start">
              <h2 className="text-2xl font-normal mb-4 text-white">
                Fall 2021
              </h2>
              <h2 className="text-3xl font-bold mb-4 text-white">
                AutoBoat was Founded
              </h2>
              <p className="text-white">
                The team previously competed in NASA’s Micro-G competition which
                had a mechanical focus. In 2021 the team pivoted to a more
                software-heavy competition, RoboBoat.
              </p>
            </div>
            <div className="md:w-1/2 bg-gray-300 rounded-lg self-stretch" />
          </section>

          <div className="bg-gray-400 h-1 w-4/5 mx-auto my-10 rounded"></div>

          <section className="flex flex-col md:flex-row items-stretch gap-8">
            <div className="text-left md:w-1/2 self-start">
              <h2 className="text-2xl font-normal mb-4 text-white">
                Fall 2022
              </h2>
              <h2 className="text-3xl font-bold mb-4 text-white">
                The First Boat Prototype
              </h2>
              <p className="text-white">
                We built the first prototype of our boat, transitioning from a
                catamaran to a more stable trimaran design. While the mechanical
                team led this shift, the software team focused on developing
                path planning algorithms and a computer vision model. We also
                began integrating ROS into our system.
              </p>
            </div>
            <div className="md:w-1/2 bg-gray-300 rounded-lg self-stretch" />
          </section>

          <div className="bg-gray-400 h-1 w-4/5 mx-auto my-10 rounded"></div>

          <section className="flex flex-col md:flex-row-reverse items-stretch gap-8">
            <div className="text-left md:w-1/2 self-start">
              <h2 className="text-2xl font-normal mb-4 text-white">
                Spring 2023
              </h2>
              <h2 className="text-3xl font-bold mb-4 text-white">George</h2>
              <p className="text-white">
                Our first competition boat, George, was built. Our CV model was
                completed, and the code for the navigational tasks was finished.
                We competed in-person at RoboBoat for the first time, and
                qualified for finals. We learned so much from the competition
                and came back with many ideas to improve the team moving
                forward.
              </p>
            </div>
            <div className="md:w-1/2 bg-gray-300 rounded-lg self-stretch" />
          </section>

          <div className="bg-gray-400 h-1 w-4/5 mx-auto my-10 rounded"></div>

          <section className="flex flex-col md:flex-row items-stretch gap-8">
            <div className="text-left md:w-1/2 self-start">
              <h2 className="text-2xl font-normal mb-4 text-white">
                Fall 2023 - Spring 2024
              </h2>
              <h2 className="text-3xl font-bold mb-4 text-white">Clifford</h2>
              <p className="text-white">
                RoboBoat 2024 would take place nearly two months earlier than
                expected. Despite this, we still decided to build an entirely
                new boat, Clifford, which was fully designed and manufactured in
                just one semester. Clifford is stronger, faster, and more stable
                than George, providing the team with a more reliable hardware
                platform to build upon in the future. The software team revamped
                the codebase, integrated a compass and GPS, and improved the
                vision models. Additionally, the Ground Station project and
                virtual simulations were developed. At competition, we qualified
                for finals again, and we won a design documentation award for
                our website.
              </p>
            </div>
            <div className="md:w-1/2 bg-gray-300 rounded-lg self-stretch" />
          </section>

          <div className="bg-gray-400 h-1 w-4/5 mx-auto my-10 rounded"></div>

          <section className="flex flex-col md:flex-row-reverse items-stretch gap-8">
            <div className="text-left md:w-1/2 self-start">
              <h2 className="text-2xl font-normal mb-4 text-white">
                Fall 2024 - Spring 2024
              </h2>
              <h2 className="text-3xl font-bold mb-4 text-white">
                National 6th Place Champions
              </h2>
              <p className="text-white">
                Our first competition boat, George, was built. Our CV model was
                completed, and the code for the navigational tasks was finished.
                We competed in-person at RoboBoat for the first time, and
                qualified for finals. We learned so much from the competition
                and came back with many ideas to improve the team moving
                forward.
              </p>
            </div>
            <div className="md:w-1/2 bg-gray-300 rounded-lg self-stretch" />
          </section>
        </div>
      </div>
    </div>
  );
}
