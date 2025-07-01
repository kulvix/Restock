import React from 'react';
import { Modal, Text, View, StyleSheet, Pressable } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants';

const CustomAlert = ({
  visible,
  onClose,
  title,
  message,
  icon = "",
  buttonLabel = "OK",
  children,
}) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          {title ? <Text style={styles.title}>{icon} {title}</Text> : null}
          {message ? <Text style={styles.message}>{message}</Text> : null}
          {children}
          <Pressable onPress={onClose} style={styles.btn}>
            <Text style={styles.btnText}>{buttonLabel}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  alertBox: {
    gap: SIZES.large,
    width: '80%',
    padding: SIZES.medium,
    backgroundColor: '#fff',
    borderRadius: SIZES.medium,
    shadowColor: COLORS.black,
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.grayDark,
    textAlign: 'left',
  },
  message: {
    fontSize: SIZES.medium,
    textAlign: 'center',
    marginBottom: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS.grayDark,
    lineHeight: SIZES.large,
    paddingHorizontal: SIZES.small,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    backgroundColor: COLORS.primary,
    padding: SIZES.xSmall,
    borderRadius: SIZES.xSmall / 1.5,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
  },
  btnText: {
    fontFamily: FONT.bold,
    color: COLORS.white,
    fontSize: SIZES.small,
  },
});

export default CustomAlert;
