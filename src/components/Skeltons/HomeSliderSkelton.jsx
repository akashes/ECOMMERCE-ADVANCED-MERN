import React from "react";
import { FaRegImage } from "react-icons/fa"; 

const HomeSliderSkelton = () => {
  return (
    <div className="homeSlider
      inline-flex flex-col items-center justify-center 
      w-full h-[130px] lg:h-[400px] 
      bg-gray-300 rounded-[10px] relative overflow-hidden 
      animate-pulse">
      <FaRegImage className="text-gray-400 text-5xl lg:text-8xl mb-3" />
    </div>
  );
};

export default HomeSliderSkelton;
