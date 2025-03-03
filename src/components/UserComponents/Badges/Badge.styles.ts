import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {BorderRadius} from '../../../config/globalStyles';
import {getScreenWidth} from '../../../helpers/screenSize';
import {BadgeType, BadgeVariant} from './Badge.types';

const getBackgroundColor = (type: BadgeType, variant: BadgeVariant) => {
  if (variant === BadgeVariant.GHOST) {
    return 'transparent';
  }

  const colors = {
    [BadgeType.PRIMARY]: ColorPalette.PURPLE_300,
    [BadgeType.SECONDARY]: ColorPalette.GREY_300,
    [BadgeType.SUCCESS]: ColorPalette.Green_200,
    [BadgeType.WARNING]: ColorPalette.YELLOW_200,
    [BadgeType.DANGER]: ColorPalette.RED_200,
  };

  return variant === BadgeVariant.FILLED ? colors[type] : 'transparent';
};

const getBorderColor = (type: BadgeType, customBorderColor?: string) => {
  if (customBorderColor) {
    return customBorderColor;
  }

  const colors = {
    [BadgeType.PRIMARY]: ColorPalette.PURPLE_300,
    [BadgeType.SECONDARY]: ColorPalette.GREY_300,
    [BadgeType.SUCCESS]: ColorPalette.Green_200,
    [BadgeType.WARNING]: ColorPalette.YELLOW_200,
    [BadgeType.DANGER]: ColorPalette.RED_200,
  };

  return colors[type];
};

export const getTextColor = (
  type: BadgeType,
  variant: BadgeVariant,
  customTextColor?: string,
) => {
  if (customTextColor) {
    return customTextColor;
  }

  if (variant === BadgeVariant.FILLED) {
    return ColorPalette.White;
  }

  const colors = {
    [BadgeType.PRIMARY]: ColorPalette.PURPLE_300,
    [BadgeType.SECONDARY]: ColorPalette.GREY_300,
    [BadgeType.SUCCESS]: ColorPalette.Green_200,
    [BadgeType.WARNING]: ColorPalette.YELLOW_200,
    [BadgeType.DANGER]: ColorPalette.RED_200,
  };

  return colors[type];
};

export const createBadgeStyles = (
  type: BadgeType,
  variant: BadgeVariant,
  customTextColor?: string,
  customBorderColor?: string,
) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: getScreenWidth(4), // Changed from Spacing.Medium
      paddingVertical: getScreenWidth(1), // Changed from Spacing.XXSmall
      borderRadius: BorderRadius.Small,
      backgroundColor: getBackgroundColor(type, variant),
      borderWidth: variant === BadgeVariant.OUTLINE ? 1 : 0,
      borderColor:
        variant === BadgeVariant.OUTLINE
          ? getBorderColor(type, customBorderColor)
          : undefined,
    },
    text: {
      color: getTextColor(type, variant, customTextColor),
      marginHorizontal: getScreenWidth(1), // Changed from Spacing.XXSmall
    },
    icon: {
      marginHorizontal: getScreenWidth(1), // Changed from Spacing.XXSmall
    },
    disabled: {
      opacity: 0.5,
    },
  });
