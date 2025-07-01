import React, { useState, useEffect, useCallback, useContext } from "react";
import { RefreshControl, Text, View, ScrollView, SafeAreaView, Appearance, useColorScheme } from 'react-native';
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES, FONT } from '../../../constants';
import { WelcomeBanner, MostPurchased, ProductCategories, PopularBundles, SearchBar } from '../../../components';
// import  MostPurchased from '../../../components';
// import { Search, WelcomeBanner } from '../../../components';
import { useHeaderHeight } from '@react-navigation/elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

import { AuthContext } from '../../../components/contexts/AuthContext';
import { ProductContext } from "../../../components/contexts/ProductContext";
import { BundleContext } from '../../../components/contexts/BundleContext';


export default function Index () {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const headerHeight = useHeaderHeight();

  const [refreshing, setRefreshing] = useState(false);

  const {
    refreshProducts,
    fetchCategories,
    getProductsByCategory,
    getProductsItemsByDiscount
  } = useContext(ProductContext);
  const { refreshBundles, refreshBundleItems } = useContext(BundleContext);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refreshProducts(),
        fetchCategories(true),
        refreshBundles(),
        refreshBundleItems(),
      ]);
    } catch (err) {
      console.warn("Refresh failed:", err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen 
          options = {{
            headerHeight: 150,
            headerShown: true,
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
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
            headerTitle: "Home",
            headerTitleAlign: "center",
            headerTitleStyle: {fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.black},
          }} 
        />

        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary, '#9Bd35A']}  
              tintColor={COLORS.primary}
              title="Refreshing..."
            />
          }
        >
          <View style={{flex:1, paddingTop: 0, justifyContent: 'flex-start', paddingBottom: SIZES.xLarge * 2}}>
            <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SIZES.xSmall }}>
              <View>
                {user && (
                  <View >
                    <Text style={{
                      fontSize: SIZES.large,
                      fontFamily:FONT.heavy,
                      letterSpacing: -2,
                    }}>
                      Hi {user.first_name || user.last_name || ""}...
                    </Text>
                  </View>
                )}
                <Text style={{
                  fontSize: SIZES.medium,
                  fontFamily:FONT.bold,
                  letterSpacing: -1,
                }}>
                  Welcome back,
                </Text>
                <Text style={{
                  fontSize: SIZES.medium,
                  fontFamily: FONT.light,
                  letterSpacing: -1,
                }}>
                  What do you want pick from the store?
                </Text>
              </View>

              <LottieView 
                source={require('../../../assets/animations/riding-cart.json')}
                autoPlay
                loop
                style={{ width: 100, height: 100, alignSelf: 'center' }}
              />
            </View>
            <SearchBar />
            <WelcomeBanner />
            <ProductCategories />
            <MostPurchased />
            <PopularBundles />
          </View>
        </ScrollView>
      </SafeAreaView> 
    </SafeAreaProvider>
  )
}