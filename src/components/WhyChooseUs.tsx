import React from "react";
import Image from "next/image";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  image: string;
  features: Feature[];
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ image, features }) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-50  pt-20 pb-20 pr-10 pl-20 gap-6  ">
      <div className="flex-shrink-0 mr-20 ">
        <Image
          src={image}
          alt="Why Choose Us Illustration"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-20 gap-x-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-gray-200 rounded-full p-2">
              <Image
                src={feature.icon}
                alt={`${feature.title} Icon`}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-700 w-[50%]">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 w-[60%]">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
