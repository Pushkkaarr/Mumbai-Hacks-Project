import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Fade from "react-reveal/Fade";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="from-[#4B3C60] to-[#3C2A4A] bg-gradient-to-b w-full px-10 lg:px-28 lg:h-screen overflow-hidden">
  <Navbar className="z-50" />
  <div className="lg:flex lg:pt-8">
    <Fade left cascade>
      <div className="lg:w-[800px] container xl:pt-24 lg:pt-10 pt-20">
        <h1 className="font-[1000] xl:text-[4.2rem] lg:text-[3rem] md:text-[3.2rem] text-3xl lg:w-[79%] text-white xl:leading-[5rem] md:leading-[4rem]">
          Empowering Women through{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF6F61] to-[#FF1493]">
            {" "}
            SAFETY{" "}
          </span>
          Initiatives
        </h1>
        <div className="xl:flex justify-start mt-7">
          <div>
            <button
              onClick={() => {
                navigate("/neutrality");
                console.log('Button clicked!');
              }}
              className="rounded px-7 py-3 bg-[#FF1493] text-white relative group hover:text-white overflow-hidden c-btn tracking-wider"
            >
              <span className="absolute inset-0 bg-[#D5006D]"></span>
              <span className="absolute inset-0 flex justify-center items-center">
                Get Involved
              </span>
              Get Involved
            </button>
          </div>
          <p className="xl:w-[50%] lg:w-[70%] md:w-[80%] text-[28px] text-gray-400 lg:leading-6 xl:pl-5 xl:pt-0 pt-4 pb-4">
            Our project is dedicated to providing innovative solutions and resources to enhance women's safety and empowerment. Join us in our mission to create a safer world for women everywhere.
          </p>
        </div>
      </div>
    </Fade>

    <div className="lg:flex lg:pt-8">
      <Fade right cascade>
        <div className="pr-24 lg:pr-0 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4B3C60] to-[#3C2A4A] opacity-90 z-0"></div>
          <div className="relative z-10">
            <img
              src="sust1.png" // Ensure to use a relevant image for your project
              alt="Women Safety Initiative"
              className="w-[760px] h-auto object-cover mix-blend-overlay"
            />
          </div>
        </div>
      </Fade>
    </div>
  </div>
</div>

  );
}

export default Header;
