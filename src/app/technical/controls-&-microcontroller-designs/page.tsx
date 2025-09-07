import Image from 'next/image';

export default function Controls() {
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
          <h1 className="tracking-wider text-6xl font-bold">
            {' '}
            Controls & Microcontroller Design
          </h1>
        </div>
      </div>

      <div className="bg-[#330503] py-10">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-white text-lg md:text-xl mb-6">
            The Controls & Microcontrollers team is responsible for all the
            software involved in moving the boat’s motors based on a desired
            movement. This is split into two pieces: control algorithms and
            microcontroller design. In addition, the team works on the sensors
            that feed data into the algorithms used.
          </p>
        </div>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Sensors
          </h2>
          <p className="text-white text-lg md:text-xl text-cente  mb-6">
            The team currently uses a VN-300 INS sensor to obtain positional and
            heading data. Given the narrow paths the boat must pass through,
            obtaining reliable, accurate positional data is key. Out of the box
            GPS systems are typically not accurate enough for this use case, so
            the team is experimenting with methods such as RTK positioning and
            Kalman filtering.
          </p>
        </div>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Controls
          </h2>
          <p className="text-white text-lg md:text-xl text-cente  mb-6">
            The group designs, implements, and tunes our own control algorithms
            to determine what signals need to be sent to the motors to follow
            the path outlined by AI. We use a combination of pure pursuit and
            PID. Pure pursuit is a path tracking algorithm which maintains a
            “lookahead” point on the path some set distance away from the boat.
            As the boat moves, the point advances along the path, so the boat is
            always chasing it. This results in a more natural, smooth path of
            movement.
          </p>
          <div className="w-full h-90 bg-gray-300 rounded-lg mb-6" />

          <p className="text-white text-lg md:text-xl text-center  mb-6">
            Pure pursuit typically outputs the linear and angular velocity the
            vehicle should move at in order to head towards the lookahead point.
            However, we found that controlling on velocity produces rough and
            shaky movements due to the sensitivity of our IMU, a sensor which
            produces velocity readings. This year we decided to transition to
            using heading as the variable we monitor. The algorithm calculates
            the error in heading as the difference between the boat’s current
            heading and its heading if it were pointed directly at the lookahead
            point. We then apply PID control to reduce this error. PID
            (proportional, integrative, derivative) control is a tunable
            equation which takes an error as input, multiplies the error,
            integral of error, and derivative of error by some constants, and
            outputs the offset which is then converted into PWM signals sent to
            move the thrusters.
          </p>
          <div className="w-full h-90 bg-gray-300 rounded-lg mb-6" />

          <p className="text-white text-lg md:text-xl text-center  mb-6">
            When new features eventually get introduced onto the boat, such as a
            robotic arm, the controls group will experiment with more complex
            control mechanisms.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Microcontrollers
          </h2>
          <p className="text-white text-lg md:text-xl text-center mb-6">
            This group also writes our microcontroller firmware. This code
            facilitates communication between the remote controller, the main
            onboard computer, and the motors by translating commands to PWM
            signals that are sent directly to the motors. With each new
            capability added to the boat, such as the skeeball shooter and water
            gun, new features are coded onto the microcontrollers. Currently, we
            use an RP2040-based custom microcontroller for receiving signals
            from the remote controller and writing signals to motors.
          </p>
        </div>
      </div>
    </div>
  );
}
