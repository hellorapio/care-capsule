"use client";
import { FaBell, FaUser, FaGlobe } from "react-icons/fa";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Nav: React.FC = () => {
 
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  

  return (
    <>
      <nav className="relative bg-white shadow-md py-4">
        <div className="container mx-auto flex items-center  px-7 pl-40 ">
          <div className="mr-60 ml-20">
            {/* logo*/}
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                className="w-20 cursor-pointer"
                width={144}
                height={46}
              />
            </Link>
          </div>

          <div className="mr-60">
            {/* pages*/}
            <ul className="flex space-x-8 text-gray-600 font-medium">
              <li>
                <Link href="/">
                  <p className=" hover:text-blue-400 mr-5">Home</p>
                </Link>
              </li>
              <li>
                <Link href="/pharmacies">
                  <p className="hover:text-blue-400 mr-5">Orders</p>
                </Link>
              </li>
              <li>
                <Link href="/categories">
                  <p className="hover:text-blue-400">Inventory</p>
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex ">
            {/* icons*/}
            <Link href="/user">
              <p className="text-gray-600 hover:text-blue-400">
                <FaUser className="fas fa-user text-xl mr-4" />
              </p>
            </Link>
            <Link href="/notification">
              <p className="text-gray-600 hover:text-blue-400">
                <FaBell className="fas fa-bell text-xl mr-4" />
              </p>
            </Link>

            {/* language*/}
            <div className="relative">
              <button
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="text-gray-600 hover:text-blue-400 focus:outline-none"
              >
                <FaGlobe className="fas fa-globe text-xl" />
              </button>
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md text-gray-600 py-2">
                  <button
                    onClick={() => alert("Language set to Arabic")}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                  >
                    Arabic
                  </button>
                  <button
                    onClick={() => alert("Language set to English")}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                  >
                    English
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="relative mt-0 bg-white">
        <div className="ml-40  mr-40 h-[2px] bg-gray-500"></div>
      </div>
    </>
  );
};

export default Nav;
