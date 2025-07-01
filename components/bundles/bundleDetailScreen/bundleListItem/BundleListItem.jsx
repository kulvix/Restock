import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCart } from '../../../../components/contexts/CartContext';
import styles from './BundleListItem.style';
import LoadingSkeleton from '../../../common/skeleton';

const BundleListItem = ({ item }) => {
  const { cart, updateCart } = useCart();
  // const currentQuantity = cart[item.type_id || item.sku]?.quantity || 0;
  const [loading, setLoading] = useState(true);
  const [currentQuantity, setCurrentQuantity] = useState(cart[item.type_id]?.quantity || 0);

  useEffect(() => {
    setCurrentQuantity(cart[item.type_id]?.quantity || 0);
  }, [cart]); // Re-run when cart updates

  const formatCurrency = (amount) => {
    return `\u20A6${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };
  
  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <LoadingSkeleton loading={loading}>
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.image_url }}
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
    </LoadingSkeleton>
  );
};

export default BundleListItem;
