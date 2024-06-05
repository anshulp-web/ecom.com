import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [Cart, setCart] = useState([]);

  useEffect(() => {
    let checkCartItem = localStorage.getItem('cart');
    if (checkCartItem) setCart(JSON.parse(checkCartItem));
  }, []);
  return (
    <CartContext.Provider value={[Cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//Custom Hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
