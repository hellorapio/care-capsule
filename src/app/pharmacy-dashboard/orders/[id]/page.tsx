// filepath: /app/pharmacy-dashboard/orders/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiPackage,
  FiTruck,
  FiCheck,
  FiClock,
  FiUser,
  FiMapPin,
  FiCreditCard,
} from "react-icons/fi";

// Define types for the Order detail page
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  totalPrice: number;
  orderDate: string;
  items: OrderItem[];
  customerAddress: string;
  paymentMethod: string;
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

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, fetch order details from an API
    // For now, we're using mock data
    setIsLoading(true);

    const foundOrder = mockOrders.find((o) => o.id === orderId);

    if (foundOrder) {
      setOrder(foundOrder);
    }

    setIsLoading(false);
  }, [orderId]);

  const updateOrderStatus = (newStatus: Order["status"]) => {
    if (order) {
      // In a real application, update via API
      const updatedOrder = { ...order, status: newStatus };
      setOrder(updatedOrder);

      // Show a success message
      alert(`Order status updated to ${newStatus}`);
    }
  };

  const getStatusStep = () => {
    switch (order?.status) {
      case "Pending":
        return 1;
      case "Processing":
        return 2;
      case "Shipped":
        return 3;
      case "Delivered":
        return 4;
      default:
        return 0;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-center">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-center text-red-500">Order not found</p>
          <div className="text-center mt-4">
            <Link
              href="/pharmacy-dashboard/orders"
              className="text-blue-500 hover:text-blue-700"
            >
              Return to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <FiArrowLeft className="mr-2" /> Back to Orders
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Order #{order.id}
          </h1>
          <div className="text-sm text-gray-500">
            {new Date(order.orderDate).toLocaleString()}
          </div>
        </div>

        {/* Order Status Tracker */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Order Status
          </h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-1 bg-gray-200"></div>
            <div
              className="absolute top-1/2 left-0 transform -translate-y-1/2 h-1 bg-blue-500 transition-all duration-500 ease-in-out"
              style={{ width: `${(getStatusStep() / 4) * 100}%` }}
            ></div>
            <div className="relative flex justify-between">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                  ${
                    getStatusStep() >= 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <FiClock size={16} />
                </div>
                <span className="text-xs mt-2">Pending</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                  ${
                    getStatusStep() >= 2
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <FiPackage size={16} />
                </div>
                <span className="text-xs mt-2">Processing</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                  ${
                    getStatusStep() >= 3
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <FiTruck size={16} />
                </div>
                <span className="text-xs mt-2">Shipped</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                  ${
                    getStatusStep() >= 4
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <FiCheck size={16} />
                </div>
                <span className="text-xs mt-2">Delivered</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Order Information
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="text-sm font-medium">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="text-sm font-medium">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p
                    className={`text-sm font-medium 
                    ${
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
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="text-sm font-medium">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Customer Information
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start mb-3">
                <FiUser className="text-gray-400 mt-1 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Customer Name</p>
                  <p className="text-sm font-medium">
                    {order.customerName}
                  </p>
                </div>
              </div>
              <div className="flex items-start mb-3">
                <FiMapPin className="text-gray-400 mt-1 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Shipping Address</p>
                  <p className="text-sm font-medium">
                    {order.customerAddress}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <FiCreditCard className="text-gray-400 mt-1 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="text-sm font-medium">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Order Items
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td
                    colSpan={3}
                    className="py-3 px-4 text-sm font-medium text-right text-gray-700"
                  >
                    Total
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-800">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Update Status Actions */}
        <div className="mt-8 flex flex-wrap gap-3 justify-end">
          {order.status !== "Processing" && (
            <button
              onClick={() => updateOrderStatus("Processing")}
              disabled={
                order.status === "Delivered" || order.status === "Shipped"
              }
              className={`px-4 py-2 rounded-lg text-sm font-medium 
                ${
                  order.status === "Delivered" ||
                  order.status === "Shipped"
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
            >
              Mark as Processing
            </button>
          )}

          {order.status !== "Shipped" && (
            <button
              onClick={() => updateOrderStatus("Shipped")}
              disabled={order.status === "Delivered"}
              className={`px-4 py-2 rounded-lg text-sm font-medium 
                ${
                  order.status === "Delivered"
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-purple-500 text-white hover:bg-purple-600"
                }`}
            >
              Mark as Shipped
            </button>
          )}

          {order.status !== "Delivered" && (
            <button
              onClick={() => updateOrderStatus("Delivered")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600"
            >
              Mark as Delivered
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
