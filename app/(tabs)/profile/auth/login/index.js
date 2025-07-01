// screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons, SIZES, FONT } from '../../../../../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LoginScreen } from '../../../../../components';
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from 'expo-router';

const Login = ({ navigation }) => { 
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
					<Stack.Screen
						options={{
							headerStyle: { backgroundColor: COLORS.lightWhite },
              headerShown: false,
							headerShadowVisible: false,
							// headerRight: ({ color, size }) => (
							// 	<Ionicons name="settings-outline" size={SIZES.xLarge} color={COLORS.white} />
							// ),
							headerTitle: "",
							headerTitleAlign: "center",
							headerTitleStyle: { fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.white },
						}}
					/>

					<LoginScreen />

      </SafeAreaView>

    );
};

export default Login;
