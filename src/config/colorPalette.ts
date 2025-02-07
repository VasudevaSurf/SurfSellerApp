/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
/* eslint-disable typescript-sort-keys/string-enum */

import { ColorValue } from 'react-native';

/**
 * Enum for color palette
 */
export const ColorPalette: Record<string, ColorValue> = {
  /**
   * Background color tokens
   */
  BackgroundPrimary: '#ffffff',
  BackgroundSecondary: '#302143',

  /**
   * Surface color tokens
   */
  SurfacePrimary: '#2B2829',
  SurfaceInversePrimary: '#302143',
  SurfaceSecondary: '#EADFFD',
  SurfaceDisabled: '#E8E2F3',
  SurfaceAction: '#302143',
  SurfaceError: '#FEEAEE',
  SurfaceErrorHighlighted: '#F02E50',

  /**
   * Border color tokens
   */
  BorderPrimary: '#9101CF',
  BorderSecondary: '#EAE9EC',
  BorderError: '#D82948',
  BorderAction: '#302143',

  /**
   * Text color tokens
   */
  TextPrimary: '#333333',
  TextSecondary: '#606060',
  TextInversePrimary: '#FFFFFF',
  TextInverseSecondary: '#FFFFFF8F',
  TextDisabled: '#ABA6B3',
  TextAction: '#302143',
  TextSuccess: '#198522',
  TextError: '#D82948',

  /**
   * Icon color tokens
   */
  IconPrimary: '#302143',
  IconSecondary: '#817A8C',
  IconAction: '#302143',
  IconSuccess: '#198522',
  IconError: '#D82948',
  IconInversePrimary: '#FFFFFF',

  //Based on colors
  //   Primary
  DeepPurple: '#312143',
  LilacPurple: '#A46AE8',
  WhitePurple: '#EEE9FF',

  //   Extended
  DeepPurple50: '#F0F0F2',
  DeepPurple100: '#EAE9EC',
  DeepPurple200: '#D6D3D9',
  DeepPurple300: '#C1BCC7',
  DeepPurple400: '#ADA6B4',
  DeepPurple500: '#9890A1',
  DeepPurple600: '#837A8E',
  DeepPurple700: '#6F647B',
  DeepPurple800: '#5A4D69',
  DeepPurple900: '#463756',

  LilacPurple50: '#F6F0FD',
  LilacPurple100: '#EDE1FA',
  LilacPurple200: '#E4D2F8',
  LilacPurple300: '#DBC3F6',
  LilacPurple400: '#D2B5F4',
  LilacPurple500: '#C8A6F1',
  LilacPurple600: '#BF97EF',
  LilacPurple700: '#AD79EA',
  LilacPurple800: '#945FD1',
  LilacPurple900: '#8038D3',

  Amaranth50: '#FEEAEE',
  Amaranth100: '#FBC0CB',
  Amaranth200: '#F9ABB9',
  Amaranth300: '#F897A8',
  Amaranth400: '#F68296',
  Amaranth500: '#F56D85',
  Amaranth600: '#F35873',
  Amaranth700: '#F24362',
  Amaranth800: '#F02E50',
  Amaranth900: '#D82948',

  Green900: '#198522',

  RoyalPurple900: '#612AAD',

  VioletPurple900: '#9F5FFF',

  //   Neutral
  White: '#FFFFFF',
  Black: '#000000',
  Purple: '#9F55F5',

  LightPurpleTransparent: '#E6DEFF14',
  RoyalPurple: '#9F55F5',
  MajesticLilac: '#A56AE8',
  VibrantViolet: '#AA4DCF',
  CheckCirclePurple: '#9C58FF',
  White08: '#FFFFFF14',
  White02: '#ffffff05',
  Purple16: '#9F5FFF29',
  Tranparent: 'transparent',
  HomeGradient1: '#7f6ae7a6',
  HomeGradient2: '#F0F0F299',

  ModalBackground: ' rgba(0, 0, 0, 0.5)',
};
