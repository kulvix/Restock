import React, { useEffect, useState, useContext } from 'react'
import { View, Text, FlatList, Pressable, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SIZES } from '../../../constants';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styles from './ProductsScreen.style'
import axios from 'axios';
import { getBaseURL } from '../../../utils/apiConfig';
import { ProductContext } from '../../../components/contexts/ProductContext';
import { useCart } from '../../../components/contexts/CartContext';
import ProductListItem from '../../home/productDetails/ProductListItem/ProductListItem';
import { Image } from 'expo-image';


const MostPurchasedItems = ({ item, router, width }) => {
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
      <Image source={{ uri : item.image_url }} style={styles.image(width)} />
      <View style={styles.productDetailBox}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
      </View>
      <View style={styles.sectionFooter}>
        <View style={styles.priceBox}>
          <Text style={styles.currency} numberOfLines={1}>NGN</Text>
          <Text style={styles.price} numberOfLines={1}>{item.lowest_price}</Text>
        </View>
        <Pressable style={styles.sectionBtn}
          onPress={() =>
            router.push({
              pathname: "/productDetails",
              params: { item: JSON.stringify(item)},
            })
          }
        >
            <Ionicons name='eye' size={14} style={styles.sectionBtnIcon} />
            {/* <Text style={styles.sectionBtnText}>View</Text>  */}
        </Pressable>
      </View>
    </Pressable>
  );
};

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow = numberOfElementsLastRow + 1;
  }
  return data;
}





const ProductsScreen = () => {
  const { products, loading } = useContext(ProductContext);
  const width = Dimensions.get('window').width * 0.8;

  if (loading) {
    // Loader
  }
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* <View style={styles.tabsContainer}>

      </View> */}
      <View style={styles.productsContainer}>
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => (
            // <CategoryItems key={item.product_id} item={item} width={width} />
            <MostPurchasedItems key={item.product_id} item={item} router={router} width={width} />
          )}
          contentContainerStyle={{ paddingBottom: 180 }}
        />
      </View>
    </View>
  );
};




export default ProductsScreen;

