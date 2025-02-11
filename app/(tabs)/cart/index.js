import react from "react";
import { useState } from "react";
import { StatusBar, StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons, images, SIZES, FONT } from '../../../constants';
import { CartTabs, CartScreen, CartFooter, CartEmpty } from '../../../components';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";

export default function Index () {
	const [selectedTabScreen, setSelectedTabScreen] = useState('My Cart');
  // console.log(selectedTab);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
			<Stack.Screen 
				options = {{
				headerStyle: { backgroundColor: COLORS.lightWhite },
				headerShadowVisible: false,
				// headerLeft: () => (<ScreenHeaderBtn iconurl={icons.menu} dimension="60%" />),
				headerRight: ({color, size}) => (<Ionicons name="notifications-outline" size={SIZES.xLarge} color={color} />),
				headerTitle: "Cart",
				headerTitleAlign: "center",
				headerTitleAlign: "center",
				headerTitleStyle: {fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.black},
				}} 
			/> 


			<View style={{flex: 1}}>
        <CartScreen />
				
        <LinearGradient
					colors={['transparent', COLORS.white, COLORS.white]}
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						height: '15%',
					}}
				/>
			</View>
			
		</SafeAreaView>
	)
}