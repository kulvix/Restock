import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import styles from './MostPurchased.style';
import { ScrollView, Pressable, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, useNavigation } from 'expo-router';
import { FONT, SIZES, COLORS } from "../../../constants";
import { ProductContext } from '../../contexts/ProductContext';
import axios from 'axios';



const MostPurchasedItems = ({ item, router }) => {
  return (
    <Pressable
      style={styles.sectionBody}
      onPress={() =>
        router.push({
          pathname: "/productDetails",
          params: { item: JSON.stringify(item)},
        })
      }
    >
      <Image source={require('../../../assets/images/sprite.png')} style={styles.image} />
      <View style={styles.productDetailBox}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
      </View>
      <View style={styles.sectionFooter}>
        <View style={styles.priceBox}>
          <Text style={styles.currency} numberOfLines={1}>NGN</Text>
          <Text style={styles.price} numberOfLines={1}>{item.lowest_price}</Text>
        </View>
        <Pressable style={styles.sectionBtn}>
            <Ionicons name='eye' size={14} style={styles.sectionBtnIcon} />
            {/* <Text style={styles.sectionBtnText}>View</Text>  */}
        </Pressable>
      </View>
    </Pressable>
  );
};




const MostPurchased = () => {
    const { products, loading } = useContext(ProductContext);

    if (loading) {
      // Loader
    }

  const router = useRouter();
  // const navigation = useNavigation();
  return (
    <View style={styles.container}>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>Most purchased</Text>
        {/* <Pressable style={styles.sectionHeaderBtn} onPress={()=> { router.push({pathname: "/(tabs)/categories/"})}}>
          <Text style={styles.sectionHeaderBtnText}>See more <Ionicons name="chevron-forward" /></Text>
        </Pressable> */}
        <Pressable style={styles.sectionHeaderBtn} onPress={()=> {router.push({pathname: "/(tabs)/home/products"})}}>
          <Text style={styles.sectionHeaderBtnText}>See more</Text>
          <Ionicons name="chevron-forward" style={styles.arrowIcon} />
        </Pressable>
      </View>

        <FlatList
          data={products}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          bounces={true}
          keyExtractor={(item) => item.product_id}
          decelerationRate={Platform.OS === 'ios' ? 'fast' : 0.9}
          renderToHardwareTextureAndroid
          snapToInterval={SIZES.xxLarge * 4.5}
          overScrollMode="never"
          scrollEventThrottle={16}
          
          renderItem={({ item, index }) => 
            <MostPurchasedItems
            router={router}
              item={item} 
          />}
        />
    </View>
  )
}

export default MostPurchased