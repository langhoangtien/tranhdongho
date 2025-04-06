"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { VISIT_TRACKER_KEY } from "./hooks/use-visitor-tracker";
import { API_URL } from "./config";
export const ADD_TO_CART_TRACKER_KEY = "add-to-cart-tracked";
const addToCartTracking = async () => {
  console.log("addToCartTracking called");

  try {
    const addToCartTrack = sessionStorage.getItem(ADD_TO_CART_TRACKER_KEY);
    console.log(ADD_TO_CART_TRACKER_KEY, addToCartTrack);

    if (!addToCartTrack) {
      const data = sessionStorage.getItem(VISIT_TRACKER_KEY);
      if (!data) return;
      const { country, city } = JSON.parse(data);
      await fetch(`${API_URL}/client/track-add-to-cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country,
          city,
        }),
      });
      sessionStorage.setItem(ADD_TO_CART_TRACKER_KEY, JSON.stringify(true));
    }
  } catch (error) {
    console.log("Error tracking add to cart:", error);
  }
};
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  title?: string;
}

type CartAction =
  | { type: "ADD_ITEM"; item: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "UPDATE_QUANTITY"; id: string; quantity: number }
  | { type: "CLEAR_CART" };

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "ADD_ITEM":
      return state.some((item) => item.id === action.item.id)
        ? state.map((item) =>
            item.id === action.item.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state, { ...action.item, quantity: 1 }];
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.id);
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.id
          ? { ...item, quantity: Math.max(1, action.quantity) }
          : item
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", item });
    setIsOpen(true);
    addToCartTracking();
  };
  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", id, quantity });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getCartTotal = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const getCartCount = () =>
    items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
