import { PlusIcon } from "@heroicons/react/solid";
import Image from "next/image";

interface MedicineProps {
  image: string;
  name: string;
  price: string;
}
const Medicine: React.FC<MedicineProps> = ({ image, name, price }) => {
  return (
    <div className="flex flex-col p-4">
      <div className="relative mb-4">
        <Image
          src={image}
          alt={`${name} Header`}
          width={300}
          height={200}
          className="w-full h-auto object-contain"
        />
        <button className="absolute bottom-6 right-6 bg-white text-blue-500 p-2 rounded-md shadow-lg hover:bg-gray-100">
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="text-left mb-4">
        <p className="text-lg  text-gray-500 ml-2">{name}</p>

        <p className="text-sm text-gray-500 ml-2">{price}</p>
      </div>
    </div>
  );
};

export default Medicine;
