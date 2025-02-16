import {StyleProp, ViewStyle} from 'react-native';
import {TypographyVariant} from '../Typography/Typography.types';

export enum BadgeVariant {
  FILLED = 'filled',
  OUTLINE = 'outline',
  GHOST = 'ghost',
}

export enum BadgeType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
}

export interface BadgeIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
}

export type BadgeIconComponent = React.FC<BadgeIconProps>;

export interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  type?: BadgeType;
  leftIcon?: BadgeIconComponent;
  rightIcon?: BadgeIconComponent;
  iconSize?: number;
  iconStrokeWidth?: number;
  customContainerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
  textVariant?: TypographyVariant;
  customTextColor?: string;
  customBorderColor?: string;
}
