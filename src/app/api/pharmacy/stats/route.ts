// filepath: /app/api/pharmacy/stats/route.ts
import { NextRequest, NextResponse } from "next/server";

// Define types for the Statistics API
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

interface SalesByCategory {
  category: string;
  sales: number;
  percentage: number;
}

interface PharmacyStats {
  monthlySales: MonthlySales[];
  topSellingProducts: TopSellingProduct[];
  customerStats: CustomerStats;
  salesByCategory: SalesByCategory[];
  totalRevenue: number;
  totalOrders: number;
  growthRate: number;
}

// Mock data for statistics
const mockPharmacyStats: PharmacyStats = {
  monthlySales: [
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
  ],
  topSellingProducts: [
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
  ],
  customerStats: {
    totalCustomers: 1850,
    newCustomersThisMonth: 120,
    returningCustomersPercentage: 68,
    averageOrderValue: 84.5,
  },
  salesByCategory: [
    { category: "Pain Relief", sales: 28500, percentage: 24 },
    { category: "Vitamins & Supplements", sales: 22000, percentage: 18.5 },
    { category: "Antibiotics", sales: 19800, percentage: 16.7 },
    { category: "Diabetes", sales: 15600, percentage: 13.1 },
    { category: "Allergy", sales: 12200, percentage: 10.3 },
    { category: "Medical Devices", sales: 9800, percentage: 8.2 },
    { category: "Others", sales: 10900, percentage: 9.2 },
  ],
  totalRevenue: 118800,
  totalOrders: 2222,
  growthRate: 15.3,
};

// GET /api/pharmacy/stats - Get pharmacy statistics
export async function GET(request: NextRequest) {
  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const timeRange = searchParams.get("timeRange") || "year";

  // In a real app, you would filter the data based on the time range
  // For this mock data, we'll return the same data regardless of the time range

  // Calculate response data
  let responseData: PharmacyStats = { ...mockPharmacyStats };

  if (timeRange === "month") {
    // Return only the last month's data
    const lastMonthData =
      mockPharmacyStats.monthlySales[
        mockPharmacyStats.monthlySales.length - 1
      ];
    responseData.monthlySales = [lastMonthData];
    responseData.totalRevenue = lastMonthData.sales;
    responseData.totalOrders = lastMonthData.orders;
    responseData.growthRate = 8.2; // Example growth rate for the month
  } else if (timeRange === "quarter") {
    // Return the last 3 months' data
    const lastThreeMonths = mockPharmacyStats.monthlySales.slice(-3);
    responseData.monthlySales = lastThreeMonths;
    responseData.totalRevenue = lastThreeMonths.reduce(
      (total, month) => total + month.sales,
      0
    );
    responseData.totalOrders = lastThreeMonths.reduce(
      (total, month) => total + month.orders,
      0
    );
    responseData.growthRate = 12.7; // Example growth rate for the quarter
  }

  return NextResponse.json(responseData);
}
