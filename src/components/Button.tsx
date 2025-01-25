interface ButtonProps {
  buttonText: string;
}

const Button: React.FC<ButtonProps> = ({ buttonText }) => {
  return (
    <button className=" bg-[#2BADE8] text-white px-7 py-2 rounded-3xl hover:bg-blue-700">
      {buttonText}
    </button>
  );
};

export default Button;
