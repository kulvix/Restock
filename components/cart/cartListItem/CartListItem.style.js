import { StyleSheet, Platform } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    marginBottom: SIZES.small,
    borderRadius: SIZES.small / 2,
    backgroundColor: COLORS.white,
    padding: SIZES.xSmall,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        elevation: 10,
      },
    }),
  },
  






  
  itemImage: {
    width: '20%',
    height: 'auto',
    resizeMode: 'cover',
    borderRadius: SIZES.small / 2,
  },
  rightSectionBox: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: SIZES.xSmall,
    justifyContent: 'space-between',
    gap: 5,
    // backgroundColor: COLORS.alert
  },
  detailBox: {
    // width: '60%'
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontFamily: FONT.heavy,
    fontSize: SIZES.xxLarge / 2.3,
  },
  itemDetails: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.gray,
    // marginBottom: SIZES.small
  },
  itemPrice: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  finalPrice: {
    fontFamily: FONT.heavy,
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  normalPrice: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xSmall,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
  },
  discountAmount: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: SIZES.xSmall / 4,
    paddingHorizontal: SIZES.xSmall,
    fontFamily: FONT.bold,
    fontSize: SIZES.large / 2,
    backgroundColor: COLORS.alert,
    borderRadius: SIZES.xSmall / 2,
    borderTopLeftRadius: SIZES.xSmall,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    color: COLORS.white,
  },
  discountPercentage: {
    padding: SIZES.xSmall / 4,
    paddingHorizontal: SIZES.xSmall / 2,
    fontFamily: FONT.bold,
    fontSize: SIZES.xSmall,
    backgroundColor: COLORS.error,
    borderRadius: SIZES.small,
    color: COLORS.white,
    textAlign: 'center',
  },
  priceAndPercentageBox: {
    flexDirection: 'row',
    gap: SIZES.xSmall / 3,
    alignItems: 'center'
  },










  inputSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
    alignItems: 'center',
    borderRadius: SIZES.xSmall / 2
  },
  inputBtn: {
    padding: SIZES.small / 2,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xSmall / 2
  },
  inputBtnText: {
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  inputIcon: {
    fontSize: SIZES.small,
    color: COLORS.white,
    // fontWeight: '900'
  },
  inputFieldBox: {
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    borderRadius: SIZES.xSmall / 2,
    borderColor: '#eee',
    width: SIZES.small * 2,
    // height: 30,
  },
  inputField: {
    textAlign: 'center',
    padding: SIZES.small / 3,

  },

  deleteIconBox: {
    backgroundColor: COLORS.lightError,
    padding: SIZES.xSmall / 2,
    borderRadius: SIZES.small / 2,
    borderWidth: 1,
    borderColor: COLORS.error,
    color: COLORS.error,

  },
  deleteIcon: {
    color: COLORS.error,
  },


























  orderContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: SIZES.small,
    borderRadius: SIZES.small,
    marginBottom: SIZES.medium,

  },
  orderDetailsBox: {

  },
  orderId: {
    fontFamily: FONT.heavy,
    fontSize: SIZES.medium,
    textTransform: 'uppercase',
    color: COLORS.black,
  },
  detailText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large / 2,
    color: COLORS.gray,
    lineHeight: 20,
  },
  trackOrderBtn: {
    backgroundColor: COLORS.primary,
    padding: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.xSmall / 2,
  },
  trackOrderBtnText: {
    textTransform: 'uppercase',
    fontFamily: FONT.bold,
    fontSize: SIZES.large / 2,
    textAlign: 'center',
    color: COLORS.white,
  },






});

export default styles;
