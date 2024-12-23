import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { FONT, SIZES, COLORS } from "../../../constants";

const ErrorMessage = ({ formMessage, isError, onDismiss }) => {
  const [visible, setVisible] = useState(false);
  const loaderWidth = React.useRef(new Animated.Value(100)).current; // Using ref for consistent animation control

  useEffect(() => {
    if (isError && formMessage) {
      setVisible(true);

      // Reset animation and start it
      loaderWidth.setValue(100); // Reset loader width to 100%
      Animated.timing(loaderWidth, {
        toValue: 0, // Shrink loader to 0%
        duration: 10000, // 10 seconds
        useNativeDriver: false,
      }).start(() => {
        setVisible(false); // Hide message when animation completes
        if (onDismiss) onDismiss(); // Optional callback to reset parent state
      });
    }
  }, [isError, formMessage, loaderWidth, onDismiss]);

  if (!visible) {
    return null; // Do not render the box if not visible
  }

  return (
    <View style={[styles.formMessageBox, { display: 'flex' }]}>
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
    display: 'none',
    paddingBottom: 0,
    borderRadius: SIZES.small / 2,
    marginBottom: SIZES.small,
    borderWidth: .5,
    borderColor: COLORS.gray,
  },
  formMessage: {
    padding: SIZES.small / 1.5,
    color: COLORS.gray,
    fontFamily: FONT.bold,
    textAlign: 'center',
    alignSelf: 'center',
  },
  loader: {
    height: 2,
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    borderRadius: SIZES.small / 2,
  },
});

export default ErrorMessage;
