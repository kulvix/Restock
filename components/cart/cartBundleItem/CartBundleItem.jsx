import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCart } from '../../contexts/CartContext';
import styles from './CartBundleItem.style';
import { useRouter } from 'expo-router';


// import AsyncStorage from '@react-native-async-storage/async-storage';

// const resetAsyncStorage = async () => {
//   try {
//     await AsyncStorage.clear();
//     console.log('AsyncStorage has been reset!');
//   } catch (error) {
//     console.error('Error resetting AsyncStorage:', error);
//   }
// };
const CartBundleItem = ({ item }) => {
  const { cart, updateCart, removeItemFromCart } = useCart();
  // console.log(item);
  const router = useRouter();

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




  return (
    <Pressable style={styles.itemContainer}
      onPress={() => router.push({
        pathname: "/bundleDetails",
        params: { item: encodeURIComponent(JSON.stringify(item)) } // Encode JSON
      })}
    >
      <Image
        source={{ uri : item.image_url }}
        style={styles.itemImage}
      />
      <View style={styles.rightSectionBox}>
        <View style={styles.detailBox}>
          <Text style={styles.itemTitle}>{item.bundle_name}</Text>
          {/* <Text style={styles.itemDetails}>{item.description}</Text> */}

          <Text style={styles.itemDetails}>{`\u20A6${item.price}`} x {item.quantity}</Text>
        </View>

        <View style={styles.inputSection}>

        
          <Pressable style={styles.deleteIconBox} onPress={() => removeItemFromCart(item.cart_item_id)}>
            <Ionicons name='trash' size={20} style={styles.deleteIcon} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default CartBundleItem;
