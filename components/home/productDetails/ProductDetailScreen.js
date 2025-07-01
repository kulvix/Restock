import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { ScrollView, FlatList, Image, Pressable } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SIZES, FONT } from "../../../constants";
import styles from './ProductDetailScreen.style';
import { LinearGradient } from 'expo-linear-gradient';
import ProductListItem from './ProductListItem/ProductListItem';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartBadge from '../../cart/cartBadge/CartBadge';
import { useCart } from '../../../components/contexts/CartContext';
import { getBaseURL } from '../../../utils/apiConfig';
import { useRouter } from 'expo-router';


const ProductDetailScreen = ( {itemDetails}) => {
  const router = useRouter();
	const [productItems, setProductItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

  // const [cart, setCart] = useState({});
	const { cart, updateCart } = useCart();

  const BASE_URL = getBaseURL();
	const SERVER_URL = `${BASE_URL}/server`;

	useEffect(() => {
		const getProductTypes = async () => {
			try {
				const response = await axios.get(`${SERVER_URL}/producttypes/${itemDetails.product_id}`);
				setProductItems(response.data);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};
		getProductTypes();
	}, []);
  
	return (
		<ScrollView style={styles.container}
      showsVerticalScrollIndicator={false} 
    >
			<View style={styles.imageBox}>
        <ImageBackground
          source={{ uri: itemDetails.image_url }}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
        <LinearGradient colors={['transparent', COLORS.black]} style={styles.boxGradient} />
          <View style={styles.section1}>
            <Text style={styles.titleText}>{itemDetails.name}</Text>
            <View style={styles.ratingBox}>
              <Ionicons name='star' style={styles.ratingStar} />
              <Ionicons name='star' style={styles.ratingStar} />
              <Ionicons name='star' style={styles.ratingStar} />
              <Ionicons name='star' style={styles.ratingStar} />
              <Ionicons name='star' style={styles.ratingStar} />
            </View>
            {/* <Text style={styles.subTitle}>8 tubers</Text> */}
          </View>
          <Text style={styles.descText}>{itemDetails.description}</Text>
        </ImageBackground>
      </View>


			<View style={styles.section2}>
        <View style={styles.section2Header}>
          <Text style={styles.sectionTitle}>Select type</Text>
          <Pressable style={styles.goToCartBtn} onPress={() => router.push("/cart")}>
            <Ionicons name='cart-outline' size={SIZES.small} color={COLORS.white} />
  				  <Text style={styles.cartBtnText}>Go to cart</Text>
            <CartBadge />
          </Pressable>
        </View>
				<View style={styles.listItemsContainer}>
					{productItems.map((item) => {
						return (
							<ProductListItem item={item} key={item.type_id} updateCart={updateCart} cart={cart} />
						)
					})}
				</View>
			</View>
		</ScrollView>
	)
}



export default ProductDetailScreen