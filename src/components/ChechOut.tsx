import Image from "next/image";

const CheckOut = () => {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <div className="mb-6">
        <Image
          src="/checkout.png"
          alt="CheckOut Success"
          width={412}
          height={414}
        />
      </div>

      <p className="text-base font-medium text-gray-700 mb-4">
        Refill Reminder Set Successfully!
      </p>

      <button className="bg-[#2BADE8] text-white mb-10 mt-6 px-20 py-2 rounded-3xl text-lg font-semibold hover:bg-blue-700">
        Done!
      </button>
    </div>
  );
};

export default CheckOut;
