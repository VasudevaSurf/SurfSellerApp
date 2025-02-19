import {TextStyle, ViewStyle} from 'react-native';

interface IconConfig {
  icon: React.ReactNode | string;
  onPress?: () => void;
}

export interface TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  customContainerStyles?: ViewStyle;
  customInputStyles?: TextStyle;
  customPlaceholderStyles?: TextStyle;
  customLabelStyles?: TextStyle;
  customLabelColorFocused?: string;
  customLabelColorUnfocused?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'number-pad' | 'email-address' | 'phone-pad';
  showCountrySection?: boolean;
  countryCode?: string;
  countryFlag?: string;
  onCountryPress?: () => void;
  type?: 'email' | 'phone' | 'default';
  height?: number;
  width?: number | string;
  leftIcons?: IconConfig[]; // Changed to array of IconConfig
  leftText?: string;
  rightIcons?: IconConfig[]; // Changed to array of IconConfig
  rightText?: string;
  onRightTextPress?: () => void;
  customBorderColor?: string;
  customFocusedBorderColor?: string;
  customErrorBorderColor?: string;
  customBorderWidth?: number;
  customFocusedBorderWidth?: number; // New prop
  customErrorBorderWidth?: number;
  disabled?: boolean;
}
