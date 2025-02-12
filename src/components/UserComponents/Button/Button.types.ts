import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export enum IconPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: any;
}

export interface ButtonProps {
  text?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  customTextStyles?: StyleProp<TextStyle>;
  customButtonStyles?: StyleProp<ViewStyle>;
  disabled?: boolean;
  IconComponent?: React.ComponentType<IconProps>;
  iconProps?: IconProps;
  iconPosition?: IconPosition;
  iconSpacing?: number;
  iconOnly?: boolean;
}
