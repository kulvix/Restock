import React from 'react';
import { View, Text, SafeAreaView, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, FONT } from "../../constants";
import { BundleDetailScreen, FooterSection } from '../../components';
import { FlatList } from 'react-native-gesture-handler';
import styles from '../../components/categories/categoriesScreen.style';
import DeliveryMapScreen from '../../components/deliveryMap/DeliveryMapScreen';




const DeliveryMap = () => {
  // const { item } = useLocalSearchParams();

  // let itemDetails = null;

  // try {
  //   itemDetails = JSON.parse(decodeURIComponent(item));
  // } catch (error) {
  //   console.error("Invalid JSON:", error);
  // }
  

return (
  <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
    <Stack.Screen 
      options = {{
        headerHeight: 150,
        headerShown: true,
        headerTransparent: true,
        headerLeft: ({color, size}) => (<Ionicons 
          name="chevron-back-outline" 
          size={SIZES.xLarge} 
          color={color} 
          onPress={router.back} />),
        headerTitle: "",
        headerTitleAlign: "center",
        headerTitleStyle: {fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.black},
      }} 
    /> 

    <View style={{flex:1,paddingTop: 0, paddingBottom: SIZES.xxLarge * 3 }}>
      {/* <BundleDetailScreen itemDetails={itemDetails} /> */}
      <DeliveryMapScreen />
    </View>
  </SafeAreaView>

)}
export default DeliveryMap