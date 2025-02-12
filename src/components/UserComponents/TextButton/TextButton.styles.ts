import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';

export const textButtonStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  defaultText: {
    color: ColorPalette.Black,
  },
});
