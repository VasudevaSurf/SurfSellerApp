import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export enum ButtonSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum ButtonType {
  PRIMARY = 'primary',
  OUTLINED = 'outlined',
  TERTIARY = 'tertiary',
  LINK = 'link',
}

export enum ButtonState {
  DEFAULT = 'default',
  HOVERED = 'hovered',
  PRESSED = 'pressed',
  FOCUSED = 'focused',
  DISABLED = 'disabled',
  AI = 'ai',
  FILEUPLOAD = 'fileupload',
}

export interface ButtonProps {
  text: string;
  onPress: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  type?: ButtonType;
  state?: ButtonState;
  disabled?: boolean;
  IconComponent?: React.ComponentType<any>;
  iconPosition?: 'left' | 'right';
  useGradient?: boolean;
  customStyles?: StyleProp<ViewStyle>;
  customTextStyles?: StyleProp<TextStyle>;
  bgColor?: string;
  withShadow?: boolean; // New prop to enable shadow
}
