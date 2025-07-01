import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    };
    // clearCart()

    loadCart();
  }, []);

  // Calculate total items in the cart
  const totalItems = Object.values(cart).reduce((acc, item) => acc + (item.quantity || 0), 0);
  
  // Function to update the cart
  const updateCart = async (newCart) => {
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Function to remove a single item from the cart
  const removeItemFromCart = async (itemKey) => {
    const newCart = { ...cart };
    delete newCart[itemKey]; // Remove the item from the cart
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Function to clear the cart
  const clearCart = async () => {
    setCart({});
    await AsyncStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cart, setCart, totalItems, updateCart, removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart Context
export const useCart = () => useContext(CartContext);
