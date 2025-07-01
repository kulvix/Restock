import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, ImageBackground, RefreshControl } from 'react-native';
import { ScrollView, FlatList, Image, Pressable } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SIZES, FONT } from "../../../constants";
import styles from './BundleDetailScreen.style';
import { LinearGradient } from 'expo-linear-gradient';
import BundleListItem from './bundleListItem/BundleListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartBadge from '../../cart/cartBadge/CartBadge';
import { useCart } from '../../../components/contexts/CartContext';
import { getBaseURL } from '../../../utils/apiConfig';
import { BundleContext } from '../../contexts/BundleContext';



const BundleDetailScreen = ({itemDetails}) => {
  // console.log(itemDetails);
  const { bundles, getBundleItems, refreshBundleItems } = useContext(BundleContext);
	const [bundleItems, setBundleItems] = useState(null);
	const [error, setError] = useState(null);
	const [bundleId, setBundleId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

	const { cart, updateCart } = useCart();

  // const [currentQuantity, setCurrentQuantity] = useState(cart[itemDetails.bundle_id]?.quantity || 0);

  const cartItem = Object.values(cart).find(
    (item) => item.bundle_id === itemDetails.bundle_id
  );
  const [currentQuantity, setCurrentQuantity] = useState(cartItem?.quantity || 0);

  // console.log(currentQuantity);
  useEffect(() => {
    const cartItem = Object.values(cart).find(
      (item) => item.bundle_id === itemDetails.bundle_id
    );
  
    setCurrentQuantity(cartItem?.quantity || 0);
  }, [cart, itemDetails.bundle_id]); // Ensure re-renders when cart updates
  
  useEffect(() => {
    const fetchBundleItems = async () => {
      try {
        const bundleItemsRes = await getBundleItems(itemDetails.bundle_id);
        setBundleItems(bundleItemsRes);
      } catch (error) {
        console.error("Failed to fetch bundle items:", error);
      }
    };
    
    fetchBundleItems();
  }, [itemDetails]);
  
  // console.log(bundleItems); return

  const addBundleToCart = (bundle) => {
    // Find if the bundle already exists in the cart
    const cartKey = Object.keys(cart).find(
      (key) => cart[key].bundle_id === bundle.bundle_id
    );
  
    if (cartKey) {
      // If bundle already exists, increment its quantity
      const newCart = {
        ...cart,
        [cartKey]: {
          ...cart[cartKey],
          quantity: cart[cartKey].quantity + 1,
        },
      };
      updateCart(newCart);
    } else {
      // If bundle is new, add it with a unique ID
      const cart_item_id = `bundle_${Date.now()}`;
      const newCart = {
        ...cart,
        [cart_item_id]: {
          cart_item_id,
          bundle_id: bundle.bundle_id,
          bundle_name: bundle.bundle_name,
          description: bundle.description,
          price: bundleItems.total_price,
          image_url: bundle.image_url,
          quantity: 1, // Start with 1 instead of currentQuantity + 1
          isBundle: true,
        },
      };
      updateCart(newCart);
    }
  };
  // console.log(bundleItems.total_price);

  const removeBundleFromCart = (bundle) => {
    // Find the cart key associated with this bundle
    const cartKey = Object.keys(cart).find(
      (key) => cart[key].bundle_id === bundle.bundle_id
    );
  
    if (!cartKey) return; // If not in cart, exit
  
    if (cart[cartKey].quantity > 1) {
      // Decrease quantity if more than 1
      const newCart = {
        ...cart,
        [cartKey]: {
          ...cart[cartKey],
          quantity: cart[cartKey].quantity - 1,
        },
      };
      updateCart(newCart);
    } else {
      // Remove item completely if quantity reaches 0
      const newCart = { ...cart };
      delete newCart[cartKey];
      updateCart(newCart);
    }
  };
  
  const formatCurrency = (amount) => {
    return `\u20A6${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };


  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const newBundleItemsRes = await refreshBundleItems(itemDetails.bundle_id)
      setBundleItems(newBundleItemsRes);
    } catch (err) {
      console.warn("Refresh failed:", err);
    } finally {
      setRefreshing(false);
    }
  }, []);




  if(!bundleItems) {
    return
  } 
// console.log("Bundles: ", itemDetails, itemDetails.bundle_id); return;
	return (
		<ScrollView
      style={styles.container}
      bounces={true}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary, '#9Bd35A']}  
          tintColor={COLORS.primary}
          title="Refreshing..."
        />
      }
    >
			<View style={styles.imageBox}>
        <ImageBackground
          source={{uri: itemDetails.image_url}}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
        <LinearGradient colors={['transparent', COLORS.black]} style={styles.boxGradient} />
          <View style={styles.sections}>
            <Text style={styles.titleText}>{itemDetails.bundle_name}</Text>
            <Text style={styles.descText}>{itemDetails.description}</Text>
            <View style={styles.ratingBox}>
              <Ionicons name='star' style={styles.ratingStar} />
              <Ionicons name='star' style={styles.ratingStar} />
              <Ionicons name='star' style={styles.ratingStar} />
              <Ionicons name='star' style={styles.ratingStar} />
              <Ionicons name='star' style={styles.ratingStar} />
            </View>
          </View>
          <View style={styles.sections}>
            <Text style={styles.priceText}>{formatCurrency(parseFloat(bundleItems.total_price))}</Text>
            <View style={styles.addToCartBtnContainer}>

              {
                currentQuantity < 1 ? (
                  <Pressable style={styles.addToCartBtn} onPress={() => addBundleToCart(itemDetails)}>
                    <Ionicons name='cart-outline' size={20} color={COLORS.white} />
                    <Text style={styles.addToCartBtText}>Add to cart</Text>
                  </Pressable>
                ) : (
                  <View style={styles.doubleBtnContainer}>
                    <Pressable style={styles.doubleBtn1} onPress={() => removeBundleFromCart(itemDetails)}>
                      <Ionicons name='remove' size={20} color={COLORS.white} />
                    </Pressable>
                    <Text style={styles.quantityBox}>{currentQuantity}</Text>
                    <Pressable style={styles.doubleBtn2} onPress={() => addBundleToCart(itemDetails)}>
                      <Ionicons name='add' size={20} color={COLORS.white} />
                    </Pressable>
                  </View>
                )
              }
            </View>
          </View>
        </ImageBackground>
      </View>

			<View style={styles.section2}>
				<Text style={styles.sectionTitle}>Bundle items</Text>
				<View style={styles.listItemsContainer}>
					{bundleItems.items.map((item) => {
						return (
							<BundleListItem item={item} key={item.bundle_item_id} />
						)
					})}
				</View>
			</View>
		</ScrollView>
	)
}



export default BundleDetailScreen