import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({
    wishlistId: null,
    products: [],
    count: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`${apiUrl}/wishlist`, {
          withCredentials: true,
        });
        setWishlist(res.data);
      } catch (err) {
        console.log('wishlist fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const addToWishlist = async (productId) => {
    try {
      const res = await axios.post(
        `${apiUrl}/wishlist/add`,
        { productId },
        { withCredentials: true },
      );
      setWishlist(res.data);
    } catch (err) {
      console.log('add to wishlist error:', err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const res = await axios.delete(`${apiUrl}/wishlist/item/${productId}`, {
        withCredentials: true,
      });
      setWishlist(res.data);
    } catch (err) {
      console.log('remove from wishlist error:', err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistContext };
