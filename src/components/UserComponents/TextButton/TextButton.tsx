import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Typography} from '../Typography/Typography';
import {TypographyVariant} from '../Typography/Typography.types';
import {textButtonStyles} from './TextButton.styles';
import {TextButtonProps} from './TextButtonProps.types';

/**
 * TextButton: A button component that uses Typography for text display with additional styling options.
 *
 * @component
 * @param {TextButtonProps} props - Props for the TextButton component
 * @param {string} props.text - Text to display in the button
 * @param {() => void} props.onPress - Callback function triggered when the button is pressed
 * @param {TypographyVariant} [props.variant=TypographyVariant.BODY_MEDIUM] - Typography variant for the text
 * @param {boolean} [props.underline=false] - Whether to underline the text
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {StyleProp<TextStyle>} [props.customTextStyles] - Custom styles for the text
 * @param {StyleProp<ViewStyle>} [props.customContainerStyles] - Custom styles for the container
 * @param {string} [props.fontFamily] - Custom font family to override the variant's default
 * @param {string} [props.testID] - Test ID for testing purposes
 * @param {number} [props.numberOfLines] - Number of lines to display before truncating
 *
 * @returns {JSX.Element} The rendered TextButton component
 *
 * @example
 * <TextButton
 *   text="Click me"
 *   onPress={() => console.log('Button pressed')}
 *   variant={TypographyVariant.BODY_LARGE}
 *   underline
 *   customTextStyles={{ color: 'blue' }}
 *   fontFamily="CustomFont-Bold"
 * />
 */
export function TextButton({
  text,
  onPress,
  variant = TypographyVariant.BODY_MEDIUM,
  underline = false,
  disabled = false,
  customTextStyles,
  customContainerStyles,
  fontFamily,
  testID,
  numberOfLines,
}: Readonly<TextButtonProps>) {
  const combinedTextStyles = [
    textButtonStyles.defaultText,
    underline && textButtonStyles.underline,
    fontFamily && {fontFamily},
    customTextStyles,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        textButtonStyles.container,
        disabled && textButtonStyles.disabled,
        customContainerStyles,
      ]}
      testID={testID}>
      <Typography
        variant={variant}
        text={text}
        customTextStyles={combinedTextStyles}
        numberOfLines={numberOfLines}
      />
    </TouchableOpacity>
  );
}
