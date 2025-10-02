import { StyleSheet } from 'react-native';
import { ColorPalette } from '../../../config/colorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  searchContainer: {
    padding: getScreenWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorPalette.White,
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(1),
    marginTop: getScreenHeight(0.2),
  },
  scrollContent: {
    gap: getScreenWidth(4),
  },
  slidingBarsContainer: {
    padding: getScreenWidth(4),
    backgroundColor: ColorPalette.White,
  },
  textStyle: {
    color: ColorPalette.GREY_TEXT_500,
  },
  productContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenHeight(1.2),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: getScreenWidth(4),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: getScreenHeight(20),
    marginTop: getScreenHeight(12),
  },
  emptyBoxPng: {
    width: getScreenWidth(45),
    height: getScreenWidth(45),
    resizeMode: 'contain',
  },
});
