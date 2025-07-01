import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBaseURL } from '../../utils/apiConfig';

export const BundleContext = createContext();

const BASE_URL = getBaseURL();
const SERVER_URL = `${BASE_URL}/server`;

export const BundleProvider = ({ children }) => {
  const [bundles, setBundles] = useState([]);
  const [bundleItems, setBundleItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cached bundles and bundle items from AsyncStorage
  const loadCachedData = async () => {
    try {
      const cachedBundles = await AsyncStorage.getItem('bundles');
      const cachedBundleItems = await AsyncStorage.getItem('bundleItems');

      if (cachedBundles) setBundles(JSON.parse(cachedBundles));
      if (cachedBundleItems) setBundleItems(JSON.parse(cachedBundleItems));
    } catch (error) {
      console.error('Failed to load cached bundle data:', error);
    }
  };

  // Fetch latest bundles and update AsyncStorage
  const refreshBundles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}/bundles`);
      setBundles(response.data);
      await AsyncStorage.setItem('bundles', JSON.stringify(response.data));
    } catch (error) {
      console.error('Failed to refresh bundles:', error);
    } finally {
      setLoading(false);
    }
  };

  

  // Refresh both at once
  // const refreshAll = async () => {
  //   setLoading(true); // ✅ Start loading
  //   try {
  //     await Promise.all([refreshBundles()]);
  //   } catch (error) {
  //     console.error("Error refreshing bundle data:", error);
  //   } finally {
  //     setLoading(false); // ✅ Stop loading
  //   }
  // };
  

  // Initial load
  useEffect(() => {
    const initialize = async () => {
      await loadCachedData();
      await refreshBundles();
      setLoading(false);
    };

    initialize();
  }, []);

  // Fetch items of a specific bundle (cached or fresh)
  const getBundleItems = async (bundleId, forceRefresh = false) => {
    try {
      if (!forceRefresh) {
        // Try to get from local cache
        const cachedItems = bundleItems.find(item => item.bundleId === bundleId);
        if (cachedItems) return cachedItems.items;
      }

      // Fallback to fresh fetch
      const response = await axios.get(`${SERVER_URL}/bundle/${bundleId}/items`);
      const newItem = { bundleId, items: response.data };

      // Update state and cache
      const updatedItems = [
        ...bundleItems.filter(item => item.bundleId !== bundleId),
        newItem,
      ];
      setBundleItems(updatedItems);
      await AsyncStorage.setItem('bundleItems', JSON.stringify(updatedItems));

      return response.data;
    } catch (error) {
      console.error(`Failed to fetch items for bundle ${bundleId}:`, error);
      return [];
    }
  };

  // Refresh specific bundle items by bundleId
  const refreshBundleItems = async (bundleId) => {
    return await getBundleItems(bundleId, true);
  };

  return (
    <BundleContext.Provider value={{ 
      bundles,
      bundleItems,
      loading,
      getBundleItems,
      refreshBundleItems,
      refreshBundles
    }}>
      {children}
    </BundleContext.Provider>
  );
};
