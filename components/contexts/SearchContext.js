import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import debounce from 'lodash.debounce';
import { getBaseURL } from '../../utils/apiConfig';

const SearchContext = createContext();

const SEARCH_CACHE_PREFIX = 'search_results_';
const BASE_URL = getBaseURL();
const SERVER_URL = `${BASE_URL}/server`;

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (q) => {
    if (!q || q.trim().length < 2) {
      setResults([]);
      return;
    }

    const key = `${SEARCH_CACHE_PREFIX}${q.toLowerCase().trim()}`;
    setLoading(true);

    try {
      const res = await axios.get(`${SERVER_URL}/search/${q.trim()}`);
      const items = res.data.items || [];

      setResults(items);
      await AsyncStorage.setItem(key, JSON.stringify(items));
    } catch (err) {
      console.warn('Search API failed. Using cached results:', err.message);
      const cached = await AsyncStorage.getItem(key);
      setResults(cached ? JSON.parse(cached) : []);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchInitialResults = async () => {
      if (query) {
        await fetchSearchResults(query);
      }
    };
    fetchInitialResults();
  }, [query]);

  
  const debouncedSearch = useCallback(
    debounce((q) => {
      setQuery(q);
      fetchSearchResults();
    }, 300),
    []
  );

  return (
    <SearchContext.Provider
      value={{
        query,
        results,
        loading,
        setQuery: debouncedSearch,
        rawSetQuery: setQuery, // optional raw setter
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
