import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-white">
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-[#7d2c2c]">
        <div className="bg-white text-[#7d2c2c] p-6 rounded-lg shadow-md text-center md:text-left">
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md text-center">
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              who are we?
            </p>
            <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
              innovative
            </p>
          </div>
        </div>

        {/* RIGHT SIDE --------------------------------------------*/}
        <div className="relative w-full h-80 md:h-[400px]">
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              CORNELL AUTOBOAT
            </h1>
            <p className="text-xl font-bold mt-2">PROJECT TEAM</p>
          </div>
        </div>
      </main>

      {/* IMAGINATIVE Section  --------------------------------------------  */}
      <section className="bg-[#a24646] p-10 flex flex-col md:flex-row items-center gap-8">
        <div className="text-left max-w-xl">
          <h2 className="text-2xl font-bold mb-4">IMAGINATIVE</h2>
          <p>
            We are a student-run team of hardware and software engineers,
            dedicated to building and innovating in the field of naval
            architecture and marine robotics.
          </p>
        </div>
        <div className="w-full h-48 bg-gray-300 rounded-lg" />
      </section>
    </div>
  );
}
