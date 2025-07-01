import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS, SHADOWS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
		flex: 1,
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: SIZES.xxLarge,
    // paddingVertical: SIZES.xxLarge,
    alignItems: 'center',
    justifyContent: 'center',
		// marginBottom: SIZES.xxLarge * 2,
  },
  imageIcon: {
		height: SIZES.xLarge * 2.5,
  },

  googleBtn: {
    flexDirection: 'row',
    gap: SIZES.large,
    alignItems: 'center',
    padding: SIZES.xSmall / 2,
    backgroundColor: '#4285F4',
    borderRadius: SIZES.small,
    // marginBottom: SIZES.small,
  },
  googleBtnPressed: {
    opacity: .6,
  },
  googleBtnImageBox: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    padding: SIZES.xSmall,
  },
  googleBtnIcon: {
    width: SIZES.xLarge,
    height: SIZES.xLarge,
  },
  googleBtnText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.darkWhite
  },
  orLoginText: {
    marginVertical: SIZES.large,
    justifyContent: 'center',
		alignItems: 'center',
		fontFamily: FONT.bold,
    fontSize: SIZES.medium,
		alignSelf: 'center',
  },
	headerTitle: {
		marginVertical: SIZES.xLarge * 2,
    fontFamily: FONT.bold,
    fontSize: SIZES.large * 2,
    letterSpacing: -2,
		textAlign: 'center',
		color: COLORS.white,
  },
	logoSection: {
		justifyContent: 'center',
		height: SIZES.xxLarge * 2.5,
	},
  
  inputFieldErrorText: {
		fontFamily: FONT.regular,
    fontSize: SIZES.small,
		alignSelf: 'flex-end',
    color: COLORS.error,
    marginBottom: SIZES.small,
  },

  formBody: {
    marginHorizontal: SIZES.small,
    // paddingVertical: SIZES.small,
  },
  label: {
		fontFamily: FONT.bold,
    fontSize: SIZES.medium,
  },



  inputBox: {
    flex: 1,
    // marginBottom: SIZES.small,
  },
	input: {
    height: SIZES.xLarge * 2,
    padding: SIZES.small,
    borderWidth: 0.2,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    borderColor: COLORS.gray,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    marginBottom: SIZES.medium
	},
	inputError: {
    borderWidth: 0.5,
    borderRadius: SIZES.small,
    borderColor: COLORS.error,
	},
  showPasswordIconBox: {
    position: 'absolute',
    // backgroundColor: COLORS.error,
    top: SIZES.small / 4,
    borderRadius: SIZES.small,
    alignSelf: 'flex-end',
    padding: SIZES.small,
  },
  showPasswordIcon: {
    fontSize: SIZES.large,
    color: COLORS.gray,
  },
  loaderIcon: {
    width: SIZES.xxLarge,
    height: SIZES.xxLarge,
  },















  cardContainer: {
    padding: SIZES.large,
    borderRadius: SIZES.large,
  },
  cardInnerContainer: {
    flex: 1,
    padding: SIZES.large,
    borderRadius: SIZES.large,
    overflow: 'hidden',
    backgroundColor: COLORS.grayDark,
    elevation: 20,
  },
  cardRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SIZES.medium,
    alignItems: 'center',
  },
  cardText: {
    flexDirection: 'row',
    color: COLORS.white,
    fontFamily: FONT.bold
  },
  cardNumberText: {
    fontSize: SIZES.medium,
  },
  cardCvvText: {
    fontFamily: FONT.light,
  },
  cardHolderNameText: {
    textTransform: 'uppercase',
  },
  cardChip: {
    width: 50,
    height: 35,
  },












	// input: {
  //   marginBottom: SIZES.small,
  //   height: SIZES.xLarge * 2,
  //   padding: SIZES.small,
  //   borderWidth: 0.2,
  //   backgroundColor: COLORS.white,
  //   borderRadius: SIZES.small,
  //   borderColor: COLORS.gray,
  //   fontFamily: FONT.regular,
  //   fontSize: SIZES.medium,
	// },
	formBtnSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: SIZES.small,
	},
  flexRow: {
    flex: 1,
    flexDirection:'row',
    gap: 5,
  },
	formBtn: {
		backgroundColor: COLORS.primary,
		padding: SIZES.medium,
		width: SIZES.xxLarge * 3,
		borderTopLeftRadius: SIZES.xxLarge,
		borderBottomLeftRadius: SIZES.xxLarge,
	},
	formBtnPressed: {
		opacity: .6,
	},
	formTitle: {
		color: COLORS.black,
		fontFamily: FONT.bold,
		fontSize: SIZES.xLarge,
		letterSpacing: -2,
	},
	formBtnText: {
		color: COLORS.white,
		fontFamily: FONT.bold,
		fontSize: SIZES.xLarge,
	},
	formBtnIcon: {
		color: COLORS.white,
		fontFamily: FONT.heavy,
		textAlign: "center",
		fontSize: SIZES.xLarge,
	},
	footerSection: {
    flexDirection: 'row',
		marginTop: SIZES.xxLarge * 1.5,
		marginHorizontal: SIZES.small,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: COLORS.primary,
		
	},
	footerText: {
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: FONT.regular,
		alignSelf: 'center',
	},
	footerLink: {
    padding: SIZES.xSmall,
		color: COLORS.primary,
		fontFamily: FONT.bold
	},
});

export default styles;
