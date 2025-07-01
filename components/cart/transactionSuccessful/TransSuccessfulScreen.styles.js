import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({



	container: {
		flex: 1,
		// marginTop: SIZES.xLarge * 2,
		justifyContent: 'center',
	},


	body: {
		// alignSelf: 'center',
	},
  titleBox: {
    padding: SIZES.xxLarge,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SIZES.medium,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xLarge,
    // margin: SIZES.small,
  },
  tickImage: {
		width: 70,
		height: 70,
		alignSelf: 'center',
		borderRadius: 100,
	},
	title: {
		textAlign: 'center',
		fontFamily: FONT.heavy,
		fontSize: SIZES.large,
		color: COLORS.white,
	},
	subTitle: {
		textAlign: 'center',
		fontFamily: FONT.regular,
		fontSize: SIZES.medium,
		color: COLORS.grayDark,
	},

  btnBox: {
    padding: SIZES.large,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SIZES.xSmall,
  },
	
	btn: {
		width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
		borderRadius: SIZES.xSmall / 2,
    borderWidth: 1,
    borderColor: COLORS.primary,
		backgroundColor: COLORS.white,
		// marginBottom: SIZES.small,
	},
	btnText: {
		fontFamily: FONT.bold,
		color: COLORS.primary,
		textAlign: 'center',
		fontSize: SIZES.xSmall
	},

});

export default styles;