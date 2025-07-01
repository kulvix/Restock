import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  signUp,
  login,
  recoverPassword,
  verifyResetPasswordToken,
  resetPassword,
  getUserDetails,
  getUserBillingAddresses,
  logout,
  updatePersonalInfo,
  updateBillingInfo,
  addPaymentMethod
} from '../../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userBillingAddresses, setUserBillingAddresses] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from AsyncStorage
  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.log('Error loading user:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadUserBillingAddresses = async () => {
    if (!user) return;
    try {
      const userData = await getUserBillingAddresses(user.id);
      setUserBillingAddresses(userData);
    } catch (err) {
      setUserBillingAddresses(null);
    }
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  useEffect(() => {
    loadUserBillingAddresses();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userBillingAddresses,
        loading,

        signUp: async (data) => {
          const res = await signUp(data);
          setUser(res.user);
          await AsyncStorage.setItem('user', JSON.stringify(res.user));
        },

        login: async (credentials) => {
          const res = await login(credentials);
          setUser(res.user);
          await AsyncStorage.setItem('user', JSON.stringify(res.user));
        },

        logout: async () => {
          await logout();
          setUser(null);
          await AsyncStorage.removeItem('user');
        },

        updateUser: (updatedUser) => {
          const newUser = {
            ...user,
            ...updatedUser,
          };
          setUser(newUser);
          AsyncStorage.setItem('user', JSON.stringify(newUser));
        },

        editBillingInfo: (updatedInfo) => {
          setUserBillingAddresses((prevInfo) => ({
            ...prevInfo,
            ...updatedInfo,
          }));
        },

        recoverPassword,
        verifyResetPasswordToken,
        resetPassword,
        updatePersonalInfo,
        updateBillingInfo,
        addPaymentMethod,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
