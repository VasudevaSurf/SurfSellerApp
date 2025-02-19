import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {
  getFigmaDimension,
  getScreenHeight,
  getScreenWidth,
} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getFigmaDimension(12),
    paddingHorizontal: getFigmaDimension(16),
    backgroundColor: ColorPalette.White,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: getFigmaDimension(8),
  },
  leftIconContainer: {
    paddingVertical: getFigmaDimension(6),
    paddingHorizontal: getFigmaDimension(8),
  },
  rightIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  subtitleText: {
    color: ColorPalette.GREY_TEXT_200,
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
