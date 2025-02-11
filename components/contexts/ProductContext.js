import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { getBaseURL } from '../../utils/apiConfig';

export const ProductContext = createContext();

const BASE_URL = getBaseURL();
const SERVER_URL = `${BASE_URL}/server`;
// console.log(SERVER_URL);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to get products by category
  const getProductsByCategory = async (category) => {
    // console.log(`${SERVER_URL}/products/${category}`);
    try {
      const response = await axios.get(`${SERVER_URL}/products/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch products for category ${category}:`, error);
      return [];
    }
  };
  
  
  // Function to get categories
  const fetchCategories = async () => {
    // console.log(`${SERVER_URL}/categories`);
    try {
      const response = await axios.get(`${SERVER_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch categories:`, error);
      return [];
    }
  };

  return (
    <ProductContext.Provider value={{ 
      products,
      loading,
      getProductsByCategory,
      fetchCategories
    }}>
      {children}
    </ProductContext.Provider>
  );
};

