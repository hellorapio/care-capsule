"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Wrapper from "../../../components/Wrapper";

// Mock wishlist data - this would be replaced with real API data
const mockWishlistItems = [
  {
    id: "1",
    name: "Panadol Extra",
    price: 12.99,
    image: "/Panadol.png",
    inStock: true,
    category: "Pain Relief",
  },
  {
    id: "2",
    name: "Antinal 200mg",
    price: 24.99,
    image: "/Antinal.png",
    inStock: true,
    category: "Digestive Health",
  },
  {
    id: "3",
    name: "CeraVe Moisturizing Cream",
    price: 79.99,
    image: "/cosrx.png",
    inStock: false,
    category: "Skin Care",
  },
  {
    id: "4",
    name: "Prufen 400mg",
    price: 22.99,
    image: "/prufen.png",
    inStock: true,
    category: "Pain Relief",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(mockWishlistItems);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    // Fetch wishlist from API
    const fetchWishlist = async () => {
      try {
        const response = await fetch("/api/wishlist");

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }

        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        // Fallback to mock data if API fails
        setWishlist(mockWishlistItems);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (itemId: string) => {
    try {
      // Call the API to remove the item
      const response = await fetch(`/api/wishlist/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from wishlist");
      }

      // Update state locally after successful API call
      setWishlist(wishlist.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      // Fallback to client-side removal if API fails
      setWishlist(wishlist.filter((item) => item.id !== itemId));
    }
  };

  const addToCart = async (itemId: string) => {
    try {
      // In a real app, you would call the cart API here
      // const response = await fetch('/api/cart', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ itemId, quantity: 1 })
      // });

      // For now, just show an alert
      alert(`Item ${itemId} added to cart!`);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <>
      <Wrapper backgroundClass="bg-white">
        <Navbar />
      </Wrapper>

      <div className="bg-gray-50 py-10">
        <Wrapper backgroundClass="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="md:w-1/4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                        <Image
                          src="/user.png"
                          alt="Profile"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          John Doe
                        </h2>
                        <p className="text-gray-500">@johndoe</p>
                      </div>
                    </div>
                  </div>

                  <nav className="p-4">
                    <ul className="space-y-1">
                      <li>
                        <button
                          onClick={() => router.push("/profile")}
                          className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => router.push("/profile/orders")}
                          className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                          My Orders
                        </button>
                      </li>
                      <li>
                        <button className="w-full flex items-center px-4 py-3 rounded-lg bg-blue-50 text-[#2BADE8]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          Wishlist
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => router.push("/profile/addresses")}
                          className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          My Addresses
                        </button>
                      </li>
                      <li className="pt-3 mt-3 border-t border-gray-200">
                        <button
                          onClick={() => router.push("/auth/login")}
                          className="w-full flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="md:w-3/4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">
                      My Wishlist
                    </h2>
                  </div>

                  {isLoading ? (
                    <div className="p-8 flex justify-center">
                      <div className="animate-pulse flex flex-col items-center">
                        <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2.5"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                    </div>
                  ) : wishlist.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Your wishlist is empty
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Save items you&apos;re interested in for later.
                      </p>
                      <Link
                        href="/medicines"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2BADE8] hover:bg-blue-600"
                      >
                        Explore Products
                      </Link>
                    </div>
                  ) : (
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {wishlist.map((item) => (
                          <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg p-4 relative hover:shadow-md transition-shadow duration-200"
                          >
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                              aria-label="Remove from wishlist"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            <div className="flex items-start space-x-4">
                              <div className="relative w-20 h-20 flex-shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <div className="flex-grow">
                                {" "}
                                <Link
                                  href={`/medicines/${item.id}`}
                                  className="text-base font-medium text-gray-900 hover:text-[#2BADE8]"
                                >
                                  {item.name}
                                </Link>
                                <p className="text-gray-500 text-sm mb-1">
                                  {item.category}
                                </p>
                                <p className="text-lg font-semibold text-gray-900 mb-2">
                                  ${item.price.toFixed(2)}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`text-sm ${
                                      item.inStock
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {item.inStock
                                      ? "In Stock"
                                      : "Out of Stock"}
                                  </span>
                                  <button
                                    onClick={() => addToCart(item.id)}
                                    disabled={!item.inStock}
                                    className={`px-3 py-1.5 text-xs rounded-md ${
                                      item.inStock
                                        ? "bg-[#2BADE8] text-white hover:bg-blue-600"
                                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    }`}
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>

      <Wrapper backgroundClass="bg-white">
        <Footer />
      </Wrapper>
    </>
  );
}
