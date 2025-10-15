import {OrderStatus} from '../OrderInfo/OrderInfo.types';

export type SelectionType = 'radio' | 'checkbox';

export interface CheckboxProps {
  size?: number;
  backgroundColor?: string;
  checkColor?: string;
}

export interface StatusModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (selectedStatus: OrderStatus | OrderStatus[]) => void;
  initialStatus?: OrderStatus | OrderStatus[];
  options?: Option[];
  title?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  selectionType?: SelectionType;
  checkboxProps?: CheckboxProps;
}

// ✅ UPDATED: Option now uses API status codes
export interface Option {
  value: OrderStatus; // API status code (O, P, C, etc.)
  label: string; // Display label (Pending, Accepted, etc.)
  isSelected: boolean;
}
