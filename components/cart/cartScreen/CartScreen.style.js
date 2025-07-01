import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // bottom: 140,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.darkWhite,
    marginBottom: SIZES.small,
    borderRadius: SIZES.small,
  },
  
  itemImage: {
    width: '35%',
    height: 'auto',
    resizeMode: 'cover',
    borderRadius: SIZES.small,
  },
  rightSectionBox: {
    flex: 1,
    alignItems:'center',
    flexDirection: 'row',
    padding: SIZES.small
  },
  detailBox: {
    // backgroundColor: COLORS.primary,
    flex: 1,
    flexDirection: 'column',
    gap: 15,
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
  deleteIconBox: {
    padding: SIZES.medium / 2,
    borderRadius: SIZES.large / 2,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#ffe3e3',
  },
  deleteIcon: {
    color: COLORS.grayDark
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

  noOrdersContainer: {
    flex: 1,
  },
  innerContainer: {
    width: '100%',
  },
  // noOrdersContainer: {
    
  //   // backgroundColor: COLORS.white,
  //   margin: SIZES.large,
  //   borderRadius: SIZES.medium,
  //   padding: SIZES.large
  // },
  emptyImage: {
    width: '100%',
    marginTop: SIZES.large,
    alignSelf: 'center',
    height: '250',
    borderRadius: SIZES.small,
  },
  noOrdersTitleText: {
    width: '70%',
    alignSelf: 'center',
    paddingVertical: SIZES.large,
    fontFamily: FONT.heavy,
    fontSize: SIZES.xLarge,
    textAlign: 'center'
  },
  noOrdersDesc: {
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: 20,
    paddingBottom: SIZES.large,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginBottom: SIZES.small,
  },
  btn: {
    // width: '70%',
    alignSelf: 'center',
    padding: SIZES.xSmall,
    borderRadius: SIZES.small / 2,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  btnText: {
    fontFamily: FONT.heavy,
    fontSize: SIZES.small,
    color: COLORS.primary,
    textAlign: 'center',
  },




  listContainer: {
    flex: 1,
    marginBottom: SIZES.xxLarge * 2,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    marginVertical: SIZES.small,
    borderRadius: SIZES.small,
    shadowColor: COLORS.gray,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 10, // For Android shadow
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackOrderBtn: {
    padding: SIZES.xSmall / 2,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: SIZES.xSmall / 4,
    color: COLORS.primary, 
  },
  trackOrderBtnText: {
    color: COLORS.primary, 
  },
  orderId: {
    fontFamily: FONT.heavy,
    fontSize: SIZES.large,
    marginBottom: 5,
    color: '#333',
  },
  orderDetailBox: {

  },
  orderDetailFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.xSmall,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gray,
  },
  text: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: '#555',
    marginBottom: 2,
  },
  status: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    marginTop: 5,
  },
  pending: {
    color: COLORS.alert,
  },
  completed: {
    color: COLORS.primary,
  },
  paymentStatus: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    marginTop: 5,
  },
  paid: {
    color: COLORS.primary,
  },
  unpaid: {
    color: COLORS.error,
  },
  date: {
    fontSize: SIZES.xSmall,
    color: '#888',
    marginTop: 5,
  },
});

export default styles;
