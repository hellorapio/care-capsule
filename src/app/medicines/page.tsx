import { Suspense } from "react";
import Link from "next/link";
import Wrapper from "../../components/Wrapper";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Title from "../../components/Title";
import Medicine from "../../components/Medicine";

async function getMedicines(category = "medicine") {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/medicines?category=${category}&limit=50&page=8`
  );

  const data = await res.json();
  return data.data.data || [];
}

// Loading placeholder component
function MedicinesLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-4 animate-pulse"
        >
          <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
}

// Medicines list component
async function MedicinesList() {
  const medicines = await getMedicines("medicine");

  if (medicines.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-gray-600">
          No medicines found
        </h3>
        <p className="text-gray-500 mt-2">
          Please check back later for our updated inventory.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
      {medicines.map((medicine: Record<string, string>) => (
        <Medicine
          key={medicine.id}
          id={medicine.id}
          image={medicine.image || "/cetal.png"}
          name={medicine.name}
          price={medicine.price}
        />
      ))}
    </div>
  );
}

export default function MedicinesPage() {
  return (
    <>
      <Wrapper backgroundClass="bg-white">
        <Navbar />
      </Wrapper>

      <div className="bg-gray-50 py-10">
        <Wrapper backgroundClass="bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Medicines
              </h1>
              <span className="text-gray-500 ml-4">
                Showing prescription and over-the-counter medications
              </span>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/categories"
                className="text-[#2BADE8] hover:text-blue-700 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
                Categories
              </Link>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <label
                  htmlFor="sort"
                  className="block text-sm font-medium text-gray-700 mr-2"
                >
                  Sort by:
                </label>
                <select
                  id="sort"
                  name="sort"
                  className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>

              <div className="flex items-center ml-auto">
                <span className="text-sm text-gray-500 mr-2">View:</span>
                <button className="p-2 text-[#2BADE8] rounded hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 rounded hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Title Section */}
          <Title
            image="/findmedicine.png"
            text="All Medicines"
            button={
              <button className="text-[#2BADE8] underline hover:text-black text-sm">
                View All
              </button>
            }
          />

          {/* Medicines List with Suspense for loading state */}
          <Suspense fallback={<MedicinesLoading />}>
            <MedicinesList />
          </Suspense>
        </Wrapper>
      </div>

      <Wrapper backgroundClass="bg-white">
        <Footer />
      </Wrapper>
    </>
  );
}
