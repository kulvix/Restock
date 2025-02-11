import React, { useState, useEffect, useContext, use } from 'react';
import { View, TextInput, FlatList, Text, Image } from 'react-native';
import { ProductContext } from '../../../components/contexts/ProductContext';
import ProductItemCard from '../../../components/common/cards/product/ProductItemCard'; 
import { debounce } from 'lodash';
import SearchBar from '../searchBar/SearchBar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, useRouter, Link } from 'expo-router';
import { COLORS, icons, images, SIZES, FONT } from '../../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './SearchScreen.style';
import LottieView from 'lottie-react-native';

const SearchScreen = () => {
    const { products } = useContext(ProductContext);
    const router = useRouter();


    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState(products);

    // Function to filter products as the user types
    const filterProducts = debounce((searchTerm) => {
        if (!searchTerm) {
            setFilteredData(products); // Reset to full list if empty
        } else {
          const lowerCaseQuery = searchTerm.toLowerCase();
          // console.log(searchTerm); return;
            const filtered = products.filter((item) =>
                item.name.toLowerCase().includes(lowerCaseQuery) ||
                item.description.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredData(filtered);
        }
    }, 300); // Debounce to avoid excessive re-renders

    // Update search results as query changes
    useEffect(() => {
        filterProducts(query);
    }, [query, products]);

    return (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.searchWrapper}>
              <View style={styles.searchInputContainer}>
                <Ionicons name="search" size={SIZES.large} color={COLORS.gray} />
                <TextInput style={styles.searchInput}
                
                  placeholder="Search for a product..."
                  value={query}
                  onChangeText={setQuery}
                />
              </View>

              <TouchableOpacity style={styles.filterBtn} onPress={() => {router.push({pathname: "/(tabs)/home/filter"})}}>
                <Ionicons name='filter' size={SIZES.large} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>

          {filteredData.length > 0 ? (
              <FlatList
                data={filteredData}
                keyExtractor={(item) => item.product_id.toString()}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                contentContainerStyle={{alignItems: 'center'}}
                renderItem={({ item }) => (
                  <ProductItemCard item={item} />
                )}
                onEndReachedThreshold={0.5}
              />
          ) : (
            <View style={styles.noProductContainer}>
              <LottieView 
                source={require('../../../assets/animations/nothing-found.json')}
                autoPlay
                loop
                style={{ width: 150, height: 150, alignSelf: 'center' }} 
              />
              <Text style={styles.noProductText}>
                No products found
              </Text>

            </View>
          )}

        </View>
    );
};

export default SearchScreen;
