import 'react-native-gesture-handler'; // Required at the top for gesture support
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from "expo-router";
import { AuthProvider } from '../components/contexts/AuthContext';
import { ProductProvider } from "../components/contexts/ProductContext";
import { SearchProvider } from "../components/contexts/SearchContext";
import { BundleProvider } from "../components/contexts/BundleContext";
import { CartProvider } from '../components/contexts/CartContext';
import { NotificationProvider } from '../components/contexts/NotificationContext';
import { ThemeProvider } from '../components/contexts/ThemeContext';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootStack() {
  const [fontsLoaded, fontError] = useFonts({
    'Nexa-extralight': require('../assets/fonts/Nexa-extralight.ttf'),
    'Nexa-light': require('../assets/fonts/Nexa-light.ttf'),
    'Nexa-regular': require('../assets/fonts/Nexa-regular.ttf'),
    'Nexa-bold': require('../assets/fonts/Nexa-bold.ttf'),
    'Nexa-heavy': require('../assets/fonts/Nexa-heavy.ttf')
  });

  useEffect(() => {
    async function hideSplashScreen() {
      try {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn('Error hiding splash screen:', e);
      }
    }

    hideSplashScreen();
  }, [fontsLoaded, fontError]);

  // Don't render anything until fonts are loaded
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NotificationProvider>
          <SearchProvider>
            <AuthProvider>
              <ProductProvider>
                <BundleProvider>
                  <CartProvider>
                    <ThemeProvider>
                      <Stack 
                        screenOptions={{ 
                          headerShown: false,
                          animation: 'fade'
                        }} 
                      />
                    </ThemeProvider>
                  </CartProvider>
                </BundleProvider>
              </ProductProvider>
            </AuthProvider>
          </SearchProvider>
        </NotificationProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}