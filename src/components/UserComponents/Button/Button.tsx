import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Typography} from '../Typography/Typography';
import {TypographyVariant} from '../Typography/Typography.types';
import {ButtonProps, ButtonVariant, IconPosition} from './Button.types';
import {buttonStyles} from './Button.styles';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: any;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  variant = ButtonVariant.PRIMARY,
  customTextStyles,
  customButtonStyles,
  disabled = false,
  IconComponent,
  iconProps = {
    size: 20,
    color: '#4A4A4A',
    strokeWidth: 2,
  },
  iconPosition = IconPosition.LEFT,
  iconSpacing = 8,
  iconOnly = false,
}) => {
  const getButtonStyle = () => {
    if (iconOnly) {
      return {};
    }

    switch (variant) {
      case ButtonVariant.PRIMARY:
        return buttonStyles.primaryButton;
      case ButtonVariant.SECONDARY:
        return buttonStyles.secondaryButton;
      case ButtonVariant.TERTIARY:
        return buttonStyles.tertiaryButton;
      default:
        return buttonStyles.primaryButton;
    }
  };

  const renderContent = () => {
    if (iconOnly && IconComponent) {
      return <IconComponent {...iconProps} />;
    }

    const iconStyle = {
      marginLeft: iconPosition === IconPosition.RIGHT ? iconSpacing : 0,
      marginRight: iconPosition === IconPosition.LEFT ? iconSpacing : 0,
    };

    return (
      <View style={buttonStyles.contentContainer}>
        {IconComponent && iconPosition === IconPosition.LEFT && (
          <View style={iconStyle}>
            <IconComponent {...iconProps} />
          </View>
        )}
        <Typography
          variant={TypographyVariant.BODY_MEDIUM}
          text={text}
          customTextStyles={[getTextStyle(), customTextStyles]}
        />
        {IconComponent && iconPosition === IconPosition.RIGHT && (
          <View style={iconStyle}>
            <IconComponent {...iconProps} />
          </View>
        )}
      </View>
    );
  };

  const getTextStyle = () => {
    switch (variant) {
      case ButtonVariant.PRIMARY:
        return buttonStyles.primaryButtonText;
      case ButtonVariant.SECONDARY:
        return buttonStyles.secondaryButtonText;
      case ButtonVariant.TERTIARY:
        return buttonStyles.tertiaryButtonText;
      default:
        return buttonStyles.primaryButtonText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        !iconOnly && buttonStyles.baseButton,
        getButtonStyle(),
        disabled && !iconOnly && buttonStyles.disabledButton,
        customButtonStyles,
      ]}
      onPress={onPress}
      disabled={disabled}>
      {renderContent()}
    </TouchableOpacity>
  );
};
