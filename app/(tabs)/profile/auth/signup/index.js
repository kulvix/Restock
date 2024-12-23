// screens/SignUpScreen.js
import React, { useState, useContext } from 'react';
import { StatusBar, StyleSheet, View, TextInput, Button, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons, SIZES, FONT } from '../../../../../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ProfileDetails, ProfileButtons } from '../../../../../components';
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from 'expo-router';
// import { AuthContext } from '../../../../../components/contexts/AuthContext';

import { SignUpScreen } from '../../../../../components';


const SignUp = () => {
    // const { signUp } = useContext(AuthContext);

    const handleSignUp = async () => {
        console.log("OK");
        // try {
        //     await signUp({ name, email, password, phone });
        // } catch (err) {
        //     console.error(err);
        // }
    };

    return (

			<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
				<StatusBar
					style="translucent"
					backgroundColor="transparent"
					barStyle="light-content"
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

				{/* <ScrollView showsVerticalScrollIndicator={false}> */}
					<SignUpScreen />
				{/* </ScrollView> */}

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
    );
};

export default SignUp;
