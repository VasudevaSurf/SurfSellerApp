import {Platform, StyleSheet} from 'react-native';
import {TypographyVariant} from './Typography.types';
import {ColorPalette} from '../../config/colorPalette';
import {getScreenHeight} from '../../helpers/screenSize';
import {Fonts} from '../../config/fonts';

export const textBaseStyles = StyleSheet.create({
  [TypographyVariant.DISPLAY_LARGE]: {
    fontSize: 56,
    lineHeight: 64,
    fontFamily: Fonts.MORANGA_LIGHT,
  },
  [TypographyVariant.DISPLAY_MEDIUM]: {
    fontSize: 48,
    lineHeight: 56,
    fontFamily: Fonts.MORANGA_LIGHT,
  },
  [TypographyVariant.HEADING_XLARGE]: {
    fontSize: 40,
    lineHeight: 48,
    fontFamily: Fonts.MORANGA_LIGHT,
  },
  [TypographyVariant.HEADING_LARGE]: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily: Fonts.MORANGA_LIGHT,
  },
  [TypographyVariant.HEADING_MEDIUM]: {
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 1,
    fontFamily: Fonts.POPPINS_BOLD,
  },
  [TypographyVariant.HEADING_SMALL]: {
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 1,
    fontFamily: Fonts.GILROY_SEMIBOLD,
  },
  [TypographyVariant.BODY_LARGE]: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: 'normal',
    fontFamily: Fonts.Inter,
  },
  [TypographyVariant.BODY_MEDIUM]: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'normal',
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  [TypographyVariant.BODY_SMALL]: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'normal',
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  [TypographyVariant.BODY_XSMALL]: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 'normal',
    fontFamily: Fonts.Inter,
  },
  [TypographyVariant.LABEL_LARGE]: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'normal',
    fontFamily: Fonts.Inter,
  },
  [TypographyVariant.LABEL_SMALL]: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 'normal',
    fontFamily: Fonts.Inter,
  },
  touchable: {
    marginBottom:
      Platform.OS === 'ios' ? -getScreenHeight(0.2) : -getScreenHeight(0.5),
  },
  fontColor: {
    color: ColorPalette.Black,
  },
});
