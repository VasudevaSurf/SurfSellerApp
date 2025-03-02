import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {styles} from './MenuItem.styles';
import {MenuItemProps} from './MenuItem.types';

const ArrowRight = () => (
  <View style={styles.arrowContainer}>
    <Typography
      variant={TypographyVariant.LMEDIUM_SEMIBOLD}
      text=">"
      customTextStyles={{color: ColorPalette.GREY_400}}
    />
  </View>
);

export const MenuItem: React.FC<MenuItemProps> = ({
  label,
  onPress,
  leftIcon,
  rightIcon = <ArrowRight />,
  testID,
  disabled = false,
  variant = TypographyVariant.LMEDIUM_SEMIBOLD,
  containerStyle,
  contentStyle,
  textStyle,
  leftIconContainerStyle,
  rightIconContainerStyle,
  subtitle,
  leftIconBackgroundColor,
  showBottomBorder = false,
  isLastItem = false,
}) => {
  const leftIconStyles = [
    styles.leftIconContainer,
    leftIconContainerStyle,
    leftIconBackgroundColor && {
      backgroundColor: leftIconBackgroundColor,
    },
  ];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        showBottomBorder && !isLastItem && styles.bottomBorder,
        containerStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      testID={testID}>
      <View style={[styles.content, contentStyle]}>
        {leftIcon && <View style={leftIconStyles}>{leftIcon}</View>}
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
