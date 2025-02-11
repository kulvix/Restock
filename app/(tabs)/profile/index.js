import React, { useState, useContext } from "react";
import { StatusBar, StyleSheet, View, ScrollView, SafeAreaView, Pressable } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons, SIZES, FONT } from '../../../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ProfileDetails, ProfileButtons, ProfileScreen } from '../../../components';
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from 'expo-router';
import { AuthContext } from '../../../components/contexts/AuthContext';


export default function Index() {
    const [isModalVisible, setModalVisible] = useState(false);
  
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const [loggedIn, setLoggedIn] = useState(false); // Change this logic based on your authentication
    const router = useRouter();
    const { user, logout } = useContext(AuthContext);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
					<StatusBar
						style="auto"
						backgroundColor={COLORS.primary}
						barStyle="light-content"
					/>
					<Stack.Screen
						options={{
							headerStyle: { backgroundColor: COLORS.primary },
							headerShadowVisible: false,
							headerRight: ({ color, size }) => (
								<Pressable onPress={toggleModal}>
                  <Ionicons name="settings-outline" size={SIZES.xLarge} color={COLORS.white} />
                </Pressable>
							),
							headerTitle: "Profile",
							headerTitleAlign: "center",
							headerTitleStyle: { fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.white },
						}}
					/>

					<ScrollView showsVerticalScrollIndicator={false}>
						{user ? (
							<View style={{ flex: 1 }}>
								<ProfileScreen isModalVisible={isModalVisible} toggleModal={toggleModal} />
							</View>
						) : (
							// Navigate to the login screen when not logged in
							<Redirect href="/(tabs)/profile/auth/login" />
						)}
					</ScrollView>

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
}
