// filepath: /app/pharmacy-dashboard/stats/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowLeft,
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiPackage,
  FiUsers,
  FiBarChart2,
} from "react-icons/fi";

// Define types for the Statistics page
interface MonthlySales {
  month: string;
  sales: number;
  orders: number;
}

interface TopSellingProduct {
  id: string;
  name: string;
  category: string;
  quantity: number;
  revenue: number;
}

interface CustomerStats {
  totalCustomers: number;
  newCustomersThisMonth: number;
  returningCustomersPercentage: number;
  averageOrderValue: number;
}

// Mock data for testing
const mockMonthlySales: MonthlySales[] = [
  { month: "Jan", sales: 12500, orders: 145 },
  { month: "Feb", sales: 14200, orders: 168 },
  { month: "Mar", sales: 15800, orders: 182 },
  { month: "Apr", sales: 14900, orders: 174 },
  { month: "May", sales: 16300, orders: 195 },
  { month: "Jun", sales: 18500, orders: 215 },
  { month: "Jul", sales: 19200, orders: 224 },
  { month: "Aug", sales: 17800, orders: 209 },
  { month: "Sep", sales: 16500, orders: 187 },
  { month: "Oct", sales: 18100, orders: 213 },
  { month: "Nov", sales: 20500, orders: 242 },
  { month: "Dec", sales: 22800, orders: 268 },
];

const mockTopSellingProducts: TopSellingProduct[] = [
  {
    id: "MED-001",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    quantity: 520,
    revenue: 3250,
  },
  {
    id: "MED-003",
    name: "Vitamin C 1000mg",
    category: "Vitamins & Supplements",
    quantity: 480,
    revenue: 4200,
  },
  {
    id: "MED-008",
    name: "Blood Glucose Test Strips",
    category: "Diabetes",
    quantity: 320,
    revenue: 8640,
  },
  {
    id: "MED-002",
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    quantity: 275,
    revenue: 3437.5,
  },
  {
    id: "MED-005",
    name: "Loratadine 10mg",
    category: "Allergy",
    quantity: 250,
    revenue: 2497.5,
  },
];

const mockCustomerStats: CustomerStats = {
  totalCustomers: 1850,
  newCustomersThisMonth: 120,
  returningCustomersPercentage: 68,
  averageOrderValue: 84.5,
};

export default function StatsPage() {
  const [monthlySales, setMonthlySales] = useState<MonthlySales[]>([]);
  const [topSellingProducts, setTopSellingProducts] = useState<
    TopSellingProduct[]
  >([]);
  const [customerStats, setCustomerStats] = useState<CustomerStats | null>(
    null
  );
  const [timeRange, setTimeRange] = useState("year");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, fetch stats from an API
    // For now, we're using mock data
    setIsLoading(true);

    // Simulate API call delay
    const timer = setTimeout(() => {
      setMonthlySales(mockMonthlySales);
      setTopSellingProducts(mockTopSellingProducts);
      setCustomerStats(mockCustomerStats);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Calculate total sales and orders for the given time period
  const getTotalSales = () => {
    // For simplicity, we're using the full year data
    // In a real app, you would filter based on timeRange
    return monthlySales.reduce((total, month) => total + month.sales, 0);
  };

  const getTotalOrders = () => {
    return monthlySales.reduce((total, month) => total + month.orders, 0);
  };

  const getAverageSalePerOrder = () => {
    const totalSales = getTotalSales();
    const totalOrders = getTotalOrders();
    return totalOrders > 0 ? totalSales / totalOrders : 0;
  };
  // Get growth compared to previous period
  // Unused function - kept for reference

  const getGrowthRate = () => {
    // Simplified calculation for demo purposes
    // In a real app, this would compare current period to previous period
    const currentPeriodSales = monthlySales
      .slice(-3)
      .reduce((total, month) => total + month.sales, 0);
    const previousPeriodSales = monthlySales
      .slice(-6, -3)
      .reduce((total, month) => total + month.sales, 0);

    if (previousPeriodSales === 0) return 0;

    return (
      ((currentPeriodSales - previousPeriodSales) / previousPeriodSales) *
      100
    );
  };

  // Get data for current month and previous month for comparison
  const getCurrentMonthData = () => {
    return monthlySales.length > 0
      ? monthlySales[monthlySales.length - 1]
      : { month: "", sales: 0, orders: 0 };
  };

  const getPreviousMonthData = () => {
    return monthlySales.length > 1
      ? monthlySales[monthlySales.length - 2]
      : { month: "", sales: 0, orders: 0 };
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-center">Loading statistics...</p>
        </div>
      </div>
    );
  }

  const currentMonth = getCurrentMonthData();
  const previousMonth = getPreviousMonthData();
  const salesChange =
    previousMonth.sales > 0
      ? ((currentMonth.sales - previousMonth.sales) /
          previousMonth.sales) *
        100
      : 0;
  const ordersChange =
    previousMonth.orders > 0
      ? ((currentMonth.orders - previousMonth.orders) /
          previousMonth.orders) *
        100
      : 0;

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
                Sales & Analytics
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

      <div className="container mx-auto px-4 py-8 ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Sales & Analytics
          </h1>
          <div className="flex space-x-4">
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
              <FiCalendar className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>

            <Link
              href="/pharmacy-dashboard"
              className="text-blue-500 hover:text-blue-700"
            >
              <div className="flex items-center">
                <FiArrowLeft className="mr-1" /> Back to Dashboard
              </div>
            </Link>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Sales</p>
                <p className="text-2xl font-bold text-gray-800">
                  ${getTotalSales().toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <FiDollarSign className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {salesChange >= 0 ? (
                <FiTrendingUp className="text-green-500 mr-1" />
              ) : (
                <FiTrendingDown className="text-red-500 mr-1" />
              )}
              <span
                className={`text-sm ${
                  salesChange >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {Math.abs(salesChange).toFixed(1)}%{" "}
                {salesChange >= 0 ? "increase" : "decrease"} from last
                month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800">
                  {getTotalOrders().toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <FiPackage className="text-purple-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {ordersChange >= 0 ? (
                <FiTrendingUp className="text-green-500 mr-1" />
              ) : (
                <FiTrendingDown className="text-red-500 mr-1" />
              )}
              <span
                className={`text-sm ${
                  ordersChange >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {Math.abs(ordersChange).toFixed(1)}%{" "}
                {ordersChange >= 0 ? "increase" : "decrease"} from last
                month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Average Sale</p>
                <p className="text-2xl font-bold text-gray-800">
                  ${getAverageSalePerOrder().toFixed(2)}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <FiBarChart2 className="text-green-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-500">
                Per order average
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Total Customers
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {customerStats?.totalCustomers.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <FiUsers className="text-yellow-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-green-500">
                +{customerStats?.newCustomersThisMonth} new this month
              </span>
            </div>
          </div>
        </div>

        {/* Sales Trend Chart (Visualization) */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Sales Trend
          </h2>

          <div className="h-64 relative">
            {/* In a real app, you would integrate a charting library like Chart.js, Recharts, etc. */}
            {/* For this demo, we'll create a simple bar chart visualization */}
            <div className="flex h-full items-end space-x-2">
              {monthlySales.map((data, index) => {
                const maxSales = Math.max(
                  ...monthlySales.map((d) => d.sales)
                );
                const height =
                  maxSales > 0 ? (data.sales / maxSales) * 100 : 0;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className="w-full bg-blue-500 rounded-t-sm"
                      style={{ height: `${height}%` }}
                      title={`$${data.sales.toLocaleString()}`}
                    ></div>
                    <div className="text-xs mt-2 text-gray-600">
                      {data.month}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chart Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
              <span>$25K</span>
              <span>$20K</span>
              <span>$15K</span>
              <span>$10K</span>
              <span>$5K</span>
              <span>$0</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Selling Products */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Top Selling Products
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Product
                    </th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Quantity
                    </th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topSellingProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className={
                        index !== topSellingProducts.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      }
                    >
                      <td className="py-3 text-sm font-medium text-gray-800">
                        {product.name}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {product.category}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {product.quantity}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        ${product.revenue.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Insights */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Customer Insights
            </h2>

            {customerStats && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">
                      Total Customers
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      {customerStats.totalCustomers.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">
                      New Customers
                    </p>
                    <p className="text-xl font-bold text-green-500">
                      +{customerStats.newCustomersThisMonth}
                    </p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Returning vs New Customers
                  </p>
                  <div className="relative pt-1">
                    <div className="flex h-4 overflow-hidden text-xs bg-gray-200 rounded-full">
                      <div
                        className="flex flex-col justify-center text-center text-white bg-blue-500 whitespace-nowrap"
                        style={{
                          width: `${customerStats.returningCustomersPercentage}%`,
                        }}
                      >
                        <span className="px-2 text-xs">
                          {customerStats.returningCustomersPercentage}%
                        </span>
                      </div>
                      <div
                        className="flex flex-col justify-center text-center text-white bg-green-500 whitespace-nowrap"
                        style={{
                          width: `${
                            100 -
                            customerStats.returningCustomersPercentage
                          }%`,
                        }}
                      >
                        <span className="px-2 text-xs">
                          {100 -
                            customerStats.returningCustomersPercentage}
                          %
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>
                        Returning (
                        {customerStats.returningCustomersPercentage}%)
                      </span>
                      <span>
                        New (
                        {100 - customerStats.returningCustomersPercentage}
                        %)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">
                    Average Order Value
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    ${customerStats.averageOrderValue.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sales by Category (Visualization) */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Sales by Category
          </h2>

          <div className="h-64">
            {/* In a real app, you would integrate a charting library like Chart.js, Recharts, etc. */}
            {/* For this demo, we'll create a simple visualization */}
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">
                Pie chart showing sales distribution by product category
                would be displayed here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
