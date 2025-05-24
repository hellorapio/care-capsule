// API endpoint for operations on specific addresses

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

// GET /api/addresses/[id] - Get a specific address
export async function GET(
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

    // Remove userId from response
    const { userId: _, ...responseAddress } = address;

    return NextResponse.json(responseAddress, { status: 200 });
  } catch (error) {
    console.error("Error fetching address:", error);
    return NextResponse.json(
      { error: "Failed to fetch address" },
      { status: 500 }
    );
  }
}

// PUT /api/addresses/[id] - Update an address
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();

    // In a real app, you would get the authenticated user's ID
    const userId = "123"; // Mock user ID

    // Find the address index
    const addressIndex = addresses.findIndex(
      (addr) => addr.id === id && addr.userId === userId
    );

    if (addressIndex === -1) {
      return NextResponse.json(
        { error: "Address not found" },
        { status: 404 }
      );
    }

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

    // If this is set as default, update all other addresses
    if (data.isDefault && !addresses[addressIndex].isDefault) {
      addresses = addresses.map((addr) =>
        addr.userId === userId ? { ...addr, isDefault: false } : addr
      );
    }

    // Update the address
    const updatedAddress = {
      ...addresses[addressIndex],
      ...data,
      id, // Ensure id doesn't change
      userId, // Ensure userId doesn't change
    };

    addresses[addressIndex] = updatedAddress;

    // Remove userId from response
    const { userId: _, ...responseAddress } = updatedAddress;

    return NextResponse.json(responseAddress, { status: 200 });
  } catch (error) {
    console.error("Error updating address:", error);
    return NextResponse.json(
      { error: "Failed to update address" },
      { status: 500 }
    );
  }
}

// DELETE /api/addresses/[id] - Delete an address
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // In a real app, you would get the authenticated user's ID
    const userId = "123"; // Mock user ID

    // Find the address index
    const addressIndex = addresses.findIndex(
      (addr) => addr.id === id && addr.userId === userId
    );

    if (addressIndex === -1) {
      return NextResponse.json(
        { error: "Address not found" },
        { status: 404 }
      );
    }

    // Check if it's a default address
    const isDefault = addresses[addressIndex].isDefault;

    // Remove the address
    const deletedAddress = addresses[addressIndex];
    addresses.splice(addressIndex, 1);

    // If it was a default address and we have other addresses, set a new default
    if (isDefault) {
      const userAddresses = addresses.filter(
        (addr) => addr.userId === userId
      );
      if (userAddresses.length > 0) {
        userAddresses[0].isDefault = true;
      }
    }

    // Remove userId from response
    const { userId: _, ...responseAddress } = deletedAddress;

    return NextResponse.json(responseAddress, { status: 200 });
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json(
      { error: "Failed to delete address" },
      { status: 500 }
    );
  }
}
