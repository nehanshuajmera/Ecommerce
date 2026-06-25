import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(`${apiUrl}/user/currentuser`, {
          withCredentials: true,
        });
        // console.log('current user response:', res.data); 
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setAuthChecked(true);
      }
    };

    fetchCurrentUser();
  }, []);

  const clearErrors = () => setErrors([]);

  const signup = async (username, email, password) => {
    clearErrors();
    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/user/signup`,
        { username, email, password },
        { withCredentials: true },
      );
      setUser(res.data.user);
      return true;
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors) {
        setErrors(data.errors);
      } else if (data?.message) {
        setErrors([{ field: 'form', message: data.message }]);
      } else {
        setErrors([
          { field: 'form', message: 'Something went wrong. Please try again.' },
        ]);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signin = async (usernameOrEmail, password) => {
    clearErrors();
    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/user/signin`,
        { usernameOrEmail, password },
        { withCredentials: true },
      );
      setUser(res.data.user);
      return true;
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors) {
        setErrors(data.errors);
      } else if (data?.message) {
        setErrors([{ field: 'form', message: data.message }]);
      } else {
        setErrors([
          { field: 'form', message: 'Something went wrong. Please try again.' },
        ]);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      await axios.post(`${apiUrl}/user/signout`, {}, { withCredentials: true });
    } finally {
      setUser(null);
      clearErrors();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        errors,
        authChecked,
        signup,
        signin,
        signout,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
