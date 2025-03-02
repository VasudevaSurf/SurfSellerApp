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
  onSubmit: (selectedStatus: OrderStatus) => void;
  initialStatus: OrderStatus;
  options?: Option[];
  title?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  selectionType?: SelectionType;
  checkboxProps?: CheckboxProps;
}

export interface Option {
  value: OrderStatus;
  label: string;
  isSelected: boolean;
}
