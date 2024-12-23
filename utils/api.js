// api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_URL = 'http://localhost:3001/auth';
const API_URL = 'http://192.168.147.87:3001/auth';

// Set the JWT token for authenticated requests
const setAuthToken = async (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await AsyncStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      await AsyncStorage.removeItem('token');
    }
};

// Sign Up
export const signUp = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  if (response.data.token) {
    await setAuthToken(response.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// Login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);

    if (response.data.token) {
      await setAuthToken(response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    // Axios throws an error for HTTP statuses outside 2xx
    if (error.response) {
      // Backend-specific error message
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      // Network or other errors
      throw new Error('Network error. Please try again.');
    }
  }
  // const response = await axios.post(`${API_URL}/login`, credentials);
      
    //   if (response.data.token) {
    //     await setAuthToken(response.data.token);
    //     await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    //   }
    //   // console.log(response.data);
    //   return response.data;
};

// Recover Password
export const recoverPassword = async (email) => {
    const response = await axios.post(`${API_URL}/recover-password`, { email });
    return response.data;
};

// Get User Details
export const getUserDetails = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    setAuthToken(token);
    const response = await axios.get(`${API_URL}/me`);
    // console.log("Token: ", token, "Response: ", response);
    return response.data;
  }
  return null;
};

// Logout
export const logout = async () => {
    await setAuthToken(null);
    await AsyncStorage.removeItem('user');
};
