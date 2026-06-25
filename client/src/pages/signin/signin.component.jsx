import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import styles from './signin.styles.module.css';

export const SignIn = () => {
  const { signin, loading, errors, clearErrors } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const errorMap = errors.reduce((acc, err) => {
    acc[err.field] = err.message;
    return acc;
  }, {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors.length > 0) clearErrors();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { usernameOrEmail, password } = formData;
    const success = await signin(usernameOrEmail, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.imageSide}>
        <img src='/Side Image.png' alt='' className={styles.image} />
      </div>

      <div className={styles.formSide}>
        <div className={styles.formWrapper}>
          <h1 className={styles.heading}>Sign In</h1>
          <p className={styles.subheading}>Enter your details below</p>

          {errorMap.form && <p className={styles.errorForm}>{errorMap.form}</p>}

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <input
                type='text'
                name='usernameOrEmail'
                placeholder='Username or Email'
                value={formData.usernameOrEmail}
                onChange={handleChange}
                className={`${styles.input} ${errorMap.usernameOrEmail ? styles.inputError : ''}`}
                autoComplete='username'
              />
              {errorMap.usernameOrEmail && (
                <p className={styles.error}>{errorMap.usernameOrEmail}</p>
              )}
            </div>

            <div className={styles.field}>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                className={`${styles.input} ${errorMap.password ? styles.inputError : ''}`}
                autoComplete='current-password'
              />
              {errorMap.password && (
                <p className={styles.error}>{errorMap.password}</p>
              )}
            </div>

            <button
              type='submit'
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <button className={styles.googleBtn} type='button'>
            <svg width='18' height='18' viewBox='0 0 48 48'>
              <path
                fill='#FFC107'
                d='M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z'
              />
              <path
                fill='#FF3D00'
                d='M6.3 14.7l6.6 4.8C14.5 16 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4c-7.7 0-14.3 4.4-17.7 10.7z'
              />
              <path
                fill='#4CAF50'
                d='M24 44c5.3 0 10.1-2 13.7-5.4l-6.3-5.3C29.4 35 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.6 5.1C9.6 39.6 16.2 44 24 44z'
              />
              <path
                fill='#1976D2'
                d='M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.3l6.3 5.3C41.5 35.4 44 30.2 44 24c0-1.3-.1-2.7-.4-3.9z'
              />
            </svg>
            Sign up with Google
          </button>

          <p className={styles.footerText}>
            Don't have an account?{' '}
            <Link to='/signup' className={styles.footerLink}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
