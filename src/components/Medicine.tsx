import { PlusIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";

interface MedicineProps {
  image: string;
  id: string;
  name: string;
  price: string;
}
const Medicine: React.FC<MedicineProps> = ({ id, image, name, price }) => {
  return (
    <Link href={`/medicines/${id}`}>
      <div className="flex flex-col p-4">
        <div className="relative mb-4 aspect-video">
          <Image
            src={image}
            alt={`${name} Header`}
            fill
            className="w-full h-full object-contain"
          />
          <button className="absolute bottom-6 right-6 bg-white text-blue-500 p-2 rounded-md shadow-lg hover:bg-gray-100">
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="text-left mb-4">
          <p className="text-lg  text-gray-500 ml-2">{name}</p>

          <p className="text-sm text-gray-500 ml-2">EGP {price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Medicine;
