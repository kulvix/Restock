import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { FONT, SIZES, COLORS } from "../../../constants";

const ErrorMessage = ({ formMessage, isError, onDismiss, messageType }) => {
  const [visible, setVisible] = useState(false);
  const loaderWidth = useRef(new Animated.Value(100)).current;
  const animationStarted = useRef(false);

  useEffect(() => {
    if (isError && formMessage && !animationStarted.current) {
      animationStarted.current = true;
      setVisible(true);

      loaderWidth.setValue(100); // reset width to full
      Animated.timing(loaderWidth, {
        toValue: 0,
        duration: 5000, // 5 seconds
        useNativeDriver: false,
      }).start(() => {
        setVisible(false);
        animationStarted.current = false; // allow future animations
        if (onDismiss) onDismiss();
      });
    }
  }, [formMessage, isError]);

  if (!visible) return null;

  return (
    <View
      style={[
        styles.formMessageBox,
        messageType === 'success' && styles.successMessageBox,
        messageType === 'error' && styles.errorMessageBox,
      ]}
    >
      <Text style={styles.formMessage}>{formMessage}</Text>
      <Animated.View
        style={[
          styles.loader,
          {
            width: loaderWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formMessageBox: {
    zIndex: 2,
    width: '100%',
  },
  successMessageBox: {
    paddingBottom: 0,
    borderRadius: SIZES.small / 2,
    marginBottom: SIZES.small,
    borderWidth: 0.5,
    borderColor: COLORS.lightPrimary,
    backgroundColor: COLORS.primary,
  },
  errorMessageBox: {
    paddingBottom: 0,
    borderRadius: SIZES.small / 2,
    marginBottom: SIZES.small,
    borderWidth: 0.5,
    borderColor: COLORS.lightWhite,
    backgroundColor: COLORS.error,
  },
  formMessage: {
    padding: SIZES.small / 1.5,
    color: COLORS.white,
    fontFamily: FONT.bold,
    textAlign: 'center',
    alignSelf: 'center',
  },
  loader: {
    height: 2,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    borderRadius: SIZES.small / 2,
  },
});

export default ErrorMessage;
