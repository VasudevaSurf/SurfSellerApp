import {StyleSheet} from 'react-native';
import {
  getScreenWidth,
  getScreenHeight,
  getFigmaDimension,
} from '../../../helpers/screenSize';
import {ColorPalette} from '../../../config/colorPalette';

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
    marginTop: getScreenHeight(2),
  },
  scrollContent: {
    gap: getScreenWidth(4),
  },
  textStyle: {
    color: ColorPalette.GREY_TEXT_500,
  },
  productContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenWidth(4),
  },
});
