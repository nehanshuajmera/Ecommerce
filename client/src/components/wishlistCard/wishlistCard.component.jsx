import { useWishlist } from '../../hooks/useWishlist.js';
import { useCart } from '../../hooks/useCart.js';
import styles from './wishlistCard.styles.module.css';

export const WishlistCard = ({ product }) => {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemove = () => {
    removeFromWishlist(product.productId);
  };

  const handleAddToCart = () => {
    addToCart(product.productId, 1);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <button
          className={styles.removeBtn}
          onClick={handleRemove}
          aria-label='Remove from wishlist'
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path d='M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6' />
          </svg>
        </button>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>

      <button className={styles.addToCartBtn} onClick={handleAddToCart}>
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        >
          <circle cx='9' cy='21' r='1' />
          <circle cx='20' cy='21' r='1' />
          <path d='M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6' />
        </svg>
        Add To Cart
      </button>

      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.price}>${product.price.toFixed(2)}</p>
    </div>
  );
};
