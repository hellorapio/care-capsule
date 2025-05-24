// filepath: /app/api/pharmacy/inventory/route.ts
import { NextRequest, NextResponse } from "next/server";

// Define types for the Inventory API
interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stockQuantity: number;
  reorderLevel: number;
  supplier: string;
  expiryDate: string;
  description?: string;
  batchNumber?: string;
  location?: string;
}

// Mock database for inventory items
const mockInventory: InventoryItem[] = [
  {
    id: "MED-001",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: 6.25,
    stockQuantity: 150,
    reorderLevel: 30,
    supplier: "PharmSupply Inc.",
    expiryDate: "2024-12-31",
    description: "Pain reliever and fever reducer",
    batchNumber: "BATCH7890",
    location: "Shelf A3",
  },
  {
    id: "MED-002",
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    price: 12.5,
    stockQuantity: 45,
    reorderLevel: 20,
    supplier: "MediPharm Ltd.",
    expiryDate: "2023-10-15",
    description: "Antibiotic for bacterial infections",
    batchNumber: "BATCH4567",
    location: "Shelf B2",
  },
  {
    id: "MED-003",
    name: "Vitamin C 1000mg",
    category: "Vitamins & Supplements",
    price: 8.75,
    stockQuantity: 200,
    reorderLevel: 50,
    supplier: "Nutricore",
    expiryDate: "2025-06-30",
    description: "Immune system support",
    batchNumber: "BATCH1234",
    location: "Shelf C1",
  },
  {
    id: "MED-004",
    name: "Ibuprofen 200mg",
    category: "Pain Relief",
    price: 5.5,
    stockQuantity: 18,
    reorderLevel: 25,
    supplier: "PharmSupply Inc.",
    expiryDate: "2024-08-15",
    description: "Anti-inflammatory pain reliever",
    batchNumber: "BATCH5678",
    location: "Shelf A4",
  },
  {
    id: "MED-005",
    name: "Loratadine 10mg",
    category: "Allergy",
    price: 9.99,
    stockQuantity: 85,
    reorderLevel: 30,
    supplier: "AllergyCare",
    expiryDate: "2024-04-22",
    description: "Antihistamine for allergy relief",
    batchNumber: "BATCH2345",
    location: "Shelf D2",
  },
  {
    id: "MED-006",
    name: "Insulin Vials",
    category: "Diabetes",
    price: 78.5,
    stockQuantity: 12,
    reorderLevel: 15,
    supplier: "DiabeCare Inc.",
    expiryDate: "2023-11-30",
    description: "For diabetes management",
    batchNumber: "BATCH9012",
    location: "Refrigerator 1",
  },
  {
    id: "MED-007",
    name: "Blood Pressure Monitor",
    category: "Medical Devices",
    price: 45.0,
    stockQuantity: 8,
    reorderLevel: 5,
    supplier: "MedEquip",
    expiryDate: "2026-12-31",
    description: "Digital blood pressure monitoring device",
    batchNumber: "BATCH3456",
    location: "Shelf E1",
  },
];

// GET /api/pharmacy/inventory - Get all inventory items
export async function GET(request: NextRequest) {
  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const searchTerm = searchParams.get("search")?.toLowerCase();
  const lowStock = searchParams.get("lowStock") === "true";

  // Filter inventory based on query parameters
  let filteredInventory = [...mockInventory];

  if (category && category !== "All") {
    filteredInventory = filteredInventory.filter(
      (item) => item.category === category
    );
  }

  if (searchTerm) {
    filteredInventory = filteredInventory.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.id.toLowerCase().includes(searchTerm)
    );
  }

  if (lowStock) {
    filteredInventory = filteredInventory.filter(
      (item) => item.stockQuantity <= item.reorderLevel
    );
  }

  // Sort inventory by name
  filteredInventory.sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json(filteredInventory);
}

// POST /api/pharmacy/inventory - Add or update inventory item
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate required fields
  if (
    !body.name ||
    !body.category ||
    body.price === undefined ||
    body.stockQuantity === undefined
  ) {
    return NextResponse.json(
      { error: "Name, category, price, and stock quantity are required" },
      { status: 400 }
    );
  }

  // If ID is provided, update existing item
  if (body.id) {
    const itemIndex = mockInventory.findIndex(
      (item) => item.id === body.id
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    // Update the inventory item
    mockInventory[itemIndex] = {
      ...mockInventory[itemIndex],
      ...body,
    };

    return NextResponse.json(mockInventory[itemIndex]);
  }

  // If no ID is provided, create a new item
  const newId = `MED-${(mockInventory.length + 1)
    .toString()
    .padStart(3, "0")}`;

  const newItem: InventoryItem = {
    id: newId,
    name: body.name,
    category: body.category,
    price: body.price,
    stockQuantity: body.stockQuantity,
    reorderLevel: body.reorderLevel || 10, // Default reorder level
    supplier: body.supplier || "",
    expiryDate: body.expiryDate || "",
    description: body.description,
    batchNumber: body.batchNumber,
    location: body.location,
  };

  mockInventory.push(newItem);

  return NextResponse.json(newItem, { status: 201 });
}

// DELETE /api/pharmacy/inventory - Delete inventory item
export async function DELETE(request: NextRequest) {
  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Item ID is required" },
      { status: 400 }
    );
  }

  const itemIndex = mockInventory.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  // Remove the item from the inventory
  const deletedItem = mockInventory.splice(itemIndex, 1)[0];

  return NextResponse.json(deletedItem);
}
