import React, { useState, useContext } from "react";
import { StatusBar, StyleSheet, View, ScrollView, SafeAreaView, Pressable, Text } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons, SIZES, FONT } from '../../../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ProfileDetails, ProfileButtons, SearchScreen } from '../../../components';
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
						backgroundColor={COLORS.lightWhite}
						barStyle="dark-content"
					/>
					<Stack.Screen
						options={{
							headerStyle: { backgroundColor: COLORS.lightWhite },
							headerShadowVisible: false,
							headerRight: ({ color, size }) => (
								<Pressable onPress={toggleModal}>
                  <Ionicons name="notifications-outline" size={SIZES.xLarge} color={COLORS.grayDark} />
                </Pressable>
							),
							headerTitle: "Search",
							headerTitleAlign: "center",
							headerTitleStyle: { fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.grayDark },
						}}
					/>

				
          <View style={{ flex: 1 }}>
            <SearchScreen isModalVisible={isModalVisible} toggleModal={toggleModal} />
          </View>

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
