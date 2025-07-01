import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
		flex: 1,
    paddingBottom: SIZES.xxLarge * 3,
  },
  header: {
    // paddingHorizontal: SIZES.xxLarge,
    height: 350,
    flexDirection: "row",
		borderBottomEndRadius: SIZES.xLarge * 2,
		borderBottomStartRadius: SIZES.xLarge * 2,
		backgroundColor: COLORS.primary,
    justifyContent: "space-between",
    alignItems: 'center',
    justifyContent: 'center',
		marginBottom: SIZES.large,
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    paddingHorizontal: SIZES.xxLarge,
    paddingTop: SIZES.xxLarge * 3,
    paddingBottom: 0,
    // width: '100%',
    // height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    // height: '65%',
  },
	headerTitle: {
		marginTop: SIZES.xxLarge * 2,
    fontFamily: FONT.bold,
    fontSize: SIZES.large * 2,
    letterSpacing: -2,
		textAlign: 'center',
		color: COLORS.white,
    zIndex: 1,
  },
	logoSection: {
		justifyContent: 'center',
		height: SIZES.xxLarge * 2.5,
	},
  imageIcon: {
    // marginVertical: SIZES.xxLarge,
    alignSelf: 'center',
		width: SIZES.xLarge * 1.5,
		height: SIZES.xLarge * 1.5,
  },
  inputFieldErrorText: {
    // display: 'none',
		fontFamily: FONT.regular,
    fontSize: SIZES.small,
		alignSelf: 'flex-end',
    color: COLORS.error,
  },
  emailErrorText: {
    // display: 'none',
		fontFamily: FONT.regular,
    fontSize: SIZES.small,
		alignSelf: 'flex-end',
    color: COLORS.error,
  },
  passwordErrorText: {
    // display: 'none',
		fontFamily: FONT.regular,
    fontSize: SIZES.small,
		alignSelf: 'flex-end',
    color: COLORS.error,
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
  inputFlexBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
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
	formBtnSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: SIZES.small,
    marginTop: SIZES.small,
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
  loaderIcon: {
    width: SIZES.xxLarge,
    height: SIZES.xxLarge,
  },
	footerSection: {
		flexDirection: 'row',
		marginTop: SIZES.large,
		marginHorizontal: SIZES.small,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
    paddingBottom: SIZES.xxLarge * 4,
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
