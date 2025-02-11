import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { FONT, SIZES, COLORS } from "../../../constants";

const ErrorMessage = ({ formMessage, isError, onDismiss, messageType }) => {
  const [visible, setVisible] = useState(false);
  const loaderWidth = React.useRef(new Animated.Value(100)).current; // Using ref for consistent animation control

  useEffect(() => {
    if (isError && formMessage) {
      setVisible(true);

      loaderWidth.setValue(100);
      Animated.timing(loaderWidth, {
        toValue: 0,
        duration: 5000, // 10 seconds
        useNativeDriver: false,
      }).start(() => {
        setVisible(false);
        if (onDismiss) onDismiss();
      });
    }
  }, [isError, formMessage, loaderWidth, onDismiss]);

  if (!visible) {
    return null;
  }

  return (
    <View 
      style={[
        styles.formMessageBox,
        { display: 'flex' },
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
              outputRange: ['0%', '100%'], // Map values to percentage-based widths
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formMessageBox: {
    // position: 'absolute',
    zIndex: 2,
    // width: '100%',
  },
  successMessageBox: {
    paddingBottom: 0,
    borderRadius: SIZES.small / 2,
    marginBottom: SIZES.small,
    borderWidth: .5,
    borderColor: COLORS.lightPrimary,
    backgroundColor: COLORS.primary
  },
  errorMessageBox: {
    paddingBottom: 0,
    borderRadius: SIZES.small / 2,
    marginBottom: SIZES.small,
    borderWidth: .5,
    borderColor: COLORS.lightWhite,
    backgroundColor: COLORS.error
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
