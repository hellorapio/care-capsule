import React from "react";
import Image from "next/image";

interface CategoryProps {
  image: string;
  text: string;
}

const Category: React.FC<CategoryProps> = ({ image, text }) => {
  return (
    <div className="flex justify-between items-center p-2 bg-gray-100">
      <div className="flex items-center space-x-2">
        <div className="text-blue-400 text-lg">
          <Image src={image} alt="execlusive offer" width={40} height={40} />
        </div>
        <p className="text-gray-800 font-semibold">{text}</p>
      </div>
    </div>
  );
};

export default Category;
