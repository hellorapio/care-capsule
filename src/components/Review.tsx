import Image from "next/image";

interface ReviewProps {
  imageSrc: string;
  text: string;
  name: string;
}

const Review = ({ imageSrc, text, name }: ReviewProps) => {
  return (
    <div className="relative p-1 bg-white shadow-md rounded-lg w-[380px] h-[180px] max-w-md">
      <div className="absolute -top-5 left-0">
        <Image
          src={imageSrc}
          alt={`${name}'s photo`}
          width={50}
          height={50}
          className="rounded-full border-2 border-white shadow-md"
        />
      </div>

      <div className="mt-9 pl-12">
        <p className="text-gray-700 italic text-sm mb-6 w-[80%]">
          &quot;{text}&quot;
        </p>
        <h4 className="text-gray-900 font-semibold text-base">{name}</h4>
      </div>
    </div>
  );
};

export default Review;
