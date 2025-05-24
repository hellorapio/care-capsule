"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Wrapper from "../../../components/Wrapper";

// Mock orders data - in a real app, this would come from your backend/API
const mockOrders = [
  {
    id: "ORD12345",
    date: "May 15, 2023",
    status: "Delivered",
    total: 129.99,
    items: [
      {
        id: "1",
        name: "Panadol Extra",
        quantity: 2,
        price: 12.99,
        image: "/Panadol.png",
      },
      {
        id: "2",
        name: "Antinal 200mg",
        quantity: 1,
        price: 24.99,
        image: "/Antinal.png",
      },
      {
        id: "3",
        name: "CeraVe Moisturizing Cream",
        quantity: 1,
        price: 79.99,
        image: "/cosrx.png",
      },
    ],
    address: "123 Main Street, Anytown, CA 94321",
    payment: "Credit Card (ending in 4582)",
  },
  {
    id: "ORD12346",
    date: "April 28, 2023",
    status: "Processing",
    total: 45.98,
    items: [
      {
        id: "4",
        name: "Prufen 400mg",
        quantity: 2,
        price: 22.99,
        image: "/prufen.png",
      },
    ],
    address: "123 Main Street, Anytown, CA 94321",
    payment: "PayPal",
  },
  {
    id: "ORD12347",
    date: "March 10, 2023",
    status: "Cancelled",
    total: 67.5,
    items: [
      {
        id: "5",
        name: "B-Complex Vitamins",
        quantity: 1,
        price: 35.5,
        image: "/cetal.png",
      },
      {
        id: "6",
        name: "Omega-3 Fish Oil",
        quantity: 1,
        price: 32.0,
        image: "/besline.png",
      },
    ],
    address: "123 Main Street, Anytown, CA 94321",
    payment: "Credit Card (ending in 4582)",
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let color = "";
  switch (status.toLowerCase()) {
    case "delivered":
      color = "bg-green-100 text-green-800";
      break;
    case "processing":
      color = "bg-blue-100 text-blue-800";
      break;
    case "shipped":
      color = "bg-purple-100 text-purple-800";
      break;
    case "cancelled":
      color = "bg-red-100 text-red-800";
      break;
    default:
      color = "bg-gray-100 text-gray-800";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
    >
      {status}
    </span>
  );
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Mock API call to fetch orders
    const fetchOrders = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        setOrders(mockOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                          My Orders
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => router.push("/profile/wishlist")}
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
                      My Orders
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
                  ) : orders.length === 0 ? (
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
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No orders yet
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Looks like you haven't placed any orders yet.
                      </p>
                      <Link
                        href="/medicines"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2BADE8] hover:bg-blue-600"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div>
                      {selectedOrder ? (
                        <div className="p-6">
                          <button
                            onClick={() => setSelectedOrder(null)}
                            className="mb-6 text-[#2BADE8] hover:text-blue-700 flex items-center"
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
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                              />
                            </svg>
                            Back to Orders
                          </button>

                          <div className="border-b border-gray-200 pb-4 mb-6">
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                  Order #{selectedOrder.id}
                                </h3>
                                <p className="text-gray-500">
                                  Placed on {selectedOrder.date}
                                </p>
                              </div>
                              <StatusBadge status={selectedOrder.status} />
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg font-medium text-gray-900 mb-4">
                                Items in Order
                              </h4>
                              <div className="space-y-4">
                                {selectedOrder.items.map((item: any) => (
                                  <div
                                    key={item.id}
                                    className="flex items-center border border-gray-200 rounded-lg p-4"
                                  >
                                    <div className="relative w-16 h-16 flex-shrink-0">
                                      <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
                                    <div className="ml-4 flex-grow">
                                      <h5 className="text-sm font-medium text-gray-900">
                                        {item.name}
                                      </h5>
                                      <p className="text-gray-500 text-sm">
                                        Qty: {item.quantity}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm font-medium text-gray-900">
                                        ${item.price.toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-lg font-medium text-gray-900 mb-3">
                                  Shipping Address
                                </h4>
                                <p className="text-gray-700">
                                  {selectedOrder.address}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-lg font-medium text-gray-900 mb-3">
                                  Payment Method
                                </h4>
                                <p className="text-gray-700">
                                  {selectedOrder.payment}
                                </p>
                              </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-700">
                                  Subtotal:
                                </span>
                                <span className="text-gray-900">
                                  ${selectedOrder.total.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-gray-700">
                                  Shipping:
                                </span>
                                <span className="text-gray-900">
                                  $5.00
                                </span>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-gray-700">Tax:</span>
                                <span className="text-gray-900">
                                  $
                                  {(selectedOrder.total * 0.05).toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                                <span className="text-lg font-medium text-gray-900">
                                  Total:
                                </span>
                                <span className="text-lg font-bold text-gray-900">
                                  $
                                  {(
                                    selectedOrder.total +
                                    5 +
                                    selectedOrder.total * 0.05
                                  ).toFixed(2)}
                                </span>
                              </div>
                            </div>

                            {selectedOrder.status === "Delivered" && (
                              <div className="flex justify-end">
                                <button className="bg-[#2BADE8] text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                  Reorder
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-200">
                          {orders.map((order) => (
                            <div
                              key={order.id}
                              className="p-6 hover:bg-gray-50"
                            >
                              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                <div>
                                  <h3 className="text-lg font-medium text-gray-900">
                                    Order #{order.id}
                                  </h3>
                                  <p className="text-gray-500">
                                    {order.date}
                                  </p>
                                </div>
                                <div className="mt-2 md:mt-0 flex items-center">
                                  <StatusBadge status={order.status} />
                                  <span className="ml-4 font-medium text-gray-900">
                                    ${order.total.toFixed(2)}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-4 flex flex-wrap items-center gap-2">
                                {order.items.slice(0, 3).map((item) => (
                                  <div
                                    key={item.id}
                                    className="relative w-12 h-12 rounded-md overflow-hidden border border-gray-200"
                                  >
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      fill
                                      className="object-contain"
                                    />
                                  </div>
                                ))}
                                {order.items.length > 3 && (
                                  <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 text-xs">
                                    +{order.items.length - 3}
                                  </div>
                                )}
                              </div>

                              <div className="mt-4 flex justify-end">
                                <button
                                  onClick={() => setSelectedOrder(order)}
                                  className="text-[#2BADE8] hover:text-blue-700 flex items-center"
                                >
                                  View Details
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 ml-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
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
