import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../../constants";

const styles = StyleSheet.create({



	container: {
		flex: 1,
		justifyContent: 'center',
	},


	body: {
		alignSelf: 'center',
	},
	title: {
		textAlign: 'center',
		fontFamily: FONT.heavy,
		fontSize: SIZES.large,
    letterSpacing: -2,
	},
	subTitle: {
    marginBottom: SIZES.large,
		textAlign: 'center',
		fontFamily: FONT.light,
		fontSize: SIZES.small,
    color: COLORS.gray
	},
	passwordField: {
		backgroundColor: COLORS.white,
		borderRadius: SIZES.xSmall,
		padding: SIZES.small / 2.5,
		marginBottom: SIZES.small,
		textAlign: 'center',
		fontSize: SIZES.xxLarge,
		letterSpacing: 6,
    fontFamily: FONT.light,
	},
	
	btn: {
		// width: 140,
		borderRadius: SIZES.xSmall / 2,
		backgroundColor: COLORS.primary,
		padding: SIZES.xSmall,
		alignSelf: 'center',
		marginBottom: SIZES.large,
	},
	btnText: {
		fontFamily: FONT.heavy,
		color: COLORS.white,
		textAlign: 'center',
		fontSize: SIZES.small
	},
  loaderIcon: {
    width: SIZES.xxLarge,
    height: SIZES.xxLarge,
    margin: 'auto',
    marginBottom: SIZES.small,
  },

});

export default styles;