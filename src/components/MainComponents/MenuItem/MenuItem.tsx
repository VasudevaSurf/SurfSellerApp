import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {MenuItemProps} from './MenuItem.types';
import {styles} from './MenuItem.styles';

/**
 * ArrowRight component used as the default right icon
 */
const ArrowRight = () => (
  <View style={styles.arrowContainer}>
    <Typography
      variant={TypographyVariant.LMEDIUM_SEMIBOLD}
      text=">"
      customTextStyles={{color: ColorPalette.GREY_400}}
    />
  </View>
);

/**
 * MenuItem component: A reusable component for menu/list items with customizable icons and styles.
 * Supports left and right icons, subtitles, and various style customizations.
 *
 * @example
 * <MenuItem
 *   label="Personal Info"
 *   leftIcon={<UserIcon />}
 *   onPress={() => navigate('Profile')}
 * />
 */
export const MenuItem: React.FC<MenuItemProps> = ({
  label,
  onPress,
  leftIcon,
  rightIcon = <ArrowRight />,
  testID,
  disabled = false,
  variant = TypographyVariant.LMEDIUM_SEMIBOLD,
  containerStyle,
  textStyle,
  leftIconContainerStyle,
  rightIconContainerStyle,
  showBottomBorder = true,
  subtitle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        showBottomBorder && styles.bottomBorder,
        containerStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      testID={testID}>
      <View style={styles.content}>
        {leftIcon && (
          <View style={[styles.leftIconContainer, leftIconContainerStyle]}>
            {leftIcon}
          </View>
        )}
        <View>
          <Typography
            variant={variant}
            text={label}
            customTextStyles={[styles.labelText, textStyle]}
          />
          {subtitle && (
            <Typography
              variant={TypographyVariant.LSMALL_REGULAR}
              text={subtitle}
              customTextStyles={styles.subtitleText}
            />
          )}
        </View>
      </View>
      {rightIcon && (
        <View style={[styles.rightIconContainer, rightIconContainerStyle]}>
          {rightIcon}
        </View>
      )}
    </TouchableOpacity>
  );
};
