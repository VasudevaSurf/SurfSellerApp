import {ReactNode} from 'react';
import {TypographyVariant} from '../Typography/Typography.types';

export interface HeaderIconProps {
  icon: React.FC<{
    size?: number;
    color?: string;
    strokeWidth?: number;
    style?: any;
  }>;
  onPress?: () => void;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export interface HeaderProps {
  image?: {
    uri?: string;
    source?: any;
    style?: any;
  };
  name: string;
  rightIcons?: HeaderIconProps[];
  variant?: TypographyVariant;
  textColor?: string;
  leftIcon?: ReactNode;
  subHeader?: boolean;
  subText?: string;
}
