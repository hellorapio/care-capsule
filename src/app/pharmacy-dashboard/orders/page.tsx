// filepath: /app/pharmacy-dashboard/orders/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiFilter,
  FiSearch,
  FiEye,
  FiPackage,
  FiTruck,
  FiCheck,
  FiClock,
} from "react-icons/fi";

// Define types for the Orders page
interface Order {
  id: string;
  customerName: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  totalPrice: number;
  orderDate: string;
  items: { name: string; quantity: number; price: number }[];
  customerAddress: string;
  paymentMethod: string;
}

// Type guard function to handle status checking
function isUpdatableStatus(
  status: Order["status"]
): status is "Pending" | "Processing" | "Shipped" {
  return status !== "Delivered";
}

// Mock data for testing
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    status: "Pending",
    totalPrice: 125.5,
    orderDate: "2023-07-05T08:30:00",
    items: [
      { name: "Paracetamol", quantity: 2, price: 12.5 },
      { name: "Vitamin C", quantity: 1, price: 100.5 },
    ],
    customerAddress: "123 Main St, City, Country",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    status: "Processing",
    totalPrice: 78.25,
    orderDate: "2023-07-04T14:15:00",
    items: [
      { name: "Ibuprofen", quantity: 1, price: 18.25 },
      { name: "Bandages", quantity: 2, price: 30.0 },
    ],
    customerAddress: "456 Oak Ave, Town, Country",
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-003",
    customerName: "Robert Johnson",
    status: "Shipped",
    totalPrice: 210.0,
    orderDate: "2023-07-03T11:45:00",
    items: [
      { name: "Antibiotics", quantity: 1, price: 145.0 },
      { name: "Syringes", quantity: 5, price: 65.0 },
    ],
    customerAddress: "789 Pine Rd, Village, Country",
    paymentMethod: "Cash on Delivery",
  },
  {
    id: "ORD-004",
    customerName: "Emily Davis",
    status: "Delivered",
    totalPrice: 95.75,
    orderDate: "2023-07-02T16:20:00",
    items: [
      { name: "Allergy Medicine", quantity: 1, price: 45.75 },
      { name: "Face Masks", quantity: 1, price: 50.0 },
    ],
    customerAddress: "101 Elm Blvd, City, Country",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-005",
    customerName: "Michael Wilson",
    status: "Pending",
    totalPrice: 32.5,
    orderDate: "2023-07-05T09:10:00",
    items: [{ name: "Cough Syrup", quantity: 1, price: 32.5 }],
    customerAddress: "202 Maple Dr, Town, Country",
    paymentMethod: "Debit Card",
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filteredOrders, setFilteredOrders] =
    useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  useEffect(() => {
    // In a real application, fetch orders from an API
    // For now, we're using mock data
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  useEffect(() => {
    let result = orders;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      result = result.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(result);
  }, [searchTerm, statusFilter, orders]);

  const updateOrderStatus = (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return <FiClock className="text-yellow-500" />;
      case "Processing":
        return <FiPackage className="text-blue-500" />;
      case "Shipped":
        return <FiTruck className="text-purple-500" />;
      case "Delivered":
        return <FiCheck className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="py-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/pharmacy-dashboard">
                <Image
                  src="/logo.png"
                  alt="CareCapsule Logo"
                  width={160}
                  height={50}
                  className="object-contain"
                />
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">
                Order Management
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Link
                  href="/pharmacy-dashboard/profile"
                  className="flex items-center text-gray-700 hover:text-[#2BADE8]"
                >
                  <span className="mr-2">Al-Ezaby Pharmacy</span>
                  <Image
                    src="/user.png"
                    alt="Pharmacy Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Order Management
          </h1>
          <Link
            href="/pharmacy-dashboard"
            className="text-blue-500 hover:text-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div className="relative mb-4 md:mb-0 w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search by order ID or customer name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            <div className="flex items-center">
              <FiFilter className="mr-2 text-gray-600" />
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">
                        {order.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {order.customerName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center">
                          {getStatusIcon(order.status)}
                          <span
                            className={`ml-2 ${
                              order.status === "Pending"
                                ? "text-yellow-500"
                                : order.status === "Processing"
                                ? "text-blue-500"
                                : order.status === "Shipped"
                                ? "text-purple-500"
                                : "text-green-500"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex space-x-2">
                          <Link
                            href={`/pharmacy-dashboard/orders/${order.id}`}
                            className="flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <FiEye className="mr-1" /> View
                          </Link>{" "}
                          {order.status !== "Delivered" && (
                            <div className="relative group">
                              <button className="text-gray-600 hover:text-gray-800">
                                Update
                              </button>{" "}
                              <div className="absolute z-10 hidden bg-white border border-gray-200 rounded-md shadow-lg p-2 mt-2 group-hover:block">
                                {/* Explicitly check status to avoid TypeScript narrowing issues */}
                                {(order.status === "Pending" ||
                                  order.status === "Shipped") && (
                                  <button
                                    onClick={() =>
                                      updateOrderStatus(
                                        order.id,
                                        "Processing"
                                      )
                                    }
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                  >
                                    Mark as Processing
                                  </button>
                                )}
                                {/* @ts-expect-error - TypeScript narrowing issue */}
                                {order.status !== "Shipped" &&
                                  order.status !== "Delivered" && (
                                    <button
                                      onClick={() =>
                                        updateOrderStatus(
                                          order.id,
                                          "Shipped"
                                        )
                                      }
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                      Mark as Shipped
                                    </button>
                                  )}
                                {/* @ts-expect-error - TypeScript narrowing issue */}
                                {order.status !== "Delivered" && (
                                  <button
                                    onClick={() =>
                                      updateOrderStatus(
                                        order.id,
                                        "Delivered"
                                      )
                                    }
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                  >
                                    Mark as Delivered
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-3 text-center text-gray-500"
                    >
                      No orders found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
