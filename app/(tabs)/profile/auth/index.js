import React from 'react';
import { View, Text, SafeAreaView, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, FONT } from "../../../../constants";

import LoginScreen from './login';


const Auth = () => {

	const { item } = useLocalSearchParams();
	const itemDetails = JSON.parse(item);

	// console.log(itemDetails);

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

		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={{flex:1,paddingTop: 0, paddingBottom: SIZES.xxLarge * 3 }}>
        <LoginScreen />
			</View>
		</ScrollView>
	</SafeAreaView>

)}
export default Auth