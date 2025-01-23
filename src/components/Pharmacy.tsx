
import { LocationMarkerIcon, StarIcon } from '@heroicons/react/solid'; 
import Image from 'next/image'; 


interface PharmacyProps {
  image: string; 
  name: string; 
  address: string; 
  distance: string; 
  rating: number; 
  reviews: number; 
}

const Pharmacy: React.FC<PharmacyProps> = ({
  image,
  name,
  address,
  distance,
  rating,
  reviews,
}) => {
  return (
    <div className="flex flex-col items-center border border-blue-400 rounded-lg shadow-md p-4 w-full max-w-sm">
     
      <div className="mb-4">
        <Image
          src={image} 
          alt={`${name} Header`}
          width={300}
          height={200}
          className="w-full h-auto object-contain"
        />
      </div>

     
      <div className="text-left mb-4">
        <p className="text-lg font-bold text-gray-700">{name}</p>
       
        <p className="text-sm text-gray-500">{address}</p>
      </div>

      
      <div className="flex justify-between items-center w-full">
        
        <div className="flex items-center space-x-1 ml-5 border  border-transparent bg-blue-100 rounded-lg">
          <LocationMarkerIcon className="w-5 h-5 text-blue-400" />
          <p className="text-sm text-blue-400">{distance}</p>
        </div>
        
        <div className="flex items-center space-x-1 border  border-blue-400 bg-gray-180 rounded-lg">
          <StarIcon className="w-5 h-5 text-yellow-500" />
          <p className="text-sm text-gray-700">
            {rating} ({reviews} Reviews)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;