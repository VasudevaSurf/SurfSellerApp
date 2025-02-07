import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Typography} from '../Typography/Typography';
import {TypographyVariant} from '../Typography/Typography.types';
import {ButtonProps, ButtonVariant} from './Button.types';
import {buttonStyles} from './Button.styles';

export const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  variant = ButtonVariant.PRIMARY,
  customTextStyles,
  customButtonStyles,
  disabled = false,
}) => {
  const getButtonStyle = () => {
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
        buttonStyles.baseButton,
        getButtonStyle(),
        disabled && buttonStyles.disabledButton,
        customButtonStyles,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Typography
        variant={TypographyVariant.BODY_MEDIUM}
        text={text}
        customTextStyles={[getTextStyle(), customTextStyles]}
      />
    </TouchableOpacity>
  );
};
