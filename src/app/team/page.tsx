import Image from 'next/image';

export default function Team() {
  return (
    <div className="min-h-screen font-sans text-white w-full">
      {/* TOP SECTION - Light red bg */}
      <div className="bg-[#a24646] w-full flex flex-col justify-center items-center text-center px-5 py-16">
        <h1 className="tracking-wider text-5xl md:text-7xl font-normal mb-6">
          Meet Our Team!
        </h1>
        <p className="text-2xl">
          Our team consists of three subteams: Hardware, Software, and Business.
        </p>
      </div>

      {/* MIDDLE SECTION - Darker red overlay */}
      <div className="bg-[#a24646] relative w-full min-h-[200px] md:min-h-[200px]">
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-3/4 h-full"
          style={{ backgroundColor: 'rgba(125, 46, 46, 0.75)' }}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5">
          {/* Add content here */}
        </div>
      </div>

      {/* BOTTOM STRIP - Light red bg */}
      <div className="bg-[#a24646] w-full flex flex-col justify-center items-center text-center px-5 py-8">
        <p className="text-xl md:text-2xl"> </p>
      </div>

      {/* TEAM SECTION TEAM LEADS_____________________________________________________________________ */}
      <section className="bg-[#e3dbda] py-16 px-4 text-white">
        <h2 className="text-4xl text-black md:text-5xl font-semibold text-center mb-12">
          Team Leads
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-start gap-10">
          {/* Card 1 */}
          <div className="bg-[#706b6b] w-full md:w-[350px]  rounded-t-lg overflow-hidden shadow-lg rounded-b-3xl">
            <img
              src="/path/to/photo1.jpg"
              alt="Name"
              className="w-full h-75 object-cove "
            />
            <div className="p-4">
              <p className="text-white text-sm">Full Team Lead</p>
              <h3 className="text-2xl font-semibold italic">NAME</h3>
              <p className="font-semibold mt-1">Team</p>
              <p className="text-sm text-white-300">EMAIL</p>
              <p className="text-sm text-white-300">Year: YEAR</p>
              <p className="text-sm text-white-300">Major: MAJOR </p>
              <p className="text-sm text-white-300">Hometown: HOMETOWN</p>
              <div className="mt-2 flex justify-end">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/linkedin-icon.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            {/* Rounded bottom piece */}
            <div className="w-full h-6 bg-[#a9a3a3] rounded-b-full"></div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#706b6b] w-full md:w-[350px]  rounded-t-lg overflow-hidden shadow-lg rounded-b-3xl">
            <img
              src="/path/to/photo1.jpg"
              alt="Name"
              className="w-full h-75 object-cove "
            />
            <div className="p-4">
              <p className="text-white text-sm">Full Team Lead</p>
              <h3 className="text-2xl font-semibold italic">NAME</h3>
              <p className="font-semibold mt-1">Team</p>
              <p className="text-sm text-white-300">EMAIL</p>
              <p className="text-sm text-white-300">Year: YEAR</p>
              <p className="text-sm text-white-300">Major: MAJOR </p>
              <p className="text-sm text-white-300">Hometown: HOMETOWN</p>
              <div className="mt-2 flex justify-end">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/linkedin-icon.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            {/* Rounded bottom piece */}
            <div className="w-full h-6 bg-[#a9a3a3] rounded-b-full"></div>
          </div>
        </div>
      </section>
      {/* TEAM SECTION HARDWARE_____________________________________________________________________ */}
      <section className="bg-[#e3dbda] py-16 px-4 text-white">
        <h2 className="text-4xl text-black md:text-5xl font-semibold text-center mb-12">
          Hardware
        </h2>
        {/* ROW 1_____________________________________________________________________ */}
        <div className="bg-[#e3dbda] p-10 flex flex-col md:flex-row justify-center items-start gap-5 max-w-[1450px] mx-auto ">
          {' '}
        </div>
        <div className="flex flex-col md:flex-row justify-center items-start gap-10">
          {/* Card 1 */}

          <div className="bg-[#706b6b] w-full md:w-[350px]  rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
            <img
              src="/path/to/photo1.jpg"
              alt="Name"
              className="w-full h-75 object-cove "
            />
            <div className="p-4">
              <p className="text-white text-sm">Full Team Lead</p>
              <h3 className="text-2xl font-semibold italic">NAME</h3>
              <p className="font-semibold mt-1">Team</p>
              <p className="text-sm text-white-300">EMAIL</p>
              <p className="text-sm text-white-300">Year: YEAR</p>
              <p className="text-sm text-white-300">Major: MAJOR </p>
              <p className="text-sm text-white-300">Hometown: HOMETOWN</p>
              <div className="mt-2 flex justify-end">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/linkedin-icon.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            {/* Rounded bottom piece */}
            <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
          </div>
          {/* Card 2 */}

          <div className="bg-[#706b6b] w-full md:w-[350px]  rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
            <img
              src="/path/to/photo1.jpg"
              alt="Name"
              className="w-full h-75 object-cove "
            />
            <div className="p-4">
              <p className="text-white text-sm">Full Team Lead</p>
              <h3 className="text-2xl font-semibold italic">NAME</h3>
              <p className="font-semibold mt-1">Team</p>
              <p className="text-sm text-white-300">EMAIL</p>
              <p className="text-sm text-white-300">Year: YEAR</p>
              <p className="text-sm text-white-300">Major: MAJOR </p>
              <p className="text-sm text-white-300">Hometown: HOMETOWN</p>
              <div className="mt-2 flex justify-end">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/linkedin-icon.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            {/* Rounded bottom piece */}
            <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
          </div>
          {/* Card 3 */}

          <div className="bg-[#706b6b] w-full md:w-[350px]  rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
            <img
              src="/path/to/photo1.jpg"
              alt="Name"
              className="w-full h-75 object-cove "
            />
            <div className="p-4">
              <p className="text-white text-sm">Full Team Lead</p>
              <h3 className="text-2xl font-semibold italic">NAME</h3>
              <p className="font-semibold mt-1">Team</p>
              <p className="text-sm text-white-300">EMAIL</p>
              <p className="text-sm text-white-300">Year: YEAR</p>
              <p className="text-sm text-white-300">Major: MAJOR </p>
              <p className="text-sm text-white-300">Hometown: HOMETOWN</p>
              <div className="mt-2 flex justify-end">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/linkedin-icon.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            {/* Rounded bottom piece */}
            <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
          </div>
          {/* Card 4 */}

          <div className="bg-[#706b6b] w-full md:w-[350px]  rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
            <img
              src="/path/to/photo1.jpg"
              alt="Name"
              className="w-full h-75 object-cove "
            />
            <div className="p-4">
              <p className="text-white text-sm">Full Team Lead</p>
              <h3 className="text-2xl font-semibold italic">NAME</h3>
              <p className="font-semibold mt-1">Team</p>
              <p className="text-sm text-white-300">EMAIL</p>
              <p className="text-sm text-white-300">Year: YEAR</p>
              <p className="text-sm text-white-300">Major: MAJOR </p>
              <p className="text-sm text-white-300">Hometown: HOMETOWN</p>
              <div className="mt-2 flex justify-end">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/linkedin-icon.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            {/* Rounded bottom piece */}
            <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
          </div>
        </div>
        {/* ROW 2_____________________________________________________________________ */}

        {/* ROW 3_____________________________________________________________________ */}

        {/* ROW 4_____________________________________________________________________ */}

        {/* ROW 5_____________________________________________________________________ */}

        {/* ROW 6_____________________________________________________________________ */}
      </section>

      {/* TEAM SECTION SOFTWARE_____________________________________________________________________ */}
      <section className="bg-[#e3dbda] py-16 px-4 text-white">
        <h2 className="text-4xl  text-black md:text-5xl font-semibold text-center mb-12">
          Software
        </h2>
        <p className="text-md text-black font-semibold text-center mb-12">
          Software is responsible for researching, developing, and testing all
          computer programs which enable the boat to operate autonomously! 
          <div className="w-full h-6 bg-[#e3dbda] rounded-b-full"></div>
          <p className="text-sm text-black font-semibold text-center mb-12 max-w-4xl mx-auto ">

          This includes building computer vision systems, implementing AI-driven
          navigation and control algorithms, designing microcontroller software,
          integrating different processes through ROS, and developing simulation
          frameworks for testing. Members on Software are primarily CS and ECE
          majors with interdisciplinary interests, a passion for innovation, and
          dedication to see their projects through.
        </p>
        </p>
        
        {/* ROW 1_____________________________________________________________________ */}
        <div className="bg-[#e3dbda] p-10 flex flex-col md:flex-row justify-center items-start gap-5 max-w-[1450px] mx-auto ">
          {' '}
        </div>
        <div className="flex flex-col md:flex-row justify-center items-start gap-10">
          {/* Card 1 */}

          <div className="bg-[#706b6b] w-full md:w-[350px]  rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
            <img
              src="/path/to/photo1.jpg"
              alt="Name"
              className="w-full h-75 object-cove "
            />
            <div className="p-4">
              <p className="text-white text-sm">Full Team Lead</p>
              <h3 className="text-2xl font-semibold italic">NAME</h3>
              <p className="font-semibold mt-1">Team</p>
              <p className="text-sm text-white-300">EMAIL</p>
              <p className="text-sm text-white-300">Year: YEAR</p>
              <p className="text-sm text-white-300">Major: MAJOR </p>
              <p className="text-sm text-white-300">Hometown: HOMETOWN</p>
              <div className="mt-2 flex justify-end">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/linkedin-icon.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            {/* Rounded bottom piece */}
            <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
          </div>
          {/* Card 2 */}

          <div className="bg-[#706b6b] w-full md:w-[350px]  rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
            <img
              src="/path/to/photo1.jpg"
              alt="Name"
              className="w-full h-75 object-cove "
            />
            <div className="p-4">
              <p className="text-white text-sm">Full Team Lead</p>
              <h3 className="text-2xl font-semibold italic">NAME</h3>
              <p className="font-semibold mt-1">Team</p>
              <p className="text-sm text-white-300">EMAIL</p>
              <p className="text-sm text-white-300">Year: YEAR</p>
              <p className="text-sm text-white-300">Major: MAJOR </p>
              <p className="text-sm text-white-300">Hometown: HOMETOWN</p>
              <div className="mt-2 flex justify-end">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/linkedin-icon.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            {/* Rounded bottom piece */}
            <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
          </div>
          {/* Card 3 */}

          <div className="bg-[#706b6b] w-full md:w-[350px]  rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
            <img
              src="/path/to/photo1.jpg"
              alt="Name"
              className="w-full h-75 object-cove "
            />
            <div className="p-4">
              <p className="text-white text-sm">Full Team Lead</p>
              <h3 className="text-2xl font-semibold italic">NAME</h3>
              <p className="font-semibold mt-1">Team</p>
              <p className="text-sm text-white-300">EMAIL</p>
              <p className="text-sm text-white-300">Year: YEAR</p>
              <p className="text-sm text-white-300">Major: MAJOR </p>
              <p className="text-sm text-white-300">Hometown: HOMETOWN</p>
              <div className="mt-2 flex justify-end">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/linkedin-icon.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            {/* Rounded bottom piece */}
            <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
          </div>
          {/* Card 4 */}

          <div className="bg-[#706b6b] w-full md:w-[350px]  rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
            <img
              src="/path/to/photo1.jpg"
              alt="Name"
              className="w-full h-75 object-cove "
            />
            <div className="p-4">
              <p className="text-white text-sm">Full Team Lead</p>
              <h3 className="text-2xl font-semibold italic">NAME</h3>
              <p className="font-semibold mt-1">Team</p>
              <p className="text-sm text-white-300">EMAIL</p>
              <p className="text-sm text-white-300">Year: YEAR</p>
              <p className="text-sm text-white-300">Major: MAJOR </p>
              <p className="text-sm text-white-300">Hometown: HOMETOWN</p>
              <div className="mt-2 flex justify-end">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/linkedin-icon.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            {/* Rounded bottom piece */}
            <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
          </div>
        </div>
        {/* ROW 2_____________________________________________________________________ */}

        {/* ROW 3_____________________________________________________________________ */}

        {/* ROW 4_____________________________________________________________________ */}

        {/* ROW 5_____________________________________________________________________ */}

        {/* ROW 6_____________________________________________________________________ */}
      </section>

      {/* TEAM SECTION SOFTWARE_____________________________________________________________________ */}
      <section className="bg-[#e3dbda] py-16 px-4 text-white">
        <h2 className="text-4xl text-black md:text-5xl font-semibold text-center mb-12">
          Business
        </h2>
      
        
        {/* ROW 1_____________________________________________________________________ */}
        <div className="bg-[#e3dbda] p-10 flex flex-col md:flex-row justify-center items-start gap-5 max-w-[1450px] mx-auto ">
          {' '}
        </div>
        <div className="flex flex-col md:flex-row justify-center items-start gap-10">
          {/* Card 1 */}

          <div className="bg-[#706b6b] w-full md:w-[350px]  rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
            <img
              src="/path/to/photo1.jpg"
              alt="Name"
              className="w-full h-75 object-cove "
            />
            <div className="p-4">
              <p className="text-white text-sm">Full Team Lead</p>
              <h3 className="text-2xl font-semibold italic">NAME</h3>
              <p className="font-semibold mt-1">Team</p>
              <p className="text-sm text-white-300">EMAIL</p>
              <p className="text-sm text-white-300">Year: YEAR</p>
              <p className="text-sm text-white-300">Major: MAJOR </p>
              <p className="text-sm text-white-300">Hometown: HOMETOWN</p>
              <div className="mt-2 flex justify-end">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/linkedin-icon.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            {/* Rounded bottom piece */}
            <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
          </div>
          {/* Card 2 */}

          <div className="bg-[#706b6b] w-full md:w-[350px]  rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
            <img
              src="/path/to/photo1.jpg"
              alt="Name"
              className="w-full h-75 object-cove "
            />
            <div className="p-4">
              <p className="text-white text-sm">Full Team Lead</p>
              <h3 className="text-2xl font-semibold italic">NAME</h3>
              <p className="font-semibold mt-1">Team</p>
              <p className="text-sm text-white-300">EMAIL</p>
              <p className="text-sm text-white-300">Year: YEAR</p>
              <p className="text-sm text-white-300">Major: MAJOR </p>
              <p className="text-sm text-white-300">Hometown: HOMETOWN</p>
              <div className="mt-2 flex justify-end">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/linkedin-icon.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            {/* Rounded bottom piece */}
            <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
          </div>
          {/* Card 3 */}

          <div className="bg-[#706b6b] w-full md:w-[350px]  rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
            <img
              src="/path/to/photo1.jpg"
              alt="Name"
              className="w-full h-75 object-cove "
            />
            <div className="p-4">
              <p className="text-white text-sm">Full Team Lead</p>
              <h3 className="text-2xl font-semibold italic">NAME</h3>
              <p className="font-semibold mt-1">Team</p>
              <p className="text-sm text-white-300">EMAIL</p>
              <p className="text-sm text-white-300">Year: YEAR</p>
              <p className="text-sm text-white-300">Major: MAJOR </p>
              <p className="text-sm text-white-300">Hometown: HOMETOWN</p>
              <div className="mt-2 flex justify-end">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/linkedin-icon.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            {/* Rounded bottom piece */}
            <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
          </div>
          {/* Card 4 */}

          <div className="bg-[#706b6b] w-full md:w-[350px]  rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
            <img
              src="/path/to/photo1.jpg"
              alt="Name"
              className="w-full h-75 object-cove "
            />
            <div className="p-4">
              <p className="text-white text-sm">Full Team Lead</p>
              <h3 className="text-2xl font-semibold italic">NAME</h3>
              <p className="font-semibold mt-1">Team</p>
              <p className="text-sm text-white-300">EMAIL</p>
              <p className="text-sm text-white-300">Year: YEAR</p>
              <p className="text-sm text-white-300">Major: MAJOR </p>
              <p className="text-sm text-white-300">Hometown: HOMETOWN</p>
              <div className="mt-2 flex justify-end">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/linkedin-icon.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            {/* Rounded bottom piece */}
            <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
          </div>
        </div>
        {/* ROW 2_____________________________________________________________________ */}

        {/* ROW 3_____________________________________________________________________ */}

        {/* ROW 4_____________________________________________________________________ */}

        {/* ROW 5_____________________________________________________________________ */}

        {/* ROW 6_____________________________________________________________________ */}
      </section>
      
    </div>
     
  );
}
