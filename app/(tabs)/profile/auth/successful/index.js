import react from "react";
import { useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons, images, SIZES, FONT } from '../../../../../constants';
import { SuccessfulScreen } from '../../../../../components';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';






const Successful = () => {
	const router = useRouter();

  const message = "Password changed successfully";
  const actions = [
    { actionName: "Back to Login", route: "/profile/auth/login" },
    { actionName: "Go to Home", route: "/(tabs)/home/" },
  ];
	return (
		
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen 
			
					options = {{
						// presentation: "modal",
            tabBarStyle: { display: "none" },
						headerShown: false,
						headerStyle: { backgroundColor: COLORS.primary },
						headerShadowVisible: false,
						headerLeft: ({color, size}) => (<Ionicons 
							name="chevron-back-outline" 
							size={SIZES.xLarge} 
							color={color} 
							onPress={router.back} />),
						headerTitle: "",
						headerTitleAlign: "center",
						headerTitleAlign: "center",
						headerTitleStyle: {fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.black},
					}}
			/> 

			<View style={{flex:1, padding: SIZES.medium, paddingTop: 0, backgroundColor: COLORS.primary}}>

      <SuccessfulScreen 
        message={message} 
        actions={actions} 
      />
			</View>


		</SafeAreaView>
	)
}
export default Successful