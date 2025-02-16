import {OrderStatus} from '../OrderInfo/OrderInfo.types';

export interface StatusModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (selectedStatus: OrderStatus) => void;
  initialStatus: OrderStatus;
}

export interface Option {
  value: OrderStatus;
  label: string;
  isSelected: boolean;
}
