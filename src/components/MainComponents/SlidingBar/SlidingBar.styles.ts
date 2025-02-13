import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenWidth, getScreenHeight} from '../../../helpers/screenSize';

export const slidingBarStyles = StyleSheet.create({
  containerWrapper: {
    backgroundColor: ColorPalette.BackgroundPrimary,
  },
  scrollContent: {
    flexDirection: 'row',
    gap: getScreenWidth(4),
  },
  option: {
    borderRadius: getScreenWidth(2),
    paddingVertical: getScreenHeight(1.25),
    paddingHorizontal: getScreenWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorPalette.ButtonBackHome,
  },
  selectedOption: {
    backgroundColor: ColorPalette.SurfacePrimary,
  },
  optionText: {
    color: ColorPalette.TextSecondary,
  },
  selectedOptionText: {
    color: ColorPalette.White,
  },
});