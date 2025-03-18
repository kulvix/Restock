import {React, useState, useContext} from 'react'
import { View, Text, Pressable, FlatList, Image, Dimensions, ScrollView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

import { SIZES, COLORS, FONT, SHADOWS, } from "../../constants";
import { BundleContext } from '../contexts/BundleContext';
import styles from './bundles.style'
import { useRouter } from 'expo-router';



const Slides = [
  {
    id: '1',
    name: 'Newly married Couple Bundle', 
    qty: '1',
    unit: 'painter',
    price: "N45,000",
    image: require('../../assets/images/bundle-new-couple.png'),
  },
  {
    id: '2',
    name: 'Students Bundle',
    qty: '1',
    unit: 'tuber',
    price: "N25,500",
    image: require('../../assets/images/bundle-students.png'),
  },
  {
    id: '3',
    name: 'Bachalor Bundle',
    qty: '1',
    unit: 'bottle',
    price: "N30,500",
    image: require('../../assets/images/bundle-odogwu.png'),
  },
  {
    id: '4',
    name: 'Family of 4 Bundle',
    qty: '1',
    unit: 'pack',
    price: "N70,500",
    image: require('../../assets/images/bundle-family-of-4.png'),
  },
  {
    id: '5',
    name: 'Spinster',
    qty: '1',
    unit: 'tuber',
    price: "N50,000",
    image: require('../../assets/images/bundle-spinster.png'),
  },
  {
    id: '6',
    name: 'Single Mom Bundle',
    qty: '1',
    unit: 'bottle',
    price: "N33,900",
    image: require('../../assets/images/bundle-single-mom.png'),
  }
]


const width = (Dimensions.get('window').width - 4 * 10) / 2;

const BundleItems = ({ item, favColor, setFavColor }) => {
  const router = useRouter();

  return (
    <Pressable  style={styles.sectionBody}
      onPress={()=> {router.push({
        pathname: "/bundleDetails",
        params: { item: encodeURIComponent(JSON.stringify(item)) }
      })}}
    >
      <Image source={{ uri: item.image_url }}  style={[styles.image]}/>


      <View style={styles.sectionFooter}>
        <View style={styles.productDetailBox}>
          <Text style={styles.productName}>{item.bundle_name}</Text>
          <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
        </View>

        <View style={styles.sectionBtnBox}>
            {/* <Pressable style={styles.heartIcon} onPress={()=>{favColor == COLORS.gray ? setFavColor("red") : setFavColor(COLORS.gray) }}>
              <Ionicons name='heart-outline' size={30} color={favColor} />
            </Pressable> */}
            <Pressable
              style={styles.sectionBtn}
              onPress={()=> {router.push({
                pathname: "/bundleDetails",
                params: { item: encodeURIComponent(JSON.stringify(item)) }
              })}}
            >
              <Ionicons name='eye' size={14} color={COLORS.white} />
              <Text style={styles.sectionBtnText}>View bundle</Text> 
            </Pressable>
        </View>
      </View>
    </Pressable >
  )
}


const Bundles = () => {
  const { bundles, loading } = useContext(BundleContext);
  const [favColor, setFavColor ] = useState(COLORS.gray);

  return (
    // <View style={styles.container}>
        <View style={styles.productContainer}>        
          {bundles.map((item) => {            
            return <BundleItems key={item.bundle_id} item={item} favColor={favColor} setFavColor={setFavColor} />
          })}
        </View>
        
      // </View> 
    )
}



{/* <FlatList
          data={Slides}
          showsVerticalScrollIndicator={false}
          bounces={true}
          keyExtractor={(item) => item.id}
          decelerationRate={Platform.OS === 'ios' ? 0 : 0}
          renderToHardwareTextureAndroid
          scrollEventThrottle={32}

          renderItem={({ item, index }) => 
            <BundleItems
              item={item}
              favColor={favColor}
              setFavColor={setFavColor}
          />}
        /> */}




export default Bundles;