import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {TypographyProps} from './Typography.types';

import {textBaseStyles} from './Typography.styles';

/**
 * Typography: A component for displaying text with various styles and variants.
 *
 * @component
 * @param {TypographyProps} props - Props for the Typography component
 * @param {ReactNode} [props.children] - Optional children nodes to render within the Typography component
 * @param {StyleProp<TextStyle>} [props.customTextStyles] - Optional custom styles for the text
 * @param {number} [props.numberOfLines] - Optional number of lines to display before truncating the text
 * @param {() => void} [props.onPress] - Optional callback function triggered when the text is pressed
 * @param {string} [props.testID] - Optional test ID for testing purposes
 * @param {string} [props.text] - Optional text to display; if not provided, children will be rendered
 * @param {TypographyVariant} props.variant - Variant to apply different text styles based on the variant
 *
 * @returns {JSX.Element} The rendered Typography component
 *
 * @example
 * <Typography
 *   variant={TypographyVariant.HEADER}
 *   text="Hello World"
 *   customTextStyles={{ color: 'blue', fontSize: 18 }}
 *   onPress={() => console.log('Text pressed')}
 *   numberOfLines={1}
 *   testID="typography-header"
 * />
 */
export function Typography({
  customTextStyles,
  text,
  variant,
  children,
  onPress,
  numberOfLines,
  testID,
}: TypographyProps) {
  function TextComponent() {
    return (
      <Text
        testID={testID}
        style={[
          textBaseStyles[variant],
          textBaseStyles.fontColor,
          !!onPress && textBaseStyles.touchable,
          customTextStyles,
        ]}
        numberOfLines={numberOfLines}>
        {children || text}
      </Text>
    );
  }
  return onPress ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <TextComponent />
    </TouchableOpacity>
  ) : (
    <TextComponent />
  );
}
