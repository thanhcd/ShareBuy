import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    // Đọc giỏ hàng từ AsyncStorage khi ứng dụng được khởi động
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Failed to load cart from AsyncStorage', error);
      }
    };

    loadCart();
  }, []);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = async (product: any) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);

    try {
      // Lưu giỏ hàng vào AsyncStorage
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Failed to save cart to AsyncStorage', error);
    }
  };

  // Hàm xóa giỏ hàng khỏi AsyncStorage và reset trạng thái cart
  const clearCart = async () => {
    try {
      // Xóa giỏ hàng khỏi AsyncStorage
      await AsyncStorage.removeItem('cart');
      // Reset giỏ hàng trong trạng thái
      setCart([]);
    } catch (error) {
      console.error('Failed to clear cart from AsyncStorage', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => React.useContext(CartContext);
