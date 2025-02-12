import {TextStyle, ViewStyle} from 'react-native';

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
  customLabelColorFocused?: string; // New prop for focused label color
  customLabelColorUnfocused?: string; // New prop for unfocused label color
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
}
