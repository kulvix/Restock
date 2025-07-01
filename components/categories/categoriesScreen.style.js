import { StyleSheet, Platform } from "react-native";

import { SIZES, COLORS, FONT, SHADOWS, } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingTop: SIZES.medium,
    paddingTop: 0,
    paddingBottom: SIZES.xSmall,
    gap: SIZES.medium,
  },
  tabsContainer: {
    flexDirection: 'row',
  },
  tabs: (selectedCategory, item) => ({
    marginRight: SIZES.xSmall,
    alignSelf: 'flex-start',
    padding: SIZES.xSmall,
    backgroundColor: selectedCategory === item ? COLORS.primary : COLORS.white,
    borderRadius: SIZES.xSmall / 2,
  }),
  tabText: (selectedCategory, item) => ({
    fontFamily: FONT.regular,
    color: selectedCategory === item ? COLORS.white : COLORS.black,
    fontSize: SIZES.xSmall,
    textAlign: 'center',
  }),




  productsContainer: {
    flex: 1,
    paddingTop: SIZES.small,
  },

  productItem: (width) =>  ({
    margin: SIZES.xSmall,
    // width: width / 2,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,

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
  }),
  image: (width) => ({
    width: width / 2,
    height: width / 2,
    borderRadius: SIZES.small,
    marginBottom: SIZES.xSmall / 4
  }),
  productName: {
    textAlign: 'left',
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    maxWidth: SIZES.xLarge * 4.1,
  },
  productDetailBox: {
    paddingHorizontal: SIZES.small
  },
  qty: {
    textAlign: 'left',
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  sectionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.xSmall / 2
  },
  price: {
    textAlign: 'left',
    fontFamily: FONT.heavy,
    fontSize: SIZES.large,
    color: COLORS.black,
    letterSpacing: -1,
    paddingVertical: 0,
    
  },
  priceBox: {
    flex: 1,
  },
  currency: {
    textAlign: 'left',
    fontFamily: FONT.bold,
    fontSize: SIZES.xSmall,
    color: COLORS.black,
    marginBottom: -SIZES.xSmall / 2
  },
  sectionBtn: {
    backgroundColor: COLORS.primary,
    padding: SIZES.small,
    borderRadius: SIZES.xSmall / 1.5,
  },

  sectionBtnText: {  
    textAlign: 'center',
    color: COLORS.white,

  },
  itemInvisible: {
    backgroundColor: 'transparent'
  }
});

export default styles;
