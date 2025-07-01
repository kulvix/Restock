import react from "react";
import { useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { COLORS, icons, images, SIZES, FONT } from '../../../constants';
import { CategoriesScreen } from '../../../components';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ProductItemCard } from '../../../components';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Index () {
  const router = useRouter();
  
	const { item } = useLocalSearchParams();
  

	// console.log(item); return;
	// if (item) {
	// 	const category = JSON.parse(item);
	// }

    return (
        <SafeAreaProvider>
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
                          onPress={() => router.push("/notifications")} // Navigate on press
                        />
                      );
                    },
                    headerTitle: "Categories",
                    headerTitleAlign: "center",
                    headerTitleStyle: {fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.black},
                    }} 
                /> 
                  <View style={{flex:1, paddingTop: 0}}>
                    <CategoriesScreen targetCategoryTab={item || null} />
                  </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}