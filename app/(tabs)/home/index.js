import React, { useState, useEffect, useCallback, useContext } from "react";
import { RefreshControl, Text, View, ScrollView, SafeAreaView, Appearance, useColorScheme, StatusBar } from 'react-native';
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES, FONT } from '../../../constants';
import { ScreenHeaderBtn, SearchBar, WelcomeBanner, MostPurchased, ProductCategories, PopularBundles } from '../../../components';
// import { Search, WelcomeBanner } from '../../../components';
import { useHeaderHeight } from '@react-navigation/elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import LottieView from 'lottie-react-native';

import { AuthContext } from '../../../components/contexts/AuthContext';

export default function Index () {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const headerHeight = useHeaderHeight();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
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
                colors={['#9Bd35A', '#689F38']}
                tintColor="#689F38"
                title="Refreshing..."
              />
            }
          >
            <View style={{flex:1, paddingTop: 0, paddingBottom: SIZES.xLarge * 2}}>
              {user && (
                <View style={{ paddingHorizontal: SIZES.xSmall }}>
                  <Text style={{
                    fontSize: SIZES.xxLarge,
                    fontFamily:FONT.heavy,
                    letterSpacing: -2,
                  }}>
                    Hi {user.first_name || user.last_name || ""}...
                  </Text>
                </View>
              )}
              <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SIZES.xSmall }}>
                <View>
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
                    what do you want pick from the store?
                  </Text>
                </View>

                <LottieView 
                  source={require('../../../assets/animations/riding-cart.json')}
                  autoPlay
                  loop
                  style={{ width: 120, height: 120, alignSelf: 'center' }}
                />
              </View>
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