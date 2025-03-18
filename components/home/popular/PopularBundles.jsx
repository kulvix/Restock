import React, { useState, useContext } from 'react';
import { View, Text, Image, Platform, Dimensions } from 'react-native';
import styles from './PopularBundles.style';
import { ScrollView, Pressable, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { FONT, SIZES, COLORS } from "../../../constants";
import { BundleContext } from '../../contexts/BundleContext';



// const Slides = [
//   {
//     id: '1',
//     name: 'Students pack',
//     subtitle: 'For students',
//     price: "3,900",
//     image: require('../../../assets/images/bundle-students.png'),
//   },
//   {
//     id: '2',
//     name: 'Family pack',
//     subtitle: 'For a family of 4',
//     price: "3,900",
//     image: require('../../../assets/images/bundle-large-family.png'),
//   },
//   {
//     id: '3',
//     name: 'Bachelor Pack',
//     subtitle: 'carton',
//     price: "3,900",
//     image: require('../../../assets/images/bundle-odogwu.png'),
//   },
//   {
//     id: '4',
//     name: 'Big Family',
//     subtitle: 'Family of 5',
//     price: "3,900",
//     image: require('../../../assets/images/bundle-family-of-4.png'),
//   },
//   {
//     id: '5',
//     name: 'Spinster  pack',
//     subtitle: 'For Spinsters',
//     price: "1,200",
//     image: require('../../../assets/images/bundle-spinster.png'),
//   },
//   {
//     id: '6',
//     name: 'Nursing mom pack',
//     subtitle: 'carton',
//     price: "3,900",
//     image: require('../../../assets/images/bundle-nursing-mom.png'),
//   }
// ]


const favArray = [];
const BundleItems = ({ item, favourite, setFavourite, router }) => {
  // console.log(item.image_url);

  return (
    <Pressable style={styles.sectionBody}
      onPress={() => router.push({
        pathname: "/bundleDetails",
        params: { item: encodeURIComponent(JSON.stringify(item)) } // Encode JSON
      })}
    >
      {/* <Image 
        source={{ uri: 'https://raw.githubusercontent.com/kulvix/Restock/assets/images/bachelor.jpg' }} 
        style={styles.image} 
      /> */}
      <Image 
        source={{ uri: item.image_url }} 
        style={styles.image} 
      />

      <View style={styles.productDetailBox}>
        <Text style={styles.productName} numberOfLines={1}>{item.bundle_name}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{item.description}</Text>
      </View>
      <View style={styles.sectionFooter}>
          <Pressable onPress={() => {setFavourite(item.id)}}>
            <Text style={styles.price} numberOfLines={1}>
              <Ionicons name='heart-outline' size={SIZES.xxLarge} style={styles.heartIcon(favourite, item)} />
            </Text>
          </Pressable>
          <Pressable style={styles.sectionBtn}>
            <Ionicons name='eye' size={SIZES.xLarge / 2} style={styles.eyeIcon} />
            <Text style={styles.sectionBtnText}> View</Text> 
          </Pressable>
      </View>
    </Pressable>
  )
}


const PopularBundles = () => {
  const { bundles, loading } = useContext(BundleContext);

  // console.log(bundles);
  
  
  const router = useRouter();
  
  const [favColor, setFavColor ] = useState(bundles.map(data => COLORS.gray));
  const [favourite, setFavourite ] = useState();

  const { width } = Dimensions.get('window');
  const ITEM_WIDTH = width * 0.8;

  return (
    <View style={styles.container}>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>Popular Bundles</Text>
        <Pressable style={styles.sectionHeaderBtn} onPress={()=> {router.push({pathname: "/(tabs)/bundles/"})}}>
          <Text style={styles.sectionHeaderBtnText}>See more</Text>
          <Ionicons name="chevron-forward" style={styles.arrowIcon} />
        </Pressable>
      </View>

      

        <FlatList
          data={bundles}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          bounces={true}
          keyExtractor={(item) => item.bundle_id}
          decelerationRate={Platform.OS === 'ios' ? 'fast' : 0.9}
          renderToHardwareTextureAndroid
          // snapToInterval={SIZES.xxLarge * 8}
          snapToInterval={ITEM_WIDTH}
          overScrollMode="never"
          scrollEventThrottle={16}

          renderItem={({ item, index }) => 
            <BundleItems
              router={router}
              item={item}
              favColor={favColor}
              setFavColor={setFavColor}
              favourite={favourite}
              setFavourite={setFavourite}
          />}
        />
    </View>
  )
}

export default PopularBundles