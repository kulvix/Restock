import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Appearance, useColorScheme, StatusBar } from 'react-native';
import { Stack } from "expo-router";
import { COLORS, icons, images, SIZES, FONT } from '../../../constants';
import { ScreenHeaderBtn, Search, WelcomeBanner, MostPurchased, ProductCategories, PopularBundles } from '../../../components';
// import { Search, WelcomeBanner } from '../../../components';
import { useHeaderHeight } from '@react-navigation/elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";

import { AuthContext } from '../../../components/contexts/AuthContext';

export default function Index () {
  const { user } = useContext(AuthContext);
  const headerHeight = useHeaderHeight();
    return (
      <SafeAreaProvider>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
          <Stack.Screen 
            options = {{
              headerHeight: 150,
              headerShown: true,
              headerStyle: { backgroundColor: COLORS.lightWhite },
              headerShadowVisible: false,
              headerRight: ({color, size}) => (<Ionicons name="notifications-outline" size={SIZES.xLarge} color={color} />),
              headerTitle: "Home",
              headerTitleAlign: "center",
              headerTitleStyle: {fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.black},
            }} 
          /> 

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex:1, paddingTop: 0, paddingBottom: 120}}>
              <Text>Hi {user?.last_name ? user.last_name : ""}</Text>
              <Search />
              <WelcomeBanner />
              <ProductCategories />
              <MostPurchased />
              <PopularBundles />
            </View>
          </ScrollView>
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
        </SafeAreaView> 
      </SafeAreaProvider>
    )
}