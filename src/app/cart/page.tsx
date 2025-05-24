"use client";
import Wrapper from "../../components/Wrapper";
import Category from "../../components/Category";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Title from "../../components/Title";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        // Get cart data from localStorage
        const data = localStorage.getItem("cart");
        if (data) {
          const items = JSON.parse(data);
          setCartItems(items);

          // Calculate total price
          const total = items.reduce(
            (sum: number, item: CartItem) =>
              sum + item.price * item.quantity,
            0
          );
          setTotalPrice(total);
        }
      } catch (err) {
        setError("Failed to load cart items from local storage.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      // Update quantity in local state
      const updatedItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );

      setCartItems(updatedItems);

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(updatedItems));

      // Recalculate total
      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    } catch (err) {
      setError("Failed to update item. Please try again.");
      console.error(err);
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      // Filter out the item to be removed
      const updatedItems = cartItems.filter((item) => item.id !== id);

      // Update local state
      setCartItems(updatedItems);

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(updatedItems));

      // Recalculate total
      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    } catch (err) {
      setError("Failed to remove item. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <Wrapper backgroundClass="bg-white">
        <Navbar />
      </Wrapper>

      <Wrapper backgroundClass="bg-gray-100">
        <div className="bg-gray-100 pt-20">
          <h2>My Cart</h2>
        </div>
      </Wrapper>

      <div className="bg-gray-100 pt-8">
        <Wrapper backgroundClass="bg-gray-100">
          <h2>Shopping Cart</h2>
        </Wrapper>
      </div>

      <div className="bg-gray-100 min-h-screen pb-12">
        <Wrapper backgroundClass="bg-gray-100">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2BADE8]"></div>
            </div>
          ) : error ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link href={"/categories"}>
                <button className="bg-[#2BADE8] text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors">
                  Start Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items List */}
              <div className="lg:w-2/3 w-full">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="font-medium text-gray-700">
                      Cart Items ({cartItems.length})
                    </h3>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex p-4 hover:bg-gray-50"
                      >
                        {/* Item Image */}
                        <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="ml-4 flex-1 flex flex-col">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium text-gray-800">
                                {item.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Item #{item.id}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-800">
                                ${item.price}
                              </p>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                className="text-gray-500 hover:text-[#2BADE8] border border-gray-300 rounded-l-md w-8 h-8 flex items-center justify-center"
                              >
                                -
                              </button>
                              <span className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center text-gray-700">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                                className="text-gray-500 hover:text-[#2BADE8] border border-gray-300 rounded-r-md w-8 h-8 flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="lg:w-1/3 w-full">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="font-medium text-gray-700">
                      Order Summary
                    </h3>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>

                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">
                        ${(totalPrice * 0.05).toFixed(2)}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between mb-4">
                        <span className="font-bold text-gray-800">
                          Total
                        </span>
                        <span className="font-bold text-gray-800">
                          ${(totalPrice + totalPrice * 0.05).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button className="w-full bg-[#2BADE8] text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition-colors">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>

                {/* Promo Code Section */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
                  <div className="p-6">
                    <h3 className="font-medium text-gray-700 mb-4">
                      Promo Code
                    </h3>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2BADE8] focus:border-transparent"
                      />
                      <button className="bg-[#2BADE8] text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Wrapper>
      </div>

      <Wrapper backgroundClass="bg-white">
        <div>
          <Footer />
        </div>
      </Wrapper>
    </>
  );
};

export default Cart;
