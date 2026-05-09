import { useState } from 'react';
import { CartContext } from './cartContext';

// El provider envolverá a los componentes que necesiten acceder al estado del carrito
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = (count) => {
    setCartCount(count)
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  )
};