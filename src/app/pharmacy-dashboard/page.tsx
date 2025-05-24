"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaBox,
  FaChartBar,
  FaClipboardList,
  FaMoneyBillWave,
  FaPills,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import Wrapper from "../../components/Wrapper";

// Define interfaces for type safety
interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

interface Order {
  id: string;
  customerName: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  totalPrice: number;
  timeOfOrder: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

interface InventoryItem {
  id: string;
  name: string;
  stockQuantity: number;
  price: number;
  category: string;
  image: string;
  threshold: number;
}

// Mock data for the dashboard
const mockStats: StatCard[] = [
  {
    title: "Total Orders",
    value: 128,
    icon: <FaShoppingCart className="text-blue-500" />,
    change: "+12%",
    changeType: "positive",
  },
  {
    title: "Revenue",
    value: "₹ 24,500",
    icon: <FaMoneyBillWave className="text-green-500" />,
    change: "+8%",
    changeType: "positive",
  },
  {
    title: "Customers",
    value: 84,
    icon: <FaUsers className="text-purple-500" />,
    change: "+5%",
    changeType: "positive",
  },
  {
    title: "Inventory Items",
    value: 152,
    icon: <FaBox className="text-yellow-500" />,
    change: "-3",
    changeType: "negative",
  },
];

const mockRecentOrders: Order[] = [
  {
    id: "ORD-2024-001",
    customerName: "Ahmed Hassan",
    status: "Pending",
    totalPrice: 450.75,
    timeOfOrder: "Today, 10:30 AM",
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
    ],
  },
  {
    id: "ORD-2024-002",
    customerName: "Sarah Mohamed",
    status: "Processing",
    totalPrice: 250.5,
    timeOfOrder: "Yesterday, 3:45 PM",
    items: [
      {
        id: "3",
        name: "CeraVe Moisturizing Cream",
        quantity: 1,
        price: 79.99,
        image: "/cosrx.png",
      },
      {
        id: "4",
        name: "Prufen 400mg",
        quantity: 2,
        price: 22.99,
        image: "/prufen.png",
      },
    ],
  },
  {
    id: "ORD-2024-003",
    customerName: "Mahmoud Ali",
    status: "Delivered",
    totalPrice: 780.25,
    timeOfOrder: "May 12, 2024, 9:15 AM",
    items: [
      {
        id: "5",
        name: "B-Complex Vitamins",
        quantity: 1,
        price: 35.5,
        image: "/cetal.png",
      },
    ],
  },
];

const mockLowStockItems: InventoryItem[] = [
  {
    id: "INV001",
    name: "Panadol Extra",
    stockQuantity: 5,
    price: 12.99,
    category: "Pain Relief",
    image: "/Panadol.png",
    threshold: 10,
  },
  {
    id: "INV002",
    name: "Antinal 200mg",
    stockQuantity: 3,
    price: 24.99,
    category: "Digestive Health",
    image: "/Antinal.png",
    threshold: 8,
  },
  {
    id: "INV003",
    name: "Prufen 400mg",
    stockQuantity: 7,
    price: 22.99,
    category: "Pain Relief",
    image: "/prufen.png",
    threshold: 15,
  },
];

export default function PharmacyDashboard() {
  const [stats, setStats] = useState<StatCard[]>(mockStats);
  const [recentOrders, setRecentOrders] =
    useState<Order[]>(mockRecentOrders);
  const [lowStockItems, setLowStockItems] =
    useState<InventoryItem[]>(mockLowStockItems);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real application, you would fetch data from your API endpoints
    const fetchDashboardData = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // In a real app:
        // const statsResponse = await fetch('/api/pharmacy/stats');
        // const statsData = await statsResponse.json();
        // setStats(statsData);

        // const ordersResponse = await fetch('/api/pharmacy/orders/recent');
        // const ordersData = await ordersResponse.json();
        // setRecentOrders(ordersData);

        // const inventoryResponse = await fetch('/api/pharmacy/inventory/low-stock');
        // const inventoryData = await inventoryResponse.json();
        // setLowStockItems(inventoryData);

        // For now, use mock data
        setStats(mockStats);
        setRecentOrders(mockRecentOrders);
        setLowStockItems(mockLowStockItems);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleViewOrderDetails = (orderId: string) => {
    router.push(`/pharmacy-dashboard/orders/${orderId}`);
  };

  const handleUpdateOrderStatus = async (
    orderId: string,
    newStatus: string
  ) => {
    try {
      // In a real app, you would call an API to update the order status
      // await fetch(`/api/pharmacy/orders/${orderId}/status`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: newStatus }),
      // });

      // For now, update locally
      setRecentOrders(
        recentOrders.map((order) =>
          order.id === orderId
            ? { ...order, status: newStatus as any }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm">
        <Wrapper>
          <div className="py-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo.png"
                alt="CareCapsule Logo"
                width={160}
                height={50}
                className="object-contain"
              />
              <h1 className="text-2xl font-bold text-gray-800">
                Pharmacy Dashboard
              </h1>
            </div>{" "}
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
        </Wrapper>
      </header>

      {/* Dashboard Navigation */}
      <nav className="bg-white shadow-sm border-t border-gray-200">
        <Wrapper>
          <div className="flex items-center space-x-8 py-2">
            <Link
              href="/pharmacy-dashboard"
              className="flex items-center px-3 py-2 text-[#2BADE8] border-b-2 border-[#2BADE8] font-medium"
            >
              <FaChartBar className="mr-2" />
              Dashboard
            </Link>
            <Link
              href="/pharmacy-dashboard/orders"
              className="flex items-center px-3 py-2 text-gray-600 hover:text-[#2BADE8] hover:border-b-2 hover:border-[#2BADE8] font-medium"
            >
              <FaClipboardList className="mr-2" />
              Orders
            </Link>
            <Link
              href="/pharmacy-dashboard/inventory"
              className="flex items-center px-3 py-2 text-gray-600 hover:text-[#2BADE8] font-medium"
            >
              <FaPills className="mr-2" />
              Inventory
            </Link>
            <Link
              href="/pharmacy-dashboard/stats"
              className="flex items-center px-3 py-2 text-gray-600 hover:text-[#2BADE8] font-medium"
            >
              <FaChartBar className="mr-2" />
              Statistics
            </Link>
          </div>
        </Wrapper>
      </nav>

      {/* Dashboard Content */}
      <Wrapper>
        <div className="py-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2BADE8]"></div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-6 transition-transform hover:transform hover:scale-105"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">
                          {stat.value}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-100">
                        {stat.icon}
                      </div>
                    </div>
                    {stat.change && (
                      <div className="mt-4">
                        <span
                          className={`text-sm font-medium ${
                            stat.changeType === "positive"
                              ? "text-green-600"
                              : stat.changeType === "negative"
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          {stat.change} from last month
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Recent Orders
                  </h2>
                  <Link
                    href="/pharmacy-dashboard/orders"
                    className="text-sm text-[#2BADE8] hover:text-blue-700"
                  >
                    View all orders
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.customerName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.timeOfOrder}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹ {order.totalPrice.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() =>
                                handleViewOrderDetails(order.id)
                              }
                              className="text-[#2BADE8] hover:text-blue-700 mr-3"
                            >
                              View
                            </button>
                            <select
                              onChange={(e) =>
                                handleUpdateOrderStatus(
                                  order.id,
                                  e.target.value
                                )
                              }
                              value={order.status}
                              className="text-sm border border-gray-300 rounded-md p-1"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">
                                Processing
                              </option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Low Stock Items & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Low Stock Items */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Low Stock Items
                    </h2>
                    <Link
                      href="/pharmacy-dashboard/inventory"
                      className="text-sm text-[#2BADE8] hover:text-blue-700"
                    >
                      View all items
                    </Link>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {lowStockItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between border-b border-gray-100 pb-4"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.category}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-medium text-gray-800">
                              Stock: {item.stockQuantity}
                            </p>
                            <p
                              className={`text-sm ${
                                item.stockQuantity < item.threshold / 2
                                  ? "text-red-600"
                                  : "text-yellow-600"
                              }`}
                            >
                              {item.stockQuantity < item.threshold / 2
                                ? "Critical"
                                : "Low"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Quick Actions
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-4">
                      <button
                        onClick={() =>
                          router.push("/pharmacy-dashboard/inventory/add")
                        }
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                      >
                        <div className="flex items-center">
                          <FaPills className="text-[#2BADE8] mr-3" />
                          <span>Add New Product</span>
                        </div>
                        <span className="text-[#2BADE8]">+</span>
                      </button>
                      <button
                        onClick={() =>
                          router.push("/pharmacy-dashboard/orders/new")
                        }
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                      >
                        <div className="flex items-center">
                          <FaShoppingCart className="text-[#2BADE8] mr-3" />
                          <span>Create Order</span>
                        </div>
                        <span className="text-[#2BADE8]">+</span>
                      </button>
                      <button
                        onClick={() =>
                          router.push(
                            "/pharmacy-dashboard/inventory/update"
                          )
                        }
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                      >
                        <div className="flex items-center">
                          <FaBox className="text-[#2BADE8] mr-3" />
                          <span>Update Inventory</span>
                        </div>
                        <span className="text-[#2BADE8]">↻</span>
                      </button>
                      <button
                        onClick={() =>
                          router.push("/pharmacy-dashboard/stats")
                        }
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                      >
                        <div className="flex items-center">
                          <FaChartBar className="text-[#2BADE8] mr-3" />
                          <span>View Sales Report</span>
                        </div>
                        <span className="text-[#2BADE8]">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Wrapper>
    </div>
  );
}
