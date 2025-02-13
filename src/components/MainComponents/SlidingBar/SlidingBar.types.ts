import {StyleProp, ViewStyle} from 'react-native';

export interface SlidingBarOption {
  id: string | number;
  label: string;
}

export interface SlidingBarProps {
  options: SlidingBarOption[];
  selectedOption: SlidingBarOption;
  onOptionSelect: (option: SlidingBarOption) => void;
  customContainerStyle?: StyleProp<ViewStyle>;
  customOptionStyle?: StyleProp<ViewStyle>;
  customSelectedStyle?: StyleProp<ViewStyle>;
}
