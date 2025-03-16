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
    // borderRadius removed as it's handled by CustomSquircle
    paddingVertical: getScreenHeight(1.25),
    paddingHorizontal: getScreenWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor is now handled directly in the component
  },
  optionText: {
    color: ColorPalette.Black,
  },
  selectedOptionText: {
    color: ColorPalette.White,
  },
});
