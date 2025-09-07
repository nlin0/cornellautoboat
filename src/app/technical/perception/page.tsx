import Image from 'next/image';

export default function Perception() {
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
          <h1 className="tracking-wider text-9xl font-bold"> Perception</h1>
        </div>
      </div>

      <div className="bg-[#330503] py-10">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-white text-lg md:text-xl mb-6">
            The Perception team is responsible for translating the boat’s
            surroundings, position, and orientation into information useful for
            decision making. This encompasses both computer vision and sensors.
          </p>
        </div>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Computer Vision
          </h2>
          <p className="text-white text-lg md:text-xl text-cente  mb-6">
            Members working on computer vision spend time researching neural
            networks, building and training an object detection model,
            augmenting and annotating data, and integrating the model with our
            ZED 2i camera. The CV group had one main goal this semester: to make
            our model more robust. Some of the annotations were inaccurate
            leading the model to recognize objects incorrectly. We worked on
            correcting these annotations to ensure the model was given the best
            possible data to be trained on.
          </p>
          <div className="w-full h-90 bg-gray-300 rounded-lg mb-6" />

          <p className="text-white text-lg md:text-xl text-center  mb-6">
            A big project the CV group has been working on is creating a testing plan to go about choosing the best YOLO model that suits our needs and produces the best results. We researched each YOLO model version and size and noted their advantages and disadvantages. We then went out testing these YOLO model versions and sizes and ultimately saw that YOLOv8 yielded the best results.
          </p>
          <p className="text-white text-lg md:text-xl text-center  mb-10">
            A future goal of the CV group is building a neural network from scratch to serve as our new object detection model. There has been some progress on this but it is still in its elementary development phase.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Sensors
          </h2>
          <p className="text-white text-lg md:text-xl text-center mb-6">
            Our sensor suite includes a ZED2i stereo camera, SparkFun MicroMod GNSS boards, and a Vectornav VN-300 GPS/IMU. The sensors group works closely with members of the Controls & Microcontrollers and Electrical Systems groups to integrate the sensors into our microcontroller framework.
          </p>
          <p className="text-white text-lg md:text-xl text-center  mb-6">
            In the future, we hope to integrate LiDAR into our sensor suite for more robust depth sensing and confirmation of the objects detected by CV.
          </p>
        </div>
      </div>
    </div>
  );
}
