import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Typography} from '../Typography/Typography';
import {ColorPalette} from '../../../config/colorPalette';
import {
  ButtonProps,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from './Button.types';
import {
  createButtonStyles,
  getBackgroundColor,
  getButtonHeight,
  getTextColor,
  getTypographyVariant,
} from './Button.styles';

export const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  size = ButtonSize.MEDIUM,
  variant = ButtonVariant.PRIMARY,
  type = ButtonType.PRIMARY,
  state = ButtonState.DEFAULT,
  disabled = false,
  IconComponent,
  iconPosition = 'left',
  useGradient = false,
  customStyles,
  customTextStyles,
  bgColor, // Add this prop to accept custom background color
}) => {
  const buttonHeight = getButtonHeight(size);
  const currentState = disabled ? ButtonState.DISABLED : state;
  const styles = createButtonStyles(buttonHeight);
  const backgroundColor = getBackgroundColor(variant, type, currentState);

  // Determine if custom background color should be used
  const useCustomBgColor = bgColor && type === ButtonType.PRIMARY && !disabled;

  const containerStyle = [
    styles.container,
    {
      backgroundColor: useCustomBgColor
        ? bgColor
        : typeof backgroundColor === 'object'
        ? 'transparent'
        : backgroundColor,
      opacity: currentState === ButtonState.DISABLED ? 0.5 : 1,
    },
    type === ButtonType.OUTLINED && {
      borderColor:
        variant === ButtonVariant.PRIMARY
          ? ColorPalette.PURPLE_300
          : ColorPalette.PURPLE_ROSE_300,
    },
    customStyles,
  ];

  const renderContent = () => (
    <View style={styles.content}>
      {IconComponent && iconPosition === 'left' && (
        <View style={styles.icon}>
          <IconComponent />
        </View>
      )}
      <Typography
        variant={getTypographyVariant(size)}
        text={text}
        customTextStyles={[
          {color: getTextColor(variant, type, currentState)},
          customTextStyles,
        ]}
      />
      {IconComponent && iconPosition === 'right' && (
        <View style={styles.iconRight}>
          <IconComponent />
        </View>
      )}
    </View>
  );

  // Determine if gradient should be used
  const shouldUseGradient =
    (useGradient ||
      (typeof backgroundColor === 'object' && backgroundColor.isGradient)) &&
    type === ButtonType.PRIMARY &&
    !disabled &&
    !useCustomBgColor; // Don't use gradient if custom background color is provided

  if (shouldUseGradient) {
    const gradientConfig =
      typeof backgroundColor === 'object'
        ? backgroundColor
        : {
            colors:
              variant === ButtonVariant.PRIMARY
                ? ColorPalette.PRIMARY_GRADIENT_SELLER.colors
                : [ColorPalette.PURPLE_ROSE_300, ColorPalette.PURPLE_ROSE_400],
            start: ColorPalette.PRIMARY_GRADIENT_SELLER.start,
            end: ColorPalette.PRIMARY_GRADIENT_SELLER.end,
          };

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={containerStyle}>
        <LinearGradient
          colors={gradientConfig.colors}
          start={gradientConfig.start}
          end={gradientConfig.end}
          style={[styles.gradient, {borderRadius: buttonHeight / 5}]}
        />
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={containerStyle}>
      {renderContent()}
    </TouchableOpacity>
  );
};
