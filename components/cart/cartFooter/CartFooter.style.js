import { StyleSheet, Platform } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({

  container: (width) => ({
    // flex: 1,
    backgroundColor: COLORS.white,
    // justifyContent: 'center',
    // position: 'absolute',
    bottom: 0,
    width: width,
    padding: SIZES.large,
    borderTopLeftRadius: SIZES.large * 2,
    borderTopRightRadius: SIZES.large * 2,

    paddingBottom: SIZES.xxLarge * 2,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.8,
        shadowRadius: 25,
      },
      android: {
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        elevation: 15,
      },
    }),
  }),

  
  innerContainer: {
    gap: SIZES.xSmall / 4
  },
  row: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.xSmall / 3
  },
  rowText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xSmall,
    color: COLORS.gray
  },
  rowTextPrice: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    color: COLORS.black
  },
  vatBox: {
    width: '70%',
  },
  disclaimerText: {
    fontFamily: FONT.regular,
    color: COLORS.alert,
  },
  line: {
    height: 1,
    backgroundColor: COLORS.gray,
    marginBottom: SIZES.xSmall / 3
  },
  totalRowText: {
    fontFamily: FONT.heavy,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  doubleCol: {
    flexDirection: 'row',
    gap: SIZES.medium,
  },
  footerDiscountedText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
  },
  // btnBox: {
  //   padding: 5
  // },
  btn: {
    backgroundColor: COLORS.primary,
    padding: SIZES.xSmall,
    borderRadius: SIZES.small / 2,
    borderWidth: 2,
    borderColor: COLORS.white, 
  },
  btnBadge: {
    alignSelf: 'flex-end',
    width: '50%',
    marginRight: 0,
    padding: SIZES.xSmall / 6,
    paddingBottom: SIZES.small,
    marginBottom: -SIZES.xSmall,
    borderRadius: SIZES.xSmall / 2,
    fontFamily: FONT.heavy,
    fontSize: SIZES.small,
    color: COLORS.white,
    backgroundColor: COLORS.alert,
    // borderColor: COLORS.alert,
    // borderWidth: 1,
    textAlign: 'center',
  },
  btntext: {
    fontFamily: FONT.heavy,
    fontSize: SIZES.medium,
    color: COLORS.white,
    textAlign: 'center',
  },
  loaderIcon: {
    width: SIZES.xxLarge,
    height: SIZES.xxLarge,
  },

});

export default styles;
