import React from "react";
import Fade from "react-reveal/Fade";

function Services() {
  return (
    <div className="bg-[#4B3C60] pt-14 lg:px-28 px-10 pb-20" id="services">
  <Fade bottom cascade>
    <div className="w-12 h-1 bg-gradient-to-r from-[#FF6F61] to-[#FF1493] rounded-full mb-6"></div>
    <h1 className="text-white text-4xl font-semibold text-center mb-10">Our Features</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Feature 1 */}
      <div className="p-8 bg-[#3C2A4A] text-white rounded-lg shadow-lg flex flex-col justify-center items-start transition-transform transform hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-4">
          <img
            src="https://img.icons8.com/ios/50/ffffff/map.png"
            alt="Heat Map Icon"
            className="w-12 h-12 mr-4"
          />
          <h2 className="text-2xl font-bold">Safety Heat Map</h2>
        </div>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>Visualize areas with high incidents of crimes against women.</li>
          <li>Analyze trends over time to enhance community safety measures.</li>
        </ul>
      </div>

      {/* Feature 2 */}
      <div className="p-8 bg-[#3C2A4A] text-white rounded-lg shadow-lg flex flex-col justify-center items-start transition-transform transform hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-4">
          <img
            src="https://img.icons8.com/ios/50/ffffff/siren.png"
            alt="Emergency Response Icon"
            className="w-12 h-12 mr-4"
          />
          <h2 className="text-2xl font-bold">Emergency Response Tools</h2>
        </div>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>Send distress signals and alerts to emergency contacts.</li>
          <li>Activate sirens to deter threats and draw attention.</li>
          <li>Use voice detection to call for help instantly.</li>
        </ul>
      </div>

      {/* Feature 3 */}
      <div className="p-8 bg-[#3C2A4A] text-white rounded-lg shadow-lg flex flex-col justify-center items-start transition-transform transform hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-4">
          <img
            src="https://img.icons8.com/ios/50/ffffff/book.png"
            alt="Education Icon"
            className="w-12 h-12 mr-4"
          />
          <h2 className="text-2xl font-bold">Education and Awareness</h2>
        </div>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>Provide resources and training on personal safety.</li>
          <li>Raise awareness about available safety technologies.</li>
          <li>Promote community engagement for safety initiatives.</li>
        </ul>
      </div>
    </div>
  </Fade>
</div>

  );
}

export default Services;
