import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCart } from '../../../../components/contexts/CartContext';
import styles from './ProductListItem.style';

const ProductListItem = ({ item }) => {
  const { cart, setCart, updateCart } = useCart();
  // console.log(item);
  // const [currentQuantity, setCurrentQuantity] = useState(cart[item.type_id]?.quantity || 0);

  const cartItem = Object.values(cart).find(
    (cart_item) => cart_item.type_id === item.type_id
  );
  const [currentQuantity, setCurrentQuantity] = useState(cartItem?.quantity || 0);

  useEffect(() => {
    setCurrentQuantity(cart[item.type_id]?.quantity || 0);
  }, [cart]); // Re-run when cart updates


  useEffect(() => {
    const cartItem = Object.values(cart).find(
      (cart_item) => cart_item.type_id === item.type_id
    );
  
    setCurrentQuantity(cartItem?.quantity || 0);
  }, [cart, item.type_id]);

  const addProductToCart = () => {
    // console.log("Clicked!", item);
    if (currentQuantity < item.quantity) {
      const cart_item_id = `product_${item.type_id}`;
      const newCart = {
        ...cart,
        [cart_item_id]: {
          ...cart[item.type_id],
          cart_item_id,
          type_name: item.type_name || item.type,
          price: item.price,
          discount: item.discount,
          type_id: item.type_id,
          image_url: item.image_url,
          quantity: currentQuantity + 1,
        },
      };
      updateCart(newCart);
    }
  };

  const removeProductFromCart = () => {
    // Find the cart key associated with this product
    const cartKey = Object.keys(cart).find(
      (key) => cart[key].type_id === item.type_id
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


  const calculateDiscountedPrice = (price, discountPercentage) => {
    // Validate inputs
    if (isNaN(price) || isNaN(discountPercentage)) {
      throw new Error("Invalid input: Both price and discountPercentage should be numbers.");
    }
  
    if (price < 0 || discountPercentage < 0 || discountPercentage > 100) {
      throw new Error("Invalid values: Price should be positive and discount should be between 0 and 100.");
    }
  
    // Calculate the discounted price
    const discountAmount = (price * discountPercentage) / 100;
    const finalPrice = price - discountAmount;
  
    return {
      originalPrice: price,
      discountPercentage,
      discountAmount,
      finalPrice
    };
  };

  const discountedPriceObject = calculateDiscountedPrice(parseFloat(item.price) || 0, parseFloat(item.discount) || 0);
  // console.log(discountedPriceObject); return;

  return (
    item.discount == null || item.discount < 0 ? (
      <View style={styles.itemContainer}>
        <Image
          source={require('../../../../assets/images/bundle-large-family.png')}
          style={styles.itemImage}
        />
        <View style={styles.rightSectionBox}>
          <View style={styles.detailBox}>
            <Text style={styles.itemTitle}>{item.type_name || item.type || item.name}</Text>
            {item.local_name && <Text style={styles.itemDetails}>{item.local_name}</Text>}
            <Text style={styles.itemDetails}>1 {item.unit}</Text>
            <Text style={styles.itemPrice}>
              {`\u20A6${item.price}`}
            </Text>
          </View>
  
          <View style={styles.inputSection}>
            <Pressable style={styles.inputBtn} onPress={removeProductFromCart}>
              <Ionicons name='remove-outline' style={styles.inputIcon} />
            </Pressable>
  
            <View style={styles.inputFieldBox}>
              <TextInput
                style={styles.inputField}
                value={`${currentQuantity}`} // Convert to string
                editable={false}
                keyboardType="numeric"
              />
            </View>
  
            <Pressable style={styles.inputBtn} onPress={addProductToCart}>
              <Ionicons name='add-outline' style={styles.inputIcon} />
            </Pressable>
          </View>
        </View>
      </View>
    ) : (
      // DISCOUNT CARD
      <View style={styles.itemContainer}>
        <Image
          source={require('../../../../assets/images/bundle-large-family.png')}
          style={styles.itemImage}
        />
        <Text style={styles.discountAmount}>
            {`Save \u20A6${discountedPriceObject.discountAmount}`}
        </Text>
        <Text style={styles.discountPercentage}>
            {`-${discountedPriceObject.discountPercentage}%`}
        </Text>
        <View style={styles.rightSectionBox}>
          <View style={styles.detailBox}>
            <Text style={styles.itemTitle}>{item.type_name || item.type || item.name}</Text>
            {item.local_name && <Text style={styles.itemDetails}>{item.local_name}</Text>}
            <Text style={styles.itemDetails}>1 {item.unit}</Text>
            <Text style={styles.finalPrice}>
              {`\u20A6${discountedPriceObject.finalPrice}`}
            </Text>
            <Text style={styles.normalPrice}>
              {`\u20A6${item.price}`}
            </Text>            
          </View>
  
          <View style={styles.inputSection}>
            <Pressable style={styles.inputBtn} onPress={removeProductFromCart}>
              <Ionicons name='remove-outline' style={styles.inputIcon} />
            </Pressable>
  
            <View style={styles.inputFieldBox}>
              <TextInput
                style={styles.inputField}
                value={`${currentQuantity}`} // Convert to string
                editable={false}
                keyboardType="numeric"
              />
            </View>
  
            <Pressable style={styles.inputBtn} onPress={addProductToCart}>
              <Ionicons name='add-outline' style={styles.inputIcon} />
            </Pressable>
          </View>
        </View>
      </View>
      )
    
  );
};

export default ProductListItem;
