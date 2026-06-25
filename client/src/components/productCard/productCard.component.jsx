import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { StarRating } from '../starRating/starRating.component.jsx';
import styles from './productCard.styles.module.css';

export const ProductCard = ({ id, title, image, price, rating }) => {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [adding, setAdding] = useState(false);

  const isWishlisted = wishlist.products.some((p) => p.productId === id);

  const handleAddToCart = async () => {
    setAdding(true);
    await addToCart(id, 1);
    setAdding(false);
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <button
          className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlistBtnActive : ''}`}
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke='currentColor'
            strokeWidth='2'
          >
            <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' />
          </svg>
        </button>

        <img src={image} alt={title} className={styles.image} />

        <button
          className={styles.addToCartBtn}
          onClick={handleAddToCart}
          disabled={adding}
        >
          {adding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.meta}>
          <span className={styles.price}>${price}</span>
        </div>
        <StarRating rating={rating} />
      </div>
    </div>
  );
};
