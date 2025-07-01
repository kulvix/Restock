// screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../../../components/contexts/AuthContext';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { ResetPasswordTokenScreen } from '../../../../../components';

import { StyleSheet, View, TextInput, Button, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons, SIZES, FONT } from '../../../../../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from 'expo-router';

const ResetPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
					<Stack.Screen
						options={{
              headerLeft: () => null,
							headerStyle: { backgroundColor: COLORS.lightWhite },
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
					<ResetPasswordTokenScreen />
				{/* </ScrollView> */}

      </SafeAreaView>
    );
};

export default ResetPassword;
