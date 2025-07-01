import React, { useContext } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { Stack, router, useLocalSearchParams, Redirect } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, FONT } from "../../../../constants";
import LoginScreen from './login';
import { AuthContext } from '../../../../components/contexts/AuthContext';

const Auth = () => {
  const { item } = useLocalSearchParams();
  const { user } = useContext(AuthContext);

  if (user) {
    return <Redirect href="/(tabs)/profile" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerLeft: ({ color }) => (
            <Ionicons
              name="chevron-back-outline"
              size={SIZES.xLarge}
              color={color}
              onPress={router.back}
            />
          ),
          headerTitle: "",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: FONT.bold,
            fontSize: SIZES.medium,
            color: COLORS.black,
          },
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, paddingBottom: SIZES.xxLarge * 3 }}>
          <LoginScreen />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Auth;
