import Image from "next/image";
import { HiOutlineTrendingUp } from "react-icons/hi";

interface StatusProps {
  value: number | string;
  title: string;
  subtitle: string;
  icon: string;
}

const Status: React.FC<StatusProps> = ({ value, title, subtitle, icon }) => {
  return (
    <div className="bg-blue-50 rounded-lg shadow-md p-6 flex items-center w-[397px] h-[200px]">
      <div className="flex-1">
        <p className="text-3xl font-semibold text-gray-800">{value}</p>
        <p className="text-lg text-gray-600 mt-8">{title}</p>
        <p className="text-sm text-gray-400 flex items-center mt-2">
          <HiOutlineTrendingUp className="fas faeye text-sm mr-1 bg-green-200 border rounded-full " /> {subtitle}
        </p>
      </div>
      <div className="text-blue-500 text-4xl bg-white border rounded-full p-3">
        <Image
          src={icon}
          alt="Revenue today"
          width={44}
          height={44}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Status;
