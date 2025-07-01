import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, ImageBackground, Platform } from 'react-native';
import styles from './ProductCategories.style';
import { ScrollView, Pressable, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
// import axios from 'axios';
// import axios from 'axios';
import { getBaseURL } from '../../../utils/apiConfig';
import LoadingSkeleton from '../../../components/common/skeleton';
import { ProductContext } from '../../contexts/ProductContext';
import { LinearGradient } from 'expo-linear-gradient';
import { sortAlphabetically } from '../../../utils/helpers';


const CategoryItems = ({ item }) => {
  const router = useRouter();

  const images = {
    'cat-beverages': require('../../../assets/images/categories/cat-beverages.png'),
    'cat-cereals': require('../../../assets/images/categories/cat-cereals.png'),
    'cat-toiletries': require('../../../assets/images/categories/cat-toiletries.png'),
    'cat-snacks': require('../../../assets/images/categories/cat-snacks.png'),
    'cat-groceries': require('../../../assets/images/categories/cat-groceries.png'),
  };

  return (
    <Pressable style={styles.sectionBody}
      onPress={() =>
        router.push({
          pathname: "/(tabs)/categories/",
          params: { item: item.category_name},
        })
      }
    >
      {/* require(item.image_url) */}
      
      {/* <ImageBackground source={item.image} style={[styles.image]} imageStyle={styles.imageStyle}> */}
      <ImageBackground source={{ uri: item.image_url }}  style={[styles.image]} imageStyle={styles.imageStyle}>
        <LinearGradient
          colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        > 
          <Text style={styles.title} numberOfLines={2}>{item.category_name}</Text>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  )
}

const ProductCategories = () => {

  const router = useRouter();
  // const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const { categories, loading } = useContext(ProductContext);

  const sortedCategories = sortAlphabetically(categories, 'category_name');

  const BASE_URL = getBaseURL();
  const SERVER_URL = BASE_URL+'/server';

  // useEffect(() => {
  //   fetchCategories();
  // }, []);
  
  // const fetchCategories = async () => {
  //   try {
  //     const response = await axios.get(`${SERVER_URL}/categories`);
  //     setCategories(response.data);
  //     setLoadingCategories(false);
  //   } catch (error) {
  //     console.error('Error fetching categories:', error.message);
  //     setLoadingCategories(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>Categories</Text>
        <Pressable style={styles.sectionHeaderBtn} onPress={()=> {router.push({pathname: "/(tabs)/categories/"})}}>
          <Text style={styles.sectionHeaderBtnText}>See more</Text>
          <Ionicons name="chevron-forward" style={styles.arrowIcon} />
        </Pressable>
        
      </View>

      <LoadingSkeleton loading={loading}>
        <FlatList
          data={sortedCategories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          bounces={true}
          keyExtractor={(item) => item.category_name}
          decelerationRate={Platform.OS === 'ios' ? 'slow' : 0.9}
          renderToHardwareTextureAndroid
          snapToInterval={10}
          overScrollMode="never"
          scrollEventThrottle={16}

          renderItem={({ item, index }) => 
            <CategoryItems item={item} />
        }
        />
      </LoadingSkeleton>
    </View>
  )
}

export default ProductCategories