import {StyleProp, ViewStyle} from 'react-native';

export interface FilterOrdersModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (filters: OrderFilters) => void;
  initialFilters?: OrderFilters;
  containerStyle?: StyleProp<ViewStyle>;
  backdropOpacity?: number;
  backdropColor?: string;
}

export interface OrderFilters {
  customerName?: string;
  email?: string;
  phoneNumber?: string;
  minOrderValue?: string;
  maxOrderValue?: string;
  orderStatus?: string;
}

export interface OrderStatusOption {
  value: string;
  label: string;
}
