import React, { useState, useContext } from "react";
import { StatusBar, StyleSheet, View, Text, ScrollView, SafeAreaView, Pressable } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons, SIZES, FONT } from '../../../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ProfileDetails, ProfileButtons, ProfileScreen, PaymentMethodsScreen } from '../../../components';
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from 'expo-router';
import { AuthContext } from '../../../components/contexts/AuthContext';


export default function PaymentMethod() {

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
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            // headerRight: ({ color, size }) => (
            //   <Pressable>
            //     <Ionicons name="settings-outline" size={SIZES.xLarge} color={COLORS.white} />
            //   </Pressable>
            // ),
            headerTitle: "Manage Cards",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.dark },
          }}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <PaymentMethodsScreen />
          </View>
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
