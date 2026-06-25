import { useNavigate } from 'react-router-dom';
import { CartItem } from '../cartItem/cartItem.component.jsx';
import styles from './cartItemList.module.css';

export const CartItemList = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <span>Product</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Subtotal</span>
      </div>

      {items.map((item) => (
        <CartItem key={item.productId} item={item} />
      ))}

      <div className={styles.actions}>
        <button className={styles.outlineBtn} onClick={() => navigate('/')}>
          Return To Shop
        </button>
        <button className={styles.outlineBtn}>Update Cart</button>
      </div>
    </div>
  );
};
