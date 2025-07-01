// app/profile/auth/CivicAuthScreen.js
import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';

const CivicAuthScreen = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // const CIVIC_LOGIN_URL = `https://hosted.civic.com/login?appId=40ba54a1-6dbc-4f3b-b210-c741c023b9f5`; // replace with your appId
  const CIVIC_LOGIN_URL = `https://solana.com`; // replace with your appId

  const handleNavigationChange = (navState) => {
    const { url } = navState;
    if (url.includes('yourapp://callback')) {
      const token = url.split('token=')[1];
      console.log('Civic Token:', token);

      // TODO: Call your API to log user in with this token, if applicable

      router.replace('/(tabs)/profile');
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      <WebView
        source={{ uri: CIVIC_LOGIN_URL }}
        onNavigationStateChange={handleNavigationChange}
        onLoadEnd={() => setLoading(false)}
        startInLoadingState
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
};

export default CivicAuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
