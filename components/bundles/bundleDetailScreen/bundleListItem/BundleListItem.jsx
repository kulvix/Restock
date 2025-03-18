import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCart } from '../../../../components/contexts/CartContext';
import styles from './BundleListItem.style';

const BundleListItem = ({ item }) => {
  const { cart, updateCart } = useCart();
  // const currentQuantity = cart[item.type_id || item.sku]?.quantity || 0;

  const [currentQuantity, setCurrentQuantity] = useState(cart[item.type_id]?.quantity || 0);

  useEffect(() => {
    setCurrentQuantity(cart[item.type_id]?.quantity || 0);
  }, [cart]); // Re-run when cart updates

  // const increment = () => {
  //   if (currentQuantity < item.quantity) {
  //     const newCart = {
  //       ...cart,
  //       [item.type_id]: {
  //         ...cart[item.type_id], // Preserve existing details
  //         type_id: item.type_id,
  //         type_name: item.type_name || item.type,
  //         price: item.price,
  //         image_url: item.image_url,
  //         quantity: currentQuantity + 1,
  //         isBundle: item.isBundle || false,
  //         items: item.isBundle ? item.items : [], // Store items if it's a bundle
  //       },
  //     };
  //     updateCart(newCart);
  //   }
  // };

  // const decrement = () => {
  
  //   if (currentQuantity > 1) {
  //     const newCart = {
  //       ...cart,
  //       [item.type_id]: {
  //         ...cart[item.type_id],
  //         quantity: currentQuantity - 1,
  //       },
  //     };
  //     updateCart(newCart);
  //   } else {
  //     const newCart = { ...cart };
  //     delete newCart[item.type_id]; // Remove item when quantity reaches 0
  //     updateCart(newCart);
  //   }
  // };

  const formatCurrency = (amount) => {
    return `\u20A6${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };
  return (
    <View style={styles.itemContainer}>
      
      <Image
        source={require('../../../../assets/images/bundle-large-family.png')}
        style={styles.itemImage}
      />
      <View style={styles.quantityBox}>
        <Text style={styles.itemDetails}>{item.quantity}</Text>
        <Text style={styles.itemDetails}>{item.unit}</Text>
      </View>
      <View style={styles.detailBox}>
        <Text style={styles.itemTitle}>{item.product_name}</Text>
        <Text style={styles.itemPrice}>{formatCurrency(parseFloat(item.product_price))}</Text>
      </View>
    </View>
  );
};

export default BundleListItem;
