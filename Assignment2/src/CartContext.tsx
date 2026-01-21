import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Product } from "./interfaces/ProductInterface";

interface CartInterface {
  cart: Cart[];
  updated: boolean;
  setCart: Dispatch<SetStateAction<Cart[]>>;
  setUpdated: Dispatch<SetStateAction<boolean>>;
}

interface Cart {
  item: Product;
  count: number;
}

export const CartContext = createContext<CartInterface | null>(null);

export function CartProvider({ children }: any) {
  const [cart, setCart] = useState<Cart[]>(() => {
    const data = localStorage.getItem("Cart");
    return data ? JSON.parse(data) : []
  });
  const [updated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart))
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, updated, setCart, setUpdated }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a ThemeProvider");
  }
  return context;
};
