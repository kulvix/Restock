import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Dimensions,
  Animated,
} from 'react-native';

import styles from './productItemCard.style';
import { useRouter } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { formatCurrency } from '../../../../utils/helpers';

const ProductItemCard = ({ item, index }) => {
  const width = Dimensions.get('window').width * 0.8;
  const router = useRouter();

  // Animation refs
  const translateY = useRef(new Animated.Value(30)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // Slide up + fade in animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay: typeof index === 'number' ? index * 100 : 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        delay: typeof index === 'number' ? index * 100 : 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        opacity,
      }}
    >
      <Pressable
        style={styles.sectionBody(width)}
        onPress={() =>
          router.push({
            pathname: '/productDetails',
            params: { item: JSON.stringify(item) },
          })
        }
      >
        <Image source={{ uri: item.image_url }} style={styles.image(width)} />
        <View style={styles.productDetailBox}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        <View style={styles.sectionFooter}>
          <View style={styles.priceBox}>
            {/* <Text style={styles.currency} numberOfLines={1}>
              NGN
            </Text> */}
            <Text style={styles.price} numberOfLines={1}>
              {formatCurrency(item.lowest_price)}
            </Text>
          </View>
          <Pressable
            style={styles.sectionBtn}
            onPress={() =>
              router.push({
                pathname: '/productDetails',
                params: { item: JSON.stringify(item) },
              })
            }
          >
            <Ionicons name='eye' size={14} style={styles.sectionBtnIcon} />
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default ProductItemCard;
