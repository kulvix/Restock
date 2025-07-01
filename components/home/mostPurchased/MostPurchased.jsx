import React, { useContext, useState , useEffect} from 'react';
import { View, Text, Platform } from 'react-native';
import styles from './MostPurchased.style';
import { Pressable, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { FONT, SIZES, COLORS } from "../../../constants";
import { ProductContext } from '../../contexts/ProductContext';
import LoadingSkeleton from '../../../components/common/skeleton'
import { Image } from 'expo-image';
import { shuffleArray } from '../../../utils/helpers';
import { formatCurrency } from '../../../utils/helpers';

const MostPurchasedItems = ({ item, router }) => {
  return (
    <Pressable
      style={styles.sectionBody}
      onPress={() =>
        router.push({
          pathname: "/productDetails",
          params: { item: JSON.stringify(item) },
        })
      }
    >
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.productDetailBox}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
      </View>
      <View style={styles.sectionFooter}>
        <View style={styles.priceBox}>
          {/* <Text style={styles.currency} numberOfLines={1}>NGN</Text> */}
          <Text style={styles.price} numberOfLines={1}>{formatCurrency(item.lowest_price)}</Text>
        </View>
        <Pressable style={styles.sectionBtn}>
            <Ionicons name='eye' size={14} style={styles.sectionBtnIcon} />
        </Pressable>
      </View>
    </Pressable>
  );
};

const MostPurchased = () => {
  const { products, loading } = useContext(ProductContext);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();



  // useEffect(() => {
  //   console.log("Checking...")
  //   const ids = products.map((p) => p.product_id);
  //   const hasDuplicates = new Set(ids).size !== ids.length;
  //   if (hasDuplicates) {
  //     console.warn("⚠️ Duplicate product_ids detected:", ids);
  //   }
  // }, [products]);


  const randomizedProducts = shuffleArray(products).slice(0, 10);
  // Slice products array to limit to 10 items if showAll is false
  const displayedProducts = showAll ? randomizedProducts : randomizedProducts.slice(0, 10);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>Most purchased</Text>
        <Pressable style={styles.sectionHeaderBtn} onPress={() => { router.push({ pathname: "/(tabs)/home/products" }) }}>
          <Text style={styles.sectionHeaderBtnText}>See more</Text>
          <Ionicons name="chevron-forward" style={styles.arrowIcon} />
        </Pressable>
      </View>

      <LoadingSkeleton loading={loading}>
        <FlatList
          data={displayedProducts}
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
            />
          }
        />
      </LoadingSkeleton>

      {/* Show the 'View More' button after the 10th item */}
      {/* {products.length > 10 && !showAll && (
        <Pressable style={styles.viewMoreButton} onPress={() => setShowAll(true)}>
          <Text style={styles.viewMoreText}>View More</Text>
        </Pressable>
      )} */}
    </View>
  );
}


export default MostPurchased;
