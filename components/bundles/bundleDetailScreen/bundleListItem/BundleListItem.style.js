import { StyleSheet, Platform } from "react-native";

import { FONT, SIZES, COLORS } from "../../../../constants";

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: SIZES.small,
    borderRadius: SIZES.xSmall / 2,
    backgroundColor: COLORS.white,

    width: '23%',
    aspectRatio: 1,
    marginBottom: 10,
    alignItems: 'flex-start',

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
    width: "100%",
    height: SIZES.xLarge * 2,
    resizeMode: 'cover',
    borderTopRightRadius: SIZES.xSmall / 2,
    borderTopLeftRadius: SIZES.xSmall / 2,
  },
  detailBox: {
    paddingHorizontal: SIZES.xSmall / 4,
    gap: 5,
  },
  itemTitle: {
    fontFamily: FONT.heavy,
    fontSize: SIZES.small ,
  },
  itemDetails: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xSmall,
    color: COLORS.white,
    // marginBottom: SIZES.small
  },
  quantityBox: {
    position: 'absolute',
    margin: 0,
    top: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: COLORS.black,
    padding: SIZES.xSmall / 4,
    borderRadius: SIZES.xSmall / 4,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    gap: 2,
  },
  itemPrice: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xSmall,
    color: COLORS.black,
  },


});

export default styles;
