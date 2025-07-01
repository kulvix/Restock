
import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { View, TextInput, FlatList, Text, RefreshControl, Animated, Easing, ActivityIndicator, Keyboard  } from 'react-native';
import { ProductContext } from '../../../components/contexts/ProductContext';
import { useSearch } from '../../../components/contexts/SearchContext';
import ProductItemCard from '../../../components/common/cards/product/ProductItemCard';
import { debounce } from 'lodash';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { COLORS, SIZES } from '../../../constants';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import styles from './SearchScreen.style';
import LottieView from 'lottie-react-native';
import { shuffleArray } from '../../../utils/helpers';
import SearchBar from '../searchBar/SearchBar';

const BATCH_SIZE = 10;

const SearchScreen = () => {
  const { products, refreshProducts } = useContext(ProductContext);
  const { query, setQuery, rawSetQuery, results, loading } = useSearch();
  const router = useRouter();
  // const [query, setQuery] = useState('');
  const [visibleData, setVisibleData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const allFilteredResults = useRef([]); // stores the full filtered result
  const currentIndex = useRef(0); // tracks how many items have been shown

  // const filterProducts = debounce((searchTerm) => {
  //   allFilteredResults.current = products;
  //   currentIndex.current = 0;
  //   const initialBatch = allFilteredResults.current.slice(0, BATCH_SIZE);
  //   setVisibleData(initialBatch);
  //   currentIndex.current = initialBatch.length;
  // }, 300);

  // useEffect(() => {
  //   filterProducts(query);
  // }, [query, products]);

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
      await refreshProducts();
    } catch (err) {
      console.warn("Refresh failed:", err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const shuffledProducts = shuffleArray(visibleData);
  
  // const spinValue = useRef(new Animated.Value(0)).current;
  // useEffect(() => {
  //   Animated.loop(
  //     Animated.timing(spinValue, {
  //       toValue: 1,
  //       duration: 500,
  //       easing: Easing.linear,
  //       useNativeDriver: true,
  //     })
  //   ).start();
  // }, []);

  // const spin = spinValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '360deg'],
  // });


  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  // console.log(results);

  return (
    <View style={styles.container}>
      <SearchBar />
      {shuffledProducts.length > 0 ? (
      // {products.length > 0 ? (
        <FlatList
          data={shuffledProducts}
          keyExtractor={(item) => item.product_id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          // contentContainerStyle={{ justifyContent: 'flex-start', }}
          contentContainerStyle={{ alignItems: 'center' }}
          renderItem={({ item, index }) => <ProductItemCard item={item} index={index} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={onRefresh}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary, '#9Bd35A']}
              tintColor={COLORS.primary}
              title="Refreshing..."
              titleColor={COLORS.primary}
              progressBackgroundColor="#fff"
            />
          }
        />
      ) : (
        <View style={styles.noProductContainer}>
          <LottieView
            source={require('../../../assets/animations/nothing-found.json')}
            autoPlay
            loop
            style={{ width: 150, height: 150, alignSelf: 'center' }}
          />
          <Text style={styles.noProductText}>No products found</Text>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
