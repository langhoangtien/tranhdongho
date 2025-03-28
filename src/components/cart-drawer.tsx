import { X, Plus, Minus, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/cart";
import { Link } from "@tanstack/react-router";

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, getCartTotal, isOpen, setIsOpen } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col">
        {/* Cart Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            <h2 className="text-lg font-semibold">
              Your Cart ({items.length})
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-auto py-4 px-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button
                onClick={() => setIsOpen(false)}
                className="nordic-button"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex border-b pb-4">
                  <div className="w-20 h-20 relative flex-shrink-0 rounded overflow-hidden">
                    <img
                      src={item.image || "/no-img.svg"}
                      alt={item.name}
                      className="object-cover size-20"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-blue-600 font-medium mt-1">
                      {formatCurrency(item.price)}
                    </p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus strokeWidth={1} />
                      </Button>
                      <span className="mx-3 w-6 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus strokeWidth={1} />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Subtotal</span>
              <span className="font-semibold">
                {formatCurrency(getCartTotal())}
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Shipping, taxes, and discounts calculated at checkout
            </p>
            <Link to="/checkout" onClick={() => setIsOpen(false)}>
              <Button className="w-full nordic-button">
                Proceed to Checkout
              </Button>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-center mt-4 text-gray-600 hover:text-gray-900"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
