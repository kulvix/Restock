import 'react-native-gesture-handler'; // Ensure this import is at the top
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import React, { useEffect, useState, useCallback } from "react";
import { View, Text, SafeAreaView, useColorScheme } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import LottieView from 'lottie-react-native';

import { COLORS, SIZES, FONT } from "../constants";
import { StoreData, GetItemFor } from "../utils/storageHelper";

const HAS_LAUNCHED = "HAS_LAUNCHED";

// Prevent splash screen from auto-hiding
// SplashScreen.preventAutoHideAsync();

const Home = () => {
  const [hasLaunched, setHasLaunched] = useState(null);
  const router = useRouter();
  const colorScheme = useColorScheme();

  const themeContainerStyle =
    colorScheme === "light" ? COLORS.lightWhite : COLORS.gray;

  // Load Fonts
  const [fontsLoaded, fontError] = useFonts({
    "Nexa-extralight": require("../assets/fonts/Nexa-extralight.ttf"),
    "Nexa-light": require("../assets/fonts/Nexa-light.otf"),
    "Nexa-regular": require("../assets/fonts/Nexa-regular.otf"),
    "Nexa-bold": require("../assets/fonts/Nexa-bold.otf"),
    "Nexa-heavy": require("../assets/fonts/Nexa-heavy.ttf"),
  });

  // Hide Splash Screen when fonts are ready
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Check onboarding state
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const hasLaunchedValue = await GetItemFor(HAS_LAUNCHED);
        if (hasLaunchedValue) {
          setHasLaunched(true);
        } else {
          await StoreData(HAS_LAUNCHED, true);
          setHasLaunched(false);
        }
      } catch (error) {
        console.log("Error checking onboarding state:", error);
      }
    };

    checkOnboarding();
  }, []);

  // Redirect after determining onboarding state
  useEffect(() => {
    if (hasLaunched === true) {
      router.replace("/(tabs)/home");
    } else if (hasLaunched === false) {
      router.replace("/(onboarding)");
    }
  }, [hasLaunched]);

  // Prevent rendering before fonts and onboarding check are ready
  // if (!fontsLoaded || hasLaunched === null) {
  //   return null;
  // }

  // console.log('App started');
  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider onLayout={onLayoutRootView} style={[themeContainerStyle]}>
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            
            <LottieView
              source={require('../assets/loaders/loader.json')}
              autoPlay
              loop
              style={{width: SIZES.xLarge * 2,  height: SIZES.xLarge * 2}}
              speed={4}
            />
            {/* <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.gray }}>
              Loading your app...
            </Text> */}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
  );
};


export default Home;
