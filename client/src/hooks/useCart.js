import { useContext } from 'react';
import { CartContext } from '../contexts/cartContext';

export const useCart = () => useContext(CartContext);
