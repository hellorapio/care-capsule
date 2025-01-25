"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const UserOrPharmacy = () => {
  const [accountType, setAccountType] = useState("");

  const handleSelect = (type: string) => {
    setAccountType(type);
  };

  return (
    <div className="flex h-screen">
      {/* left-side*/}
      <div className="flex flex-col justify-center items-center bg-gray-50 w-1/2 p-8">
        <Image src="/logo.png" alt="CareCapsule Logo" width={207} height={67} />
        <h1 className="w-[60%] text-4xl font-bold text-[#2BADE8] mt-9 text-center">
          Welcome to CareCapsule
        </h1>
        <p className="text-2xl font-medium text-[#2BADE8] mt-6">
          Select your account type.
        </p>
      </div>

      {/* right-side*/}
      <div className="w-1/2 flex flex-col justify-center px-12 bg-gray-100 ">
        <form className="space-y-6">
          {/* User Card */}
          <div
            onClick={() => handleSelect("User")}
            className={`flex items-center justify-between p-8 border ${
              accountType === "User" ? "border-[#2BADE8]" : "border-gray-300"
            } rounded-xl mb-6 cursor-pointer hover:bg-blue-50 hover:border-blue-300`}
          >
            <div className="flex flex-row  ">
              <div className="bg-gray-300 w-[10%] h-[10%] border rounded-full px-2 py-2 ">
                <Image src="/user.png" alt="User Icon" width={40} height={40} />
              </div>
              <div>
                <h2 className=" ml-7 text-xl font-semibold text-[#2BADE8]">
                  User
                </h2>
                <p className=" ml-7 text-sm text-gray-600 w-[80%]">
                  Register as a user so you can find pharmacies and purchase
                  drugs.
                </p>
              </div>
            </div>
          </div>

          {/* Pharmacy Card */}
          <div
            onClick={() => handleSelect("Pharmacy")}
            className={`flex items-center justify-between p-8 border ${
              accountType === "Pharmacy"
                ? "border-[#2BADE8]"
                : "border-gray-300"
            } rounded-xl mb-6 cursor-pointer hover:bg-blue-50 hover:border-blue-300 `}
          >
            <div className="flex flex-row ">
              <div className="bg-gray-300 w-[10%] h-[10%] border rounded-full px-2 py-2">
                <Image
                  src="/pharmac.png"
                  alt="Pharmacy Icon"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h2 className="ml-7 text-xl font-semibold text-[#2BADE8]">
                  Pharmacy
                </h2>
                <p className="ml-7 text-sm text-gray-600 w-[80%]">
                  Register as a pharmacy so you can sell and manage your drugs
                  on the app.
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2BADE8] text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-600"
          >
            Continue
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account yet?{" "}
          <Link href="#" className="text-[#2BADE8] hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserOrPharmacy;
