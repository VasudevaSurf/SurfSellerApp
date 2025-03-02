/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
/* eslint-disable typescript-sort-keys/string-enum */

import {ColorValue} from 'react-native';

// Define a custom type that includes both ColorValue and gradient string
type ColorTypes =
  | ColorValue
  | {
      colors: string[];
      start: {x: number; y: number};
      end: {x: number; y: number};
      locations?: number[];
    };

/**
 * Enum for color palette
 */
export const ColorPalette: Record<string, ColorTypes> = {
  /**
   * Background color tokens
   */

  //Custom color
  MainHeading: '#2B2829',
  AgreeTerms: '#433E3F',
  CreatedText: '#555555',
  SmallIconBack: '#DCFCE7',
  SmallIconBack2: '#F7E3FF',
  RiseText: '#22C55E',
  VerySmallIcon: '#FEE2E2',
  VerySmallIconBack: '#FEF3C7',
  SearchIcon: '#9F9C9C',
  SearchBack: '#F3F4F6',
  TotalText: '#000000B2',
  IconColor: '#5A5555',
  HomeIcon: '#CC7914',
  ConnectColor: '#7FB31E',
  BalanceColor: '#1E1E1E',
  toggleColor: '#111827',
  toggleBorder: '#E5E7EB',
  DataText: '#00000099',
  ConnectLine: '#D9DADC',
  LabelColor: '#161A1E',
  InactiveLabelColor: '#8E9091',
  ProgressLine: '#3A5AFE',

  //Feedback Colors
  Green_200: '#1FC16B',
  GREEN_100: '#84EBB4',
  GREEN_00: '#1FC16B1A',

  RED_200: '#D00416',
  RED_100: '#FB3748',
  RED_00: '#D004161A',

  YELLOW_200: '#DFB400',
  YELLOW_100: '#FFDB43',
  YELLOW_00: '#DFB4001A',

  //Neutral Colors

  //Background/Overlay Colors
  Black: '#000000',
  GREY_400: '#A4A4A4',
  GREY_300: '#BBBBBB',
  GREY_200: '#D2D2D2',
  GREY_100: '#E8E8E8',
  White: '#FFFFFF',

  //TextColor
  GREY_TEXT_500: '#333333',
  GREY_TEXT_400: '#4a4a4a',
  GREY_TEXT_300: '#606060',
  GREY_TEXT_200: '#777777',
  GREY_TEXT_100: '#8E8E8E',
  GREY_TEXT_00: '#B2B2B2',

  //Opacity
  OPACITY_72: '#000000B8',
  OPACITY_54: '#0000008A',
  OPACITY_40: '#00000066',
  OPACITY_24: '#0000003D',
  OPACITY_16: '#00000029',
  OPACITY_8: '#00000014',

  //Brand Colors
  //Purple
  PURPLE_500: '#510174',
  PURPLE_400: '#7D01B3',
  PURPLE_300: '#9101CF',
  PURPLE_200: '#BB20FE',
  PURPLE_100: '#E7B1FF',
  PURPLE_00: '#9101CF1A',

  //Orange
  ORANGE_500: '#99460F',
  ORANGE_400: '#C75B14',
  ORANGE_300: '#E97224',
  ORANGE_200: '#EE9154',
  ORANGE_100: '#F2AE82',
  ORANGE_00: '#E972241A',

  //Lime-Green
  LIME_GREEN_500: '#577B15',
  LIME_GREEN_400: '#7BAE1D',
  LIME_GREEN_300: '#9EDB2B',
  LIME_GREEN_200: '#B5E45E',
  LIME_GREEN_100: '#DAF2AF',
  LIME_GREEN_00: '#B5E45E1A',

  //Accent Colors

  //Rose
  PURPLE_ROSE_500: '#CC0038',
  PURPLE_ROSE_400: '#FF0046',
  PURPLE_ROSE_300: '#FF326A',
  PURPLE_ROSE_200: '#FF6690',
  PURPLE_ROSE_100: '#FF99B5',
  PURPLE_ROSE_00: '#FF326A1A',

  //Seller
  PRIMARY_GRADIENT_SELLER: {
    colors: ['#A600F7', '#9101CF'],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
    locations: [0.0291, 1],
  },
  PRIMARY_WHITE_SELLER: '#FAEEFF',

  //Gradients

  //SmoothGradients
  EARLY_SUNSET: {
    colors: ['#FFE897', '#FFB496'],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
    locations: [-0.0915, 1.1206],
  },
  DEEP_OCEAN: {
    colors: ['#FEF0ED', '#ACE3F8'],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
    locations: [-0.0915, 1.1206],
  },
  WILD_BERRY: {
    colors: ['#F8E5EB', '#E4EBFE'],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
    locations: [-0.0915, 1.1206],
  },
  LIME_PASSION: {
    colors: ['#F4F576', '#80FDBB'],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
    locations: [-0.0915, 1.1206],
  },
  MAGNIFICENT_SKY: {
    colors: ['#FFF9F3', '#FFEFEB'],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
    locations: [-0.0915, 1.1206],
  },
  GOLD_MINE: {
    colors: ['#D8CAA7', '#FAF9DA'],
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
    locations: [-0.0915, 1.1206],
  },
};
