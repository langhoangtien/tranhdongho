import { createContext, useContext, useReducer, ReactNode } from "react";

export interface Product {
  image: string;
  quantity: number;
  name: string;
  price: number;
  id: string;
  optionTitle: string;
}

interface CartState {
  products: Product[];
}

interface CartAction {
  type: "ADD_TO_CART" | "REMOVE_FROM_CART" | "UPDATE_QUANTITY";
  payload: Product | { id: string; quantity?: number };
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        products: [...state.products, action.payload as Product],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        products: state.products.filter(
          (p) => p.id !== (action.payload as { id: string }).id
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === (action.payload as { id: string; quantity?: number }).id
            ? {
                ...p,
                quantity:
                  (action.payload as { id: string; quantity?: number })
                    .quantity ?? p.quantity,
              }
            : p
        ),
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { products: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
