import React from 'react';
import Image from 'next/image'; 


interface OfferProps {
  title: string; 
  description: string; 
  offerText: string; 
  buttonText: string; 
  image: string; 
}

const Offer: React.FC<OfferProps> = ({ title, description, offerText, buttonText, image }) => {
  return (
    <div className="relative flex flex-col md:flex-row items-center bg-[#d8f3fe] p-6 rounded-lg shadow-md w-[397px] h-[200px]">
      <div className="absolute flex-1 w-[60%] left-7">
        <h2 className="text-xl font-bold text-[#2BADE8] mb-2">{title}</h2>
        <p className=" text-gray-700 mb-2">{description}</p>
        <p className="text-green-600 font-semibold mb-4">{offerText}</p>
        <button className="bg-[#2BADE8] text-white px-4 py-2 rounded-3xl hover:bg-blue-700">
          {buttonText}
        </button>
      </div>

      <div className=" absolute mt-4 md:mt-0 md:ml-6 right-0 top-0">
        <Image
          src={image}
          alt="Offer Illustration"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Offer;