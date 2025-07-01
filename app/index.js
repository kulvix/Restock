import React, { useEffect, useState } from "react";
import { StatusBar, View, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';

import { COLORS, SIZES } from "../constants";
import { StoreData, GetItemFor } from "../utils/storageHelper";

const HAS_LAUNCHED = "HAS_LAUNCHED";

// Prevent splash screen from auto-hiding
// SplashScreen.preventAutoHideAsync();

const Home = () => {
  const [hasLaunched, setHasLaunched] = useState(null);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themeContainerStyle = colorScheme === "light" ? COLORS.lightWhite : COLORS.gray;

  // Load Fonts
  const [fontsLoaded, fontError] = useFonts({
    "Nexa-extralight": require("../assets/fonts/Nexa-extralight.ttf"),
    "Nexa-light": require("../assets/fonts/Nexa-light.ttf"),
    "Nexa-regular": require("../assets/fonts/Nexa-regular.ttf"),
    "Nexa-bold": require("../assets/fonts/Nexa-bold.ttf"),
    "Nexa-heavy": require("../assets/fonts/Nexa-heavy.ttf"),
  });

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
        setHasLaunched(false); // Default to onboarding if there's an error
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

  // Show loading screen while fonts are loading or onboarding state is being determined
  if (!fontsLoaded || hasLaunched === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: themeContainerStyle }}>
        <LottieView
          source={require('../assets/loaders/loader.json')}
          autoPlay
          loop
          style={{width: SIZES.xLarge * 2, height: SIZES.xLarge * 2}}
          speed={4}
        />
      </View>
    );
  }

  return null; // Return null when ready to navigate
};

export default Home;
