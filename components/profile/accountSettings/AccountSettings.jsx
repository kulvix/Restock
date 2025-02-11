import React, { useState, useContext } from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import styles from './AccountSettings.style';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../../contexts/AuthContext';
import { SIZES, COLORS } from '../../../constants';
import { useRouter } from 'expo-router';


const ProfileButtons = () => {
  const { width, height } = useWindowDimensions();
  const { user, logout } = useContext(AuthContext);

  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <View style={styles.subTitleBox}>
        <Text style={styles.subTitle}>Manage Account</Text>
      </View>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/(tabs)/profile/personalInformation")}>
        <View style={styles.iconTitle}>
          <Ionicons name='person-outline' size={SIZES.large} />
          <Text style={styles.menuItemText}>Personal infomation</Text>
        </View>
        <Ionicons name='chevron-forward-outline' size={SIZES.large} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/(tabs)/profile/billingInformation")}>
        <View style={styles.iconTitle}>
          <Ionicons name='information-circle-outline' size={SIZES.large} />
          <Text style={styles.menuItemText}>Billing infomation</Text>
        </View>
        <Ionicons name='chevron-forward-outline' size={SIZES.large} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/(tabs)/profile/paymentMethods")}>
        <View style={styles.iconTitle}>
          <Ionicons name='card-outline' size={SIZES.large} />
          <Text style={styles.menuItemText}>Create wallet card</Text>
        </View>
        <Ionicons name='chevron-forward-outline' size={SIZES.large} />
      </TouchableOpacity>


      <View style={styles.subTitleBox}>
        <Text style={styles.subTitle}>Other settings</Text>
      </View>
      
      <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/(tabs)/profile/notificationSettings")}>
        <View style={styles.iconTitle}>
          <Ionicons name='notifications-outline' size={SIZES.large} />
          <Text style={styles.menuItemText}>Notifications settings</Text>
        </View>
        <Ionicons name='chevron-forward-outline' size={SIZES.large} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/(tabs)/profile/resetPassword")}>
        <View style={styles.iconTitle}>
          <Ionicons name='lock-closed-outline' size={SIZES.large} />
          <Text style={styles.menuItemText}>Reset password</Text>
        </View>
        <Ionicons name='chevron-forward-outline' size={SIZES.large} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/(tabs)/profile/referAndEarn")}>
        <View style={styles.iconTitle}>
          <Ionicons name='people-outline' size={SIZES.large} />
          <Text style={styles.menuItemText}>Refer & Earn</Text>
        </View>
        <Ionicons name='chevron-forward-outline' size={SIZES.large} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/(tabs)/profile/helpAndSupport")}>
        <View style={styles.iconTitle}>
          <Ionicons name='help-circle-outline' size={SIZES.large} />
          <Text style={styles.menuItemText}>Help & Support</Text>
        </View>
        <Ionicons name='chevron-forward-outline' size={SIZES.large} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuItem, styles.logout]} onPress={async () => {await logout()}}>
        <View style={styles.iconTitle}>
          <Ionicons name='log-out-outline' size={SIZES.large} color={COLORS.white} />
          <Text style={[styles.menuItemText, styles.logoutItemText]}>Log out</Text>
        </View>
        <Ionicons name='chevron-forward-outline' size={SIZES.large} color={COLORS.white} />
      </TouchableOpacity>
    </View>

  )
}

export default ProfileButtons