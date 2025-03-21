import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';

export const slidingBarStyles = StyleSheet.create({
  containerWrapper: {
    backgroundColor: ColorPalette.White,
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
    backgroundColor: ColorPalette.MainHeading,
  },
  optionText: {
    color: ColorPalette.Black,
  },
  selectedOptionText: {
    color: ColorPalette.White,
  },
});
