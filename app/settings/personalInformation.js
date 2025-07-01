import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Pressable } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons, SIZES, FONT } from '../../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ProfileDetails, ProfileButtons, ProfileScreen, PersonalInformationScreen } from '../../components';
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from 'expo-router';
import { AuthContext } from '../../components/contexts/AuthContext';


export default function PersonalInformation() {

    const router = useRouter();
    const { user, logout } = useContext(AuthContext);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>

        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerShown: true,
            headerLeft: ({color, size}) => (<Ionicons 
              name="chevron-back-outline" 
              size={SIZES.xLarge} 
              color={color} 
              onPress={router.back} />),
            // headerRight: ({ color, size }) => (
            //   <Pressable>
            //     <Ionicons name="settings-outline" size={SIZES.xLarge} color={COLORS.white} />
            //   </Pressable>
            // ),
            headerTitle: "Personal Information",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.dark },
          }}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <PersonalInformationScreen />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}
