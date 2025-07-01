import React from 'react';
import { View, Text } from 'react-native';
import styles from './CartEmpty.style';
import { ScrollView, Pressable, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../../constants';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

const CartEmpty = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require("../../../assets/images/emptyCart.png")} style={styles.emptyImage} />
        <Text style={styles.title}>Your Cart is empty</Text>
        <Text style={styles.desc}>Looks like you have not added anything to your cart yet. Go ahead and explore top categories</Text>
        <Pressable style={styles.btn} onPress={() => router.replace("(tabs)/categories")}>
          <Text style={styles.btnText}>Explore Top Categories</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default CartEmpty