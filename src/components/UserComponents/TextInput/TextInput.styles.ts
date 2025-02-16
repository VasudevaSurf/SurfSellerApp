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
) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: Spacing.Medium,
      position: 'relative',
    },
    inputContainer: {
      borderWidth: 2,
      borderRadius: BorderRadius.XSmall,
      borderColor: hasError
        ? ColorPalette.RED_100
        : isFocused
        ? ColorPalette.GREY_TEXT_400
        : ColorPalette.GREY_100,
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
  });
