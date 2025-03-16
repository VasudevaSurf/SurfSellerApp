import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from './Button.types';
import {TypographyVariant} from '../Typography/Typography.types';

export const getTypographyVariant = (size: ButtonSize): TypographyVariant => {
  switch (size) {
    case ButtonSize.LARGE:
      return TypographyVariant.H5_SEMIBOLD;
    case ButtonSize.MEDIUM:
      return TypographyVariant.LMEDIUM_EXTRABOLD;
    case ButtonSize.SMALL:
      return TypographyVariant.LMEDIUM_MEDIUM;
    default:
      return TypographyVariant.PMEDIUM_SEMIBOLD;
  }
};

export const getButtonHeight = (size: ButtonSize): number => {
  switch (size) {
    case ButtonSize.LARGE:
      return 60;
    case ButtonSize.MEDIUM:
      return 58;
    case ButtonSize.SMALL:
      return 40;
    default:
      return 58;
  }
};

export const getBackgroundColor = (
  variant: ButtonVariant,
  type: ButtonType,
  state: ButtonState,
) => {
  if (variant === ButtonVariant.PRIMARY) {
    switch (type) {
      case ButtonType.PRIMARY:
        switch (state) {
          case ButtonState.DEFAULT:
            return {
              isGradient: true,
              colors: ['#A600F7', '#9101CF'],
              start: {x: 0, y: 0},
              end: {x: 1, y: 1},
            };
          case ButtonState.AI:
            return {
              isGradient: true,
              colors: ['#FC00FF', '#00B6DE'],
              start: {x: 0, y: 0},
              end: {x: 1, y: 1},
            };
          case ButtonState.FILEUPLOAD:
            return ColorPalette.ProgressLine;
          case ButtonState.HOVERED:
            return ColorPalette.PURPLE_100;
          case ButtonState.PRESSED:
            return {
              isGradient: true,
              colors: ['#A600F7', '#9101CF'],
              start: {x: 0, y: 0},
              end: {x: 1, y: 1},
            };
          case ButtonState.DISABLED:
            return ColorPalette.PURPLE_100;
          default:
            return ColorPalette.PURPLE_300;
        }
      case ButtonType.OUTLINED:
        return 'transparent';
      case ButtonType.TERTIARY:
      case ButtonType.LINK:
        return 'transparent';
      default:
        return ColorPalette.PURPLE_300;
    }
  } else {
    switch (type) {
      case ButtonType.PRIMARY:
        switch (state) {
          case ButtonState.DEFAULT:
            return ColorPalette.PURPLE_ROSE_300;
          case ButtonState.HOVERED:
            return ColorPalette.PURPLE_ROSE_100;
          case ButtonState.PRESSED:
            return ColorPalette.PURPLE_ROSE_00;
          case ButtonState.DISABLED:
            return ColorPalette.PURPLE_ROSE_100;
          default:
            return ColorPalette.PURPLE_ROSE_300;
        }
      case ButtonType.OUTLINED:
        return 'transparent';
      case ButtonType.TERTIARY:
      case ButtonType.LINK:
        return 'transparent';
      default:
        return ColorPalette.PURPLE_ROSE_300;
    }
  }
};

export const getTextColor = (
  variant: ButtonVariant,
  type: ButtonType,
  state: ButtonState,
) => {
  if (type === ButtonType.PRIMARY) {
    return ColorPalette.White;
  }

  if (type === ButtonType.OUTLINED) {
    return ColorPalette.PURPLE_300;
  }

  if (type === ButtonType.TERTIARY) {
    return ColorPalette.PURPLE_300;
  }

  return ColorPalette.PURPLE_ROSE_300;
};

export const createButtonStyles = (buttonHeight: number) =>
  StyleSheet.create({
    container: {
      height: buttonHeight,
      borderRadius: buttonHeight / 5,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: buttonHeight / 2,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      marginRight: 8,
    },
    iconRight: {
      marginLeft: 8,
    },
    outlined: {
      borderWidth: 1,
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
    },
  });
