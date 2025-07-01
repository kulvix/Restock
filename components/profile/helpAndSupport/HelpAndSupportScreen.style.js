import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS, SHADOWS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
		flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    gap: SIZES.xLarge,
    padding: SIZES.large,
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













	addNewCardBtn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: SIZES.xSmall,
		backgroundColor: COLORS.white,
		padding: SIZES.medium,
    height: SIZES.xxLarge * 5,
		borderRadius: SIZES.large,
    borderWidth: 1,
    borderColor: COLORS.primary,
    overflow: 'hidden',
	},
	btnSubText: {
		color: COLORS.black,
		fontFamily: FONT.bold,
		fontSize: SIZES.medium,
		letterSpacing: -2,
	},
	btnText: {
		color: COLORS.black,
		fontFamily: FONT.bold,
		fontSize: SIZES.xLarge,
		letterSpacing: -2,
	},
	btnIcon: {
    backgroundColor: COLORS.primary,
    padding: SIZES.small,
    borderRadius: SIZES.small,
		color: COLORS.white,
		fontFamily: FONT.heavy,
		fontSize: SIZES.xLarge,
	},
  btnGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: SIZES.small,
  },
  supportImage: {
    position: 'absolute',
    width: 155,
    height: 155,
    bottom: 0,
    right: 0,
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
});

export default styles;
