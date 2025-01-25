import Image from "next/image"; 

interface TitleProps {
  image: string;
  text: string;
  button: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ image, text, button }) => {
  return (
    <div className="flex justify-between items-center p-2 bg-gray-100">
      <div className="flex items-center space-x-2">
        <div className="text-blue-400 text-lg">
          <Image src={image} alt="execlusive offer" width={40} height={40} />
        </div>
        <p className="text-gray-800 font-semibold">{text}</p>
      </div>

      <div>{button}</div>
    </div>
  );
};

export default Title;
