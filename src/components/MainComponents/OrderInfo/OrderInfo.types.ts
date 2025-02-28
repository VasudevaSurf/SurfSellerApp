import {StyleProp, ViewStyle} from 'react-native';

export type OrderStatus =
  | 'All'
  | 'Pending'
  | 'Accepted'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned'
  | 'Exchanged';

export interface OrderInfoProps {
  orderId: string;
  orderImage: string;
  orderName: string;
  orderPrice: string;
  orderNumber: number;
  orderEmail: string;
  orderPhone?: number;
  orderDate: string;
  orderTime: string;
  orderStatus: OrderStatus;
  onStatusChange: (status: OrderStatus) => void;
  onCardPress?: (params: OrderDetailParams) => void;
  style?: StyleProp<ViewStyle>;
}
