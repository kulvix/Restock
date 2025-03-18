import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TextInput, ImageBackground, Image, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, useRouter, Link } from 'expo-router';
import { COLORS, icons, images, SIZES, FONT } from '../../constants';
import { AuthContext } from '../../components/contexts/AuthContext';
import { useCart } from '../../components/contexts/CartContext';
import { ProductContext } from '../../components/contexts/ProductContext';

import { LinearGradient } from 'expo-linear-gradient';
import styles from './PromoScreen.style'
import { Pressable } from 'react-native-gesture-handler';
// import ProductListItem from '../../components';
import ProductListItem from '../home/productDetails/ProductListItem/ProductListItem';




const PromoScreen = ({ itemDetails }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { getProductsItemsByDiscount } = useContext(ProductContext);
  const { cart, updateCart } = useCart();

  const [discountItems, setDiscountItems] = useState([]);

  useEffect(() => {
    const fetchDiscountItems = async () => {
      try {
        const response = await getProductsItemsByDiscount(itemDetails.minDiscount, itemDetails.maxDiscount); // Wait for API response
        setDiscountItems(response); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching discount items:', error);
      }
    };
  
    fetchDiscountItems();
  }, [itemDetails.discount]);
  // map through them

  // console.log(discountItems);

  return (
    
      discountItems.length === 0 ? (
        <View style={styles.innerContainer}>
          <View style={styles.backgroundImageBox}>
            <ImageBackground
              source={itemDetails.image}
              resizeMode="cover"
              style={styles.backgroundImage}
            >
              <LinearGradient colors={['transparent', COLORS.black]} style={styles.boxGradient} />
            </ImageBackground>
          </View>

          <View style={styles.detailWrapper}>
            <Text style={styles.title}>{itemDetails.title}</Text>
            <Text style={styles.description}>{itemDetails.description}</Text>
          </View>

          <View>
            <Text style={styles.noPromoText}>No promos today. Check back later.</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={discountItems}
          keyExtractor={(item) => item.sku.toString()} // Ensure each item has a unique key
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductListItem item={item} updateCart={updateCart} cart={cart} />
          )}
          contentContainerStyle={{ paddingHorizontal: SIZES.small, paddingBottom: 30 }}
    
          ListHeaderComponent={
            <>
              <View style={styles.innerContainer}>
                <View style={styles.backgroundImageBox}>
                  <ImageBackground
                    source={itemDetails.image}
                    resizeMode="cover"
                    style={styles.backgroundImage}
                  >
                    <LinearGradient colors={['transparent', COLORS.black]} style={styles.boxGradient} />
                  </ImageBackground>
                </View>
    
                <View style={styles.detailWrapper}>
                  <Text style={styles.title}>{itemDetails.title}</Text>
                  <Text style={styles.description}>{itemDetails.description}</Text>
                </View>
              </View>
            </>
          }
        />
        

        
      )
    

  )
}

export default PromoScreen