"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Wrapper from "../../../components/Wrapper";

// Define Address interface for type safety
interface Address {
  id: string;
  name: string;
  fullName: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

// Mock addresses data - this would be replaced with real API data
const mockAddresses: Address[] = [
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
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(
    null
  );
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>(
    {}
  );
  const router = useRouter();

  useEffect(() => {
    // Fetch addresses from API
    const fetchAddresses = async () => {
      try {
        const response = await fetch("/api/addresses");

        if (!response.ok) {
          throw new Error("Failed to fetch addresses");
        }

        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        // Fallback to mock data if API fails
        setAddresses(mockAddresses);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddNew = () => {
    setCurrentAddress({
      id: "",
      name: "",
      fullName: "",
      streetAddress: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      isDefault: addresses.length === 0, // Make default if it's the first address
    });
    setIsAdding(true);
  };

  const handleEdit = (address: Address) => {
    setCurrentAddress(address);
    setIsEditing(true);
  };

  const handleDelete = async (addressId: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        // Call the API to delete the address
        const response = await fetch(`/api/addresses/${addressId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete address");
        }

        // Update state locally
        setAddresses(addresses.filter((addr) => addr.id !== addressId));
      } catch (error) {
        console.error("Error deleting address:", error);
        // Fallback to client-side deletion if API fails
        setAddresses(addresses.filter((addr) => addr.id !== addressId));
      }
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      // Call the API to set the address as default
      const response = await fetch(`/api/addresses/${addressId}/default`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to set default address");
      }

      // Update state locally
      setAddresses(
        addresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === addressId,
        }))
      );
    } catch (error) {
      console.error("Error setting default address:", error);
      // Fallback to client-side update if API fails
      setAddresses(
        addresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === addressId,
        }))
      );
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!currentAddress?.name?.trim())
      errors.name = "Address name is required";
    if (!currentAddress?.fullName?.trim())
      errors.fullName = "Full name is required";
    if (!currentAddress?.streetAddress?.trim())
      errors.streetAddress = "Street address is required";
    if (!currentAddress?.city?.trim()) errors.city = "City is required";
    if (!currentAddress?.state?.trim()) errors.state = "State is required";
    if (!currentAddress?.zipCode?.trim())
      errors.zipCode = "ZIP code is required";
    if (!currentAddress?.phone?.trim())
      errors.phone = "Phone number is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !currentAddress) return;

    try {
      if (isAdding) {
        // Call the API to add a new address
        const response = await fetch("/api/addresses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentAddress),
        });

        if (!response.ok) {
          throw new Error("Failed to add address");
        }

        const newAddress = await response.json();

        // Update state with the new address from API response
        if (newAddress.isDefault) {
          setAddresses((prev) => [
            ...prev.map((a) => ({ ...a, isDefault: false })),
            newAddress,
          ]);
        } else {
          setAddresses((prev) => [...prev, newAddress]);
        }
      } else if (currentAddress.id) {
        // Call the API to update the address
        const response = await fetch(
          `/api/addresses/${currentAddress.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentAddress),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update address");
        }

        const updatedAddress = await response.json();

        // Update state with the updated address from API response
        if (updatedAddress.isDefault) {
          setAddresses((prev) =>
            prev.map((addr) => ({
              ...addr,
              isDefault: addr.id === updatedAddress.id,
            }))
          );
        } else {
          setAddresses((prev) =>
            prev.map((addr) =>
              addr.id === updatedAddress.id ? updatedAddress : addr
            )
          );
        }
      }

      // Reset form state
      setIsAdding(false);
      setIsEditing(false);
      setCurrentAddress(null);
    } catch (error) {
      console.error("Error saving address:", error);
      alert("There was an error saving the address. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setCurrentAddress({
        ...currentAddress,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setCurrentAddress({
        ...currentAddress,
        [name]: value,
      });
    }

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setCurrentAddress(null);
    setFormErrors({});
  };

  return (
    <>
      <Wrapper backgroundClass="bg-white">
        <Navbar />
      </Wrapper>

      <div className="bg-gray-50 py-10">
        <Wrapper backgroundClass="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="md:w-1/4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                        <Image
                          src="/user.png"
                          alt="Profile"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          John Doe
                        </h2>
                        <p className="text-gray-500">@johndoe</p>
                      </div>
                    </div>
                  </div>

                  <nav className="p-4">
                    <ul className="space-y-1">
                      <li>
                        <button
                          onClick={() => router.push("/profile")}
                          className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => router.push("/profile/orders")}
                          className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                          My Orders
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => router.push("/profile/wishlist")}
                          className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          Wishlist
                        </button>
                      </li>
                      <li>
                        <button className="w-full flex items-center px-4 py-3 rounded-lg bg-blue-50 text-[#2BADE8]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          My Addresses
                        </button>
                      </li>
                      <li className="pt-3 mt-3 border-t border-gray-200">
                        <button
                          onClick={() => router.push("/auth/login")}
                          className="w-full flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="md:w-3/4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                      My Addresses
                    </h2>
                    {!isEditing && !isAdding && (
                      <button
                        onClick={handleAddNew}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2BADE8] hover:bg-blue-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Add New Address
                      </button>
                    )}
                  </div>

                  {isLoading ? (
                    <div className="p-8 flex justify-center">
                      <div className="animate-pulse flex flex-col items-center">
                        <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2.5"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                    </div>
                  ) : isEditing || isAdding ? (
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {isAdding ? "Add New Address" : "Edit Address"}
                      </h3>
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Address Name{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="e.g. Home, Work"
                              value={currentAddress?.name || ""}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                formErrors.name
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            {formErrors.name && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.name}
                              </p>
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="fullName"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Full Name{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              value={currentAddress?.fullName || ""}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                formErrors.fullName
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            {formErrors.fullName && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.fullName}
                              </p>
                            )}
                          </div>
                          <div className="md:col-span-2">
                            <label
                              htmlFor="streetAddress"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Street Address{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="streetAddress"
                              name="streetAddress"
                              value={currentAddress?.streetAddress || ""}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                formErrors.streetAddress
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            {formErrors.streetAddress && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.streetAddress}
                              </p>
                            )}
                          </div>
                          <div className="md:col-span-2">
                            <label
                              htmlFor="apartment"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Apartment, Suite, etc. (optional)
                            </label>
                            <input
                              type="text"
                              id="apartment"
                              name="apartment"
                              value={currentAddress?.apartment || ""}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              City <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={currentAddress?.city || ""}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                formErrors.city
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            {formErrors.city && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.city}
                              </p>
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="state"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              State/Province{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="state"
                              name="state"
                              value={currentAddress?.state || ""}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                formErrors.state
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            {formErrors.state && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.state}
                              </p>
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="zipCode"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              ZIP / Postal Code{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="zipCode"
                              name="zipCode"
                              value={currentAddress?.zipCode || ""}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                formErrors.zipCode
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            {formErrors.zipCode && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.zipCode}
                              </p>
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Phone Number{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={currentAddress?.phone || ""}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                formErrors.phone
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            {formErrors.phone && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.phone}
                              </p>
                            )}
                          </div>
                          <div className="md:col-span-2">
                            <div className="flex items-center">
                              <input
                                id="isDefault"
                                name="isDefault"
                                type="checkbox"
                                checked={
                                  currentAddress?.isDefault || false
                                }
                                onChange={handleChange}
                                className="h-4 w-4 text-[#2BADE8] focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor="isDefault"
                                className="ml-2 block text-sm text-gray-900"
                              >
                                Set as default shipping address
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-4">
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#2BADE8] border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-blue-600"
                          >
                            {isAdding ? "Add Address" : "Save Changes"}
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No addresses saved
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Add your shipping and billing addresses for faster
                        checkout.
                      </p>
                      <button
                        onClick={handleAddNew}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2BADE8] hover:bg-blue-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Add New Address
                      </button>
                    </div>
                  ) : (
                    <div className="p-6">
                      <div className="space-y-4">
                        {addresses.map((address) => (
                          <div
                            key={address.id}
                            className={`border rounded-lg p-4 relative ${
                              address.isDefault
                                ? "border-[#2BADE8] bg-blue-50"
                                : "border-gray-200"
                            }`}
                          >
                            {address.isDefault && (
                              <span className="absolute top-4 right-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Default
                              </span>
                            )}
                            <div className="mb-2">
                              <h3 className="text-lg font-medium text-gray-900">
                                {address.name}
                              </h3>
                              <p className="text-gray-500 text-sm">
                                {address.isDefault &&
                                  "Default shipping address"}
                              </p>
                            </div>
                            <div className="text-gray-500">
                              <p>{address.fullName}</p>
                              <p>{address.streetAddress}</p>
                              {address.apartment && (
                                <p>{address.apartment}</p>
                              )}
                              <p>
                                {address.city}, {address.state}{" "}
                                {address.zipCode}
                              </p>
                              <p className="mt-1">{address.phone}</p>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                              <button
                                onClick={() => handleEdit(address)}
                                className="text-sm text-[#2BADE8] hover:text-blue-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(address.id)}
                                className="text-sm text-red-600 hover:text-red-800 ml-4"
                              >
                                Delete
                              </button>
                              {!address.isDefault && (
                                <button
                                  onClick={() =>
                                    handleSetDefault(address.id)
                                  }
                                  className="text-sm text-gray-600 hover:text-gray-900 ml-4"
                                >
                                  Set as Default
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>

      <Wrapper backgroundClass="bg-white">
        <Footer />
      </Wrapper>
    </>
  );
}
