import {OrderStatus} from '../../../../components/MainComponents/OrderInfo/OrderInfo.types';

export interface OrderDetailProps {
  route?: {
    params?: {
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
    };
  };
}
