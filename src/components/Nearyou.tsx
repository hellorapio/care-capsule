
import Image from "next/image"; 

interface NearyouProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
}

const Nearyou: React.FC<NearyouProps> = ({
  image,
  title,
  description,
  buttonText,
}) => {
  return (
    <div className="flex  items-center space-x-8 p-6 bg-white  ">
      <div className="w-1/2 pl-20 ml-10">
        <Image
          src={image}
          alt="pharmacy near you"
          width={448}
          height={444}
          className="object-contain"
        />
      </div>

      <div className="w-1/2  ">
        <h2 className=" text-3xl w-[65%] font-bold text-[#2BADE8] mb-5">
          {title}
        </h2>
        <p className=" text-xl text-gray-700 w-[90%] mb-5">
          {description}
        </p>
        <button className=" bg-[#2BADE8] text-white px-7 py-2 rounded-3xl hover:bg-blue-700">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Nearyou;
