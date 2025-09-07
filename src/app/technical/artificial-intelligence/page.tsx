import Image from 'next/image';

export default function ArtificialIntelligence() {
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
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5">
          <h1 className="tracking-wider text-9xl font-bold">
            {' '}
            Artificial Intelligence
          </h1>
        </div>
      </div>

      <div className="bg-[#330503] py-10">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-white text-lg md:text-xl mb-6">
            The AI team writes all the code behind the autonomous decision
            making abilities of the boat. Their responsibilities include
            researching, developing, and testing algorithms for motion planning
            while brainstorming efficient strategies to tackle the competition
            tasks and transitions between tasks. This group works the most
            closely with our codebase, continuously improving it each year by
            focusing on great code quality, efficiency, and test coverage. ​
          </p>
          <p className="text-white text-lg md:text-xl mb-6">
            The job of the AI team can be seen from an input/output perspective:
            the code receives input from the sensors regarding where the boat is
            and what it sees, and outputs a path of waypoints. Waypoints can be
            thought of as GPS coordinates the boat should follow to accomplish
            the task at hand. Waypoints are selected with the A* algorithm or
            specialized task-specific algorithms. After selecting the main
            path-defining waypoints, we apply algorithms to inject waypoints
            every meter and smooth the resulting path to eliminate any harsh
            angles.
          </p>
          <div className="w-full h-90 bg-gray-300 rounded-lg mb-6" />
          <p className="text-white text-lg md:text-xl mb-6">
            A large part of the AI team’s work is testing their code. This
            includes unit testing our math-heavy functions, generating
            visualizations of static path planning examples, running the code in
            simulation frameworks, and observing the behavior of the boat during
            water testing.
          </p>
          <div className="w-full h-90 bg-gray-300 rounded-lg mb-6" />
          <p className="text-white text-lg md:text-xl mb-6">
            Future goals of the AI team include improving our collision
            detection and avoidance techniques and incorporating more advanced
            path planning algorithms across all tasks.
          </p>
        </div>
      </div>
    </div>
  );
}
