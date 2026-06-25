import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';
import { CartItemList } from '../../components/cartItemList/cartItemList.component.jsx';
import styles from './cartpage.module.css';

export const Cart = () => {
  const { cart, loading } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    // coupon logic placeholder - no backend support yet
    console.log('Applying coupon:', couponCode);
  };

  if (loading) {
    return <p className={styles.status}>Loading cart...</p>;
  }

  if (cart.items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link to='/'>Home</Link>
        <span>/</span>
        <span>Cart</span>
      </nav>
      
      <CartItemList items={cart.items} />

      <div className={styles.bottomSection}>
        <div className={styles.couponSection}>
          <input
            type='text'
            placeholder='Coupon Code'
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className={styles.couponInput}
          />
          <button className={styles.applyCouponBtn} onClick={handleApplyCoupon}>
            Apply Coupon
          </button>
        </div>

        <div className={styles.cartTotal}>
          <h2 className={styles.cartTotalHeading}>Cart Total</h2>

          <div className={styles.totalRow}>
            <span>Subtotal:</span>
            <span>${cart.total.toFixed(2)}</span>
          </div>
          <div className={styles.divider} />

          <div className={styles.totalRow}>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className={styles.divider} />

          <div className={styles.totalRow}>
            <span>Total:</span>
            <span>${cart.total.toFixed(2)}</span>
          </div>

          <button className={styles.checkoutBtn}>Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
};
