import React, { useState, useRef, useContext } from 'react';
import { View, Text, Animated, Platform, Dimensions } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { BundleContext } from '../../contexts/BundleContext';
import { COLORS, SIZES } from "../../../constants";
import styles from './PopularBundles.style';
import LoadingSkeleton from '../../../components/common/skeleton';
import { Image } from 'expo-image';
import { shuffleArray } from '../../../utils/helpers';

const { width } = Dimensions.get('window');
const SPACING = 4;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.8 : width * 0.8;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const BundleItems = ({ item, scrollX, index, SPACING, ITEM_SIZE, EMPTY_ITEM_SIZE, favourite, setFavourite, router }) => {

    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 2) * ITEM_SIZE,
      index * ITEM_SIZE,
    ];
  
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [1, 40, 1],
      extrapolate: 'clamp',
    });
  
    if (!item?.image_url) {
      return <View style={{ width: EMPTY_ITEM_SIZE }} />;
    }
  
    return (
      <View style={[ { width: ITEM_SIZE }]}>
        <Animated.View style={{
          marginHorizontal: SPACING * 2,
          padding: SPACING,
          transform: [{ translateY }],
          // backgroundColor: 'white',
          height: ITEM_SIZE * 0.4,
          borderRadius: SIZES.large,
          marginBottom: SIZES.xxLarge * 5,
        }}>
          <Pressable
            style={styles.sectionBody}
            onPress={() => router.push({
              pathname: "/bundleDetails",
              params: { item: encodeURIComponent(JSON.stringify(item)) },
            })}
          >
            <Image 
              source={{ uri: item.image_url }} 
              style={styles.image} 
            />
  
            <View style={styles.productDetailBox}>
              <Text style={styles.productName} numberOfLines={2}>{item.bundle_name}</Text>
              <Text style={styles.subtitle} numberOfLines={2}>{item.description}</Text>
            </View>
  
            <View style={styles.sectionFooter}>
              <Pressable onPress={() => setFavourite(item.id)}>
                <Ionicons 
                  name="heart-outline" 
                  size={SIZES.xxLarge} 
                  style={styles.heartIcon(favourite, item)}
                />
              </Pressable>
  
              <Pressable style={styles.sectionBtn}>
                <Ionicons name="eye" size={SIZES.xLarge / 2} style={styles.eyeIcon} />
                <Text style={styles.sectionBtnText}>View</Text>
              </Pressable>
            </View>
          </Pressable>
        </Animated.View>
      </View>
    // <Pressable 
    //   style={styles.sectionBody}
    //   onPress={() => router.push({
    //     pathname: "/bundleDetails",
    //     params: { item: encodeURIComponent(JSON.stringify(item)) }
    //   })}
    // >
    //   <Image 
    //     source={{ uri: item.image_url }} 
    //     style={styles.image} 
    //   />

    //   <View style={styles.productDetailBox}>
    //     <Text style={styles.productName} numberOfLines={1}>{item.bundle_name}</Text>
    //     <Text style={styles.subtitle} numberOfLines={1}>{item.description}</Text>
    //   </View>

    //   <View style={styles.sectionFooter}>
    //     <Pressable onPress={() => setFavourite(item.id)}>
    //       <Ionicons 
    //         name="heart-outline" 
    //         size={SIZES.xxLarge} 
    //         style={styles.heartIcon(favourite, item)}
    //       />
    //     </Pressable>

    //     <Pressable style={styles.sectionBtn}>
    //       <Ionicons name="eye" size={SIZES.xLarge / 2} style={styles.eyeIcon} />
    //       <Text style={styles.sectionBtnText}>View</Text>
    //     </Pressable>
    //   </View>
    // </Pressable>
  );
};

const PopularBundles = () => {
  const { bundles, loading } = useContext(BundleContext);
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [favourite, setFavourite] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>Popular Bundles</Text>
        <Pressable style={styles.sectionHeaderBtn} onPress={() => router.push({ pathname: "/(tabs)/bundles/" })}>
          <Text style={styles.sectionHeaderBtnText}>See more</Text>
          <Ionicons name="chevron-forward" style={styles.arrowIcon} />
        </Pressable>
      </View>

      <LoadingSkeleton loading={loading}>
        <Animated.FlatList
          data={shuffleArray(bundles)}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={Platform.OS === 'ios' ? 'fast' : 0.9}
          snapToInterval={ITEM_SIZE}
          scrollEventThrottle={16}
          overScrollMode="never"
          contentContainerStyle={{
            paddingRight: EMPTY_ITEM_SIZE,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          keyExtractor={(item) => item.bundle_id}
          renderItem={({ item, index }) => (
            <BundleItems
              item={item}
              favourite={favourite}
              setFavourite={setFavourite}
              router={router}
              index={index}
              scrollX={scrollX}
              SPACING={SPACING}
              ITEM_SIZE={ITEM_SIZE}
              EMPTY_ITEM_SIZE={EMPTY_ITEM_SIZE}
            />
          )}
        />
      </LoadingSkeleton>
    </View>
  );
};

export default PopularBundles;
