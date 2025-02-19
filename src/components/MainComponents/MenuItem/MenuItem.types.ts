import {ReactNode} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';

export interface MenuItemProps {
  label: string;
  onPress: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  testID?: string;
  disabled?: boolean;
  variant?: TypographyVariant;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  showBottomBorder?: boolean;
  subtitle?: string;
}
