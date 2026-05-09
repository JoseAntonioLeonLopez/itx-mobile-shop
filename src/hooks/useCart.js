import { useContext } from 'react';
import { CartContext } from '../context/cartContext';

// Custom hook para usar el contexto del carrito
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de un CartProvider');
    }
    return context;
};
