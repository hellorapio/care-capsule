"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiPlus,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiAlertCircle,
} from "react-icons/fi";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stockQuantity: number;
  reorderLevel: number;
  supplier: string;
  expiryDate: string;
}

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
  },
];

export default function InventoryPage() {
  const [inventory, setInventory] =
    useState<InventoryItem[]>(mockInventory);
  const [filteredInventory, setFilteredInventory] =
    useState<InventoryItem[]>(mockInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [showLowStock, setShowLowStock] = useState(false);

  // Get unique categories from inventory for the filter dropdown
  const categories = [
    "All",
    ...new Set(inventory.map((item) => item.category)),
  ];

  useEffect(() => {
    // In a real application, fetch inventory from an API
    // For now, we're using mock data
    setInventory(mockInventory);
    setFilteredInventory(mockInventory);
  }, []);

  useEffect(() => {
    let result = inventory;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "All") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    // Apply low stock filter
    if (showLowStock) {
      result = result.filter(
        (item) => item.stockQuantity <= item.reorderLevel
      );
    }

    setFilteredInventory(result);
  }, [searchTerm, categoryFilter, showLowStock, inventory]);

  const handleDeleteItem = (id: string) => {
    // In a real application, delete via API
    if (confirm("Are you sure you want to delete this item?")) {
      const updatedInventory = inventory.filter((item) => item.id !== id);
      setInventory(updatedInventory);
    }
  };

  const isLowStock = (item: InventoryItem) => {
    return item.stockQuantity <= item.reorderLevel;
  };
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
                Inventory Management
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

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Inventory Management
          </h1>
          <div className="flex space-x-3">
            <Link
              href="/pharmacy-dashboard"
              className="text-blue-500 hover:text-blue-700"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/pharmacy-dashboard/inventory/add"
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              <FiPlus className="mr-2" /> Add Item
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="relative mb-4 md:mb-0 w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search by name or ID"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <label htmlFor="category" className="mr-2 text-gray-600">
                  Category:
                </label>
                <select
                  id="category"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="lowStock"
                  className="mr-2"
                  checked={showLowStock}
                  onChange={(e) => setShowLowStock(e.target.checked)}
                />
                <label htmlFor="lowStock" className="text-gray-600">
                  Show Low Stock Only
                </label>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Expiry Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => (
                    <tr
                      key={item.id}
                      className={`border-b border-gray-200 hover:bg-gray-50 ${
                        isLowStock(item) ? "bg-red-50" : ""
                      }`}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">
                        {item.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          {item.name}
                          {isLowStock(item) && (
                            <FiAlertCircle
                              className="ml-2 text-red-500"
                              title="Low stock"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        ${item.price.toFixed(2)}
                      </td>
                      <td
                        className={`px-4 py-3 text-sm ${
                          isLowStock(item)
                            ? "text-red-500 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {item.stockQuantity}{" "}
                        {isLowStock(item) &&
                          `(Reorder at: ${item.reorderLevel})`}
                      </td>
                      <td
                        className={`px-4 py-3 text-sm ${
                          new Date(item.expiryDate) < new Date()
                            ? "text-red-500 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {new Date(item.expiryDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex space-x-2">
                          <Link
                            href={`/pharmacy-dashboard/inventory/${item.id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FiEdit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-3 text-center text-gray-500"
                    >
                      No inventory items found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Total Items
            </h3>
            <p className="text-3xl font-bold text-blue-500">
              {inventory.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Low Stock Items
            </h3>
            <p className="text-3xl font-bold text-red-500">
              {inventory.filter((item) => isLowStock(item)).length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Expiring Soon
            </h3>
            <p className="text-3xl font-bold text-yellow-500">
              {
                inventory.filter((item) => {
                  const expiryDate = new Date(item.expiryDate);
                  const today = new Date();
                  const threeMonthsFromNow = new Date();
                  threeMonthsFromNow.setMonth(today.getMonth() + 3);
                  return (
                    expiryDate > today && expiryDate <= threeMonthsFromNow
                  );
                }).length
              }
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Inventory Value
            </h3>
            <p className="text-3xl font-bold text-green-500">
              $
              {inventory
                .reduce(
                  (total, item) => total + item.price * item.stockQuantity,
                  0
                )
                .toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
