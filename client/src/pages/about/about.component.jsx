import { Link } from 'react-router-dom';
import styles from './about.styles.module.css';

export const About = () => {
  const stats = [
    {
      icon: '🏪',
      value: '10.5k',
      label: 'Sellers active our site',
      highlight: false,
    },
    {
      icon: '💲',
      value: '33k',
      label: 'Monthly Product Sale',
      highlight: true,
    },
    {
      icon: '🛍️',
      value: '45.5k',
      label: 'Customer active in our site',
      highlight: false,
    },
    {
      icon: '💰',
      value: '25k',
      label: 'Annual gross sale in our site',
      highlight: false,
    },
  ];

  const team = [
    { name: 'Tom Cruise', role: 'Founder & Chairman', img: '/Tom Cruise.png' },
    { name: 'Emma Watson', role: 'Managing Director', img: '/Emma Watson.png' },
    { name: 'Will Smith', role: 'Product Designer', img: '/Will Smith.png' },
  ];

  const perks = [
    {
      label: 'FREE AND FAST DELIVERY',
      sub: 'Free delivery for all orders over $140',
      icon: (
        <svg
          viewBox='0 0 24 24'
          width='32'
          height='32'
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
          width='32'
          height='32'
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
          width='32'
          height='32'
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

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link to='/'>Home</Link>
        <span>/</span>
        <span>About</span>
      </nav>

      {/* Our Story */}
      <section className={styles.story}>
        <div className={styles.storyText}>
          <h1>Our Story</h1>
          <p>
            Launched in 2015, Exclusive is South Asia's premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a
            wide range of tailored marketing, data and service solutions,
            Exclusive has 10,500 sellers and 300 brands and serves 3 millions
            customers across the region.
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast rate. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>
        <div className={styles.storyImage}>
          <img
            src='/About Side Image.png'
            alt='Two women shopping with colourful bags'
          />
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        {stats.map((s) => (
          <div
            key={s.label}
            className={`${styles.statCard} ${s.highlight ? styles.statCardHighlight : ''}`}
          >
            <div
              className={`${styles.statIcon} ${s.highlight ? styles.statIconHighlight : ''}`}
            >
              <span>{s.icon}</span>
            </div>
            <p className={styles.statValue}>{s.value}</p>
            <p className={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </section>

      {/* Team */}
      <section className={styles.team}>
        {team.map((member) => (
          <div key={member.name} className={styles.memberCard}>
            <div className={styles.memberPhoto}>
              <img src={member.img} alt={member.name} />
            </div>
            <h3 className={styles.memberName}>{member.name}</h3>
            <p className={styles.memberRole}>{member.role}</p>
            <div className={styles.memberSocials}>
              <a href='#' aria-label='Twitter'>
                <svg
                  viewBox='0 0 24 24'
                  width='18'
                  height='18'
                  fill='currentColor'
                >
                  <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                </svg>
              </a>
              <a href='#' aria-label='Instagram'>
                <svg
                  viewBox='0 0 24 24'
                  width='18'
                  height='18'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
                  <path d='M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z' />
                  <line x1='17.5' y1='6.5' x2='17.51' y2='6.5' />
                </svg>
              </a>
              <a href='#' aria-label='LinkedIn'>
                <svg
                  viewBox='0 0 24 24'
                  width='18'
                  height='18'
                  fill='currentColor'
                >
                  <path d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' />
                  <circle cx='4' cy='4' r='2' />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Perks */}
      <section className={styles.perks}>
        {perks.map((p) => (
          <div key={p.label} className={styles.perkItem}>
            <div className={styles.perkIconWrap}>{p.icon}</div>
            <p className={styles.perkLabel}>{p.label}</p>
            <p className={styles.perkSub}>{p.sub}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
