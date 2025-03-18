import react from "react";
import { useState } from "react";
import { StatusBar, StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons, images, SIZES, FONT } from '../../../constants';
import { Bundles } from '../../../components';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Index () {
    const router = useRouter();
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
                headerTitle: "Bundles",
                headerTitleAlign: "center",
                headerTitleAlign: "center",
                headerTitleStyle: {fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.black},
                }} 
            /> 

                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{flex:1, padding: SIZES.medium, paddingTop: 0, paddingBottom: 120}}>
                    <Bundles />
                  </View>
                </ScrollView>
                
        </SafeAreaView>
    )
}