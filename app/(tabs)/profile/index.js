import React, { useState, useContext } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView, Pressable } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons, SIZES, FONT } from '../../../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ProfileDetails, ProfileButtons, ProfileScreen } from '../../../components';
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from 'expo-router';
import { AuthContext } from '../../../components/contexts/AuthContext';

import { StatusBar } from 'expo-status-bar';


export default function Index() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  if (!user) {
    return <Redirect href="/(tabs)/profile/auth/login" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <StatusBar
        style={'light'}
        backgroundColor={COLORS.primary}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerShadowVisible: false,
          headerTitle: "Profile",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: FONT.bold,
            fontSize: SIZES.medium,
            color: COLORS.white,
          },
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileScreen isModalVisible={isModalVisible} toggleModal={toggleModal} />
      </ScrollView>
    </SafeAreaView>
  );
}
