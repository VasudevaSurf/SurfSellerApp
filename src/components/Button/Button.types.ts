import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export interface ButtonProps {
  text: string;
  onPress: () => void;
  variant?: ButtonVariant;
  customTextStyles?: StyleProp<TextStyle>;
  customButtonStyles?: StyleProp<ViewStyle>;
  disabled?: boolean;
}
