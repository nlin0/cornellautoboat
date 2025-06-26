import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-white w-full">
      <main className="grid grid-cols-1 md:grid-cols-2 bg-[#7d2c20] w-full">
        {/* WHO ARE WE --------------------------------------------------- */}
        <div className="bg-white text-[#7d2c2c] p-6 text-center md:text-left flex items-center justify-center min-h-[300px] md:min-h-[570px]">
          <div className="w-full md:w-[90%] max-w-7xl mx-auto bg-[#eddada] md:min-h-[300px] p-8 text-center flex flex-col justify-center ">
            <p className="text-6xl font-bold text-[#8B0000] ">Who are we?</p>
            <p className="text-4xl font-normal mt-2 text-[#914040]">
              Innovative|
            </p>
          </div>
        </div>

        {/* RIGHT SIDE --------------------------------------------*/}
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
            <h1 className="tracking-wider text-7xl font-bold">CORNELL</h1>
            <h1 className="tracking-wider text-7xl font-bold">AUTOBOAT</h1>
            <p className="tracking-wider text-4xl font-bold mt-2">
              PROJECT TEAM
            </p>
          </div>
        </div>
      </main>

      {/* IMAGINATIVE Section 1 */}
      <section className="bg-[#a24646] p-10 flex flex-col md:flex-row items-stretch gap-8">
        <div className="text-left md:w-1/2 self-start">
          <h2 className="text-2xl font-bold mb-4 text-white">IMAGINATIVE</h2>
          <p className="text-white">
            We are a student-run team of hardware and software engineers,
            dedicated to building and innovating in the field of naval
            architecture and marine robotics.
          </p>
        </div>
        <div className="md:w-1/2 h-48 bg-gray-300 rounded-lg" />
      </section>

      {/* INNOVATIVE Section 2 */}
      <section className="bg-[#a24646] p-10 flex flex-col md:flex-row items-stretch gap-8">
        <div className="md:w-1/2 h-48 bg-gray-300 rounded-lg" />
        <div className="text-left md:w-1/2 self-start">
          <h2 className="text-2xl font-bold mb-4 text-white">INNOVATIVE</h2>
          <p className="text-white">Write Something Here</p>
        </div>
      </section>
      {/* SOMETHING Section 3 */}
      <section className="bg-[#a24646] p-10 flex flex-col md:flex-row items-stretch gap-8">
        <div className="text-left md:w-1/2 self-start">
          <h2 className="text-2xl font-bold mb-4 text-white">SOMETHING</h2>
          <p className="text-white">SOMETHING!</p>
        </div>
        <div className="md:w-1/2 h-48 bg-gray-300 rounded-lg" />
      </section>

      <section className="bg-[#330503] flex justify-center pt-40 pb-40">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2 text-white">
            Check out our team video!
          </h2>
          <div className="w-full h-48 bg-gray-300 rounded-lg" />
        </div>
      </section>


  
      
      <div className="bg-[#a24646] py-10">
        <div className=" max-w-7xl mx-auto px-6">

      {/* 2025 - 2026 COMP CYCLE ******************************************************************/}
      <section className="bg-[#7d2c20] py-10 text-white text-center">
        <h2 className="text-6xl font-bold mb-2 text-white pb-10">
          The 2025 - 2026 Competition Cycle
        </h2>
        <p className="max-w-4xl mx-auto text-3xl mb-6">
          Incremental hardware updates, significant software changes, and an
          emphasis on testing. Read more about each phase of the process below.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <div className="bg-[#5e0f0a] text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-100 transition">
            <a
              href="#testing"
              className="text-3xl font-semibold hover:underline hover:text-red-400"
            >
              Testing
            </a>
          </div>
          <div className="bg-[#5e0f0a] text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-100 transition">
            <a
              href="#design"
              className="text-3xl font-semibold hover:underline hover:text-red-400"
            >
              Design
            </a>
          </div>
          <div className="bg-[#5e0f0a] text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-100 transition">
            <a
              href="#manufacturing"
              className="text-3xl font-semibold hover:underline hover:text-red-400"
            >
              Manufacturing
            </a>
          </div>
          <div className="bg-[#5e0f0a] text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-100 transition">
            <a
              href="#research"
              className="text-3xl font-semibold hover:underline hover:text-red-400"
            >
              Research
            </a>
          </div>
        </div>
      </section>
           {/* TESTING ******************************************************************/}
      <section
        id="testing"
        className="scroll-mt-20 bg-[#a24646] p-10 flex flex-col md:flex-row items-stretch gap-8 relative"
      >
    
        <div className="md:w-1/2 bg-gray-300 rounded-lg mt-6" />
        <div className="text-left md:w-1/2 self-start mt-6">
          <h2 className="text-4xl font-bold mb-4 text-white">Testing</h2>
          <p className="text-white">
            On-water testing is the team's main priority this year. This gives
            the software team as much time as possible to develop and
            troubleshoot AI, CV, and controls code in an environment similar to
            competition. We test outdoors on a lake as much as possible.
            However, when weather conditions don't allow, indoor pool testing is
            crucial to stay on top of our timeline. In these cases, we use an
            ultrasonic positioning system in lieu of a GPS for positional
            tracking.
          </p>
        </div>
      </section>
   
      {/* DESIGN ******************************************************************/}
      <section
        id="design"
        className="scroll-mt-20 bg-[#a24646] p-10 flex flex-col md:flex-row items-stretch gap-8 relative "
      >
        <div className="text-left md:w-1/2 self-start">
          <h2 className="text-2xl font-bold mb-4 text-white">Design</h2>
          <p className="text-white">
            This year's design cycle is focused on delivering small but
            impactful upgrades to the boat's hardware, and significant changes
            to the main codebase to improve performance in autonomous tasks.
            Some of the main projects are:
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
          </p>
        </div>
        <div className="md:w-1/2 bg-gray-300 rounded-lg" />
      </section>

      {/* MANUFACTURING ******************************************************************/}
      <section
        id="manufacturing"
        className="scroll-mt-20 bg-[#a24646] p-10 flex flex-col md:flex-row items-stretch gap-8 relative"
      >
        {' '}
        <div className="md:w-1/2 h-48 bg-gray-300 rounded-lg" />
        <div className="text-left md:w-1/2 self-start">
          <h2 className="text-2xl font-bold mb-4 text-white">Manufacturing</h2>
          <p className="text-white">SOMETHING!</p>
        </div>
      </section>

      {/* RESEARCH ******************************************************************/}
      <section
        id="research"
        className="scroll-mt-20 bg-[#a24646] p-10 flex flex-col md:flex-row items-stretch gap-8 relative"
      >
        <div className="text-left md:w-1/2 self-start">
          <h2 className="text-2xl font-bold mb-4 text-white">Research</h2>
          <p className="text-white">
            This year's design cycle is focused on delivering small but
            impactful upgrades to the boat's hardware, and significant changes
            to the main codebase to improve performance in autonomous tasks.
            Some of the main projects are:
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
          </p>
        </div>
        <div className="md:w-1/2 bg-gray-300 rounded-lg" />
      </section>

      
    </div>
    </div>
    <section className="bg-[#330503] flex justify-center pt-20 pb-10">
        <div className="w-full max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold mb-2 text-white">Our Network</h2>
          <p className="text-2xl font-normal mb-6 text-white">
            For many of our members, AutoBoat has served as a gateway to
            incredible opportunities in industry. Check out some of the
            companies our current members and alumni have worked at.
          </p>
          <div className="w-full h-90 bg-gray-300 rounded-lg" />
        </div>
      </section>
    </div>
  );
}
