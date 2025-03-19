import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {BorderRadius, Spacing} from '../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
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
      width: width || '100%',
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
      height: height || getScreenHeight(7), // Fixed height instead of minHeight
      backgroundColor: ColorPalette.White,
      paddingTop: 0,
      paddingBottom: 0,
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
      width: getScreenWidth(6),
      height: getScreenHeight(3),
    },
    countryCode: {
      fontSize: 16,
      color: ColorPalette.GREY_TEXT_400,
    },
    inputWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      height: '100%', // Ensure wrapper takes full height
    },
    input: {
      flex: 1,
      fontSize: 14,
      color: ColorPalette.GREY_TEXT_400,
      paddingVertical: 0, // Remove vertical padding
      height: '100%', // Take full height of the container
      textAlignVertical: 'center',
      includeFontPadding: false, // Remove additional font padding
    },
    label: {
      position: 'absolute',
      backgroundColor: ColorPalette.White,
      paddingHorizontal: Spacing.XXSmall,
      left: Spacing.XSmall,
      fontFamily: TypographyVariant.PSMALL_REGULAR,
      zIndex: 1,
    },
    flagContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dropdownSymbol: {
      marginLeft: Spacing.XXSmall,
      marginRight: Spacing.Medium,
      color: ColorPalette.GREY_TEXT_300,
    },
    error: {
      color: ColorPalette.RED_100,
      fontSize: 12,
      marginTop: Spacing.XXSmall,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: Spacing.Small,
      height: '100%',
    },
    rightText: {
      marginRight: Spacing.XXSmall,
      color: ColorPalette.ProgressLine,
    },
    rightIcon: {
      padding: Spacing.XXSmall,
    },
    iconSize: {
      width: getScreenWidth(6),
      height: getScreenHeight(3),
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
      height: '100%',
    },
    leftText: {
      color: ColorPalette.GREY_TEXT_400,
    },
  });
