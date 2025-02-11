import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./ProfileCompletionLoader.style";
import { COLORS, icons, SIZES, FONT } from '../../../constants';

const ProfileCompletionLoader = ({ currentLevel, labels = [], onPress }) => {
  const progressAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: currentLevel - 1,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [currentLevel]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["10%", "50%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.loaderTitle}>Complete your profile</Text>
      <LinearGradient
        // colors={[COLORS.black, COLORS.alert, COLORS.primary, COLORS.black]} // Gradient colors
        colors={['rgba(4, 22, 15, 0.9)', 'rgba(254, 180, 123, 0.5)', 'rgba(76, 175, 80, 0.5)']} // Gradient colors
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 0 }}
        style={styles.progressBarContainer}
      >
        <View style={styles.progressBar}>
          <Animated.View
            style={[styles.progressFill, { width: progressWidth }]}
          />
        </View>
        <View style={styles.milestoneBox}>
          {[1, 2, 3].map((level, index) => (
            <Pressable
              key={level}
              style={[
                styles.milestone,
                currentLevel === level && styles.milestoneCurrent,
              ]}
              onPress={() => onPress(level)}
            >
              <View
                style={[
                  styles.milestoneCircle,
                  currentLevel === level && styles.glowEffect,
                ]}
              >
                <Text style={styles.milestoneText}>{level}</Text>
              </View>
              {labels[index] && (
                <Text style={styles.label}>{labels[index]}</Text>
              )}
            </Pressable>
          ))}
        </View>
      </LinearGradient>
      
    </View>
  );
};


export default ProfileCompletionLoader;
