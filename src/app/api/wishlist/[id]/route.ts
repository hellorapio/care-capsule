// API endpoint for operations on specific wishlist items

import { NextRequest, NextResponse } from "next/server";

// Mock database - In a real application, this would be your database
let wishlistItems = [
  {
    id: "1",
    name: "Panadol Extra",
    price: 12.99,
    image: "/Panadol.png",
    inStock: true,
    category: "Pain Relief",
    userId: "123", // This would link to the authenticated user
  },
  {
    id: "2",
    name: "Antinal 200mg",
    price: 24.99,
    image: "/Antinal.png",
    inStock: true,
    category: "Digestive Health",
    userId: "123",
  },
  {
    id: "3",
    name: "CeraVe Moisturizing Cream",
    price: 79.99,
    image: "/cosrx.png",
    inStock: false,
    category: "Skin Care",
    userId: "123",
  },
  {
    id: "4",
    name: "Prufen 400mg",
    price: 22.99,
    image: "/prufen.png",
    inStock: true,
    category: "Pain Relief",
    userId: "123",
  },
];

// DELETE /api/wishlist/[id] - Remove an item from the wishlist
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // In a real app, you would get the authenticated user's ID
    const userId = "123"; // Mock user ID

    // Find the index of the item in the array
    const itemIndex = wishlistItems.findIndex(
      (item) => item.id === id && item.userId === userId
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { error: "Item not found in wishlist" },
        { status: 404 }
      );
    }

    // Remove the item
    const deletedItem = wishlistItems[itemIndex];
    wishlistItems.splice(itemIndex, 1);

    // Remove userId from response
    const { userId: _, ...responseItem } = deletedItem;

    return NextResponse.json(responseItem, { status: 200 });
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    return NextResponse.json(
      { error: "Failed to remove item from wishlist" },
      { status: 500 }
    );
  }
}
