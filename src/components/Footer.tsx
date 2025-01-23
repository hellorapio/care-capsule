"use client";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa"; 
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Email sent: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-white py-8 px-6  ">
      <div className="ml-2 mr-2 mb-10 mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        {/* logo*/}
        <div className="md:2/4 mr-10">
          <Image
            src="/logo.png"
            alt="Logo"
            className="w-40 mb-4 ml-3"
            width={166}
            height={54}
          />
        </div>
        {/* info*/}
        <div className="md:w-1/3 mt-11 ml-7 p-2">
          <p className="text-gray-600 ">
            CareCapsule is your trusted partner for all your healthcare needs.
            Find reliable pharmacies, manage your medicine refills, and enjoy
            exclusive offers on health products—all in one place.
          </p>
          <div className="mt-4">
            <p className="text-gray-600 underline">
              <Link href="tel:+1234567890">(123) 456-7890</Link>
            </p>
            <p className="text-gray-600 underline">
              <Link href="mailto:ABC@gmail.com">ABC@gmail.com</Link>
            </p>
          </div>

          {/*  social */}
          <div className="flex mt-20 space-x-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-800"
            >
              <FaFacebookF className="w-6 h-7" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-800"
            >
              <FaTwitter className="w-6 h-7" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-800"
            >
              <FaInstagram className="w-6 h-7" />
            </Link>
          </div>
        </div>

        {/* links*/}
        <div className=" md:w-1/5 mt-0 md:mt-0 flex flex-col  md:items-center ">
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/pharmacies" className="hover:text-blue-600">
                Pharmacies
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-blue-600">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/health-articles" className="hover:text-blue-600">
                Health Articles
              </Link>
            </li>
          </ul>
        </div>

        {/* email*/}
        <div className="relative md:w-1/3 mt-6 md:mt-0">
          <h3 className="text-gray-600 mb-4 mt-24">News letter</h3>
          <form onSubmit={handleEmailSubmit} className="flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className=" w-full px-4 py-2 border border-gray-100 shadow-lg  rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <button
              type="submit"
              className=" absolute px-1 py-1  text-blue-400 rounded-r-md hover:bg-gray-100 right-3 "
            >
              <FaEnvelope className="w-6 h-7" />
            </button>
          </form>
          {/* print righs*/}
          <div className=" mt-8 pt-20  text-gray-500 text-sm  ">
            © 2022 ABC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
