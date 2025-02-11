// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import {
  signUp,
  login,
  recoverPassword,
  verifyResetPasswordToken,
  resetPassword,
  getUserDetails,
  getUserBillingInfo,
  logout,
  updatePersonalInfo,
  updateBillingInfo,
  addPaymentMethod
} from '../../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userBillingInfo, setUserBillingInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  

  const loadUser = async () => {
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
  
  const loadUserBillingInfo = async () => {
    try {
      const userData = await getUserBillingInfo(); 
      // console.log(userData);
      setUserBillingInfo(userData);
    } catch (err) {
      setUserBillingInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);
  
  useEffect(() => {
    loadUserBillingInfo();
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      userBillingInfo,
      loading,
      signUp: async (data) => {
        const res = await signUp(data);
        setUser(res.user);
      },

      updateUser: (updatedUser) => {
        setUser((prevUser) => ({
          ...prevUser,
          ...updatedUser,
        }));
      },
      editBillingInfo: (updatedInfo) => {
        setUserBillingInfo((prevInfo) => ({
          ...prevInfo,
          ...updatedInfo,
        }));
      },
      login: async (credentials) => {
        const res = await login(credentials);
        setUser(res.user);
      },
      recoverPassword: async (email) => {
        return await recoverPassword(email);
      },
      verifyResetPasswordToken: async (credentials) => {
        return await verifyResetPasswordToken(credentials);
      },
      resetPassword: async (credentials) => {
        return await resetPassword(credentials);
      },
      updatePersonalInfo: async (credentials) => {
        return await updatePersonalInfo(credentials);
      },
      updateBillingInfo: async (credentials) => {
        return await updateBillingInfo(credentials);
      },
      addPaymentMethod: async (credentials) => {
        return await addPaymentMethod(credentials);
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
