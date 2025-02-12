import {
  ImageSourcePropType,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';

export interface MainBannerCustomStyles {
  container?: ViewStyle;
  primaryContainer?: ViewStyle;
  secondaryContainer?: ViewStyle;
  logoImage?: ImageStyle;
  surfNameImage?: ImageStyle;
  separator?: TextStyle;
  heading?: TextStyle;
}

export interface MainBannerProps {
  surfTitle: string;
  logoImage?: ImageSourcePropType;
  surfNameImage?: ImageSourcePropType;
  customStyles?: MainBannerCustomStyles;
}
