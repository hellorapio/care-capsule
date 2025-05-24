"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Cart item interface
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  manufacturer: string;
}

// Medicine interface
export interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  image: string;
  description: string;
  dosage: string;
  form: string;
  category: string;
  quantity_per_package: number;
  unit: string;
  availability: boolean;
  prescription_required: boolean;
  side_effects?: string;
  contraindications?: string;
  storage_instructions?: string;
}

interface MedicineDetailsProps {
  medicine: Medicine;
}

export default function MedicineDetails({
  medicine,
}: MedicineDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addToCart = () => {
    if (!medicine) return;

    const cartItem: CartItem = {
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      image: medicine.image || "/cetal.png",
      quantity: quantity,
      manufacturer: medicine.manufacturer,
    };

    // Get current cart from localStorage
    const existingCartJSON = localStorage.getItem("cart");
    const cart = existingCartJSON ? JSON.parse(existingCartJSON) : [];

    // Check if the medicine is already in the cart
    const existingItemIndex = cart.findIndex(
      (item: CartItem) => item.id === medicine.id
    );

    if (existingItemIndex !== -1) {
      // Update the quantity if already in cart
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.push(cartItem);
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Show feedback to user
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="md:flex">
        {/* Medicine Image Section */}
        <div className="md:w-1/3 p-8 flex items-center justify-center bg-gray-50">
          <div className="relative h-64 w-64">
            <Image
              src={medicine.image || "/cetal.png"}
              alt={medicine.name}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Medicine Details Section */}
        <div className="md:w-2/3 p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {medicine.name}
              </h1>
              <p className="text-gray-500 mb-4">{medicine.manufacturer}</p>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg text-xl font-bold text-blue-600">
              EGP {medicine.price}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center mb-4">
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {medicine.availability ? "In Stock" : "Out of Stock"}
              </div>
              {medicine.prescription_required && (
                <div className="ml-3 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Prescription Required
                </div>
              )}
            </div>
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {medicine.description}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    DOSAGE
                  </h3>
                  <p className="text-gray-900">{medicine.dosage}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    FORM
                  </h3>
                  <p className="text-gray-900">{medicine.form}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    CATEGORY
                  </h3>
                  <p className="text-gray-900">{medicine.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    QUANTITY
                  </h3>
                  <p className="text-gray-900">
                    {medicine.quantity_per_package} {medicine.unit}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex items-center space-x-4">
              <div className="relative flex items-center">
                <button
                  onClick={decreaseQuantity}
                  className="w-10 h-10 rounded-l border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  readOnly
                  className="w-12 h-10 border-t border-b border-gray-300 text-center"
                />
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 rounded-r border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              <button
                onClick={addToCart}
                className={`flex-1 ${
                  medicine.availability
                    ? "bg-[#2BADE8] hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center`}
              >
                {addedToCart ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Added to Cart
                  </>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Tabs */}
      <div className="border-t border-gray-200">
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Additional Information
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Side Effects
              </h3>
              <p className="text-gray-700">
                {medicine.side_effects || "Information not available."}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Contraindications
              </h3>
              <p className="text-gray-700">
                {medicine.contraindications ||
                  "Information not available."}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Storage Instructions
              </h3>
              <p className="text-gray-700">
                {medicine.storage_instructions ||
                  "Store in a cool, dry place away from direct sunlight."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
