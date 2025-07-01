import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingScreen from './onboardingScreen';
import { COLORS, icons, images, SIZES, FONT } from '../../constants';

// SplashScreen.preventAutoHideAsync();

export default function OnboardingComponent() {
	return (
		<SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <StatusBar hidden/>
        <OnboardingScreen />
      </SafeAreaView>
    </SafeAreaProvider>
		
  	)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

