import Image from 'next/image';

export default function Team() {
  return (
    <div className="bg-[#e8e8e8] min-h-screen font-sans text-white w-full">
      <div className="min-h-screen font-sans text-white w-full">
        <div className="relative w-full min-h-[300px] md:min-h-[400px]">
          <Image
            src="/ABteam2.jpg"
            alt="Team"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(117, 65, 65, 0.57)' }}
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="tracking-wider text-4xl sm:text-6xl lg:text-8xl font-bold mb-4">
              Meet the Team
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl max-w-4xl">
              Our team consists of three subteams: Hardware, Software, and
              Business.
            </p>
          </div>
        </div>

        {/* Team Stats */}
        <div className="bg-[#e8e8e8] w-full flex flex-col justify-center items-center text-center px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-black">
            <div>
              <p className="text-5xl font-bold">2021</p>
              <p className="text-lg">Founded</p>
            </div>
            <div>
              <p className="text-5xl font-bold">50+</p>
              <p className="text-lg">Members</p>
            </div>
            <div>
              <p className="text-5xl font-bold">14</p>
              <p className="text-lg">Different Majors</p>
            </div>
            <div>
              <p className="text-5xl font-bold">4</p>
              <p className="text-lg">Home Countries</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-400 h-1 w-4/5 mx-auto my-10 rounded"></div>

        {/* Team Leads Section */}
        <section className="bg-[#e3dbda] py-16 px-4 text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black font-semibold text-center mb-16">
            Team Leads
          </h2>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 justify-items-center">
              {/* Lead Card 1 */}
              <div className="bg-[#706b6b] w-full max-w-[320px] rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
                <img
                  src="ABteam1.jpg"
                  alt="Name"
                  className="w-full h-60 object-cover"
                />
                <div className="mt-0 p-4">
                  {' '}
                  <h3 className="text-2xl font-semibold italic mb-1">NAME</h3>
                  <p className="font-semibold mb-2">TEAM</p>
                  <div className="mt-2 space-y-0.5 text-sm text-gray-300 leading-tight">
                    <p>EMAIL</p>
                    <p>Year: YEAR</p>
                    <p>Major: MAJOR</p>
                    <p>Hometown: HOMETOWN</p>
                  </div>
                  <div className="mt-0 flex justify-end">
                    {' '}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <img
                        src="/linkedin-icon.svg"
                        alt="LinkedIn"
                        className="w-5 h-5"
                      />
                    </a>
                  </div>
                </div>
                <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
              </div>

              {/* Lead Card 2 */}
              <div className="bg-[#706b6b] w-full max-w-[320px] rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
                <img
                  src="ABteam1.jpg"
                  alt="Name"
                  className="w-full h-60 object-cover"
                />
                <div className="mt-0 p-4">
                  {' '}
                  <h3 className="text-2xl font-semibold italic mb-1">NAME</h3>
                  <p className="font-semibold mb-2">TEAM</p>
                  <div className="mt-2 space-y-0.5 text-sm text-gray-300 leading-tight">
                    <p>EMAIL</p>
                    <p>Year: YEAR</p>
                    <p>Major: MAJOR</p>
                    <p>Hometown: HOMETOWN</p>
                  </div>
                  <div className="mt-0 flex justify-end">
                    {' '}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <img
                        src="/linkedin-icon.svg"
                        alt="LinkedIn"
                        className="w-5 h-5"
                      />
                    </a>
                  </div>
                </div>
                <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Hardware Section */}
        <section className="bg-[#e3dbda] py-16 px-4 text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black font-semibold text-center mb-16">
            Hardware
          </h2>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-lg text-black font-semibold mb-4">
              Hardware designs and manufactures the boat’s electromechanical
              system!
            </p>
            <p className="text-sm text-black leading-relaxed">
              This involves doing CAD and ECAD, running simulations, machining,
              working with composites, working with power tools, soldering and
              assembling electrical components, among other technical skills.
              Members of the hardware team gain a lot of valuable hands-on
              experience, while also being able to apply concepts learned in
              class to their work during the design process.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              {/* Hardware Cards */}
              <div className="bg-[#706b6b] w-full max-w-[320px] rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
                <img
                  src="ABteam1.jpg"
                  alt="Name"
                  className="w-full h-60 object-cover"
                />
                <div className="mt-0 p-4">
                  {' '}
                  <h3 className="text-2xl font-semibold italic mb-1">NAME</h3>
                  <p className="font-semibold mb-2">TEAM</p>
                  <div className="mt-2 space-y-0.5 text-sm text-gray-300 leading-tight">
                    <p>EMAIL</p>
                    <p>Year: YEAR</p>
                    <p>Major: MAJOR</p>
                    <p>Hometown: HOMETOWN</p>
                  </div>
                  <div className="mt-0 flex justify-end">
                    {' '}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <img
                        src="/linkedin-icon.svg"
                        alt="LinkedIn"
                        className="w-5 h-5"
                      />
                    </a>
                  </div>
                </div>
                <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
              </div>
              <div className="bg-[#706b6b] w-full max-w-[320px] rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
                <img
                  src="ABteam1.jpg"
                  alt="Name"
                  className="w-full h-60 object-cover"
                />
                <div className="mt-0 p-4">
                  {' '}
                  <h3 className="text-2xl font-semibold italic mb-1">NAME</h3>
                  <p className="font-semibold mb-2">TEAM</p>
                  <div className="mt-2 space-y-0.5 text-sm text-gray-300 leading-tight">
                    <p>EMAIL</p>
                    <p>Year: YEAR</p>
                    <p>Major: MAJOR</p>
                    <p>Hometown: HOMETOWN</p>
                  </div>
                  <div className="mt-0 flex justify-end">
                    {' '}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <img
                        src="/linkedin-icon.svg"
                        alt="LinkedIn"
                        className="w-5 h-5"
                      />
                    </a>
                  </div>
                </div>
                <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
              </div>
              <div className="bg-[#706b6b] w-full max-w-[320px] rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
                <img
                  src="ABteam1.jpg"
                  alt="Name"
                  className="w-full h-60 object-cover"
                />
                <div className="mt-0 p-4">
                  {' '}
                  <h3 className="text-2xl font-semibold italic mb-1">NAME</h3>
                  <p className="font-semibold mb-2">TEAM</p>
                  <div className="mt-2 space-y-0.5 text-sm text-gray-300 leading-tight">
                    <p>EMAIL</p>
                    <p>Year: YEAR</p>
                    <p>Major: MAJOR</p>
                    <p>Hometown: HOMETOWN</p>
                  </div>
                  <div className="mt-0 flex justify-end">
                    {' '}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <img
                        src="/linkedin-icon.svg"
                        alt="LinkedIn"
                        className="w-5 h-5"
                      />
                    </a>
                  </div>
                </div>
                <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
              </div>
              <div className="bg-[#706b6b] w-full max-w-[320px] rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
                <img
                  src="ABteam1.jpg"
                  alt="Name"
                  className="w-full h-60 object-cover"
                />
                <div className="mt-0 p-4">
                  {' '}
                  <h3 className="text-2xl font-semibold italic mb-1">NAME</h3>
                  <p className="font-semibold mb-2">TEAM</p>
                  <div className="mt-2 space-y-0.5 text-sm text-gray-300 leading-tight">
                    <p>EMAIL</p>
                    <p>Year: YEAR</p>
                    <p>Major: MAJOR</p>
                    <p>Hometown: HOMETOWN</p>
                  </div>
                  <div className="mt-0 flex justify-end">
                    {' '}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <img
                        src="/linkedin-icon.svg"
                        alt="LinkedIn"
                        className="w-5 h-5"
                      />
                    </a>
                  </div>
                </div>
                <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Software Section */}
        <section className="bg-[#e3dbda] py-16 px-4 text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black font-semibold text-center mb-8">
            Software
          </h2>

          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-lg text-black font-semibold mb-4">
              Software is responsible for researching, developing, and testing
              all computer programs which enable the boat to operate
              autonomously!
            </p>
            <p className="text-sm text-black leading-relaxed">
              This includes building computer vision systems, implementing
              AI-driven navigation and control algorithms, designing
              microcontroller software, integrating different processes through
              ROS, and developing simulation frameworks for testing. Members on
              Software are primarily CS and ECE majors with interdisciplinary
              interests, a passion for innovation, and dedication to see their
              projects through.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              {/* Software Cards */}
              <div className="bg-[#706b6b] w-full max-w-[320px] rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
                <img
                  src="ABteam1.jpg"
                  alt="Name"
                  className="w-full h-60 object-cover"
                />
                <div className="mt-0 p-4">
                  {' '}
                  <h3 className="text-2xl font-semibold italic mb-1">NAME</h3>
                  <p className="font-semibold mb-2">TEAM</p>
                  <div className="mt-2 space-y-0.5 text-sm text-gray-300 leading-tight">
                    <p>EMAIL</p>
                    <p>Year: YEAR</p>
                    <p>Major: MAJOR</p>
                    <p>Hometown: HOMETOWN</p>
                  </div>
                  <div className="mt-0 flex justify-end">
                    {' '}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <img
                        src="/linkedin-icon.svg"
                        alt="LinkedIn"
                        className="w-5 h-5"
                      />
                    </a>
                  </div>
                </div>
                <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
              </div>
              <div className="bg-[#706b6b] w-full max-w-[320px] rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
                <img
                  src="ABteam1.jpg"
                  alt="Name"
                  className="w-full h-60 object-cover"
                />
                <div className="mt-0 p-4">
                  {' '}
                  <h3 className="text-2xl font-semibold italic mb-1">NAME</h3>
                  <p className="font-semibold mb-2">TEAM</p>
                  <div className="mt-2 space-y-0.5 text-sm text-gray-300 leading-tight">
                    <p>EMAIL</p>
                    <p>Year: YEAR</p>
                    <p>Major: MAJOR</p>
                    <p>Hometown: HOMETOWN</p>
                  </div>
                  <div className="mt-0 flex justify-end">
                    {' '}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <img
                        src="/linkedin-icon.svg"
                        alt="LinkedIn"
                        className="w-5 h-5"
                      />
                    </a>
                  </div>
                </div>
                <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
              </div>
              <div className="bg-[#706b6b] w-full max-w-[320px] rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
                <img
                  src="ABteam1.jpg"
                  alt="Name"
                  className="w-full h-60 object-cover"
                />
                <div className="mt-0 p-4">
                  {' '}
                  <h3 className="text-2xl font-semibold italic mb-1">NAME</h3>
                  <p className="font-semibold mb-2">TEAM</p>
                  <div className="mt-2 space-y-0.5 text-sm text-gray-300 leading-tight">
                    <p>EMAIL</p>
                    <p>Year: YEAR</p>
                    <p>Major: MAJOR</p>
                    <p>Hometown: HOMETOWN</p>
                  </div>
                  <div className="mt-0 flex justify-end">
                    {' '}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <img
                        src="/linkedin-icon.svg"
                        alt="LinkedIn"
                        className="w-5 h-5"
                      />
                    </a>
                  </div>
                </div>
                <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
              </div>
              <div className="bg-[#706b6b] w-full max-w-[320px] rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
                <img
                  src="ABteam1.jpg"
                  alt="Name"
                  className="w-full h-60 object-cover"
                />
                <div className="mt-0 p-4">
                  {' '}
                  <h3 className="text-2xl font-semibold italic mb-1">NAME</h3>
                  <p className="font-semibold mb-2">TEAM</p>
                  <div className="mt-2 space-y-0.5 text-sm text-gray-300 leading-tight">
                    <p>EMAIL</p>
                    <p>Year: YEAR</p>
                    <p>Major: MAJOR</p>
                    <p>Hometown: HOMETOWN</p>
                  </div>
                  <div className="mt-0 flex justify-end">
                    {' '}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <img
                        src="/linkedin-icon.svg"
                        alt="LinkedIn"
                        className="w-5 h-5"
                      />
                    </a>
                  </div>
                </div>
                <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
              </div>
            </div>
          </div>
        </section>
        {/* USE THIS ONE FOR CARDS!!!!*/}
        <section className="bg-[#e3dbda] py-16 px-4 text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black font-semibold text-center mb-8">
            Business & Outreach
          </h2>

          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-lg text-black font-semibold mb-4">
              Business organizes the team’s funding for supplies, apparel,
              software licensing, and works with Outreach as the team’s public
              facing arm
            </p>
            <p className="text-sm text-black leading-relaxed">
              Outreach organizes events with local schools and organizations to
              link our team with the Ithaca community, as well as to inspire the
              next generation of engineers and scientists
            </p>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8 justify-items-center">
            {/* CARD STARTS HERE*/}
            <div className="bg-[#706b6b] w-full max-w-[320px] rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
              <img
                src="ABteam1.jpg"
                alt="Name"
                className="w-full h-60 object-cover"
              />
              <div className="mt-0 p-4">
                {' '}
                <h3 className="text-2xl font-semibold italic mb-1">NAME</h3>
                <p className="font-semibold mb-2">TEAM</p>
                <div className="mt-2 space-y-0.5 text-sm text-gray-300 leading-tight">
                  <p>EMAIL</p>
                  <p>Year: YEAR</p>
                  <p>Major: MAJOR</p>
                  <p>Hometown: HOMETOWN</p>
                </div>
                <div className="mt-0 flex justify-end">
                  {' '}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src="/linkedin-icon.svg"
                      alt="LinkedIn"
                      className="w-5 h-5"
                    />
                  </a>
                </div>
              </div>
              <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
            </div>

             <div className="bg-[#706b6b] w-full max-w-[320px] rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
              <img
                src="ABteam1.jpg"
                alt="Name"
                className="w-full h-60 object-cover"
              />
              <div className="mt-0 p-4">
                {' '}
                <h3 className="text-2xl font-semibold italic mb-1">NAME</h3>
                <p className="font-semibold mb-2">TEAM</p>
                <div className="mt-2 space-y-0.5 text-sm text-gray-300 leading-tight">
                  <p>EMAIL</p>
                  <p>Year: YEAR</p>
                  <p>Major: MAJOR</p>
                  <p>Hometown: HOMETOWN</p>
                </div>
                <div className="mt-0 flex justify-end">
                  {' '}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src="/linkedin-icon.svg"
                      alt="LinkedIn"
                      className="w-5 h-5"
                    />
                  </a>
                </div>
              </div>
              <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
            </div>
             <div className="bg-[#706b6b] w-full max-w-[320px] rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
              <img
                src="ABteam1.jpg"
                alt="Name"
                className="w-full h-60 object-cover"
              />
              <div className="mt-0 p-4">
                {' '}
                <h3 className="text-2xl font-semibold italic mb-1">NAME</h3>
                <p className="font-semibold mb-2">TEAM</p>
                <div className="mt-2 space-y-0.5 text-sm text-gray-300 leading-tight">
                  <p>EMAIL</p>
                  <p>Year: YEAR</p>
                  <p>Major: MAJOR</p>
                  <p>Hometown: HOMETOWN</p>
                </div>
                <div className="mt-0 flex justify-end">
                  {' '}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src="/linkedin-icon.svg"
                      alt="LinkedIn"
                      className="w-5 h-5"
                    />
                  </a>
                </div>
              </div>
              <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
            </div>
             <div className="bg-[#706b6b] w-full max-w-[320px] rounded-t-3xl overflow-hidden shadow-lg rounded-b-3xl">
              <img
                src="ABteam1.jpg"
                alt="Name"
                className="w-full h-60 object-cover"
              />
              <div className="mt-0 p-4">
                {' '}
                <h3 className="text-2xl font-semibold italic mb-1">NAME</h3>
                <p className="font-semibold mb-2">TEAM</p>
                <div className="mt-2 space-y-0.5 text-sm text-gray-300 leading-tight">
                  <p>EMAIL</p>
                  <p>Year: YEAR</p>
                  <p>Major: MAJOR</p>
                  <p>Hometown: HOMETOWN</p>
                </div>
                <div className="mt-0 flex justify-end">
                  {' '}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src="/linkedin-icon.svg"
                      alt="LinkedIn"
                      className="w-5 h-5"
                    />
                  </a>
                </div>
              </div>
              <div className="w-full h-6 bg-[#260603] rounded-b-full"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
