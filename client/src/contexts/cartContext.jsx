import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ cartId: null, items: [], total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/cart`, { withCredentials: true });
      setCart(res.data);
    } catch (err) {
      console.log('cart fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await axios.post(
        `${apiUrl}/cart/add`,
        { productId, quantity },
        { withCredentials: true },
      );
      setCart(res.data);
    } catch (err) {
      console.log('add to cart error:', err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await axios.patch(
        `${apiUrl}/cart/item/${productId}`,
        { quantity },
        { withCredentials: true },
      );
      setCart(res.data);
    } catch (err) {
      console.log('update quantity error:', err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`${apiUrl}/cart/item/${productId}`, {
        withCredentials: true,
      });
      setCart(res.data);
    } catch (err) {
      console.log('remove from cart error:', err);
    }
  };

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        itemCount,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
