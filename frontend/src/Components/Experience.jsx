import React from 'react';
import Fade from "react-reveal/Fade";

function Experience() {
  return (
    <div className="bg-[#4B3C60] lg:px-28 px-10 pt-14 pb-10" id="experience">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Fade bottom cascade>
        <div className="flex items-center justify-center">
          <img
            src="https://zesty-cajeta-af510d.netlify.app/employee.svg" // Replace with an appropriate image URL
            alt="Women Safety Initiative"
            className="w-auto h-[300px] object-contain rounded-lg shadow-lg"
          />
        </div>
      </Fade>
      <Fade bottom cascade>
        <div className="flex flex-col justify-center text-center lg:text-left">
          <div className="w-36 h-2 bg-gradient-to-r from-[#FF6F61] to-[#FF1493] mb-6 rounded-full mx-auto lg:mx-0"></div>
          <h1 className="font-semibold text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 leading-tight">
            Empowering Women Through Safety Innovations
          </h1>
          <p className="text-white text-lg mb-6">
            Experience how our dedicated features and advanced technologies enhance women’s safety in communities. Together, we can create a safer environment for everyone.
          </p>
          <button className="relative inline-block px-1 py-4 bg-[#FF1493] text-white font-semibold rounded-lg overflow-hidden group transition-transform transform hover:scale-105 hover:shadow-lg">
            <span className="absolute inset-0 bg-[#D5006D] transition-transform duration-300 ease-in-out transform -translate-x-full group-hover:translate-x-0"></span>
            <span className="relative z-10">Learn More</span>
          </button>
        </div>
      </Fade>
    </div>
  </div>
  

  );
}

export default Experience;
