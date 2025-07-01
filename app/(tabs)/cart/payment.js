import react from "react";
import { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons, images, SIZES, FONT } from '../../../constants';
import { PaymentScreen } from '../../../components';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';


const Payment = () => {
	const router = useRouter();
	return (
		
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen 
					options = {{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerLeft: ({color, size}) => (<Ionicons 
						name="chevron-back-outline" 
						size={SIZES.xLarge} 
						color={color} 
						onPress={router.back} />),
					headerTitle: "Authorize Transaction",
					headerTitleAlign: "center",
					headerTitleAlign: "center",
					headerTitleStyle: {fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.black},
					}} 
			/> 

			<View style={{flex:1, padding: SIZES.medium, paddingTop: 0}}>
        <PaymentScreen />
			</View>
		</SafeAreaView>
	)
}
export default Payment