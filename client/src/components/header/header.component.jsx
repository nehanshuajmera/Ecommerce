import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { useCart } from '../../hooks/useCart.js';
import { useWishlist } from '../../hooks/useWishlist.js';
import styles from './header.styles.module.css';

export const Header = () => {
  const { user, signout, authChecked } = useAuth();
  const { itemCount: cartCount } = useCart();
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.count;
  const navigate = useNavigate();

  const handleSignout = async () => {
    await signout();
    navigate('/signup');
  };

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Link to='/'>Exclusive</Link>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }
              >
                Home
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to='/contact'
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }
              >
                Contact
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to='/about'
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }
              >
                About
              </NavLink>
            </li>

            {authChecked &&
              (user ? (
                <li className={styles.navItem}>
                  <button className={styles.signoutBtn} onClick={handleSignout}>
                    Sign Out
                  </button>
                </li>
              ) : (
                <li className={styles.navItem}>
                  <NavLink
                    to='/signup'
                    className={({ isActive }) =>
                      isActive ? styles.linkActive : styles.link
                    }
                  >
                    Sign Up
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.searchBar}>
            <input type='text' placeholder='What are you looking for?' />
          </div>

          <button
            className={styles.iconBtn}
            aria-label='Wishlist'
            onClick={() => navigate('/wishlist')}
          >
            <img src='/wishlist.png' alt='' aria-hidden='true' />
            {wishlistCount > 0 && (
              <span
                className={styles.badge}
                aria-label={`${wishlistCount} items in wishlist`}
              >
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            className={styles.iconBtn}
            aria-label='Cart'
            onClick={() => navigate('/cart')}
          >
            <img src='/cart.png' alt='' aria-hidden='true' />
            {cartCount > 0 && (
              <span
                className={styles.badge}
                aria-label={`${cartCount} items in cart`}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
