import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: SIZES.large,
  },
  innerContainer: {
    justifyContent: "space-between",
    marginHorizontal: SIZES.small,
  },
  backgroundImageBox: {
    borderRadius: SIZES.xLarge,
    overflow: 'hidden'
  },
  backgroundImage: {
    width: '100%',
    borderColor: '#fff',
    height: SIZES.xxLarge * 6,
    margin: 0,
  },
  boxGradient: {
    borderRadius: SIZES.xLarge,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  title: {
    fontFamily: FONT.heavy,
    fontSize: SIZES.xxLarge,
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    paddingBottom: SIZES.small,
    marginBottom: SIZES.small,
    // borderBottom: SIZES.xSmall,
    borderBottomWidth: .5,
    borderBottomColor: COLORS.gray,
  },
  noPromoText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  productsContainer: {
    flex: 1,
    paddingTop: SIZES.large,
  },





  welcomeText: {
    fontSize: SIZES.xxLarge,
    fontFamily:FONT.heavy,
    letterSpacing: -2,
    marginBottom: 20
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.xSmall,
    flex: .95,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: SIZES.small,
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    // height: "100%",
    paddingHorizontal: SIZES.medium,
    // paddingVertical: SIZES.xSmall,
    paddingVertical: SIZES.medium,
  },

  filterBtn: {
    width: 48,
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xSmall,
    justifyContent: "center",
    alignItems: "center",
  },

  
});

export default styles;
