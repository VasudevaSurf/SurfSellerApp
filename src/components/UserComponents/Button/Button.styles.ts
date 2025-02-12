import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {Spacing} from '../../../config/globalStyles';
import {getFigmaDimension} from '../../../helpers/screenSize';

export const buttonStyles = StyleSheet.create({
  baseButton: {
    borderRadius: Spacing.Medium,
    paddingVertical: Spacing.Medium,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: getFigmaDimension(58),
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: ColorPalette.ButtonPrimary,
  },
  secondaryButton: {
    backgroundColor: ColorPalette.White,
    borderWidth: getFigmaDimension(1),
    borderColor: ColorPalette.ButtonPrimary,
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
  },
  disabledButton: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: ColorPalette.White,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: ColorPalette.Primary,
    fontWeight: '600',
  },
  tertiaryButtonText: {
    color: ColorPalette.TextPrimary,
  },
});
