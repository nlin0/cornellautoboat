import Image from 'next/image';
{/* TEAM SECTION ******************************************************************/}
export default function About() {
  return (
    <div className="min-h-screen font-sans text-white w-full">
      <div className="relative w-full min-h-[300px] md:min-h-[250px]">
       
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(110, 10, 10, 0.57)' }}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5 ">
          <h1 className="tracking-wider text-7xl font-normal p-10">Meet Our Team!</h1>
          <p className="text-white text-2xl" > Our team consists of three subteams: Hardware, Software, and Business. </p>
        </div>
      </div>
</div>
  );
}
