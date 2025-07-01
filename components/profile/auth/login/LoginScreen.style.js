import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
		// flex: 1,
    
    flexGrow: 1,
    justifyContent: 'center',
    // alignContent: 'center',
    // verticalAlign: 'middle',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  header: {
    paddingHorizontal: SIZES.xxLarge,
    paddingVertical: SIZES.xxLarge,
    paddingTop: SIZES.xxLarge * 2,
    alignItems: 'center',
    justifyContent: 'center',
		marginBottom: SIZES.xxLarge,
  },
  imageIcon: {
    // marginVertical: SIZES.xxLarge,
		width: '100%',
		height: SIZES.xLarge * 3.5,
  },

  googleBtn: {
    alignSelf:'center',
    flexDirection: 'row',
    gap: SIZES.small,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    borderRadius: SIZES.small,
    marginBottom: SIZES.small,
    height: SIZES.xLarge * 2,
    padding: SIZES.xSmall / 5,
    paddingRight: SIZES.large,
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
    alignItems: 'flex-start',
    width: SIZES.xLarge,
    height: SIZES.xLarge,
  },
  loaderIcon: {
    width: SIZES.xxLarge,
    height: SIZES.xxLarge,
  },
  googleBtnText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.darkWhite
  },

  facebookBtn: {
    flexDirection: 'row',
    gap: SIZES.large,
    alignItems: 'center',
    padding: SIZES.xSmall / 2,
    backgroundColor: '#1877F2',
    borderRadius: SIZES.small,
    marginBottom: SIZES.small,
  },
  facebookBtnPressed: {
    opacity: .6,
  },
  facebookBtnImageBox: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    padding: SIZES.xSmall,
  },
  facebookBtnIcon: {
    width: SIZES.xLarge,
    height: SIZES.xLarge,
  },
  facebookBtnText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.darkWhite
  },
  orLoginText: {
    marginVertical: SIZES.large,
    justifyContent: 'center',
		alignItems: 'center',
		fontFamily: FONT.heavy,
    fontSize: SIZES.medium,
		alignSelf: 'center',
  },
  inputFieldErrorText: {
		fontFamily: FONT.regular,
    fontSize: SIZES.small,
		alignSelf: 'flex-end',
    color: COLORS.error,
  },
  formMessageBox: {
    display: 'none',
    backgroundColor: COLORS.gray,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    marginBottom: SIZES.small,
  },
  formMessage: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    textAlign: 'center',
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
  
  
  formBody: {
    marginHorizontal: SIZES.small,
    // paddingVertical: SIZES.small,
  },
  label: {
		fontFamily: FONT.bold,
    fontSize: SIZES.medium,
  },
  inputBox: {
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
  forgotPasswordLink: {
    width: "40%",
    marginTop: -SIZES.medium / 1.5,
    padding: SIZES.xSmall,
		color: COLORS.black,
		fontFamily: FONT.bold,
	},
	formBtnSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: SIZES.small,
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
		fontSize: SIZES.xxLarge,
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
		// marginTop: SIZES.xxLarge * 1.5,
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
