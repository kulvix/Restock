import React, { useEffect, useState } from "react";
import Tabs from "expo-router/tabs";
import { COLORS, FONT, SIZES } from '../../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
import TabBar from "../../components/tabBar/TabBar";
import { useTheme } from '../../components/contexts/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { Keyboard } from 'react-native';

const TabsLayout = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light' || 'auto'}
        backgroundColor={theme === 'light' ? COLORS.lightWhite : COLORS.grayDark || 'auto'}
      />
      <Tabs
        tabBar={props => !keyboardVisible ? <TabBar {...props} /> : null}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: "Home",
            title: "Home",
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={SIZES.large} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            tabBarLabel: "Category",
            title: "Categories",
            tabBarBadgeStyle: { backgroundColor: COLORS.primary },
            tabBarIcon: ({ color }) => (
              <Ionicons name="grid-outline" size={SIZES.large} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarLabel: "Search",
            title: "Search",
            tabBarBadgeStyle: { backgroundColor: COLORS.primary },
            tabBarIcon: ({ color }) => (
              <Ionicons name="search-outline" size={SIZES.large} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="bundles"
          options={{
            tabBarLabel: "Bundles",
            title: "Bundles",
            tabBarIcon: ({ color }) => (
              <Ionicons name="gift-outline" size={SIZES.large} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarLabel: "Cart",
            title: "Cart",
            tabBarBadge: 4,
            tabBarBadgeStyle: {
              backgroundColor: COLORS.primary,
              fontFamily: FONT.regular,
              fontSize: SIZES.small,
            },
            tabBarIcon: ({ color }) => (
              <Ionicons name="cart-outline" size={SIZES.large} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profile",
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={SIZES.large} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
