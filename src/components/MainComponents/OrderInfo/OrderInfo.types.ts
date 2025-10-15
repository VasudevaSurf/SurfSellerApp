import {StyleProp, ViewStyle} from 'react-native';

// ✅ UPDATED: Use exact API status codes
export type OrderStatus =
  | 'O' // Pending
  | 'P' // Accepted
  | 'C' // Completed
  | 'F' // Failed
  | 'I' // Canceled
  | 'D' // Declined
  | 'B' // Backordered
  | 'Y' // Awaiting call
  | 'A'; // Fraud checking

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
