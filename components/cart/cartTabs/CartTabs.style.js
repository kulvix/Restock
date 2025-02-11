import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
  tabBox: {
    justifyContent: 'space-between',
  },
  tabBtn: (selectedTab, item) => ({

    backgroundColor: selectedTab == item ? COLORS.primary : COLORS.white,
    padding: SIZES.xSmall,
    borderRadius: SIZES.xSmall / 2,
  }),
  tabTitle: (selectedTab, item) => ({
    fontFamily: FONT.regular,
    color: selectedTab == item ? COLORS.white : COLORS.black,
    textAlign: 'center',
    fontSize: SIZES.xSmall
  }),

});

export default styles;