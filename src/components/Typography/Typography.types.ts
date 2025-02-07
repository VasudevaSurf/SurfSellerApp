/* eslint-disable typescript-sort-keys/string-enum */
import { ReactNode } from 'react';
import { StyleProp, TextStyle } from 'react-native';

export enum TypographyVariant {
  // Display
  DISPLAY_LARGE = 'display-large',
  DISPLAY_MEDIUM = 'display-medium',

  // Heading
  HEADING_XLARGE = 'heading-xlarge',
  HEADING_LARGE = 'heading-large',
  HEADING_MEDIUM = 'heading-medium',
  HEADING_SMALL = 'heading-small',

  // Body
  BODY_LARGE = 'body-large',
  BODY_MEDIUM = 'body-medium',
  BODY_SMALL = 'body-small',
  BODY_XSMALL = 'body-xsmall',

  // Label
  LABEL_LARGE = 'label-large',
  LABEL_SMALL = 'label-small',
}

export interface TypographyProps {
  children?: ReactNode;
  customTextStyles?: StyleProp<TextStyle>;
  numberOfLines?: number;
  onPress?: () => void;
  testID?: string;
  text?: string;
  variant: TypographyVariant;
}
