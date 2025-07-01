import { StyleSheet, Platform } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.xSmall,
  },
  innerContainer: {
    padding: SIZES.xSmall,
    paddingTop: 0,
    paddingBottom: SIZES.xSmall,
  },
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    height: SIZES.xLarge * 1.7,
    
  },
  searchInputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.xSmall,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.small,
    gap: SIZES.small,
    height: "100%",
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        elevation: 10,
      },
      
    }),
  },
  searchInput: {
    fontFamily: FONT.bold,
    width: "100%",
    fontSize: SIZES.medium,
    
  },
  placeholderOverlay: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    position: 'absolute',
    left: SIZES.xLarge * 2,
    top: SIZES.xLarge / 1.8,
    color: '#888',
  },

  filterBtn: {
    width: 48,
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xSmall,
    justifyContent: "center",
    alignItems: "center",
  },
  searchResultContainer: {
    position: 'absolute',
    top: SIZES.xLarge * 1.5,
    left: 0,
    right: 0,
    zIndex: 10,
    maxHeight: SIZES.xxLarge * 10,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.large,
    borderRadius: SIZES.medium,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        elevation: 10,
      },
      
    }),
  },
  searchResultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign: 'center',
    paddingVertical: SIZES.xSmall / 2,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.xSmall / 2,
    paddingHorizontal: SIZES.small,
    marginBottom: SIZES.xSmall / 2,
  },
  searchResultText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    flex: 1,
    marginRight: SIZES.large,
  },
  searchResultIconBox: {
    // position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  searchGroupTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 10,
  },
  
});

export default styles;
