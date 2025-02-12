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
        ? ColorPalette.BorderError
        : isFocused
        ? ColorPalette.BorderPrimary
        : ColorPalette.BorderSecondary,
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: height || getScreenHeight(7),
      backgroundColor: ColorPalette.BackgroundPrimary,
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
      color: ColorPalette.TextSmall,
    },
    inputWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: ColorPalette.TextPrimary,
    },
    label: {
      position: 'absolute',
      backgroundColor: ColorPalette.BackgroundPrimary,
      paddingHorizontal: Spacing.XXSmall,
      left: Spacing.XSmall,
      alignSelf: 'center',
      textAlign: 'center',
      fontFamily: TypographyVariant.BODY_SMALL,
    },
    flagContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dropdownSymbol: {
      fontSize: 10,
      color: ColorPalette.TextSecondary,
      marginLeft: Spacing.XXSmall,
      marginRight: Spacing.Medium,
    },
    error: {
      color: ColorPalette.TextError,
      fontSize: 12,
      marginTop: Spacing.XXSmall,
      marginLeft: Spacing.Small,
    },
  });
