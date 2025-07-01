import { StyleSheet } from "react-native";

import { SIZES, COLORS, FONT, SHADOWS, } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.xLarge * 2,
  },

  sectionBody: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    marginBottom: SIZES.medium,
  },

  sectionFooter: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SIZES.small,
  },

  image: {
    width: '100%',
    height: SIZES.xLarge * 4.5,
    borderRadius: SIZES.small,
    marginBottom: SIZES.xSmall / 4
  },

  productDetailBox: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // paddingVertical: SIZES.xSmall,
    // paddingHorizontal: SIZES.small,
    // backgroundColor: 'red',
    width: '70%',
    alignItems: 'left',
  },
  productName: {
    textAlign: 'left',
    fontFamily: FONT.heavy,
    fontSize: SIZES.large,
    width: 150, 
  },
  
  description: {
    textAlign: 'left',
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.grayDark,
    letterSpacing: -1,
    flexWrap: 'wrap',
    width: '100%',
  },
  price: {
    textAlign: 'left',
    fontFamily: FONT.heavy,
    fontSize: SIZES.large,
    color: COLORS.black,
    letterSpacing: -1,
  },


  sectionBtnBox: {
    // flex: 1,
    // backgroundColor: 'black',
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // paddingHorizontal: SIZES.small,
    // paddingVertical: SIZES.xSmall
  },
  sectionBtn: {
    // width: '80%',
    flexDirection: 'row',
    gap: SIZES.xSmall / 2,
    backgroundColor: COLORS.primary,
    padding: SIZES.small / 2,
    borderRadius: SIZES.xSmall / 3,
    alignItems: 'center',
    
  },
  heartIcon: {
    // marginRight: 5,
  },
  sectionBtnText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large / 2,
    // textTransform: 'uppercase',
    textAlign: 'center',
    color: COLORS.white,
  },










});

export default styles;
