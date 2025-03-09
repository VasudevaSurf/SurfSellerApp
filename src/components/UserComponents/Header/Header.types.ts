import {ReactNode} from 'react';
import {TypographyVariant} from '../Typography/Typography.types';
import {BadgeType, BadgeVariant} from '../Badges/Badge.types';
import {StyleProp, ViewStyle} from 'react-native';

// Original HeaderIconProps
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
  isBadge?: false; // Add this to differentiate from badge
}

// New HeaderBadgeProps
export interface HeaderBadgeProps {
  isBadge: true;
  text: string;
  badgeType?: BadgeType;
  badgeVariant?: BadgeVariant;
  leftIcon?: React.FC<{
    size?: number;
    color?: string;
    strokeWidth?: number;
    style?: any;
  }>;
  rightIcon?: React.FC<{
    size?: number;
    color?: string;
    strokeWidth?: number;
    style?: any;
  }>;
  iconSize?: number;
  iconStrokeWidth?: number;
  customContainerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
  textVariant?: TypographyVariant;
  customTextColor?: string;
  customBorderColor?: string;
}

// Combined type for right items
export type HeaderRightItem = HeaderIconProps | HeaderBadgeProps;

export interface HeaderProps {
  image?: {
    uri?: string;
    source?: any;
    style?: any;
  };
  name: string;
  rightIcons?: HeaderRightItem[]; // Updated type
  variant?: TypographyVariant;
  textColor?: string;
  leftIcon?: ReactNode;
  subHeader?: boolean;
  subText?: string;
}
