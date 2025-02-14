import {StyleSheet} from 'react-native';
import {
  getScreenWidth,
  getScreenHeight,
  getFigmaDimension,
} from '../../../helpers/screenSize';
import {ColorPalette} from '../../../config/colorPalette';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.White,
  },
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
    marginTop: getScreenHeight(2),
  },
  scrollContent: {
    gap: getScreenWidth(4),
  },
  slidingBarsContainer: {
    padding: getScreenWidth(4),
    backgroundColor: ColorPalette.White,
  },
  textStyle: {
    color: ColorPalette.TotalText,
  },
  ProductContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenWidth(4),
  },
  modalContainer: {
    marginTop: 'auto',
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: ColorPalette.ButtonPrimary,
    width: 48,
    height: 48,
    borderRadius: getFigmaDimension(12),
    justifyContent: 'center',
    alignItems: 'center',
    padding: getFigmaDimension(12),
  },
});
