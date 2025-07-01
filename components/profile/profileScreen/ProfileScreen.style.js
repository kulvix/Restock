import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent:'center',
    paddingBottom: SIZES.xLarge,
  },
  innerContainer: {
    padding: SIZES.large,
    paddingBottom: SIZES.xxLarge * 2
  },
  profileDetailsContainer: {
    flex: 1,
    width: '100%',
    padding: SIZES.large,
    paddingBottom: SIZES.xLarge,
    paddingTop: SIZES.xxLarge * 2,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: SIZES.xLarge * 2,
    borderBottomRightRadius: SIZES.xLarge * 2,
    // marginBottom: SIZES.medium,
    // marginBottom: -SIZES.large * 2
  },
  profilePicSection: {
    marginBottom: SIZES.large,
  },
  profilePicBox: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 100,
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: COLORS.white,
    marginBottom: SIZES.small,
  },
  profilePicText: {
    fontFamily: FONT.heavy,
    color: COLORS.white,
    fontSize: SIZES.xxLarge,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  profileName: {
    fontFamily: FONT.bold,
    color: COLORS.white,
    fontSize: SIZES.large,
    textAlign: 'center',
  },


  walletSection: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: SIZES.large,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  walletBox: {
    flexDirection: 'row',
    marginBottom: SIZES.large,
    alignItems: 'center',
  },
  walletInnerBox: {

  },
  eyeBtn: {
    marginRight: SIZES.xSmall,
  },
  walletTitleText: {
    fontFamily: FONT.heavy,
    fontSize: SIZES.large,
    color: COLORS.white,
    letterSpacing: -1.5
  },
  walletSubtitleText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xSmall,
    color: COLORS.white,
  },
  line: {
    width: 1,
    height: 50,
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.medium
  },


  actionBtnSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SIZES.large,
  },
  btn: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 3,
    padding: SIZES.small / 2,
    marginHorizontal: SIZES.small / 3
  },
  btnText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xSmall,
    color: COLORS.primary,
    textAlign: 'center',
  },
  ProfileDetailsSection: {
    
  },
  detailtext: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xSmall,
    color: COLORS.white,
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.xSmall,
  },
  lowerSection: {
    flexDirection: 'row',
    fontFamily: FONT.bold,
    fontSize: SIZES.xSmall,
    color: COLORS.white,
    justifyContent: 'space-around'
  },
  modalContainer: {
    flex: 1,
    // height: "80%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContentWrapper: {
    flex: 1,
    width: '100%',
    height: "80%",
    // minHeight: "80%",
    backgroundColor: COLORS.lightWhite,
    borderTopRightRadius: SIZES.large,
    borderTopLeftRadius: SIZES.large,
    overflow: "hidden",
  },
  scrollContent: {},
  modalContent: {
    width: "100%",
    backgroundColor: COLORS.lightWhite,
    paddingBottom: SIZES.xxLarge,
    padding: SIZES.small,
    borderTopRightRadius: SIZES.large,
    borderTopLeftRadius: SIZES.large,
  },
  modalTitleBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: SIZES.small,
  },
  modalTitle: {
    fontSize: SIZES.medium,
    marginLeft: -SIZES.medium,
    fontFamily: FONT.heavy,
    alignSelf: 'center',
  },
  closeButton: {
    position: "absolute",
    left: 0,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    // backgroundColor: COLORS.primary,
  },

  
	supportCard: {
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
	supportCardSubTitle: {
		color: COLORS.black,
		fontFamily: FONT.bold,
		fontSize: SIZES.small,
		letterSpacing: 1,
    textTransform: 'uppercase',
	},
	supportCardTitle: {
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
