import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCart } from '../../../../components/contexts/CartContext';
import styles from './BundleListItem.style';

const BundleListItem = ({ item }) => {
  const { cart, updateCart } = useCart();
  const currentQuantity = cart[item.type_id || item.sku]?.quantity || 0;

  const increment = () => {
    if (currentQuantity < item.quantity) {
      const newCart = {
        ...cart,
        [item.type_id || item.sku]: {
          ...cart[item.type_id || item.sku], // Retain other details
          type_name: item.type_name || item.type,
          price: item.price,
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
        [item.type_id  || item.sku]: {
          ...cart[item.type_id  || item.sku], // Retain other details
          type_name: item.type_name || item.type,
          price: item.price,
          image_url: item.image_url,
          quantity: currentQuantity - 1, // Decrement quantity
        },
      };

      if (newCart[item.type_id  || item.sku].quantity === 0) {
        delete newCart[item.type_id  || item.sku];
      }

      updateCart(newCart);
    }
  };

  return (
    <View style={styles.itemContainer}>
      <Image
        source={require('../../../../assets/images/bundle-large-family.png')}
        style={styles.itemImage}
      />
      <View style={styles.rightSectionBox}>
        <View style={styles.detailBox}>
          <Text style={styles.itemTitle}>{item.type_name || item.type}</Text>
          <Text style={styles.itemDetails}>{item.unit}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>

        <View style={styles.inputSection}>
          <TouchableOpacity style={styles.inputBtn} onPress={decrement}>
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
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BundleListItem;
