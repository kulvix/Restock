import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './TransSuccessfulScreen.styles';
import { ScrollView, Pressable, FlatList, TextInput } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SIZES } from '../../../constants';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Image } from 'expo-image';




const TransSuccessful = () => {

const router = useRouter();
return (
	<View style={styles.container}>
		<View style={styles.body}>
      <View style={styles.titleBox}>
        <Image source={require('../../../assets/icons/tick-circle.png')} style={styles.tickImage} />
        <Text style={styles.title}>Transaction Successful</Text>
      </View>

      <LottieView 
        source={require('../../../assets/animations/order-on-the-way.json')}
        autoPlay
        loop
        style={[styles.emptyImage, { 
          width: 700,
          height: 200,
          alignSelf: 'center', 
          marginLeft: -200,
          // paddingHorizontal: 50,
        }]}
      />

			<Text style={styles.subTitle}>Your order is on the way...</Text>

      <View style={styles.btnBox}>
        <Pressable style={styles.btn} onPress={()=>{router.replace({
          pathname: '/(tabs)/cart/',
          params: { targetTab: 2},
          })}}>
          <Ionicons name='analytics-outline' size={SIZES.large} color={COLORS.primary} />
          <Text style={styles.btnText}>Track order</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={()=>{router.replace({pathname: '/(tabs)/home'})}}>
          <Ionicons name='bag-check-outline' size={SIZES.large} color={COLORS.primary} />
          <Text style={styles.btnText}>Continue shopping</Text>
        </Pressable>
        {/* <Pressable style={styles.btn} onPress={()=>{alert("Shared")}}>
          <Ionicons name='share' size={SIZES.large} color={COLORS.primary} />
          <Text style={styles.btnText}>Share order receipt</Text>
        </Pressable> */}
      </View>
		</View>
	</View>
)}
export default TransSuccessful