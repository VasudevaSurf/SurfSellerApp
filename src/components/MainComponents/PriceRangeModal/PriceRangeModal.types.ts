import {StyleProp, ViewStyle} from 'react-native';

export interface PriceRangeModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (minPrice: number, maxPrice: number) => void;
  initialMinPrice?: number;
  initialMaxPrice?: number;
  minValue?: number;
  maxValue?: number;
  currency?: string;
  headerText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  backdropOpacity?: number;
  backdropColor?: string;
  step?: number;
}
