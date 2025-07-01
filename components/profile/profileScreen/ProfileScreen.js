import React, { useRef, useContext, useState } from 'react';
import { View, Text, Image, Modal, useWindowDimensions, Linking } from 'react-native';
// import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import styles from './ProfileScreen.style';
import { ScrollView, Pressable, FlatList } from 'react-native-gesture-handler';

import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SIZES, FONT } from '../../../constants';
import { AuthContext } from '../../../components/contexts/AuthContext';
import { ProfileDetails, AccountSettings } from '../../../components';
import ProfileCompletionLoader from "../profileCompletionLoader/ProfileCompletionLoader";
// const visible = useRef();




const ProfileScreen = ({ isModalVisible, toggleModal }) => {
  const { width, height } = useWindowDimensions();
  const { user, logout } = useContext(AuthContext);
  const name = user.first_name + ' ' + user.last_name;

  const [level, setLevel] = useState(1);

  const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ');
    const initials = words.slice(0, 2).map(word => word[0]).join('').toUpperCase();
    return initials;
  };

  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleGesture = (event) => {
    const { translationY } = event.nativeEvent;
    if (translationY > 0) {
      translateY.value = translationY; // Drag only downward
    }
  };

  const handleGestureEnd = (event) => {
    const { translationY } = event.nativeEvent;
    if (translationY > 250) {
      translateY.value = withTiming(300, {}, () => {
        runOnJS(toggleModal)(); // Close modal when dragged down enough
      });
    } else {
      translateY.value = withTiming(0); // Reset to original position
    }
  };


  const increaseLevel = () => {
    if (level < 3) setLevel(level + 1);
    if (level === 3) setLevel(0);
  };

  const handlePress = (level) => {
    // Handle routing or page navigation
    console.log(`Navigate to milestone ${level}`);
    setCurrentLevel(level);
  };



  return (
    <View style={styles.container}>
      
      <View style={styles.profileDetailsContainer}>
        <View style={styles.profilePicSection}>
          <View style={styles.profilePicBox}>
            <Text style={styles.profilePicText}>{getInitials(name)}</Text>
          </View>
          <Text style={styles.profileName}>{user ? name : ""}</Text>
        </View>

        {/* <View style={styles.walletSection}>
          <View style={styles.walletBox}>
            <Pressable style={styles.eyeBtn}>
              <Ionicons name='eye-outline' size={20} color={COLORS.white} />
            </Pressable>

            <View style={styles.walletInnerBox}>
              <Text style={styles.walletTitleText}>******</Text>
              <Text style={styles.walletSubtitleText}>Wallet balance</Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={styles.walletBox}>
            <Pressable style={styles.eyeBtn}>
              <Ionicons name='eye' size={20} color={COLORS.white} />
            </Pressable>

            <View style={styles.walletInnerBox}>
              <Text style={styles.walletTitleText}>1230</Text>
              <Text style={styles.walletSubtitleText}>Point balance</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionBtnSection}>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}><Ionicons name='add' /> Add money</Text>
          </Pressable>

          <Pressable style={styles.btn}>
            <Text style={styles.btnText}><Ionicons name='send' /> Transfer</Text>
          </Pressable>

          <Pressable style={styles.btn}>
            <Text style={styles.btnText}><Ionicons name='pencil' /> Edit profile</Text>
          </Pressable>
        </View>

        <View style={styles.ProfileDetailsSection}>
          <Text style={styles.detailtext}><Ionicons name='location' />{' '} {user?.address ? user.address : "xxx xxx xxxx xx"}</Text>
          <View style={styles.lowerSection}>
            <Text style={styles.detailtext}><Ionicons name='call' />{' '} {user?.phone ? user.phone : "xxx xxx xxxx xx"}</Text>
            <Text style={styles.detailtext}><Ionicons name='mail' />{' '} {user?.email ? user.email : ""}</Text>
          </View>
        </View> */}

      </View>
        
      {/* <View style={styles.innerContainer}>
         <ProfileCompletionLoader
          currentLevel={level}
          labels={["Personal Info", "Billing Info", "Payment Method"]}
          onPress={handlePress}
        /> 
         <Button title="Next Step" onPress={increaseLevel} /> 
      </View> */}
      <View style={styles.innerContainer}>
        <AccountSettings />
        <View
          onPress={() => router.push("/(tabs)/profile/addPaymentMethods")}
          style={styles.supportCard}
        >
          <View>
            <Text style={styles.supportCardSubTitle}>Any issues or complains?</Text>
            <Text style={styles.supportCardTitle}>Speak with an agent</Text>
          </View>
          <View style={styles.btnGroup}>
            
          <Pressable onPress={() => Linking.openURL('tel:+2348132029285')}>
            <Ionicons name="call-outline" style={styles.btnIcon} />
          </Pressable>

          <Pressable onPress={() => Linking.openURL('https://wa.me/+2348132029285')}>
            <Ionicons
              name="logo-whatsapp"
              style={[styles.btnIcon, { backgroundColor: COLORS.grayDark, color: "#25D366" }]}
            />
          </Pressable>
          </View>
          <Image source={require('../../../assets/images/support-image.png')} style={styles.supportImage} />
        </View>
      </View>
      

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          {/* <Pressable style={styles.modalContainer}> */}
          <Pressable style={styles.modalContainer} onPress={toggleModal}>
            <PanGestureHandler
              onGestureEvent={handleGesture}
              onEnded={handleGestureEnd}
              activeOffsetY={[-10, 10]} // Ignore small vertical gestures to allow scrolling
            >
              <Animated.View style={[styles.modalContentWrapper, animatedStyle]}>
                <ScrollView
                  style={styles.modalContent}
                  contentContainerStyle={styles.scrollContent} 
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.modalTitleBox}>
                    <Pressable onPress={toggleModal} style={styles.closeButton}>
                      <Ionicons name='chevron-back-outline' size={25} />
                    </Pressable>
                    <Text style={styles.modalTitle}>Account Settings</Text>
                  </View>

                  {/* <AccountSettings /> */}

                </ScrollView>
              </Animated.View>
            </PanGestureHandler>
          </Pressable>
        </GestureHandlerRootView>
      </Modal>

    </View>
  )
}

export default ProfileScreen