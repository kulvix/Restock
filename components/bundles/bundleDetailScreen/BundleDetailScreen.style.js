import { StyleSheet, Platform } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({


  container: {
    // marginTop: -20,
    flex: 1,
    gap: SIZES.xSmall / 4,
    backgroundColor: COLORS.lightWhite,
  },
  imageBox: {
    backgroundColor: COLORS.black,
    // flex: 1,
    height: SIZES.xxLarge * 8,
    borderBottomRightRadius: SIZES.xLarge,
    borderBottomLeftRadius: SIZES.xLarge,
    overflow:'hidden',

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
  backgroundImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: SIZES.xxLarge * 8,
    padding: SIZES.small,
    paddingBottom: SIZES.large,
    
  },
  boxGradient: {
    borderBottomRightRadius: SIZES.xLarge,
    borderBottomLeftRadius: SIZES.xLarge,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  sections: {
    flex: 1,
    maxHeight: 'auto',
    marginTop: 'auto',
  },
  titleText: {
    // maxWidth: '70%',
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  priceText: {
    alignSelf: 'flex-end',
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  descText: {
    // maxWidth: '70%',
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.white,
    lineHeight: SIZES.large
  },
  ratingBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  ratingStar: {
    color: 'orange',
    fontSize: 14,
    marginTop: SIZES.xSmall,
  },
  addToCartBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.large,
    alignSelf: 'flex-end',
    gap: SIZES.xSmall / 2,
  },
  addToCartBtText: {
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
  doubleBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    height: SIZES.medium * 2.5,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
},
  quantityBox: {
    padding: SIZES.xSmall,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.heavy,
    // height: SIZES.medium * 2.5,
    // borderRadius: SIZES.xSmall,
  },
  doubleBtn1: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    // paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.medium,
    borderTopLeftRadius: SIZES.large,
    borderBottomLeftRadius: SIZES.large,
    alignSelf: 'flex-end',
    gap: SIZES.xSmall / 2,
    height: SIZES.medium * 2.5,
  },
  doubleBtn2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    // paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.medium,
    borderTopRightRadius: SIZES.large,
    borderBottomRightRadius: SIZES.large,
    alignSelf: 'flex-end',
    gap: SIZES.xSmall / 2,
    height: SIZES.medium * 2.5,
  },
  
  subTitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.gray
  },
  section2: {
    padding: SIZES.medium
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    textTransform: 'uppercase',
    fontSize: SIZES.small,
    color: COLORS.black,
    marginBottom: SIZES.xSmall,
  },
  listItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: SIZES.xSmall / 2,
  },
  typeBtn: (selected, item) => ({
    // width: 'auto',
    justifyContent: 'flex-start',
    padding: SIZES.small / 2,
    borderWidth: .5,
    borderColor: selected == item ? COLORS.primary : COLORS.grayDark,
    borderRadius: SIZES.small / 4,
    marginHorizontal: 5,
    marginBottom: SIZES.xSmall / 2,
    backgroundColor: selected == item ? COLORS.primary : null
  }),
  typeBtnText: (selected, item) => ({
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    color: selected == item ? COLORS.white : COLORS.grayDark,
    
  }),

  section3: {
    // marginBottom: SIZES.medium
  },



















  // btnBox: {
  //   flex: 1,
  //   flexDirection: "row",
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  
  // clearBtn: (fullWidth) => ({
  //   width: fullWidth / 4,
  //   padding: SIZES.xSmall,
  //   borderRadius: SIZES.small / 2,
  //   borderWidth: SIZES.small / 10,
  //   borderColor: COLORS.primary,
  //   marginHorizontal: 5,
  // }),
  // clearBtnText: {
  //   color: COLORS.primary,
  //   textAlign: 'center',
  // },
  // showBtn: (fullWidth) => ({
  //   width: fullWidth / 1.7,
  //   padding: SIZES.xSmall,
  //   backgroundColor: COLORS.primary,
  //   borderRadius: SIZES.small / 2,
  //   marginHorizontal: 5,
  // }),
  // showBtnText: {
  //   color: COLORS.white,
  //   textAlign: 'center',
  // },







  // sectionHeader: {
  //   paddingVertical: SIZES.small,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: 'center'
  // },
  // sectionHeaderTitle: {
  //   fontFamily: FONT.bold,
  //   fontSize: SIZES.medium,
  // },
  // sectionHeaderBtn: {
  //   justifyContent: "space-between"
  // },
  // sectionHeaderBtnText: {
  //   fontSize: SIZES.small,
  //   color: COLORS.primary
  // },


  // measurementRow: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginBottom: SIZES.xSmall / 4
  // },

  // rowText: {
  //   fontFamily: FONT.regular,
  //   color: COLORS.black,
  // },
  // checkBoxSection: {

  // },
  // checkbox: {
  //   backgroundColor: COLORS.white,
  //   borderColor: COLORS.darkWhite,
  //   borderRadius: SIZES.xSmall / 1.5,
  // },


});

export default styles;
