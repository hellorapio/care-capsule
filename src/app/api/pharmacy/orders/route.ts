// filepath: /app/api/pharmacy/orders/route.ts
import { NextRequest, NextResponse } from "next/server";

// Define types for the Orders API
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

// Mock database for orders
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

// GET /api/pharmacy/orders - Get all orders
export async function GET(request: NextRequest) {
  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const searchTerm = searchParams.get("search")?.toLowerCase();

  // Filter orders based on query parameters
  let filteredOrders = [...mockOrders];

  if (status && status !== "All") {
    filteredOrders = filteredOrders.filter(
      (order) => order.status === status
    );
  }

  if (searchTerm) {
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm) ||
        order.customerName.toLowerCase().includes(searchTerm)
    );
  }

  // Sort orders by date (newest first)
  filteredOrders.sort(
    (a, b) =>
      new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
  );

  return NextResponse.json(filteredOrders);
}

// POST /api/pharmacy/orders - Update order status
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate required fields
  if (!body.id || !body.status) {
    return NextResponse.json(
      { error: "Order ID and status are required" },
      { status: 400 }
    );
  }

  // Find the order to update
  const orderIndex = mockOrders.findIndex((order) => order.id === body.id);

  if (orderIndex === -1) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  // Update the order status
  mockOrders[orderIndex].status = body.status;

  return NextResponse.json(mockOrders[orderIndex]);
}
