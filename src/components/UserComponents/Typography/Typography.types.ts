/* eslint-disable typescript-sort-keys/string-enum */
import {ReactNode} from 'react';
import {StyleProp, TextStyle} from 'react-native';

export enum TypographyVariant {
  // Heading
  H1_MEDIUM = 'h1_Medium',
  H1_SEMIBOLD = 'h1_Semibold',
  H1_BOLD = 'h1_Bold',
  H1_EXTRABOLD = 'h1_ExtraBold',

  H2_MEDIUM = 'h2_Medium',
  H2_SEMIBOLD = 'h2_Semibold',
  H2_BOLD = 'h2_Bold',
  H2_EXTRABOLD = 'h2_ExtraBold',

  H3_MEDIUM = 'h3_Medium',
  H3_SEMIBOLD = 'h3_Semibold',
  H3_BOLD = 'h3_Bold',
  H3_EXTRABOLD = 'h3_ExtraBold',

  H4_MEDIUM = 'h4_medium',
  H4_SEMIBOLD = 'h4_Semibold',
  H4_BOLD = 'h4_Bold',
  H4_EXTRABOLD = 'h4_ExtraBold',

  H5_MEDIUM = 'h5_Medium',
  H5_SEMIBOLD = 'h5_Semibold',
  H5_BOLD = 'h5_Bold',
  H5_EXTRABOLD = 'h5_ExtraBold',

  H6_MEDIUM = 'h6_Medium',
  H6_SEMIBOLD = 'h6_Semibold',
  H6_BOLD = 'h6_Bold',
  H6_EXTRABOLD = 'h6_ExtraBold',

  //Paragraph
  PMEDIUM_REGULAR = 'pmedium_regular',
  PMEDIUM_MEDIUM = 'pmedium_medium',
  PMEDIUM_SEMIBOLD = 'pmedium_semibold',
  PMEDIUM_BOLD = 'pmedium_bold',

  PSMALL_REGULAR = 'psmall_regular',
  PSMALL_MEDIUM = 'psmall_medium',
  PSMALL_SEMIBOLD = 'psmall_semibold',
  PSMALL_BOLD = 'psmall_bold',

  PXSMALL_REGULAR = 'pxsmamll_regular',
  PXSMALL_MEDIUM = 'pxsmamll_medium',
  PXSMALL_SEMIBOLD = 'pxsmamll_semibold',
  PXSMALL_BOLD = 'pxsmamll_bold',

  //Overline
  OVERLINE_SMALL = 'overline_small',
  OVERLINE_MEDIUM = 'overline_medium',

  //Label
  LMEDIUM_REGULAR = 'lmedium_regular',
  LMEDIUM_MEDIUM = 'lmedium_medium',
  LMEDIUM_SEMIBOLD = 'lmedium_semibold',
  LMEDIUM_BOLD = 'lmedium_bold',
  LMEDIUM_EXTRABOLD = 'lmedium-extrabold',

  LSMALL_REGULAR = 'lsmall_regular',
  LSMALL_MEDIUM = 'lsmall_medium',
  LSMALL_SEMIBOLD = 'lsmall_semibold',
  LSMALL_BOLD = 'lsmall_bold',

  LXSMALL_REGULAR = 'lxsmamll_regular',
  LXSMALL_MEDIUM = 'lxsmamll_medium',
  LXSMALL_SEMIBOLD = 'lxsmamll_semibold',
  LXSMALL_BOLD = 'lxsmamll_bold',

  LXXSMALL_REGULAR = 'lxxsmamll_regular',
  LXXSMALL_MEDIUM = 'lxxsmamll_medium',
  LXXSMALL_SEMIBOLD = 'lxxsmamll_semibold',
  LXXSMALL_BOLD = 'lxxsmamll_bold',
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
