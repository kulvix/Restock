import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBaseURL } from '../../utils/apiConfig';

export const ProductContext = createContext();

const BASE_URL = getBaseURL();
const SERVER_URL = `${BASE_URL}/server`;

const STORAGE_KEYS = {
  PRODUCTS: 'cachedProducts',
  CATEGORIES: 'cachedCategories',
  CATEGORY_PRODUCTS: (category) => `cachedCategory:${category}`,
  DISCOUNT_PRODUCTS: (min, max) => `cachedDiscount:${min}-${max}`,
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // Load and cache general products
  const loadCachedProducts = async () => {
    const cached = await AsyncStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (cached) setProducts(JSON.parse(cached));
  };



  const fetchProducts = async () => {
    
    try {
      const res = await axios.get(`${SERVER_URL}/products`);
      await AsyncStorage.removeItem(STORAGE_KEYS.PRODUCTS); // Clear old data
      setProducts(res.data);
      await AsyncStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(res.data));
    } catch (err) {
      console.error('Fetch products failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = async () => {
    setLoading(true);
    await fetchProducts();
  };


  // Load and cache categories
  const fetchCategories = async (forceRefresh = false) => {
    const key = STORAGE_KEYS.CATEGORIES;
    if (!forceRefresh) {
      const cached = await AsyncStorage.getItem(key);
      if (cached) setCategories(JSON.parse(cached));
    }

    try {
      const res = await axios.get(`${SERVER_URL}/categories`);
      await AsyncStorage.removeItem(key); // Clear old data
      setCategories(res.data);
      await AsyncStorage.setItem(key, JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.error('Fetch categories failed:', err);
      return [];
    }
  };


  // Load and cache by category
  const getProductsByCategory = async (category, forceRefresh = false) => {
    const key = STORAGE_KEYS.CATEGORY_PRODUCTS(category);

    if (!forceRefresh) {
      const cached = await AsyncStorage.getItem(key);
      if (cached) return JSON.parse(cached);
    }

    try {
      const res = await axios.get(`${SERVER_URL}/products/${category}`);
      await AsyncStorage.removeItem(key); // Clear old data
      await AsyncStorage.setItem(key, JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.error(`Fetch category ${category} failed:`, err);
      return [];
    }
  };


  const refreshCategories = async (category) => {
    setLoading(true);
    await fetchCategories(true)
    if (category) await getProductsByCategory(category, true);
    setLoading(false);
  };

  // Load and cache discounted products
  const getProductsItemsByDiscount = async (min, max, forceRefresh = false) => {
    const key = STORAGE_KEYS.DISCOUNT_PRODUCTS(min, max);

    if (!forceRefresh) {
      const cached = await AsyncStorage.getItem(key);
      if (cached) return JSON.parse(cached);
    }

    try {
      const res = await axios.get(`${SERVER_URL}/producttypes/discount/${min}/${max}`);
      await AsyncStorage.removeItem(key); // Clear old data
      await AsyncStorage.setItem(key, JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.error(`Fetch discount ${min}-${max} failed:`, err);
      return [];
    }
  };


  useEffect(() => {
    const init = async () => {
      await loadCachedProducts(); // show offline data instantly
      await fetchProducts(); // fetch fresh in background
      await fetchCategories(); // preload categories
    };
    init();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        refreshProducts,
        fetchCategories,
        getProductsByCategory,
        refreshCategories,
        getProductsItemsByDiscount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
