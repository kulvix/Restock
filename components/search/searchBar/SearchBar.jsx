
import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { View, TextInput, FlatList, Text, RefreshControl, Animated, Easing, ActivityIndicator, Keyboard, TouchableWithoutFeedback  } from 'react-native';
import { ProductContext } from '../../../components/contexts/ProductContext';
import { useSearch } from '../../../components/contexts/SearchContext';
import { debounce } from 'lodash';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { COLORS, SIZES } from '../../../constants';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import styles from './SearchBar.style';
import LottieView from 'lottie-react-native';
import { shuffleArray } from '../../../utils/helpers';
// import { useSearch } from './SearchContext';
import useTypewriter from '../../../hooks/useTypewriter';

const BATCH_SIZE = 10;

const SearchBar = () => {
  const { products, refreshProducts } = useContext(ProductContext);
  const { query, setQuery, rawSetQuery, results, loading } = useSearch();
  const router = useRouter();
  // const [query, setQuery] = useState('');
  const [visibleData, setVisibleData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const inputRef = useRef(null);

  const allFilteredResults = useRef([]); // stores the full filtered result
  const currentIndex = useRef(0); // tracks how many items have been shown

  const filterProducts = debounce((searchTerm) => {
    // const lowerCaseQuery = searchTerm.toLowerCase();
    allFilteredResults.current = products;
    // if (!searchTerm) {
    //   allFilteredResults.current = products;
    // } else {
    //   allFilteredResults.current = products.filter(
    //     (item) =>
    //       item.name.toLowerCase().includes(lowerCaseQuery) ||
    //       item.description.toLowerCase().includes(lowerCaseQuery)
    //   );
    // }
    currentIndex.current = 0;
    const initialBatch = allFilteredResults.current.slice(0, BATCH_SIZE);
    setVisibleData(initialBatch);
    currentIndex.current = initialBatch.length;
  }, 300);

  useEffect(() => {
    filterProducts(query);
  }, [query, products]);

  const loadMore = () => {
    const nextItems = allFilteredResults.current.slice(
      currentIndex.current,
      currentIndex.current + BATCH_SIZE
    );

    if (nextItems.length > 0) {
      setVisibleData((prev) => [...prev, ...nextItems]);
      currentIndex.current += nextItems.length;
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refreshProducts(),
      ]);
    } catch (err) {
      console.warn("Refresh failed:", err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const shuffledProducts = shuffleArray(visibleData);
  
  const spinValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  // console.log(results);

  const placeholderWords = [
    'Rice...',
    'Beans...',
    'Oil...',
    'Yam...',
    'Bread...',
    'Sugar...',
    'Salt...',
    'Spices...',
    'Fruits...',
    'Vegetables...',
    'Noodles...',
    'Banana...',
    'Orange...',
    'Carrots...',
    'Cucumber...',
    'Student pack...',
    'Family pack...',
    'Bachelor pack...',
    'Big family pack...',
  ];

  const animatedPlaceholder = useTypewriter(placeholderWords);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.searchWrapper}>
          <View style={styles.searchInputContainer}>
            {loading ? (
              <ActivityIndicator size="small" color={COLORS.primary} style={{ marginRight: 5 }} />
            ) : (
              <Ionicons name="search" size={SIZES.large} color={COLORS.gray} />
            )}
            <TextInput
              style={styles.searchInput}
              ref={inputRef}
              placeholder=""
              value={query} 
              onChangeText={(text) => {
                rawSetQuery(text);
                if (text.trim().length < 2) {
                  setShowSearchResults(true);
                }
              }}
              onFocus={() => {
                if (query.trim().length < 2) {
                  rawSetQuery('');
                  setShowSearchResults(false);
                }
              }}
              onBlur={() => {
                if (query.trim().length < 2) {
                  rawSetQuery('');
                  setShowSearchResults(false);
                }
              }}
            />
            {query.length === 0 && (
              <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                <Text
                  style={[styles.placeholderOverlay]}
                  pointerEvents="none"
                >
                  Search for {animatedPlaceholder}
                </Text>
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
        <ScrollView
          style={[
            styles.searchResultContainer,
            showSearchResults && keyboardVisible ? {} : { display: 'none' }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {
            results.length > 0 && results.map((item, index) => (
              <Pressable
                key={index}
                style={styles.searchResultItem}
                onPress={() => {
                  if (item.type_id) {
                    router.push({
                      pathname: '/productDetails',
                      params: { item: JSON.stringify(item) },
                    })
                  } else if (item.product_id && !item.type_id) {
                    router.push({
                      pathname: '/productDetails',
                      params: { item: JSON.stringify(item) },
                    });
                  } else if (item.bundle_id) {
                    router.push({
                      pathname: "/bundleDetails",
                      params: { item: encodeURIComponent(JSON.stringify(item)) }
                    });
                  } else if (item.category_id) {
                    router.push({
                      pathname: "/(tabs)/categories/",
                      params: { item: item.label},
                    })
                  }
                }}
              >
                <Text style={styles.searchResultText}>
                  <Text style={{ fontWeight: 'bold', color: COLORS.grayDark }}>{item.label}</Text> in <Text style={{ fontStyle: 'italic' }}>{item.section}</Text>
                </Text>
                
                <View style={styles.searchResultIconBox}>
                  <Ionicons name="chevron-forward" size={SIZES.large} color={COLORS.gray} />
                </View>
              </Pressable>
            ))
          }
        </ScrollView>
      </View>
    </View>
  )
}

{/* <Pressable style={styles.filterBtn} onPress={() => {router.push({pathname: "/(tabs)/home/filter"})}}>
  <Ionicons name='filter' size={SIZES.large} color={COLORS.white} />
</Pressable> */}
export default SearchBar