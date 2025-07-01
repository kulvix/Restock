import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../../constants";

const styles = StyleSheet.create({



	container: {
		flex: 1,
		justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
	},

	tickImage: {
		width: 100,
		height: 100,
		alignSelf: 'center',
		borderRadius: 100,
	},
	body: {
		alignSelf: 'center',
	},
	title: {
		textAlign: 'center',
		fontFamily: FONT.heavy,
		fontSize: SIZES.large,
		color: COLORS.white,
		marginTop: SIZES.xLarge,
		marginBottom: SIZES.xLarge * 2,
	},

  btnBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    gap: SIZES.small,
  },
	
	btn1: {
		borderRadius: SIZES.xSmall / 2,
		backgroundColor: COLORS.white,
		padding: SIZES.xSmall,
		alignSelf: 'center',
		marginBottom: SIZES.small,
	},
	btn1Text: {
		fontFamily: FONT.bold,
		color: COLORS.primary,
		textAlign: 'center',
		fontSize: SIZES.small
	},

	btn2: {
		borderWidth: 1,
		borderColor: COLORS.white,
		borderRadius: SIZES.xSmall / 2,
		padding: SIZES.xSmall,
		alignSelf: 'center',
		marginBottom: SIZES.small,
	},
	btn2Text: {
		fontFamily: FONT.bold,
		color: COLORS.white,
		textAlign: 'center',
		fontSize: SIZES.small
	},

});

export default styles;