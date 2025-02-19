import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {BorderRadius, Spacing} from '../../../config/globalStyles';
import {getFigmaDimension, getScreenHeight} from '../../../helpers/screenSize';
import {TypographyVariant} from '../Typography/Typography.types';

export const createStyles = (
  isFocused: boolean,
  hasError: boolean,
  hasValue: boolean,
  height?: number,
  width?: number | string,
  customBorderColor?: string,
  customFocusedBorderColor?: string,
  customErrorBorderColor?: string,
  customBorderWidth: number = 1,
  customFocusedBorderWidth: number = 2,
  customErrorBorderWidth: number = 2,
) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: Spacing.Medium,
      position: 'relative',
    },
    inputContainer: {
      borderWidth: hasError
        ? customErrorBorderWidth
        : isFocused
        ? customFocusedBorderWidth
        : customBorderWidth,
      borderRadius: BorderRadius.XSmall,
      borderColor: hasError
        ? customErrorBorderColor || ColorPalette.RED_100
        : isFocused
        ? customFocusedBorderColor || ColorPalette.GREY_TEXT_400
        : customBorderColor || ColorPalette.GREY_100,
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: height || getScreenHeight(7),
      backgroundColor: ColorPalette.White,
    },
    countrySection: {
      flexDirection: 'row',
      alignItems: 'center',
      height: '100%',
    },
    countryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.Small,
      height: '100%',
      justifyContent: 'center',
    },
    countryFlag: {
      width: getFigmaDimension(24),
      height: getFigmaDimension(24),
    },
    countryCode: {
      fontSize: 16,
      color: ColorPalette.GREY_TEXT_400,
    },
    inputWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      fontSize: 14,
      lineHeight: 16,
      color: ColorPalette.GREY_TEXT_400,
      paddingVertical: Spacing.Small,
    },
    label: {
      position: 'absolute',
      backgroundColor: ColorPalette.White,
      paddingHorizontal: Spacing.XXSmall,
      left: Spacing.XSmall,
      alignSelf: 'center',
      textAlign: 'center',
      fontFamily: TypographyVariant.PSMALL_REGULAR,
    },
    flagContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dropdownSymbol: {
      marginLeft: Spacing.XXSmall,
      marginRight: Spacing.Medium,
    },
    error: {
      color: ColorPalette.RED_100,
      fontSize: 12,
      marginTop: Spacing.XXSmall,
      marginLeft: Spacing.Small,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: Spacing.Small,
    },
    rightText: {
      marginRight: Spacing.XXSmall,
      color: ColorPalette.GREY_TEXT_400,
    },
    rightIcon: {
      padding: Spacing.XXSmall,
    },
    iconSize: {
      width: getFigmaDimension(24),
      height: getFigmaDimension(24),
    },
    iconContainer: {
      marginHorizontal: Spacing.XXSmall,
      justifyContent: 'center',
      alignItems: 'center',
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: Spacing.XSmall,
    },
  });
