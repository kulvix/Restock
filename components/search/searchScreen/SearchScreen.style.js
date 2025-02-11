import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  innerContainer: {
    padding: SIZES.large,
    paddingTop: 0,
    paddingBottom: SIZES.xSmall,
  },
  
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    height: SIZES.xLarge * 1.7,
  },
  searchInputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.xSmall,
    flex: .95,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: SIZES.small,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.bold,
    width: "100%",
    fontSize: SIZES.medium,
  },

  filterBtn: {
    width: 48,
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xSmall,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionBtnIcon: {
    color: COLORS.white,
  },

  sectionBtnText: {  
    textAlign: 'center',
    color: COLORS.white,
    textTransform: 'uppercase',
  },

  noProductContainer: {
    backgroundColor: COLORS.white,
    margin: SIZES.large,
    borderRadius: SIZES.medium,
    padding: SIZES.large
  },
  noProductText: {
    textAlign: 'center',
    fontFamily: FONT.bold,
    color: COLORS.gray ,
    fontSize: SIZES.large
  },

});

export default styles;
