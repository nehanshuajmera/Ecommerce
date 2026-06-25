import { useWishlist } from '../../hooks/useWishlist.js';
import { useCart } from '../../hooks/useCart.js';
import { WishlistCard } from '../../components/wishlistCard/wishlistCard.component.jsx';
import styles from './wishlist.styles.module.css';

export const WishlistPage = () => {
  const { wishlist, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToBag = async () => {
    for (const product of wishlist.products) {
      await addToCart(product.productId, 1);
      await removeFromWishlist(product.productId);
    }
  };

  if (loading) {
    return <p className={styles.status}>Loading wishlist...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.heading}>Wishlist ({wishlist.count})</h1>
        {wishlist.count > 0 && (
          <button className={styles.moveAllBtn} onClick={handleMoveAllToBag}>
            Move All To Bag
          </button>
        )}
      </div>

      {wishlist.products.length === 0 ? (
        <p className={styles.empty}>Your wishlist is empty.</p>
      ) : (
        <div className={styles.grid}>
          {wishlist.products.map((product) => (
            <WishlistCard key={product.productId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
