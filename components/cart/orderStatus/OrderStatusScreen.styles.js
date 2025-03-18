import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({



	container: {
		flex: 1,
	},
	topSection: {
		marginBottom: SIZES.large,
	},
	itemImage: {
		width: '50%',
		alignSelf: 'center',
		height: SIZES.xLarge * 5,
		borderRadius: SIZES.large,
		marginBottom: SIZES.xSmall,
	},
	itemTitle: {
		textAlign: 'center',
		fontFamily: FONT.heavy,
		fontSize: SIZES.large,
	},
	itemDesc: {
		textAlign: 'center',
		fontFamily: FONT.regular,
		fontSize: SIZES.small,
		color: COLORS.gray,
	},

	trackBtn: {
    borderRadius: SIZES.xSmall / 3,
    backgroundColor: COLORS.primary,
    padding: SIZES.small / 2,
		alignSelf: 'left',
		width: 80,
    marginTop: -SIZES.xSmall / 2,
	},
	trackBtnText: {
    fontFamily: FONT.bold,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: SIZES.xSmall
	},



	box: {
		flex: 1,
    paddingBottom: SIZES.xxLarge * 3,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
    alignItems: 'flex-start',
	},
	labelBox: {

	},
	labelTextRight: {
		fontFamily: FONT.bold,
    fontSize: SIZES.small,
		width: 100,
		textAlign: 'left',
	},
	labelTextLeft: {
		fontFamily: FONT.bold,
    fontSize: SIZES.small,
		width: 100,
		textAlign: 'right',
	},
	labelSubTextRight: {
		fontFamily: FONT.bold,
    fontSize: SIZES.xSmall,
		color: COLORS.gray,
		width: 100,
    textAlign: 'left',
	},
	labelSubTextLeft: {
		fontFamily: FONT.bold,
    fontSize: SIZES.xSmall,
		color: COLORS.gray,
		width: 100,
    textAlign: 'right',
	},
	circle: {
		width: SIZES.large,
		height: SIZES.large,
		backgroundColor: COLORS.white,
		borderWidth: 1.5,
		// borderColor: COLORS.primary,
		borderColor: COLORS.gray,
		borderRadius: 20,
		marginHorizontal: SIZES.small,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: COLORS.primary,
	},
  circleCheck: {
    fontWeight: '900'
  },
	line: {
		width: 0,
		height: SIZES.xLarge * 2,
		alignSelf: 'center',
		borderStyle: 'dashed',
    borderLeftWidth: 1.5,
		// borderColor: COLORS.gray,
	},













  tabBtn: (selectedTab, item) => ({
    // flex: 1,
    // width: 140,
    // height: 'auto',
    borderRadius: SIZES.xSmall,
    backgroundColor: selectedTab == item ? COLORS.primary : COLORS.white,
    padding: SIZES.xSmall,
  }),
  tabTitle: (selectedTab, item) => ({
    fontFamily: FONT.regular,
    color: selectedTab == item ? COLORS.white : COLORS.black,
    textAlign: 'center',
    fontSize: SIZES.xSmall
  }),

});

export default styles;