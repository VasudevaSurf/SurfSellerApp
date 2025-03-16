import React from 'react';
import {TouchableOpacity, View, Platform, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ColorPalette} from '../../../config/colorPalette';
import {Typography} from '../Typography/Typography';
import {
  createButtonStyles,
  getBackgroundColor,
  getButtonHeight,
  getTextColor,
  getTypographyVariant,
} from './Button.styles';
import {
  ButtonProps,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from './Button.types';
import {CustomSquircle} from '../../MainComponents/CustomSquircleMain/CustomSquircle';

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
  bgColor,
  withShadow = false,
}) => {
  const buttonHeight = getButtonHeight(size);
  const currentState = disabled ? ButtonState.DISABLED : state;
  const styles = createButtonStyles(buttonHeight);
  const backgroundColor = getBackgroundColor(variant, type, currentState);

  // Determine if custom background color should be used
  const useCustomBgColor = bgColor && type === ButtonType.PRIMARY && !disabled;

  // Shadow styles for iOS and Android
  const shadowStyle =
    withShadow && type !== ButtonType.OUTLINED
      ? Platform.select({
          ios: {
            shadowColor: 'rgba(16, 24, 40, 0.08)',
            shadowOffset: {width: 0, height: 6},
            shadowOpacity: 1,
            shadowRadius: buttonHeight / 5,
          },
          android: {
            elevation: 10,
          },
        })
      : {};

  const containerStyle = [
    styles.container,
    {
      backgroundColor: 'transparent', // Make container transparent since squircle handles background
      opacity: currentState === ButtonState.DISABLED ? 0.5 : 1,
    },
    withShadow && shadowStyle,
    customStyles,
  ];

  const fillColor = useCustomBgColor
    ? bgColor
    : typeof backgroundColor === 'object'
    ? 'transparent'
    : backgroundColor;

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
    !useCustomBgColor;

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
        <CustomSquircle
          style={styles.gradient}
          fillColor="transparent"
          cornerRadius={buttonHeight / 5}
          cornerSmoothing={1.0}>
          <LinearGradient
            colors={gradientConfig.colors}
            start={gradientConfig.start}
            end={gradientConfig.end}
            style={styles.gradient}
          />
        </CustomSquircle>
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={containerStyle}>
      <CustomSquircle
        style={StyleSheet.absoluteFillObject}
        fillColor={type === ButtonType.OUTLINED ? 'transparent' : fillColor}
        cornerRadius={buttonHeight / 5}
        cornerSmoothing={1.0}
      />
      {renderContent()}
    </TouchableOpacity>
  );
};
