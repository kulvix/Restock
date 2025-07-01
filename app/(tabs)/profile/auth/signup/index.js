// screens/SignUpScreen.js
import React, { useState } from 'react';
import { SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Stack } from "expo-router";
import { COLORS, icons, SIZES, FONT } from '../../../../../constants';
import { SignUpScreen } from '../../../../../components';


const SignUp = () => {
    // const { signUp } = useContext(AuthContext);
    return (

			<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
				<StatusBar
          translucent
          backgroundColor="transparent"
          style="light"
        />
        
				<Stack.Screen
					options={{
            headerShown: false,
						headerStyle: { backgroundColor: COLORS.primary },
						headerShadowVisible: false,
						// headerRight: ({ color, size }) => (
						// 	<Ionicons name="settings-outline" size={SIZES.xLarge} color={COLORS.white} />
						// ),
						headerTitle: "",
						headerTitleAlign: "center",
						headerTitleStyle: { fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.white },
					}}
				/>
				<SignUpScreen />

      </SafeAreaView>
    );
};

export default SignUp;
