// filepath: /app/pharmacy-dashboard/inventory/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiSave, FiAlertTriangle } from "react-icons/fi";

// Define types for the Inventory item
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

// Define categories for the select dropdown
const categories = [
  "Pain Relief",
  "Antibiotics",
  "Vitamins & Supplements",
  "Allergy",
  "Diabetes",
  "Cardiovascular",
  "Respiratory",
  "Digestive Health",
  "Skin Care",
  "First Aid",
  "Medical Devices",
  "Personal Care",
];

// Define suppliers for the select dropdown
const suppliers = [
  "PharmSupply Inc.",
  "MediPharm Ltd.",
  "Nutricore",
  "AllergyCare",
  "DiabeCare Inc.",
  "MedEquip",
  "PharmaWholesale",
  "Global Meds",
];

// Mock data for testing
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
];

export default function EditInventoryItemPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params?.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState<InventoryItem | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // In a real application, fetch item details from an API
    // For now, we're using mock data
    setIsLoading(true);

    const foundItem = mockInventory.find((i) => i.id === itemId);

    if (foundItem) {
      setItem(foundItem);
    }

    setIsLoading(false);
  }, [itemId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (!item) return;

    const { name, value } = e.target;
    setItem((prevItem) => {
      if (!prevItem) return null;

      return {
        ...prevItem,
        [name]: value,
      };
    });

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    if (!item) return false;

    const newErrors: Record<string, string> = {};

    if (!item.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!item.category) {
      newErrors.category = "Category is required";
    }

    if (!item.price || item.price <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (item.stockQuantity < 0 || !Number.isInteger(item.stockQuantity)) {
      newErrors.stockQuantity =
        "Stock quantity must be a non-negative integer";
    }

    if (
      !item.reorderLevel ||
      item.reorderLevel <= 0 ||
      !Number.isInteger(item.reorderLevel)
    ) {
      newErrors.reorderLevel = "Reorder level must be a positive integer";
    }

    if (!item.supplier) {
      newErrors.supplier = "Supplier is required";
    }

    if (!item.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    }

    if (!item.batchNumber) {
      newErrors.batchNumber = "Batch number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real application, save to database via API
      alert("Inventory item updated successfully!");
      router.push("/pharmacy-dashboard/inventory");
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-center">Loading item details...</p>
        </div>
      </div>
    );
  }

  // Show error state if item not found
  if (!item) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center justify-center">
            <FiAlertTriangle className="text-red-500 text-5xl mb-4" />
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              Item Not Found
            </h1>
            <p className="text-gray-600 mb-4">
              The inventory item you're looking for doesn't exist or has
              been removed.
            </p>
            <Link
              href="/pharmacy-dashboard/inventory"
              className="text-blue-500 hover:text-blue-700"
            >
              Return to Inventory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Format date for the input
  const formattedExpiryDate = item.expiryDate
    ? item.expiryDate.split("T")[0]
    : "";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link
          href="/pharmacy-dashboard/inventory"
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <FiArrowLeft className="mr-2" /> Back to Inventory
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Inventory Item
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Basic Information
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Item ID
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={item.id}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Item Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={item.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category*
                </label>
                <select
                  id="category"
                  name="category"
                  value={item.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.category}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={item.description || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Inventory Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Inventory Details
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price ($)*
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={item.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className={`w-full px-4 py-2 border ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.price}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="stockQuantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Stock Quantity*
                  </label>
                  <input
                    type="number"
                    id="stockQuantity"
                    name="stockQuantity"
                    value={item.stockQuantity}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    className={`w-full px-4 py-2 border ${
                      errors.stockQuantity
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.stockQuantity && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.stockQuantity}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="reorderLevel"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reorder Level*
                </label>
                <input
                  type="number"
                  id="reorderLevel"
                  name="reorderLevel"
                  value={item.reorderLevel}
                  onChange={handleChange}
                  min="1"
                  step="1"
                  className={`w-full px-4 py-2 border ${
                    errors.reorderLevel
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.reorderLevel && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.reorderLevel}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Storage Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={item.location || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Supplier Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Supplier Information
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="supplier"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Supplier*
                </label>
                <select
                  id="supplier"
                  name="supplier"
                  value={item.supplier}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.supplier ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select a supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier} value={supplier}>
                      {supplier}
                    </option>
                  ))}
                </select>
                {errors.supplier && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.supplier}
                  </p>
                )}
              </div>
            </div>

            {/* Expiry and Batch Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Batch Information
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="batchNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Batch Number*
                </label>
                <input
                  type="text"
                  id="batchNumber"
                  name="batchNumber"
                  value={item.batchNumber || ""}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.batchNumber
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.batchNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.batchNumber}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Expiry Date*
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={formattedExpiryDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.expiryDate
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.expiryDate && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.expiryDate}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              href="/pharmacy-dashboard/inventory"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg mr-4 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
            >
              <FiSave className="mr-2" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
