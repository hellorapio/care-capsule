"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ArticleProps {
  image: string;
  title: string;
  description: string;
}

const Article: React.FC<ArticleProps> = ({ image, title, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // when click
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`flex flex-col bg-white rounded-lg shadow-md overflow-hidden border border-blue-400 cursor-pointer transition-all duration-200 hover:shadow-lg transition-shaodw mb-10  ${
        isExpanded ? "max-h-full p-0" : "max-h-full p-0"
      }`}
      onClick={toggleExpand}
    >
      <div className="relative w-full h-60">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="mt-4 ml-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">
          {isExpanded ? description : `${description.substring(0, 100)}...`}
        </p>
      </div>

      <div className="text-[#2BADE8] text-sm font-semibold mt-2 ml-4">
        {isExpanded ? "Show Less" : "Read More"}
      </div>
    </div>
  );
};

export default Article;
