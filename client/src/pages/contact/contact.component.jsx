import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './contact.styles.module.css';

export const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link to='/'>Home</Link>
        <span>/</span>
        <span>Contact</span>
      </nav>

      <div className={styles.container}>
        <div className={styles.infoPanel}>
          <div className={styles.infoBlock}>
            <div className={styles.infoIconWrap}>
              <svg
                viewBox='0 0 24 24'
                width='22'
                height='22'
                fill='none'
                stroke='#fff'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 1.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z' />
              </svg>
            </div>
            <div className={styles.infoContent}>
              <h3>Call To Us</h3>
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +88016-11112222</p>
            </div>
          </div>

          <hr className={styles.divider} />

          <div className={styles.infoBlock}>
            <div className={styles.infoIconWrap}>
              <svg
                viewBox='0 0 24 24'
                width='22'
                height='22'
                fill='none'
                stroke='#fff'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
                <polyline points='22,6 12,13 2,6' />
              </svg>
            </div>
            <div className={styles.infoContent}>
              <h3>Write To Us</h3>
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
            </div>
          </div>
        </div>

        <div className={styles.formPanel}>
          <div className={styles.formRow}>
            <input
              className={styles.input}
              type='text'
              name='name'
              placeholder='Your Name *'
              value={form.name}
              onChange={handleChange}
            />
            <input
              className={styles.input}
              type='email'
              name='email'
              placeholder='Your Email *'
              value={form.email}
              onChange={handleChange}
            />
            <input
              className={styles.input}
              type='tel'
              name='phone'
              placeholder='Your Phone *'
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <textarea
            className={styles.textarea}
            name='message'
            placeholder='Your Message'
            value={form.message}
            onChange={handleChange}
            rows={14}
          />
          <div className={styles.formFooter}>
            <button className={styles.submitBtn} type='button'>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
