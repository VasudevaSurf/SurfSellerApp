import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../../config/colorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';

export const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(1),
    marginTop: getScreenHeight(1),
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
