import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { View, Text, Pressable, FlatList, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

import { SIZES, COLORS, FONT } from "../../constants";
import { BundleContext } from '../contexts/BundleContext';
import styles from './bundles.style';
import { Image } from 'expo-image';
import { shuffleArray } from '../../utils/helpers';
import SearchBar from '../search/searchBar/SearchBar';


const BATCH_SIZE = 5;

const BundleItems = ({ item, favColor, setFavColor }) => {
  const router = useRouter();
  
  return (
    <Pressable
      style={styles.sectionBody}
      onPress={() => {
        router.push({
          pathname: "/bundleDetails",
          params: { item: encodeURIComponent(JSON.stringify(item)) }
        });
      }}
    >
      <Image source={{ uri: item.image_url }} style={styles.image} contentFit="cover" transition={500} />

      <View style={styles.sectionFooter}>
        <View style={styles.productDetailBox}>
          <Text style={styles.productName}>{item.bundle_name}</Text>
          <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
        </View>

        <View style={styles.sectionBtnBox}>
          <Pressable
            style={styles.sectionBtn}
            onPress={() => {
              router.push({
                pathname: "/bundleDetails",
                params: { item: encodeURIComponent(JSON.stringify(item)) }
              });
            }}
          >
            <Ionicons name='eye' size={14} color={COLORS.white} />
            <Text style={styles.sectionBtnText}>View bundle</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const Bundles = () => {
  const { bundles, refreshBundles, loading } = useContext(BundleContext);
  const [favColor, setFavColor] = useState(COLORS.gray);

  const [visibleBundles, setVisibleBundles] = useState([]);
  const currentIndex = useRef(0);
  const loadingMore = useRef(false);

  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshBundles();
    } catch (err) {
      console.warn("Refresh failed:", err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (bundles && bundles.length) {
      const firstBatch = bundles.slice(0, BATCH_SIZE); // Load enough to scroll
      setVisibleBundles(firstBatch);
      currentIndex.current = firstBatch.length;
    }
  }, [bundles]);

  const loadMore = () => {
    if (loadingMore.current) return;

    const nextItems = bundles.slice(currentIndex.current, currentIndex.current + BATCH_SIZE);

    if (nextItems.length > 0) {
      loadingMore.current = true;

      // Simulate a slight delay (optional, for UX)
      setTimeout(() => {
        setVisibleBundles(prev => [...prev, ...nextItems]);
        currentIndex.current += nextItems.length;
        loadingMore.current = false;
      }, 100);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar />
      <View style={styles.innerContainer}>
        <FlatList
          data={shuffleArray(visibleBundles)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.bundle_id.toString()}
          contentContainerStyle={styles.productContainer}
          renderItem={({ item }) => (
            <BundleItems
              item={item}
              favColor={favColor}
              setFavColor={setFavColor}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}

          refreshing={refreshing}
          onRefresh={onRefresh}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary, '#9Bd35A']}
              tintColor={COLORS.primary}
              title="Refreshing..."
              titleColor={COLORS.primary}
              progressBackgroundColor="#fff"
            />
          }
          // ListFooterComponent={() =>
          //   loadingMore.current ? <Text style={{ textAlign: 'center', marginVertical: 10, fontFamily: FONT.bold }}>Loading more...</Text> : null
          // }
        />
      </View>
    </View>
  );
};

export default Bundles;
