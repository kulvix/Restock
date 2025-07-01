import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCart } from '../../contexts/CartContext';
import styles from './CartListItem.style';



// import AsyncStorage from '@react-native-async-storage/async-storage';

// const resetAsyncStorage = async () => {
//   try {
//     await AsyncStorage.clear();
//     console.log('AsyncStorage has been reset!');
//   } catch (error) {
//     console.error('Error resetting AsyncStorage:', error);
//   }
// };
const CartListItem = ({ item }) => {
  const { cart, updateCart, removeItemFromCart } = useCart();
  // console.log(item);


  const [currentQuantity, setCurrentQuantity] = useState(cart[item.type_id]?.quantity || 0);

  
  useEffect(() => {
    setCurrentQuantity(cart[item.type_id]?.quantity || 0);
  }, [cart]); // Re-run when cart updates

  const increment = () => {
    
    if (currentQuantity < item.quantity) {
      const newCart = {
        ...cart,
        [item.type_id]: {
          ...cart[item.type_id], // Retain other details
          type_name: item.type_name || item.type,
          price: item.price,
          type_id: item.type_id,
          image_url: item.image_url,
          quantity: currentQuantity + 1, // Increment quantity
        },
      };
      updateCart(newCart);
    }
  };

  const decrement = () => {
    if (currentQuantity > 0) {
      const newCart = {
        ...cart,
        [item.type_id]: {
          ...cart[item.type_id], // Retain other details
          type_name: item.type_name || item.type,
          price: item.price,
          type_id: item.type_id,
          image_url: item.image_url,
          quantity: currentQuantity - 1, // Decrement quantity
        },
      };

      if (newCart[item.type_id].quantity === 0) {
        delete newCart[item.type_id];
      }

      updateCart(newCart);
    }
  };

// console.log(item.discountedPrice.discountAmount); return;
  return (
    item.discountedPrice.discountAmount != 0) ? (
      // DISCOUNTED
      <View style={styles.itemContainer}>
        <Image
          source={{ uri : item.image_url }}
          style={styles.itemImage}
        />
        <View style={styles.rightSectionBox}>
          <View style={styles.detailBox}>
            <Text style={styles.itemTitle}>{item.type_name || item.type}</Text>
            <Text style={styles.itemDetails}>{item.unit}</Text>

            <View style={styles.priceAndPercentageBox}>
              <Text style={styles.finalPrice}>
                {`\u20A6${item.discountedPrice.finalPrice}`} x {item.quantity}
              </Text>
                <Text style={styles.discountPercentage}>-{item.discount}%</Text>
            </View>
            <Text style={styles.normalPrice}>Instead of {`\u20A6${item.discountedPrice.originalPrice}`} x {item.quantity}</Text>
          </View>
          <View style={styles.inputSection}>
          
            <TouchableOpacity style={styles.deleteIconBox} onPress={() => removeItemFromCart(item.cart_item_id)}>
              <Ionicons name='trash' size={20} style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
        </View>
          <Text style={styles.discountAmount}>You are saving {`\u20A6${item.discountedPrice.discountAmount * item.quantity}`}</Text>
      </View>
    ) : (
      <View style={styles.itemContainer}>
        <Image
          source={{ uri : item.image_url }}
          style={styles.itemImage}
        />
        <View style={styles.rightSectionBox}>
          <View style={styles.detailBox}>
            <Text style={styles.itemTitle}>{item.type_name || item.type}</Text>
            <Text style={styles.itemDetails}>{item.unit}</Text>
  
            <Text style={styles.itemDetails}>{`\u20A6${item.price}`} x {item.quantity}</Text>
          </View>
  
          <View style={styles.inputSection}>
          
            <TouchableOpacity style={styles.deleteIconBox} onPress={() => removeItemFromCart(item.cart_item_id)}>
              <Ionicons name='trash' size={20} style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

    )
};

export default CartListItem;
