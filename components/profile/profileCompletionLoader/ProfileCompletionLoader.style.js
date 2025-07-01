import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({

  container: {
    padding: SIZES.medium,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black,
    borderRadius: SIZES.medium,
    marginBottom: SIZES.large * 2,
  },
  loaderTitle: {
    color: COLORS.lightWhite,
    fontFamily: FONT.heavy,
    fontSize: SIZES.small,
    marginBottom: SIZES.small,
  },
  progressBarContainer: {
    paddingHorizontal: SIZES.large,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    height: SIZES.xxLarge * 2,
    width: "100%",
  },
  progressBar: {
    position: "absolute",
    width: "100%",
    height: SIZES.medium,
    backgroundColor: COLORS.grayDark,
    borderRadius: SIZES.xLarge,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressFill: {
    flex: 1,
    alignItems: 'center',
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: COLORS.alert,
    borderRadius: SIZES.xLarge,
  },
  milestoneBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  milestone: {
    marginTop: SIZES.medium,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    position: "relative",
  },
  milestoneCircle: {
    width: SIZES.xLarge,
    height: SIZES.xLarge,
    borderRadius: SIZES.xxLarge,
    borderWidth: 2,
    borderColor: COLORS.lightWhite,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    backgroundColor: COLORS.grayDark,
  },
  milestoneCurrent: {
    zIndex: 2,
  },
  glowEffect: {
    borderWidth: SIZES.xSmall / 3,
    borderColor: COLORS.white,
    shadowColor: "#4CAF50",
    backgroundColor: COLORS.alert,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 5,
  },
  milestoneText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.lightWhite,
    fontFamily: FONT.regular,
  },
  label: {
    marginTop: 5,
    fontSize: SIZES.small / 1.5,
    color: COLORS.white,
    fontFamily: FONT.regular,
  },

});

export default styles;
