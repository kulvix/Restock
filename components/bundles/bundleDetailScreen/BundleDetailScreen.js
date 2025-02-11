import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList, Image } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SIZES, FONT } from "../../../constants";
import styles from './BundleDetailScreen.style';
import { LinearGradient } from 'expo-linear-gradient';
import BundleListItem from './bundleListItem/BundleListItem';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartBadge from '../../cart/cartBadge/CartBadge';
import { useCart } from '../../../components/contexts/CartContext';
import { getBaseURL } from '../../../utils/apiConfig';



const BundleDetailScreen = ( {itemDetails}) => {
  // console.log(itemDetails);
	const [productItems, setProductItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [bundleId, setBundleId] = useState(null);

  // const [cart, setCart] = useState({});
	const { cart, updateCart } = useCart();

  // const BASE_URL = getBaseURL();
	// const SERVER_URL = `${BASE_URL}/server`;
	

	// useEffect(() => {
	// 	const getProductTypes = async () => {
	// 		try {
	// 			const response = await axios.get(`${SERVER_URL}/producttypes/${itemDetails.bundle_id}`);
	// 			setProductItems(response.data);
	// 			setLoading(false);
	// 		} catch (err) {
	// 			setError(err.message);
	// 			setLoading(false);
	// 		}
	// 	};
	// 	getProductTypes();
	// }, [bundleId]);



	// // Load cart from AsyncStorage when the app mounts
  // useEffect(() => {
  //   const loadCart = async () => {
  //     const savedCart = await AsyncStorage.getItem('cart');
  //     if (savedCart) {
  //       setCart(JSON.parse(savedCart));
  //     }
  //   };

  //   loadCart();
  // }, []);

  // // Save cart to AsyncStorage whenever it changes
  // useEffect(() => {
  //   const saveCart = async () => {
  //     await AsyncStorage.setItem('cart', JSON.stringify(cart));
  //   };

  //   saveCart();
  // }, [cart]);


	// const updateCart = (itemId, quantity) => {
  //   setCart(prevCart => {
  //     if (quantity <= 0) {
  //       const { [itemId]: _, ...newCart } = prevCart; // Remove item if quantity is 0
  //       return newCart;
  //     }
  //     return { ...prevCart, [itemId]: quantity };
  //   });
  // };

	return (
		<View style={styles.container}>
			<View style={styles.imageBox}>
        <ImageBackground
          source={itemDetails.image}
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
          <View style={styles.section1}>
            <Text style={styles.descText}>{itemDetails.subtitle}</Text>
            <Text style={styles.titleText}>NGN {itemDetails.price}</Text>
          </View>
        </ImageBackground>
      </View>


			<View style={styles.section2}>
				<Text style={styles.sectionTitle}>Bundle items</Text>
				<View style={styles.listItemsContainer}>
					{productItems.map((item) => {    
						return (
							<BundleListItem item={item} key={item.type_id} updateCart={updateCart} cart={cart} />
						)
					})}
				</View>
				<CartBadge />
			</View>
		</View>
	)
}



export default BundleDetailScreen