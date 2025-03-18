import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { getBaseURL } from '../../utils/apiConfig';

export const BundleContext = createContext();

const BASE_URL = getBaseURL();
const SERVER_URL = `${BASE_URL}/server`;
// console.log(SERVER_URL);

export const BundleProvider = ({ children }) => {
  const [bundles, setBundles] = useState([]);
  const [bundleItems, setBundleItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/bundles`);
        setBundles(response.data);
      } catch (error) {
        console.error('Failed to fetch bundles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBundles();
  }, []);

  // Fetch items of a specific bundle
  const getBundleItems = async (bundleId) => {
    try {
      const response = await axios.get(`${SERVER_URL}/bundle/${bundleId}/items`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch items for bundle ${bundleId}:`, error);
      return [];
    }
  };

  // Fetch all bundle items for every bundle
  const fetchAllBundleItems = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/bundle-items`);
      setBundleItems(response.data);
    } catch (error) {
      console.error('Failed to fetch all bundle items:', error);
    }
  };


  return (
    <BundleContext.Provider value={{ 
      bundles,
      loading,
      getBundleItems,
      fetchAllBundleItems
    }}>
      {children}
    </BundleContext.Provider>
  );
};
