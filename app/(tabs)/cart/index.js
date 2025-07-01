import react from "react";
import { useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons, images, SIZES, FONT } from '../../../constants';
import { CartTabs, CartScreen, CartFooter, CartEmpty } from '../../../components';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Index () {
  const router = useRouter();
	const [selectedTabScreen, setSelectedTabScreen] = useState('My Cart');
  // console.log(selectedTab);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen 
				options = {{
				headerStyle: { backgroundColor: COLORS.lightWhite },
				headerShadowVisible: false,
				// headerLeft: () => (<ScreenHeaderBtn iconurl={icons.menu} dimension="60%" />),
				headerRight: ({ color }) => {                
          return (
            <Ionicons
              name="notifications"
              size={SIZES.xLarge}
              color={color}
              onPress={() => router.push("/notifications")}
            />
          );
        },
        headerTitle: "Cart",
				headerTitleAlign: "center",
				headerTitleAlign: "center",
				headerTitleStyle: {fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.black},
				}} 
			/> 


			<View style={{flex: 1}}>
        <CartScreen />
			</View>
			
		</SafeAreaView>
	)
}