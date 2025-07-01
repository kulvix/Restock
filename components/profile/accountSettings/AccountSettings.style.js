import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({


  container: {
    flex: 1,
    paddingBottom: SIZES.xSmall,
  },

  menuItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SIZES.small,
    borderRadius: SIZES.xSmall,
    marginBottom: SIZES.xSmall,
  },
  logout: {
    backgroundColor: COLORS.error,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutItemText: {
    color: COLORS.white,
  },
  iconTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuItemText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginLeft: SIZES.medium,
  },
  subTitleBox: {
    margin: 0,
    paddingVertical: SIZES.small,
  },
  subTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  }
























  // container: {
  //   marginBottom: SIZES.small,
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

  // sectionBody: {
  //   backgroundColor: COLORS.white,
  //   alignItems: 'left',
  //   marginRight: SIZES.small,
  //   borderRadius: SIZES.small,
  // },
  // image: {
  //   width: SIZES.xLarge * 5.3,
  //   height: SIZES.xLarge * 5.3,
  //   borderRadius: SIZES.small,
  //   marginBottom: SIZES.xSmall / 4
  // },
  // productName: {
  //   textAlign: 'left',
  //   fontFamily: FONT.bold,
  //   fontSize: SIZES.small,
  //   maxWidth: SIZES.xLarge * 4.1,
  // },
  // productDetailBox: {
  //   paddingHorizontal: SIZES.small
  // },
  // subtitle: {
  //   textAlign: 'left',
  //   fontFamily: FONT.regular,
  //   fontSize: SIZES.small / 1.4,
  //   color: COLORS.gray,
  // },
  // sectionFooter: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: SIZES.small,
  //   paddingVertical: SIZES.xSmall
  // },
  // price: {
  //   textAlign: 'left',
  //   fontFamily: FONT.heavy,
  //   fontSize: SIZES.medium / 1.5,
  //   color: COLORS.black,
  //   letterSpacing: -1,
  // },
  // sectionBtn: {
  //   width: 70,
  //   // height: SIZES.large * 2,
  //   // flexDirection:'row',
  //   backgroundColor: COLORS.primary,
  //   padding: SIZES.xSmall / 2,
  //   borderRadius: SIZES.xSmall / 1.5,
    
  // },
  // sectionBtnText: {
  //   fontFamily: FONT.regular,
  //   fontSize: SIZES.xSmall,
  //   textTransform: 'uppercase',
  //   textAlign: 'center',
  //   color: COLORS.white,
  // },

});

export default styles;
