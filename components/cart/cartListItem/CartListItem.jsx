import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCart } from '../../../components/contexts/CartContext';
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

  return (
    <View style={styles.itemContainer}>
      <Image
        source={require('../../../assets/images/bundle-large-family.png')}
        style={styles.itemImage}
      />
      <View style={styles.rightSectionBox}>
        <View style={styles.detailBox}>
          <Text style={styles.itemTitle}>{item.type_name || item.type}</Text>
          <Text style={styles.itemDetails}>{item.unit}</Text>

          <Text style={styles.itemDetails}>{`\u20A6${item.price}`} x {item.quantity}</Text>
        </View>

        <View style={styles.inputSection}>
          {/* <TouchableOpacity style={styles.inputBtn} onPress={decrement}>
            <Ionicons name='remove-outline' style={styles.inputIcon} />
          </TouchableOpacity>

          <View style={styles.inputFieldBox}>
            <TextInput
              style={styles.inputField}
              value={`${currentQuantity}`} // Convert to string
              editable={false}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.inputBtn} onPress={increment}>
            <Ionicons name='add-outline' style={styles.inputIcon} />
          </TouchableOpacity> */}
        
          <TouchableOpacity style={styles.deleteIconBox} onPress={() => removeItemFromCart(item.type_id)}>
            <Ionicons name='trash' size={20} style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartListItem;
