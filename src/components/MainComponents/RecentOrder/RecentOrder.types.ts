export interface RecentOrderProps {
  orderImage: string;
  productName: string;
  orderId: string;
  customerName: string;
  orderDate: string;
  orderAmount: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  isLastItem?: boolean;
}
