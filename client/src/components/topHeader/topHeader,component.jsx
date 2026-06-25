import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './topHeader.styles.module.css';

const LANGUAGES = [
  'English',
  'Español',
  'Français',
  'Deutsch',
  '中文',
  '日本語',
  '한국어',
  'العربية',
  'Português',
  'Русский',
  'हिन्दी',
];

export const TopHeader = () => {
  const [language, setLanguage] = useState('English');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className={styles.topHeader}>
      <p className={styles.message}>
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
        <Link to='/' className={styles.shopNowLink}>
          ShopNow
        </Link>
      </p>

      <div className={styles.languageSelector}>
        <button
          className={styles.languageBtn}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {language}
          <svg
            width='12'
            height='12'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className={isOpen ? styles.chevronOpen : ''}
          >
            <path d='M6 9l6 6 6-6' />
          </svg>
        </button>

        {isOpen && (
          <ul className={styles.languageDropdown}>
            {LANGUAGES.map((lang) => (
              <li key={lang} onClick={() => handleSelectLanguage(lang)}>
                {lang}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
