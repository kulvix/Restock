import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: SIZES.medium,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopRightRadius: SIZES.xxLarge,
    borderTopLeftRadius: SIZES.xxLarge,
  },
  btnBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  clearBtn: (fullWidth) => ({
    width: fullWidth / 4,
    padding: SIZES.xSmall,
    borderRadius: SIZES.small / 2,
    borderWidth: SIZES.small / 10,
    borderColor: COLORS.primary,
    marginHorizontal: 5,
  }),
  clearBtnText: {
    color: COLORS.primary,
    textAlign: 'center',
  },
  showBtn: (fullWidth) => ({
    width: fullWidth / 1.7,
    padding: SIZES.xSmall,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small / 2,
    marginHorizontal: 5,
  }),
  showBtnText: {
    color: COLORS.white,
    textAlign: 'center',
  },







  sectionHeader: {
    paddingVertical: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  sectionHeaderTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
  },
  sectionHeaderBtn: {
    justifyContent: "space-between"
  },
  sectionHeaderBtnText: {
    fontSize: SIZES.small,
    color: COLORS.primary
  },


  measurementRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.xSmall / 4
  },

  rowText: {
    fontFamily: FONT.regular,
    color: COLORS.black,
  },
  checkBoxSection: {

  },
  checkbox: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkWhite,
    borderRadius: SIZES.xSmall / 1.5,
  },























  sectionBody: {
    backgroundColor: COLORS.white,
    alignItems: 'left',
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  image: {
    width: SIZES.xLarge * 5.3,
    height: SIZES.xLarge * 5.3,
    borderRadius: SIZES.small,
    marginBottom: SIZES.xSmall / 4
  },
  productName: {
    textAlign: 'left',
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    maxWidth: SIZES.xLarge * 4.1,
  },
  productDetailBox: {
    paddingHorizontal: SIZES.small
  },
  subtitle: {
    textAlign: 'left',
    fontFamily: FONT.regular,
    fontSize: SIZES.small / 1.4,
    color: COLORS.gray,
  },
  sectionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.xSmall
  },
  price: {
    textAlign: 'left',
    fontFamily: FONT.heavy,
    fontSize: SIZES.medium / 1.5,
    color: COLORS.black,
    letterSpacing: -1,
  },
  sectionBtn: {
    width: 70,
    // height: SIZES.large * 2,
    // flexDirection:'row',
    backgroundColor: COLORS.primary,
    padding: SIZES.xSmall / 2,
    borderRadius: SIZES.xSmall / 1.5,
    
  },
  sectionBtnText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xSmall,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: COLORS.white,
  },

});

export default styles;
