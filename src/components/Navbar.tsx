"use client";
import { FaSearch, FaShoppingCart, FaUser, FaGlobe } from "react-icons/fa"; 
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    setSearchQuery(""); 
  };

    return (
      <>
        <nav className="relative bg-white shadow-md py-4">
          <div className="container mx-auto flex items-center justify-between px-7 pl-40 pr-40">
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

            {/* pages*/}
            <ul className="flex space-x-8 text-gray-600 font-medium">
              <li>
                <Link href="/">
                  <p className=" hover:text-blue-400">Home</p>
                </Link>
              </li>
              <li>
                <Link href="/pharmacies">
                  <p className="hover:text-blue-400">Pharmacies</p>
                </Link>
              </li>
              <li>
                <Link href="/categories">
                  <p className="hover:text-blue-400">Categories</p>
                </Link>
              </li>
              <li>
                <Link href="/healthArticles">
                  <p className="hover:text-blue-400">Health Articles</p>
                </Link>
              </li>
            </ul>

            {/* search&icons*/}
            <div className=" flex items-center space-x-5">
              {/* sewarch box*/}
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center "
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="text-center px-4 py-2 text-gray-600 border border-gray-300 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="absolute  px-3 py-2  text-gray-600 rounded-r-md hover:text-blue-400"
                >
                  <FaSearch className="w-6 h-7" />
                </button>
              </form>

              {/* icons*/}
              <Link href="/cart">
                <p className="text-gray-600 hover:text-blue-400">
                  <FaShoppingCart className="fas fa-shopping-cart text-xl" />
                </p>
              </Link>
              <Link href="/profile">
                <p className="text-gray-600 hover:text-blue-400">
                  <FaUser className="fas fa-user text-xl" />
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

export default Navbar;
