// filepath: /app/pharmacy-dashboard/inventory/add/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiSave } from "react-icons/fi";

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

export default function AddInventoryItemPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stockQuantity: "",
    reorderLevel: "",
    supplier: "",
    expiryDate: "",
    description: "",
    batchNumber: "",
    location: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

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
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (
      isNaN(Number(formData.price)) ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "Price must be a positive number";
    }

    if (!formData.stockQuantity.trim()) {
      newErrors.stockQuantity = "Stock quantity is required";
    } else if (
      isNaN(Number(formData.stockQuantity)) ||
      Number(formData.stockQuantity) < 0 ||
      !Number.isInteger(Number(formData.stockQuantity))
    ) {
      newErrors.stockQuantity =
        "Stock quantity must be a non-negative integer";
    }

    if (!formData.reorderLevel.trim()) {
      newErrors.reorderLevel = "Reorder level is required";
    } else if (
      isNaN(Number(formData.reorderLevel)) ||
      Number(formData.reorderLevel) <= 0 ||
      !Number.isInteger(Number(formData.reorderLevel))
    ) {
      newErrors.reorderLevel = "Reorder level must be a positive integer";
    }

    if (!formData.supplier) {
      newErrors.supplier = "Supplier is required";
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else {
      const expiryDate = new Date(formData.expiryDate);
      const today = new Date();
      if (expiryDate < today) {
        newErrors.expiryDate = "Expiry date cannot be in the past";
      }
    }

    if (!formData.batchNumber.trim()) {
      newErrors.batchNumber = "Batch number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real application, save to database via API
      alert("Inventory item added successfully!");
      router.push("/pharmacy-dashboard/inventory");
    }
  };

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
          Add New Inventory Item
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
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Item Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g. Paracetamol 500mg"
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
                  value={formData.category}
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
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the item"
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
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="0.00"
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
                    type="text"
                    id="stockQuantity"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      errors.stockQuantity
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="0"
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
                  type="text"
                  id="reorderLevel"
                  name="reorderLevel"
                  value={formData.reorderLevel}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.reorderLevel
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Minimum stock before reordering"
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
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Shelf A3, Refrigerator"
                />
              </div>
            </div>

            {/* Supplier and Batch Information */}
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
                  value={formData.supplier}
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
                  value={formData.batchNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.batchNumber
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g. BATCH123456"
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
                  value={formData.expiryDate}
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
              <FiSave className="mr-2" /> Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
