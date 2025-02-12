import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {TypographyVariant} from '../Typography/Typography.types';

export interface TextButtonProps {
  text: string;
  onPress: () => void;
  variant?: TypographyVariant;
  underline?: boolean;
  disabled?: boolean;
  customTextStyles?: StyleProp<TextStyle>;
  customContainerStyles?: StyleProp<ViewStyle>;
  fontFamily?: string;
  testID?: string;
  numberOfLines?: number;
}
