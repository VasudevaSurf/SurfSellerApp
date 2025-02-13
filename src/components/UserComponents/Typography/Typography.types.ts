/* eslint-disable typescript-sort-keys/string-enum */
import {ReactNode} from 'react';
import {StyleProp, TextStyle} from 'react-native';

export enum TypographyVariant {
  // Display
  DISPLAY_LARGE = 'display-large',
  DISPLAY_MEDIUM = 'display-medium',

  // Heading
  HEADING_XLARGE = 'heading-xlarge',
  HEADING_LARGE = 'heading-large',
  HEADING_MEDIUM = 'heading-medium',
  HEADING_SMALL = 'heading-small',
  HEADING_MEDIUM_SUCCESS = 'heading-medium-success',
  HEADING_MEDIUM_COUNT = 'heading-medium-count',

  // Body
  BODY_LARGE = 'body-large',
  BODY_MEDIUM = 'body-medium',
  BODY_SMALL = 'body-small',
  BODY_XSMALL = 'body-xsmall',
  BODY_XXSMALL = 'body-xxsmall',
  BODY_SMALL_LINE = 'body-small-line',
  BODY_SMALL_HIGH = 'body-large-high',
  BODY_XSMALLLINE = 'body-xsmallline',
  BODY_SMALL_BOLD = 'body-small-bold',
  BODY_SMALL_CAPTION = 'body-small-caption',
  BODY_XSMALL_PRICE = 'body-xsmal_price',
  BODY_LARGE_PAGE = 'body-large-page',
  BODY_MEDIUM_MAIN = 'body-medium-main',

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
