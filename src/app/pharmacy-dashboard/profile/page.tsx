"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiUser,
  FiMapPin,
  FiPhone,
  FiMail,
  FiEdit,
  FiCamera,
  FiLock,
  FiArrowLeft,
  FiSave,
  FiClipboard,
  FiPackage,
  FiBarChart2,
} from "react-icons/fi";
import Wrapper from "../../../components/Wrapper";

// Define types for the pharmacy profile
interface PharmacyProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  profileImage: string;
  coverImage: string;
  description: string;
  openingHours: {
    day: string;
    open: string;
    close: string;
    isClosed: boolean;
  }[];
  services: string[];
  paymentMethods: string[];
}

// Mock data for pharmacy profile
const mockPharmacyProfile: PharmacyProfile = {
  id: "PH-001",
  name: "Al-Ezaby Pharmacy",
  email: "info@alezaby.com",
  phone: "+20 123-456-7890",
  licenseNumber: "LIC-2023-12345",
  address: "123 El-Tahrir St.",
  city: "Cairo",
  state: "Cairo Governorate",
  zipCode: "11511",
  profileImage: "/user.png",
  coverImage: "/pharmacy.png",
  description:
    "Al-Ezaby Pharmacy has been providing high-quality pharmaceutical services since 1975. We are committed to customer health and wellness through exceptional service and a wide range of products.",
  openingHours: [
    { day: "Monday", open: "08:00", close: "22:00", isClosed: false },
    { day: "Tuesday", open: "08:00", close: "22:00", isClosed: false },
    { day: "Wednesday", open: "08:00", close: "22:00", isClosed: false },
    { day: "Thursday", open: "08:00", close: "22:00", isClosed: false },
    { day: "Friday", open: "08:00", close: "22:00", isClosed: false },
    { day: "Saturday", open: "09:00", close: "20:00", isClosed: false },
    { day: "Sunday", open: "09:00", close: "20:00", isClosed: false },
  ],
  services: [
    "Prescription Filling",
    "Over-the-Counter Medications",
    "Health Consultations",
    "Medication Delivery",
    "Vaccination Services",
    "Blood Pressure Monitoring",
    "Diabetes Care",
  ],
  paymentMethods: [
    "Cash",
    "Credit Card",
    "Debit Card",
    "Health Insurance",
    "Digital Wallets",
  ],
};

export default function PharmacyProfile() {
  const [profile, setProfile] = useState<PharmacyProfile>(
    mockPharmacyProfile
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState<PharmacyProfile>(
    mockPharmacyProfile
  );

  useEffect(() => {
    // In a real application, fetch pharmacy profile from an API
    // For now, we're using mock data
    const fetchPharmacyProfile = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // In a real app:
        // const response = await fetch('/api/pharmacy/profile');
        // const data = await response.json();
        // setProfile(data);
        // setFormValues(data);

        setProfile(mockPharmacyProfile);
        setFormValues(mockPharmacyProfile);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching pharmacy profile:", error);
        setIsLoading(false);
        alert(
          "Failed to load profile data. Please refresh the page and try again."
        );
      }
    };

    fetchPharmacyProfile();
  }, []);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset error styling when user types
    if (e.target.classList.contains("border-red-500")) {
      e.target.classList.remove("border-red-500");
      e.target.classList.add("border-gray-300");
    }
  };
  const handleSaveChanges = async () => {
    setIsLoading(true);

    // Reset any error styling
    document.querySelectorAll(".border-red-500").forEach((el) => {
      el.classList.remove("border-red-500");
      el.classList.add("border-gray-300");
    });

    // Basic validation
    const errors: { [key: string]: string } = {};
    if (!formValues.name) errors.name = "Name is required.";
    if (!formValues.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email address is invalid.";
    }
    if (!formValues.phone) errors.phone = "Phone number is required.";
    if (!formValues.licenseNumber)
      errors.licenseNumber = "License number is required.";
    if (!formValues.address) errors.address = "Address is required.";
    if (!formValues.city) errors.city = "City is required.";
    if (!formValues.state) errors.state = "State is required.";
    if (!formValues.zipCode) errors.zipCode = "Zip code is required.";

    // If there are validation errors, show alert and stop the save process
    if (Object.keys(errors).length > 0) {
      // Highlight fields with errors
      Object.keys(errors).forEach((field) => {
        const input = document.querySelector(
          `[name="${field}"]`
        ) as HTMLElement;
        if (input) {
          input.classList.remove("border-gray-300");
          input.classList.add("border-red-500");
        }
      });

      const errorMessages = Object.values(errors).join("\n");
      alert(`Please fix the following errors:\n${errorMessages}`);
      setIsLoading(false);
      return;
    }

    try {
      // In a real app, you would save the changes to the backend
      // const response = await fetch('/api/pharmacy/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formValues),
      // });

      // If successful:
      // if (response.ok) {
      //   const updatedProfile = await response.json();
      //   setProfile(updatedProfile);
      // }

      // For demo purposes, we'll just update the local state
      await new Promise((resolve) => setTimeout(resolve, 800));
      setProfile(formValues);
      setIsEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormValues(profile);
    setIsEditMode(false);
  };

  const changeProfileImage = () => {
    // In a real app, this would open a file picker
    alert(
      "This would open a file picker in a real application to change your profile image."
    );
  };

  const changeCoverImage = () => {
    // In a real app, this would open a file picker
    alert(
      "This would open a file picker in a real application to change your cover image."
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm">
        <Wrapper>
          <div className="py-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo.png"
                alt="CareCapsule Logo"
                width={160}
                height={50}
                className="object-contain"
              />
              <h1 className="text-2xl font-bold text-gray-800">
                Pharmacy Profile
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/pharmacy-dashboard"
                className="text-blue-500 hover:text-blue-700 flex items-center"
              >
                <FiArrowLeft className="mr-2" /> Back to Dashboard
              </Link>
            </div>
          </div>
        </Wrapper>
      </header>

      <main className="py-8">
        <Wrapper>
          {/* Cover Image */}
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            <Image
              src={profile.coverImage}
              alt="Pharmacy Cover"
              fill
              className="object-cover"
              sizes="100vw"
            />
            {isEditMode && (
              <button
                onClick={changeCoverImage}
                className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                title="Change cover image"
              >
                <FiCamera size={20} className="text-gray-700" />
              </button>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column - Profile info */}
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                {/* Profile Image & Name */}
                <div className="flex flex-col items-center mb-6 relative">
                  <div className="relative">
                    <Image
                      src={profile.profileImage}
                      alt={profile.name}
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-white shadow-md"
                    />
                    {isEditMode && (
                      <button
                        onClick={changeProfileImage}
                        className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                        title="Change profile image"
                      >
                        <FiCamera size={16} className="text-gray-700" />
                      </button>
                    )}
                  </div>

                  {isEditMode ? (
                    <input
                      type="text"
                      name="name"
                      value={formValues.name}
                      onChange={handleInputChange}
                      className="text-xl font-bold text-gray-800 mt-4 text-center w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <h2 className="text-xl font-bold text-gray-800 mt-4">
                      {profile.name}
                    </h2>
                  )}

                  <p className="text-sm text-gray-500">
                    Pharmacy ID: {profile.id}
                  </p>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-md font-semibold text-gray-700 border-b pb-2">
                    Contact Information
                  </h3>

                  <div className="flex items-start">
                    <FiMail className="text-gray-500 mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      {isEditMode ? (
                        <input
                          type="email"
                          name="email"
                          value={formValues.email}
                          onChange={handleInputChange}
                          className="text-sm text-gray-700 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-sm text-gray-700">
                          {profile.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiPhone className="text-gray-500 mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="phone"
                          value={formValues.phone}
                          onChange={handleInputChange}
                          className="text-sm text-gray-700 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-sm text-gray-700">
                          {profile.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiMapPin className="text-gray-500 mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      {isEditMode ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            name="address"
                            value={formValues.address}
                            onChange={handleInputChange}
                            placeholder="Street Address"
                            className="text-sm text-gray-700 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                          />
                          <div className="flex gap-2">
                            <input
                              type="text"
                              name="city"
                              value={formValues.city}
                              onChange={handleInputChange}
                              placeholder="City"
                              className="text-sm text-gray-700 w-1/2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                            <input
                              type="text"
                              name="state"
                              value={formValues.state}
                              onChange={handleInputChange}
                              placeholder="State"
                              className="text-sm text-gray-700 w-1/2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <input
                            type="text"
                            name="zipCode"
                            value={formValues.zipCode}
                            onChange={handleInputChange}
                            placeholder="Zip Code"
                            className="text-sm text-gray-700 w-1/3 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      ) : (
                        <p className="text-sm text-gray-700">
                          {profile.address}, {profile.city},{" "}
                          {profile.state} {profile.zipCode}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiUser className="text-gray-500 mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">
                        License Number
                      </p>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="licenseNumber"
                          value={formValues.licenseNumber}
                          onChange={handleInputChange}
                          className="text-sm text-gray-700 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-sm text-gray-700">
                          {profile.licenseNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="mt-6">
                  <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-3">
                    Business Hours
                  </h3>
                  <div className="space-y-2">
                    {profile.openingHours.map((hours, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm font-medium text-gray-600 w-24">
                          {hours.day}
                        </span>
                        <span className="text-sm text-gray-700">
                          {hours.isClosed
                            ? "Closed"
                            : `${hours.open} - ${hours.close}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-4">
                  Account Actions
                </h3>
                <div className="space-y-3">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                    <FiLock className="mr-3" /> Change Password
                  </button>
                  <Link
                    href="/pharmacy-dashboard"
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <FiArrowLeft className="mr-3" /> Return to Dashboard
                  </Link>
                </div>
              </div>
            </div>

            {/* Right column - Additional Details */}
            <div className="w-full md:w-2/3">
              {/* Edit/Save Controls */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-end">
                {isEditMode ? (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveChanges}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                    >
                      <FiSave className="mr-2" /> Save Changes
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                  >
                    <FiEdit className="mr-2" /> Edit Profile
                  </button>
                )}
              </div>

              {/* About Section */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-4">
                  About
                </h3>
                {isEditMode ? (
                  <textarea
                    name="description"
                    value={formValues.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
                  />
                ) : (
                  <p className="text-sm text-gray-700">
                    {profile.description}
                  </p>
                )}
              </div>

              {/* Services Section */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-4">
                  Services Offered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-4">
                  Payment Methods Accepted
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.paymentMethods.map((method, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
              {/* Dashboard Shortcuts */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link
                    href="/pharmacy-dashboard/orders"
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <FiClipboard
                      size={24}
                      className="text-blue-500 mb-2"
                    />
                    <span className="text-sm text-gray-700">
                      Manage Orders
                    </span>
                  </Link>

                  <Link
                    href="/pharmacy-dashboard/inventory"
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <FiPackage size={24} className="text-blue-500 mb-2" />
                    <span className="text-sm text-gray-700">
                      Inventory
                    </span>
                  </Link>

                  <Link
                    href="/pharmacy-dashboard/stats"
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <FiBarChart2
                      size={24}
                      className="text-blue-500 mb-2"
                    />
                    <span className="text-sm text-gray-700">
                      Analytics
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </main>
    </div>
  );
}
