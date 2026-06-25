import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { ProductCard } from '../../components/productCard/productCard.component.jsx';
import { ProductList } from '../../components/productList/productList.component.jsx';
import styles from './homepage.styles.module.css';

// ── Countdown timer hook ──────────────────────────────────────────────────────
const useCountdown = (targetSeconds) => {
  const [timeLeft, setTimeLeft] = useState(targetSeconds);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);
  const d = Math.floor(timeLeft / 86400);
  const h = Math.floor((timeLeft % 86400) / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;
  return [d, h, m, s];
};

// ── Static data ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { label: 'Phones', img: '/Category-CellPhone.png' },
  { label: 'Computers', img: '/Category-Computer.png' },
  { label: 'SmartWatch', img: '/Category-SmartWatch.png' },
  { label: 'Camera', img: '/Category-Camera.png' },
  { label: 'HeadPhones', img: '/Category-Headphone.png' },
  { label: 'Gaming', img: '/Category-Gamepad.png' },
];

const PERKS = [
  {
    label: 'FREE AND FAST DELIVERY',
    sub: 'Free delivery for all orders over $140',
    icon: (
      <svg
        viewBox='0 0 24 24'
        width='36'
        height='36'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <rect x='1' y='3' width='15' height='13' rx='1' />
        <path d='M16 8h4l3 5v3h-7V8z' />
        <circle cx='5.5' cy='18.5' r='2.5' />
        <circle cx='18.5' cy='18.5' r='2.5' />
      </svg>
    ),
  },
  {
    label: '24/7 CUSTOMER SERVICE',
    sub: 'Friendly 24/7 customer support',
    icon: (
      <svg
        viewBox='0 0 24 24'
        width='36'
        height='36'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M3 18v-6a9 9 0 0118 0v6' />
        <path d='M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z' />
      </svg>
    ),
  },
  {
    label: 'MONEY BACK GUARANTEE',
    sub: 'We return money within 30 days',
    icon: (
      <svg
        viewBox='0 0 24 24'
        width='36'
        height='36'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
      </svg>
    ),
  },
];

// ── Arrow buttons ─────────────────────────────────────────────────────────────
const Arrows = () => (
  <div className={styles.arrows}>
    <button className={styles.arrowBtn}>
      <svg
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2.5'
        strokeLinecap='round'
      >
        <path d='M15 18l-6-6 6-6' />
      </svg>
    </button>
    <button className={styles.arrowBtn}>
      <svg
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2.5'
        strokeLinecap='round'
      >
        <path d='M9 18l6-6-6-6' />
      </svg>
    </button>
  </div>
);

// ── Section eyebrow ───────────────────────────────────────────────────────────
const Eyebrow = ({ text }) => (
  <div className={styles.eyebrow}>
    <span className={styles.eyebrowBar} />
    <span className={styles.eyebrowText}>{text}</span>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
export const HomePage = (
  // {
  // flashProducts = [],
  // bestSellers = [],
  // exploreProducts = [],
  // }
) => {
  const [days, hours, mins, secs] = useCountdown(
    3 * 86400 + 23 * 3600 + 19 * 60 + 56,
  );

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className={styles.page}>
      {/* ── Hero banner ── */}
      <section className={styles.hero}>
        {/* Sidebar categories */}
        <aside className={styles.sidebar}>
          {[
            "Woman's Fashion",
            "Men's Fashion",
            'Electronics',
            'Home & Lifestyle',
            'Medicine',
            'Sports & Outdoor',
            "Baby's & Toys",
            'Groceries & Pets',
            'Health & Beauty',
          ].map((cat) => (
            <Link to='#' key={cat} className={styles.sidebarItem}>
              {cat}
              {(cat === "Woman's Fashion" || cat === "Men's Fashion") && (
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                >
                  <path d='M9 18l6-6-6-6' />
                </svg>
              )}
            </Link>
          ))}
        </aside>

        {/* Main banner */}
        <div className={styles.bannerSlide}>
          <div className={styles.bannerText}>
            <div className={styles.bannerBrand}>
              <svg
                width='20'
                height='20'
                viewBox='0 0 814 1000'
                fill='currentColor'
              >
                <path d='M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.4 135.4-317 269-317 71 0 130.5 46.4 174.5 46.4 42.8 0 109.6-49 192.5-49 31 0 133.4 2.6 198.4 99.2z' />
              </svg>
              iPhone 14 Series
            </div>
            <h2 className={styles.bannerHeading}>
              Up to 10%
              <br />
              off Voucher
            </h2>
            <Link to='#' className={styles.bannerCta}>
              Shop Now
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                strokeLinecap='round'
              >
                <path d='M5 12h14M12 5l7 7-7 7' />
              </svg>
            </Link>
          </div>
          <img
            src='/iphone-banner.png'
            alt='iPhone 14'
            className={styles.bannerImg}
          />
          <div className={styles.bannerDots}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`${styles.bannerDot} ${i === 0 ? styles.bannerDotActive : ''}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Flash Sales ── */}
      <section className={styles.section}>
        <Eyebrow text="Today's" />
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Flash Sales</h2>
          <div className={styles.countdown}>
            {[
              ['Days', pad(days)],
              ['Hours', pad(hours)],
              ['Minutes', pad(mins)],
              ['Seconds', pad(secs)],
            ].map(([label, val]) => (
              <div key={label} className={styles.countUnit}>
                <span className={styles.countLabel}>{label}</span>
                <span className={styles.countVal}>{val}</span>
              </div>
            ))}
          </div>
          <Arrows />
        </div>
        <div className={styles.scrollRow}>
          <ProductList />
          {/* {flashProducts.map((p) => (
            <div key={p.id} className={styles.scrollItem}>
              <ProductCard
                id={p.id}
                title={p.title}
                image={p.image}
                price={p.price}
                rating={p.rating}
              />
            </div>
          ))} */}
        </div>
        <div className={styles.viewAllWrap}>
          <Link to='/products' className={styles.viewAllBtn}>
            View All Products
          </Link>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* ── Browse By Category ── */}
      <section className={styles.section}>
        <Eyebrow text='Categories' />
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Browse By Category</h2>
          <Arrows onLeft={() => {}} onRight={() => {}} />
        </div>
        <div className={styles.categoryRow}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              to='#'
              className={styles.categoryCard}
            >
              <img
                src={cat.img}
                alt={cat.label}
                className={styles.categoryImg}
              />
              <span className={styles.categoryLabel}>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <hr className={styles.divider} />

      {/* ── Best Selling ── */}
      <section className={styles.section}>
        <Eyebrow text='This Month' />
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Best Selling Products</h2>
          <Link to='/products' className={styles.viewAllBtnSmall}>
            View All
          </Link>
        </div>
        <div className={styles.grid4}>
          <ProductList />
          {/* {bestSellers.slice(0, 4).map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              image={p.image}
              price={p.price}
              rating={p.rating}
            />
          ))} */}
        </div>
      </section>

      {/* ── Music banner ── */}
      <section className={styles.musicBanner}>
        <div className={styles.musicContent}>
          <p className={styles.musicEyebrow}>Categories</p>
          <h2 className={styles.musicTitle}>
            Enhance Your
            <br />
            Music Experience
          </h2>
          <div className={styles.musicCountdown}>
            {[
              ['Hours', '03'],
              ['Days', '06'],
              ['Minutes', '05'],
              ['Seconds', '25'],
            ].map(([label, val]) => (
              <div key={label} className={styles.musicUnit}>
                <span className={styles.musicVal}>{val}</span>
                <span className={styles.musicLabel}>{label}</span>
              </div>
            ))}
          </div>
          <Link to='/products' className={styles.musicCta}>
            Buy Now!
          </Link>
        </div>
        <img
          src='/speaker-banner.png'
          alt='Speaker'
          className={styles.musicImg}
        />
      </section>

      {/* ── Explore Products ── */}
      <section className={styles.section}>
        <Eyebrow text='Our Products' />
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Explore Our Products</h2>
          <Arrows />
        </div>
        <div className={styles.grid8}>
          <ProductList />
          {/* {exploreProducts.slice(0, 8).map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              image={p.image}
              price={p.price}
              rating={p.rating}
            />
          ))} */}
        </div>
        <div className={styles.viewAllWrap}>
          <Link to='/products' className={styles.viewAllBtn}>
            View All Products
          </Link>
        </div>
      </section>

      {/* ── New Arrival ── */}
      <section className={styles.section}>
        <Eyebrow text='Featured' />
        <h2 className={styles.sectionTitle} style={{ marginBottom: '1.5rem' }}>
          New Arrival
        </h2>
        <div className={styles.arrivalGrid}>
          <div className={styles.arrivalMain}>
            <img src='/play-station.png' alt='PlayStation 5' />
            {/* <div className={styles.arrivalOverlay}>
              <h3>PlayStation 5</h3>
              <p>Black and White version of the PS5 coming out on sale.</p>
              <Link to='/products'>Shop Now</Link>
            </div> */}
          </div>
          <div className={styles.arrivalRight}>
            <div className={styles.arrivalTop}>
              <img src='/womens-collection.png' alt="Women's Collections" />
              {/* <div className={styles.arrivalOverlay}>
                <h3>Women's Collections</h3>
                <p>Featured women collections that give you another vibe.</p>
                <Link to='/products'>Shop Now</Link>
              </div> */}
            </div>
            <div className={styles.arrivalBottom}>
              <div className={styles.arrivalSmall}>
                <img src='/speakers.png' alt='Speakers' />
                {/* <div className={styles.arrivalOverlay}>
                  <h3>Speakers</h3>
                  <p>Amazon wireless speakers.</p>
                  <Link to='/products'>Shop Now</Link>
                </div> */}
              </div>
              <div className={styles.arrivalSmall}>
                <img src='/perfume.png' alt='Perfume' />
                {/* <div className={styles.arrivalOverlay}>
                  <h3>Perfume</h3>
                  <p>GUCCI INTENSE OUD EDP.</p>
                  <Link to='/products'>Shop Now</Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Perks ── */}
      <section className={styles.perks}>
        {PERKS.map((p) => (
          <div key={p.label} className={styles.perkItem}>
            <div className={styles.perkIcon}>{p.icon}</div>
            <p className={styles.perkLabel}>{p.label}</p>
            <p className={styles.perkSub}>{p.sub}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
