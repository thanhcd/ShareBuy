import React, { createContext, useContext, useState } from "react";

type CartItem = {
  name: string;
  discount: string;
  image: string;
  describe?: string;
  size: string;
  color: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
