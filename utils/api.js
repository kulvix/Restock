// api.js
// import axios from 'axios';
import axios from 'axios';
import { getBaseURL } from '../utils/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const BASE_URL = getBaseURL();
const SERVER_URL = `${BASE_URL}/auth`;
const LOCATION_URL = `${BASE_URL}/location`;

// Set the JWT token for authenticated requests
const setAuthToken = async (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await AsyncStorage.setItem('token', JSON.stringify(token));
    } else {
      delete axios.defaults.headers.common['Authorization'];
      await AsyncStorage.removeItem('token');
    }
};

// Sign Up
export const signUp = async (userData) => {
  console.log("Response: ");
  const response = await axios.post(`${SERVER_URL}/signup`, userData);
  if (response.data.token) {
    await setAuthToken(response.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// Login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${SERVER_URL}/login`, credentials);

    if (response.data.token) {
      await setAuthToken(response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      throw new Error('Network error. Please try again.');
    }
  }
  // const response = await axios.post(`${SERVER_URL}/login`, credentials);
      
    //   if (response.data.token) {
    //     await setAuthToken(response.data.token);
    //     await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    //   }
    //   // console.log(response.data);
    //   return response.data;
};

// Recover Password
export const recoverPassword = async (email) => {
  const response = await axios.post(`${SERVER_URL}/recover-password`, { email });
  // console.log(response.data);
    return response.data;
};

// Verify Reset Password Token
export const verifyResetPasswordToken = async (credentials) => {
  try {
    const response = await axios.post(`${SERVER_URL}/verify-reset-password-token`, credentials);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "An error occurred during verification.");
    } else {
      throw new Error("Unable to connect to the server. Please try again later.");
    }
  }
};

// Reset Password
export const resetPassword = async (credentials) => {
  try {
    const response = await axios.post(`${SERVER_URL}/reset-password`, credentials);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "An error occurred during verification.");
    } else {
      throw new Error("Unable to connect to the server. Please try again later.");
    }
  }
};

// Get User Details
export const getUserDetails = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    setAuthToken(token);
    const response = await axios.get(`${SERVER_URL}/me`);
    // console.log("Token: ", token, "Response: ", response);
    return response.data;
  }
  return null;
};

// Get User Details
export const getUserBillingAddresses = async (userId) => {
  try {
    const response = await axios.get(`${SERVER_URL}/billingaddresses/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "An error occurred")
  }
  // console.log(response);
  // setAuthToken(token);
  // const token = await AsyncStorage.getItem('token');  
  // if (token) {
    
  // }
  return null;
};

// Logout
export const logout = async () => {
    await setAuthToken(null);
    await AsyncStorage.removeItem('user');
};











// Update Personal Info
export const updatePersonalInfo = async (credentials) => {
  try {
    const response = await axios.post(`${SERVER_URL}/update-personal-info`, credentials);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "An error saving details.");
    } else {
      throw new Error("Unable to connect to the server. Please try again later.");
    }
  }
};

// Update Personal Info
export const updateBillingInfo = async (credentials) => {
  try {
    const response = await axios.post(`${SERVER_URL}/update-billing-info`, credentials);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "An error adding card.");
    } else {
      throw new Error("Unable to connect to the server. Please try again later.");
    }
  }
};

// Update Personal Info
// export const addPaymentMethod = async (credentials) => {
  
//   try {
//     const response = await axios.post(`${SERVER_URL}/add-payment-method`, credentials);
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.data) {
//       throw new Error(error.response.data.message || "An error saving details.");
//     } else {
//       throw new Error("Unable to connect to the server. Please try again later.");
//     }
//   }
// };

const getStoredUserId = async () => {
  try {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    return user?.id || null; // Safely access the id or return null if undefined
  } catch (error) {
    console.error('Error retrieving user ID:', error);
    return null;
  }
};


export const addPaymentMethod = async (credentials) => {
  try {
    const userId = await getStoredUserId();
    if (!userId) {
      throw new Error('User not logged in. Please log in again.');
    }
    const payload = { ...credentials, userId };

    const response = await axios.post(`${SERVER_URL}/add-payment-method`, payload);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'An error occurred while saving details.');
    } else {
      throw new Error('Unable to connect to the server. Please try again later.');
    }
  }
};




export const checkUserLocation = async () => {
  try {
    // 1. Request location permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error("Location permission denied.");
    }

    // 2. Get user coordinates
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // 3. Send coordinates to backend
    const response = await axios.post(`${LOCATION_URL}/check-location`, {
      lat: latitude,
      lon: longitude,
    });

    return response.data; // should be { allowed: true } or { allowed: false }
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Location check failed.");
    } else if (error.message === "Location permission denied.") {
      throw error;
    } else {
      throw new Error("Unable to check your location. Please try again.");
    }
  }
};
