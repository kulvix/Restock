import React, { useEffect, useState, useContext } from 'react'
import { View, Text, FlatList, Image, Pressable, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SIZES } from '../../constants';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styles from './categoriesScreen.style'
import axios from 'axios';
import { getBaseURL } from '../../utils/apiConfig';
import { ProductContext } from '../../components/contexts/ProductContext';
import { useCart } from '../../components/contexts/CartContext';
import ProductListItem from '../home/productDetails/ProductListItem/ProductListItem';



const CategoryItems = ({ item, width }) => {

  if (item.empty === true) {
    return <View style={styles.itemInvisible} />
  }
  return (
    <Pressable style={styles.productItem(width)}>
      <Image source={item.image} style={[styles.image(width)]} />
      <View style={styles.productDetailBox}>
        <Text style={styles.productName} numberOfLines={1}>{item.type}</Text>
        {/* <Text style={styles.qty} numberOfLines={1}>{item.qty} {item.unit}</Text> */}
        <Text style={styles.qty} numberOfLines={1}>{item.unit}</Text>
      </View>
      <View style={styles.sectionFooter}>
        <View style={styles.priceBox}>
          <Text style={styles.currency} numberOfLines={1}>NGN</Text>
          <Text style={styles.price} numberOfLines={1}>{item.price}</Text>
        </View>
        <Pressable style={styles.sectionBtn}>
          <Text style={styles.sectionBtnText}><Ionicons name='add' size={14} /></Text> 
        </Pressable>
      </View>
    </Pressable>
  );
};

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow = numberOfElementsLastRow + 1;
  }
  return data;
}





const CategoriesScreen = ({ targetCategoryTab }) => {

  const { cart, updateCart } = useCart();


  const width = Dimensions.get('window').width * 0.8;

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { getProductsByCategory, fetchCategories } = useContext(ProductContext);

  // Fetch categories
  const fetchAndSetCategories = async () => {
    const allCategories = await fetchCategories();
    setCategories(allCategories);

    // If targetCategoryTab is defined, navigate to it; otherwise, select the first category
    if (targetCategoryTab) {
      setSelectedCategory(targetCategoryTab);
      fetchProducts(targetCategoryTab);
    } else if (allCategories.length > 0) {
      const defaultCategory = allCategories[0].category_name; // Default to the first category
      setSelectedCategory(defaultCategory);
      fetchProducts(defaultCategory);
    }
  };

  // Fetch products for a category
  const fetchProducts = async (category) => {
    if (!category) return;
    const categoryProducts = await getProductsByCategory(category);
    setFilteredProducts(categoryProducts);
  };

  // Handle manual category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchProducts(category);
  };

  // Handle updates to targetCategoryTab
  useEffect(() => {
    if (targetCategoryTab && targetCategoryTab !== selectedCategory) {
      setSelectedCategory(targetCategoryTab);
      fetchProducts(targetCategoryTab);
    }
  }, [targetCategoryTab]);

  // Fetch categories on component mount
  useEffect(() => {
    fetchAndSetCategories();
  }, []);


  // console.log(" >> Product Type Item >> ", filteredProducts);

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <FlatList
          data={categories}
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
        />
      </View>
      <View style={styles.productsContainer}>
        <FlatList
          data={filteredProducts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductListItem item={item} key={item.sku} updateCart={updateCart} cart={cart} />
          )}
          contentContainerStyle={{ paddingBottom: SIZES.large * 3 }}
        />
      </View>
      {/* <View style={styles.productsContainer}>
        <FlatList
          data={formatData(filteredProducts, 2)}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => (
            // <CategoryItems key={item.sku} item={item} width={width} />
            <ProductListItem item={item} key={item.sku} updateCart={updateCart} cart={cart} />
          )}
          contentContainerStyle={{ paddingBottom: 180 }}
        />
      </View> */}
    </View>
  );
};




export default CategoriesScreen;

