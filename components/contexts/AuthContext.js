// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { signUp, login, recoverPassword, getUserDetails, logout } from '../../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    // console.log("Time to load user...");
    try {
      const userData = await getUserDetails(); 
      // console.log(userData);
      setUser(userData);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp: async (data) => {
        const res = await signUp(data);
        setUser(res.user);
      },
      login: async (credentials) => {
        const res = await login(credentials);
        setUser(res.user);
      },
      recoverPassword: async (email) => {
        return await recoverPassword(email);
      },
      logout: async () => {
        await logout();
        setUser(null);
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
};
