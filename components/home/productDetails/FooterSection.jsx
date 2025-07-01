import React, { useState, useRef } from 'react';
import { View, Text, Image, Dimensions, useWindowDimensions, TextInput } from 'react-native';
import styles from './FooterSection.style';
import { ScrollView, Pressable, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../../constants';

// const fullWidth = useWindowDimensions('width');

const FooterSection = () => {
  const { width } = useWindowDimensions();
  
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  // const qty = useRef(1);
  const [qty, setQty] = useState(1);

  console.log(qty);
  return (

      <View style={styles.container}>
          <View style={styles.inputSection}>
            <Pressable style={styles.inputBtn} onPress={()=> {qty == 1 ? setQty(1) : setQty(qty - 1)}}>
              <Text style={styles.inputBtnText}><Ionicons name='remove-outline' style={styles.inputIcon} /></Text>
            </Pressable>
            <View style={styles.inputFieldBox}>
            <TextInput
              style={styles.inputField}
              value={`${qty}`}
              keyboardType="numeric"
            />
            </View>
            <Pressable style={styles.inputBtn} onPress={()=> setQty(qty + 1)    }>
              <Text style={styles.inputBtnText}><Ionicons name='add-outline' style={styles.inputIcon} /></Text>
            </Pressable>
          </View>
          <Pressable onPress={() => alert('Added to Favourite')}>
            <Ionicons name='heart' style={styles.heartIcon} />
          </Pressable>
          
          <Pressable style={styles.addToCartBtn} onPress={() => alert('Added to cart')}>
            <Text style={styles.addToCartBtnText}> <Ionicons name="cart" style={styles.cartIcon}  /> Add to Cart</Text>
          </Pressable>
      </View>

  )
}

export default FooterSection