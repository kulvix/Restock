import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Pressable, Image } from 'react-native';

import styles from './productItemCard.style';
import { useRouter, useLocalSearchParams } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import { SIZES } from '../../../../constants';


const ProductItemCard = ({ item }) => {

  // console.log(item); return;
  const width = Dimensions.get('window').width * 0.8;
  const router = useRouter();
  
  return (
    <Pressable
      style={styles.sectionBody(width)}
      onPress={() =>
        router.push({
          pathname: "/productDetails",
          params: { item: JSON.stringify(item)},
        })
      }
    >
      <Image source={require('../../../../assets/images/sprite.png')} style={styles.image(width)} />
      <View style={styles.productDetailBox}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
      </View>
      <View style={styles.sectionFooter}>
        <View style={styles.priceBox}>
          <Text style={styles.currency} numberOfLines={1}>NGN</Text>
          <Text style={styles.price} numberOfLines={1}>{item.lowest_price}</Text>
        </View>
        <TouchableOpacity style={styles.sectionBtn}
          onPress={() =>
            router.push({
              pathname: "/productDetails",
              params: { item: JSON.stringify(item)},
            })
          }
        >
          <Ionicons name='eye' size={14} style={styles.sectionBtnIcon} />
          {/* <Text style={styles.sectionBtnText}>View</Text>  */}
        </TouchableOpacity>
      </View>
    </Pressable>
    
  );
};

export default ProductItemCard;