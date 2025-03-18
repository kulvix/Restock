import React, {useEffect, useState } from 'react';
// import { View, Text,  } from "react-native";
import { View, Text, SafeAreaView, ScrollView, Button, Alert, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, FONT } from "../../constants";
import { ProductDetailScreen, FooterSection, NotificationScreen } from '../../components';
import { FlatList } from 'react-native-gesture-handler';
// import styles from '../../../../components/categories/categoriesScreen.style';


const Notifications = () => {

	const { item } = useLocalSearchParams();
	// const itemDetails = JSON.parse(item);

  // const { notifications } = useNotifications();

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
				headerTitle: "Notifications",
				headerTitleAlign: "center",
				headerTitleStyle: {fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.black},
			}}
		/> 

    <View style={{flex:1,paddingTop: SIZES.xLarge * 2, paddingBottom: SIZES.xxLarge * 3 }}>
      <NotificationScreen />
    </View>
	</SafeAreaView>

)}
export default Notifications