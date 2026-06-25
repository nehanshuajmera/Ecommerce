import { useState } from 'react';
import { useCart } from '../../hooks/useCart.js';
import styles from './cartItem.module.css';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);
  const [prevItemQuantity, setPrevItemQuantity] = useState(item.quantity);

  if (item.quantity !== prevItemQuantity) {
    setPrevItemQuantity(item.quantity);
    setQuantity(item.quantity);
  }

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setQuantity('');
      return;
    }
    const num = Number(value);
    if (!Number.isNaN(num)) {
      setQuantity(num);
    }
  };

  const commitQuantity = (value) => {
    if (value === '' || value < 1) {
      removeFromCart(item.productId);
      return;
    }
    if (value !== item.quantity) {
      updateQuantity(item.productId, value);
    }
  };

  const handleBlur = () => {
    commitQuantity(quantity);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const handleStepUp = () => {
    const next = (quantity === '' ? 0 : quantity) + 1;
    setQuantity(next);
    commitQuantity(next);
  };

  const handleStepDown = () => {
    const next = (quantity === '' ? 0 : quantity) - 1;
    setQuantity(next < 0 ? 0 : next);
    commitQuantity(next);
  };

  const handleRemove = () => {
    removeFromCart(item.productId);
  };

  return (
    <div className={styles.row}>
      <div className={styles.productCell}>
        <div className={styles.imageWrapper}>
          <button
            className={styles.removeBadge}
            onClick={handleRemove}
            aria-label='Remove item'
          >
            ✕
          </button>
          <img src={item.image} alt={item.title} className={styles.image} />
        </div>
        <span className={styles.title}>{item.title}</span>
      </div>

      <div className={styles.priceCell}>${item.price}</div>

      <div className={styles.qtyCell}>
        <div className={styles.qtyWrapper}>
          <input
            type='text'
            inputMode='numeric'
            value={quantity}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={styles.qtyInput}
          />
          <div className={styles.stepper}>
            <button
              type='button'
              className={styles.stepBtn}
              onClick={handleStepUp}
              aria-label='Increase quantity'
            >
              <img src="/angle-small-up.png" alt="up arrow" />
            </button>
            <button
              type='button'
              className={styles.stepBtn}
              onClick={handleStepDown}
              aria-label='Decrease quantity'
            >
              <img src="/angle-small-down.png" alt="down arrow" />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.subtotalCell}>${item.subtotal}</div>
    </div>
  );
};
