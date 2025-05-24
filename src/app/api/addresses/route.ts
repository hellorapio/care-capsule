// API endpoint for addresses

import { NextRequest, NextResponse } from "next/server";

// Mock database - In a real application, this would be your database
let addresses = [
  {
    id: "addr1",
    name: "Home",
    fullName: "John Doe",
    streetAddress: "123 Main Street",
    apartment: "Apt 4B",
    city: "Anytown",
    state: "CA",
    zipCode: "94321",
    phone: "+1 (555) 123-4567",
    isDefault: true,
    userId: "123", // This would link to the authenticated user
  },
  {
    id: "addr2",
    name: "Work",
    fullName: "John Doe",
    streetAddress: "456 Corporate Blvd",
    apartment: "Suite 101",
    city: "Business City",
    state: "CA",
    zipCode: "94322",
    phone: "+1 (555) 987-6543",
    isDefault: false,
    userId: "123",
  },
];

// GET /api/addresses - Get all addresses for the authenticated user
export async function GET(request: NextRequest) {
  try {
    // In a real app, you would get the authenticated user's ID
    const userId = "123"; // Mock user ID

    // Filter addresses for this user
    const userAddresses = addresses.filter(
      (address) => address.userId === userId
    );

    return NextResponse.json(
      userAddresses.map(({ userId, ...address }) => address), // Remove userId from response
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return NextResponse.json(
      { error: "Failed to fetch addresses" },
      { status: 500 }
    );
  }
}

// POST /api/addresses - Add a new address
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // In a real app, you would get the authenticated user's ID
    const userId = "123"; // Mock user ID

    // Validate required fields
    const requiredFields = [
      "name",
      "fullName",
      "streetAddress",
      "city",
      "state",
      "zipCode",
      "phone",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create new address object
    const newAddress = {
      ...data,
      id: `addr${Date.now()}`, // Generate a simple ID
      userId,
    };

    // If this is set as default, update all other addresses
    if (newAddress.isDefault) {
      addresses = addresses.map((addr) =>
        addr.userId === userId ? { ...addr, isDefault: false } : addr
      );
    }

    // Add new address
    addresses.push(newAddress);

    // Remove userId from response
    const { userId: _, ...responseAddress } = newAddress;

    return NextResponse.json(responseAddress, { status: 201 });
  } catch (error) {
    console.error("Error adding address:", error);
    return NextResponse.json(
      { error: "Failed to add address" },
      { status: 500 }
    );
  }
}
