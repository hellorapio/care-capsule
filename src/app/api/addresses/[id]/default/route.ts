// API endpoint for setting an address as default

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

// PUT /api/addresses/[id]/default - Set an address as default
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // In a real app, you would get the authenticated user's ID
    const userId = "123"; // Mock user ID

    // Find the address
    const address = addresses.find(
      (addr) => addr.id === id && addr.userId === userId
    );

    if (!address) {
      return NextResponse.json(
        { error: "Address not found" },
        { status: 404 }
      );
    }

    // If already default, nothing to do
    if (address.isDefault) {
      const { userId: _, ...responseAddress } = address;
      return NextResponse.json(responseAddress, { status: 200 });
    }

    // Update all addresses for this user
    addresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id && addr.userId === userId,
    }));

    // Find the updated address (now default)
    const updatedAddress = addresses.find(
      (addr) => addr.id === id && addr.userId === userId
    )!;

    // Remove userId from response
    const { userId: _, ...responseAddress } = updatedAddress;

    return NextResponse.json(responseAddress, { status: 200 });
  } catch (error) {
    console.error("Error setting default address:", error);
    return NextResponse.json(
      { error: "Failed to set default address" },
      { status: 500 }
    );
  }
}
