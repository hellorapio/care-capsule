// API endpoint for wishlist operations

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

// GET /api/wishlist - Get all wishlist items for the authenticated user
export async function GET(request: NextRequest) {
  try {
    // In a real app, you would get the authenticated user's ID
    const userId = "123"; // Mock user ID

    // Filter items for this user
    const userWishlistItems = wishlistItems.filter(
      (item) => item.userId === userId
    );

    return NextResponse.json(
      userWishlistItems.map(({ userId, ...item }) => item), // Remove userId from response
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist items" },
      { status: 500 }
    );
  }
}

// POST /api/wishlist - Add an item to the wishlist
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // In a real app, you would get the authenticated user's ID
    const userId = "123"; // Mock user ID

    // Validate required fields
    if (!data.id || !data.name || data.price === undefined) {
      return NextResponse.json(
        { error: "Missing required product information" },
        { status: 400 }
      );
    }

    // Check if item already exists in user's wishlist
    const existingItemIndex = wishlistItems.findIndex(
      (item) => item.id === data.id && item.userId === userId
    );

    if (existingItemIndex !== -1) {
      return NextResponse.json(
        { error: "Item already exists in wishlist" },
        { status: 409 }
      );
    }

    // Add item to wishlist
    const newItem = {
      ...data,
      userId,
    };

    wishlistItems.push(newItem);

    // Remove userId from response
    const { userId: _, ...responseItem } = newItem;

    return NextResponse.json(responseItem, { status: 201 });
  } catch (error) {
    console.error("Error adding item to wishlist:", error);
    return NextResponse.json(
      { error: "Failed to add item to wishlist" },
      { status: 500 }
    );
  }
}
