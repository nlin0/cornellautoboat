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

     {/* IMAGINATIVE Section 1 */}
<section className="bg-[#a24646] p-10 flex flex-col md:flex-row items-center gap-8">
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
<section className="bg-[#a24646] p-10 flex flex-col md:flex-row items-center gap-8">
  <div className="md:w-1/2 h-48 bg-gray-300 rounded-lg" />
  <div className="text-left md:w-1/2 self-start">
    <h2 className="text-2xl font-bold mb-4 text-white">INNOVATIVE</h2>
    <p className="text-white">
      Write Something Here
    </p>
  </div>
</section>
{/* SOMETHING Section 3 */}
<section className="bg-[#a24646] p-10 flex flex-col md:flex-row items-center gap-8">
  <div className="text-left md:w-1/2 self-start">
    <h2 className="text-2xl font-bold mb-4 text-white"> SOMETHING </h2>
    <p className="text-white">
      SOMETHING!
    </p>
  </div>
  <div className="md:w-1/2 h-48 bg-gray-300 rounded-lg" />
</section>
<section className="bg-[#1e293b] min-h-screen flex justify-center pt-20 pb-0">
  <div className="text-center">
    <h2 className="text-4xl font-bold mb-4 text-white">Check out our team video!</h2>
     <div className= "w-full h-48 bg-gray-300 rounded-lg" />
  </div>
</section>


    </div>
  );
}
