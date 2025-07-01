import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({

	container: {
		flex: 1,
		padding: SIZES.medium,
	},
	sectionTitle: {
		textAlign: 'left',
		fontFamily: FONT.heavy,
		fontSize: SIZES.large,
		marginBottom: SIZES.small
	},
	card: (item, selectedDelivery) => ({
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: SIZES.small,
		// backgroundColor: item == selectedDelivery  ? COLORS.lightPrimary : COLORS.white,
		borderWidth:  SIZES.xSmall / 4,
		borderColor:  item == selectedDelivery  ? COLORS.lightPrimary : COLORS.lightWhite,
		backgroundColor: COLORS.white,
		padding: SIZES.medium,
		marginBottom: SIZES.small
	}),
	checkbox: (item, selectedDelivery) => ({
		width: 30,
		height: 30,
		backgroundColor: item == selectedDelivery  ? COLORS.primary : COLORS.white,
		borderWidth: SIZES.small / 2,
		borderColor: item == selectedDelivery  ? COLORS.lightPrimary : COLORS.lightWhite,
		borderRadius: SIZES.large,
	}),
	cardDetailBox: {
    width: "70%",
		paddingHorizontal: SIZES.xSmall,
	},
  cardSubtitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xSmall / 2,
  },
	cardTitleText: {
		textAlign: 'left',
		fontFamily: FONT.bold,
		fontSize: SIZES.medium,
	},
	cardSubtitleText: {
		width: "100%",
		textAlign: 'left',
		fontFamily: FONT.regular,
		fontSize: SIZES.small,
		lineHeight: SIZES.large,
		color: COLORS.gray,
    paddingVertical: SIZES.xSmall / 2,
	},
  cardSubtitleIcon: {
    fontSize: SIZES.small
  },
	editBtnBox: {
    // width: "100%",
	},
	editBtnText: {
		padding: SIZES.xSmall / 2,
		backgroundColor: COLORS.lightWhite,
		fontSize: SIZES.medium,
		borderWidth: SIZES.xSmall / 8,
		borderColor: '#eee',
		borderRadius: SIZES.small / 2,
	},
  


	// Payment method styles /////////////////////////////

	paymentCard: (item, selectedPayment) => ({
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: SIZES.small,
		borderWidth:  SIZES.xSmall / 4,
		borderColor:  item == selectedPayment  ? COLORS.lightPrimary : COLORS.lightWhite,
		backgroundColor: COLORS.white,
		padding: SIZES.medium,
		marginBottom: SIZES.small
	}),

	paymentCardDetailBox: {
		// paddingHorizontal: SIZES.large,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	imageIcon: {
		width: 40, 
		height: 40,
		marginRight: SIZES.small,
	},
	paymentCardTitleText: {
		textAlign: 'left',
		fontFamily: FONT.bold,
		fontSize: SIZES.medium,
	},
	paymentCheckbox: (item, selectedPayment) => ({
		width: 30,
		height: 30,
		backgroundColor: item == selectedPayment  ? COLORS.primary : COLORS.white,
		borderWidth: SIZES.small / 2,
		borderColor: item == selectedPayment  ? COLORS.lightPrimary : COLORS.lightWhite,
		borderRadius: SIZES.large,
	}),
  locationErrorBox: {
    flexDirection: 'column',
    gap: SIZES.xSmall,
    justifyContent:'center',
    alignSelf: 'center',
    verticalAlign: 'middle',
    padding: SIZES.small,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.small,
    marginHorizontal: SIZES.medium,
    borderWidth: 1, borderColor: COLORS.gray,
  },
  message: {
    justifyContent:'center',
    fontFamily: FONT.bold,
    textAlign: 'center',
    lineHeight: SIZES.medium,
  },
  btnBox: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: SIZES.small,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: SIZES.xSmall / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.xSmall / 2,
    borderWidth: 1,
    borderColor: COLORS.grayDark,
  },
  btnText: {
    fontFamily: FONT.bold,
    color: COLORS.grayDark,
    fontSize: SIZES.small,  
  },

  mapBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.grayDark,
    padding: SIZES.xSmall / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.xSmall / 2,
  },
  mapBtnText: {
    fontFamily: FONT.bold,
    color: COLORS.white,
    fontSize: SIZES.small,  
  },








});

export default styles;