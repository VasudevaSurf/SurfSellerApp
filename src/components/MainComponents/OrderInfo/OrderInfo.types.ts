import {StyleProp, ViewStyle} from 'react-native';

export type OrderStatus =
  | 'All'
  | 'Pending'
  | 'Processing'
  | 'Accepted'
  | 'Shipped'
  | 'Delivered'
  | 'Completed'
  | 'Cancelled'
  | 'Returned'
  | 'Exchanged'
  | 'Failed'
  | 'Declined';

export interface OrderDetailParams {
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
  orderQuantity?: number;
}

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
  orderQuantity?: number;
  onStatusChange: (status: OrderStatus) => void;
  onCardPress?: (params: OrderDetailParams) => void;
  style?: StyleProp<ViewStyle>;
}
