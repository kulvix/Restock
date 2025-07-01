import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useRef,
  useMemo
} from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Dimensions,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from './categoriesScreen.style';
import { ProductContext } from '../../components/contexts/ProductContext';
import { useCart } from '../../components/contexts/CartContext';
import ProductListItem from '../home/productDetails/ProductListItem/ProductListItem';
import LoadingSkeleton from '../common/skeleton';
import { COLORS, SIZES } from '../../constants';
import { sortAlphabetically } from '../../utils/helpers';
import SearchBar from '../search/searchBar/SearchBar';

const screenWidth = Dimensions.get('window').width;

const CategoriesScreen = ({ targetCategoryTab }) => {
  const { getProductsByCategory, categories, refreshCategories, loading } = useContext(ProductContext);
  const { cart, updateCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryProducts, setCategoryProducts] = useState({});
  const [batchSize, setBatchSize] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);

  const sortedCategories = useMemo(() => sortAlphabetically(categories, 'category_name'), [categories]);

  const tabListRef = useRef(null);
  const productListRef = useRef(null);
  const hasAutoSelected = useRef(false);
  const selectedCategoryRef = useRef(selectedCategory);

  const fetchProducts = async (category, force = false) => {
    if (!category || (!force && categoryProducts[category])) return;
    const products = await getProductsByCategory(category);
    setCategoryProducts((prev) => ({ ...prev, [category]: products }));
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    const index = sortedCategories.findIndex((cat) => cat.category_name === newCategory);

    if (index >= 0 && tabListRef.current) {
      tabListRef.current.scrollToIndex({ index, animated: true });
    }
    if (index >= 0 && productListRef.current) {
      productListRef.current.scrollToIndex({ index, animated: true });
    }
    fetchProducts(newCategory);
  };

  useFocusEffect(
    useCallback(() => {
      hasAutoSelected.current = false;
    }, [])
  );

  useEffect(() => {
    if (!hasAutoSelected.current && sortedCategories.length > 0) {
      const defaultCategory = targetCategoryTab || sortedCategories[0].category_name;
      hasAutoSelected.current = true;
      handleCategoryChange(defaultCategory);
    }
  }, [sortedCategories, targetCategoryTab]);

  useEffect(() => {
    selectedCategoryRef.current = selectedCategory;
  }, [selectedCategory]);

  // console.log(selectedCategory);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const currentCategory = selectedCategoryRef.current;
    const index = sortedCategories.findIndex(cat => cat.category_name === currentCategory);
    
    try {
      await refreshCategories(currentCategory);
      // if (currentCategory) {
      //   await fetchProducts(currentCategory, true);
      // }
    } catch (err) {
      console.warn('Refresh failed:', err);
    } finally {
      if (index >= 0 && tabListRef.current) {
        tabListRef.current.scrollToIndex({ index, animated: true });
      }
      if (index >= 0 && productListRef.current) {
        productListRef.current.scrollToIndex({ index, animated: false });
      }
      setRefreshing(false);
    }
  }, [sortedCategories]);
  

  useEffect(() => {
    const loadCategory = async () => {
      if (!selectedCategory) return;
      setLoadingCategory(true);
      await fetchProducts(selectedCategory);
      setLoadingCategory(false);
    };
    loadCategory();
  }, [selectedCategory]);

  const renderProductItem = useCallback(({ item, index }) => (
    <ProductListItem
      item={item}
      key={item.sku}
      updateCart={updateCart}
      cart={cart}
      index={index}
    />
  ), [cart, updateCart]);

  const visibleProductsByCategory = useMemo(() => {
    const result = {};
    Object.entries(categoryProducts).forEach(([category, products]) => {
      result[category] = products.slice(0, batchSize);
    });
    return result;
  }, [categoryProducts, batchSize]);

  return (
    <View style={styles.container}>
      <SearchBar />
      <View style={styles.innerContainer}>
        {/* Tab Bar */}
        <View style={styles.tabsContainer}>
          <FlatList
            ref={tabListRef}
            data={sortedCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.category_name}
            renderItem={({ item }) => (
              <Pressable
                style={styles.tabs(selectedCategory, item.category_name)}
                onPress={() => handleCategoryChange(item.category_name)}
              >
                <Text style={styles.tabText(selectedCategory, item.category_name)}>
                  {item.category_name}
                </Text>
              </Pressable>
            )}
            getItemLayout={(data, index) => ({
              length: 100,
              offset: 100 * index,
              index
            })}
            onScrollToIndexFailed={({ index, averageItemLength }) => {
              tabListRef.current?.scrollToOffset({
                offset: averageItemLength * index,
                animated: true
              });
            }}
          />
        </View>

        {/* Main Content */}
        <LoadingSkeleton loading={loading}>
          <View style={{ flex: 1 }}>
            <FlatList
              ref={productListRef}
              data={sortedCategories}
              horizontal
              pagingEnabled
              bounces={false}
              decelerationRate="fast"
              snapToInterval={screenWidth}
              snapToAlignment="start"
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.category_name}
              getItemLayout={(data, index) => ({
                length: screenWidth,
                offset: screenWidth * index,
                index
              })}
              onScrollToIndexFailed={({ index }) => {
                productListRef.current?.scrollToOffset({
                  offset: screenWidth * index,
                  animated: true
                });
              }}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
                const newCategory = sortedCategories[index]?.category_name;
                if (newCategory && newCategory !== selectedCategory) {
                  setSelectedCategory(newCategory);
                }
              }}
              renderItem={({ item }) => {
                const visibleProducts = visibleProductsByCategory[item.category_name] || [];

                return (
                  <View style={{ width: screenWidth, borderRightWidth: 1, borderColor: COLORS.lightGray }}>
                    {loadingCategory ? (
                      <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : (
                      <FlatList
                        data={visibleProducts}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => item.sku}
                        contentContainerStyle={{
                          paddingBottom: SIZES.large * 3,
                          paddingHorizontal: SIZES.medium,
                        }}
                        onEndReached={() => {
                          if ((categoryProducts[item.category_name] || []).length >= batchSize) {
                            setBatchSize((prev) => prev + 10);
                          }
                        }}
                        onEndReachedThreshold={0.5}
                        refreshControl={
                          <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[COLORS.primary]}
                          />
                        }
                        initialNumToRender={10}
                        windowSize={5}
                        maxToRenderPerBatch={10}
                        removeClippedSubviews={true}
                      />
                    )}
                  </View>
                );
              }}
            />
          </View>
        </LoadingSkeleton>
      </View>
    </View>
  );
};

export default CategoriesScreen;
