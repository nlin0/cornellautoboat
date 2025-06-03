import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-white w-full">
      <main className="grid grid-cols-1 md:grid-cols-2 bg-[#7d2c20] w-full">
        {/* WHO ARE WE --------------------------------------------------- */}
        <div className="bg-white text-[#7d2c2c] p-6 text-center md:text-left flex items-center justify-center min-h-[300px] md:min-h-[400px]">
          <div className="bg-[#eddada] p-8 text-center">
            <p className="text-4xl font-bold text-[#8B0000]">Who are we?</p>
            <p className="text-3xl font-normal mt-2 text-[#914040]">
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
            <h1 className="tracking-wider text-7xl font-bold">
              CORNELL
            </h1>
            <h1 className="tracking-wider text-7xl font-bold">
              AUTOBOAT
            </h1>
            <p className="tracking-wider text-4xl font-bold mt-2">
              PROJECT TEAM
            </p>
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
