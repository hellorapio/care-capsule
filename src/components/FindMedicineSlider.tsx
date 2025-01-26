"use client";
import { useState } from "react";
import Image from "next/image";
interface Slide {
  title: string;
  description: string;
  info: string;
  buttonText: string;
  imageUrl: string;
}

interface SliderProps {
  slides: Slide[];
}

const FindMedicineSlider: React.FC<SliderProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentSlide((prev) =>
        prev === 0 ? slides.length - 1 : prev - 1
      );
    } else {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <div className="relative w-full max-w-8xl mx-auto p-6 pt-40 pb-20 bg-white mt-3 mb-4 flex flex-col gap-4 lg:flex-row items-center">
      <div className="lg:w-1/2 pl-10">
        <h2 className="lg:text-5xl text-2xl font-bold text-[#2BADE8]">
          {slides[currentSlide].title}
        </h2>
        <p className="text-gray-600 lg:text-2xl text-base mt-4">
          {slides[currentSlide].description}
        </p>
        <p className="text-gray-400 w-[81%] mt-4">
          {slides[currentSlide].info}
        </p>
        <button className="mt-6 px-6 py-2 bg-[#2BADE8] text-white rounded-full shadow hover:bg-blue-700">
          {slides[currentSlide].buttonText}
        </button>
      </div>

      <div className="lg:w-1/2 flex justify-center">
        <Image
          src={slides[currentSlide].imageUrl}
          alt={slides[currentSlide].title}
          className="w-3/4 h-auto"
          width={576}
          height={570}
        />
      </div>

      {/*  balls */}
      <div className="absolute bottom-4  left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-[#2BADE8]" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

      {/* arrow */}
      <button
        onClick={() => handleSlideChange("left")}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-100 text-black p-2 rounded-full shadow hover:bg-blue-200"
      >
        &lt;
      </button>
      <button
        onClick={() => handleSlideChange("right")}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-100 text-black p-2 rounded-full shadow hover:bg-blue-200"
      >
        &gt;
      </button>
    </div>
  );
};

export default FindMedicineSlider;
