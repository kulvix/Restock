import { StyleSheet, Platform } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({


  container: {
    // marginTop: -20,
    paddingTop: SIZES.xLarge * 3,
    padding: SIZES.large,
    gap: SIZES.small,
    backgroundColor: COLORS.lightWhite,
    borderTopRightRadius: SIZES.xxLarge,
    borderTopLeftRadius: SIZES.xxLarge,
  },
  imageBox: {
    backgroundColor: COLORS.black,
    flex: 1,
    height: SIZES.xxLarge * 6,
    borderRadius: SIZES.xLarge,
    overflow:'hidden',
    marginBottom: SIZES.large,

    ...Platform.select({
      ios: {
        shadowColor: '#000000',
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
    justifyContent: 'flex-end',
    height: SIZES.xxLarge * 6,
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
  section1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.white,
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
  subTitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.gray
  },
  section2: {
    // marginBottom: SIZES.medium
  },
  section2Header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: SIZES.small,
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    textTransform: 'uppercase',
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  goToCartBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    padding: SIZES.xSmall,
    borderRadius: SIZES.small / 2,
    gap: SIZES.xSmall / 2,
    // left: -40,
    // bottom: 5
  },
  cartBtnText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  listItemsContainer: {
    flex: 1,
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
    marginBottom: SIZES.medium
  },
  descText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.white,
    lineHeight: SIZES.large
  },


});

export default styles;
