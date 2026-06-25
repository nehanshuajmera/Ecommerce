import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.column}>
          <h3 className={styles.brand}>Exclusive</h3>
          <p className={styles.subscribe}>Subscribe</p>
          <p className={styles.subscribeText}>Get 10% off your first order</p>
          <form className={styles.emailForm} onSubmit={handleSubscribe}>
            <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
              required
            />
            <button
              type='submit'
              className={styles.sendBtn}
              aria-label='Subscribe'
            >
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M2 12L21 3L14 21L11 13L2 12Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </form>
        </div>

        <div className={styles.column}>
          <h4 className={styles.heading}>Support</h4>
          <p className={styles.text}>
            122/5 Rajwada, Indore, India.
          </p>
          <p className={styles.text}>exclusive@gmail.com</p>
          <p className={styles.text}>+88015-88888-9999</p>
        </div>

        <div className={styles.column}>
          <h4 className={styles.heading}>Account</h4>
          <ul className={styles.linkList}>
            <li>
              <Link to='/account' className={styles.link}>
                My Account
              </Link>
            </li>
            <li>
              <Link to='/signin' className={styles.link}>
                Login / Register
              </Link>
            </li>
            <li>
              <Link to='/cart' className={styles.link}>
                Cart
              </Link>
            </li>
            <li>
              <Link to='/wishlist' className={styles.link}>
                Wishlist
              </Link>
            </li>
            <li>
              <Link to='/' className={styles.link}>
                Shop
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.heading}>Quick Link</h4>
          <ul className={styles.linkList}>
            <li>
              <Link to='/privacy' className={styles.link}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to='/terms' className={styles.link}>
                Terms Of Use
              </Link>
            </li>
            <li>
              <Link to='/faq' className={styles.link}>
                FAQ
              </Link>
            </li>
            <li>
              <Link to='/contact' className={styles.link}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.heading}>Download App</h4>
          <p className={styles.appText}>Save $3 with App New User Only</p>
          <div className={styles.appRow}>
            <div className={styles.qrBox}>
              <img src="/Qr Code.png" alt="Qr Code Image" />
            </div>
            <div className={styles.storeBtns}>
              <Link to='#' className={styles.storeBtn}>
                <span className={styles.storeBtnSmall}>GET IT ON</span>
                <span className={styles.storeBtnBig}>Google Play</span>
              </Link>
              <Link to='#' className={styles.storeBtn}>
                <span className={styles.storeBtnSmall}>Download on the</span>
                <span className={styles.storeBtnBig}>App Store</span>
              </Link>
            </div>
          </div>

          <div className={styles.socialIcons}>
            <Link to='#' className={styles.iconLink} aria-label='Facebook'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M22 12a10 10 0 10-11.5 9.87v-6.99H7.9V12h2.6V9.8c0-2.57 1.53-3.99 3.87-3.99 1.12 0 2.3.2 2.3.2v2.53h-1.3c-1.28 0-1.68.8-1.68 1.62V12h2.86l-.46 2.88h-2.4v6.99A10 10 0 0022 12z' />
              </svg>
            </Link>
            <Link to='#' className={styles.iconLink} aria-label='Twitter'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M22 5.9c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.6 8.6 0 01-2.72 1.04 4.27 4.27 0 00-7.28 3.9A12.13 12.13 0 013 4.9a4.27 4.27 0 001.32 5.7 4.25 4.25 0 01-1.94-.54v.05a4.27 4.27 0 003.43 4.19c-.6.16-1.24.2-1.87.08a4.28 4.28 0 003.99 2.97A8.58 8.58 0 012 18.6a12.1 12.1 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2l-.01-.56A8.7 8.7 0 0022 5.9z' />
              </svg>
            </Link>
            <Link to='#' className={styles.iconLink} aria-label='Instagram'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
              >
                <rect x='3' y='3' width='18' height='18' rx='5' />
                <circle cx='12' cy='12' r='4' />
                <circle cx='17.5' cy='6.5' r='0.5' fill='currentColor' />
              </svg>
            </Link>
            <Link to='#' className={styles.iconLink} aria-label='LinkedIn'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm6.5 0H13v1.7h.05c.5-.94 1.7-1.9 3.5-1.9 3.7 0 4.45 2.4 4.45 5.5V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4V9z' />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © Copyright Exclusive 2026. All right reserved
        </p>
      </div>
    </footer>
  );
};
