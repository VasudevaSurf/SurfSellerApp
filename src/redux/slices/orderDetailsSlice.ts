import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchOrderDetailsApi,
  updateOrderStatusApi,
  Order,
  OrderDetailsResponse,
  OrderStatusUpdateResponse,
} from '../../services/apiService';

interface OrderDetailsState {
  orderDetails: Order | null;
  loading: boolean;
  error: string | null;
  updatingStatus: boolean;
  statusUpdateError: string | null;
}

const initialState: OrderDetailsState = {
  orderDetails: null,
  loading: false,
  error: null,
  updatingStatus: false,
  statusUpdateError: null,
};

// Helper function to ensure consistent timestamp format
const normalizeTimestamp = (timestampData: any) => {
  if (!timestampData) {
    return {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };
  }

  // If timestamp is Unix timestamp (number or string number)
  if (typeof timestampData === 'number' || !isNaN(Number(timestampData))) {
    const timestamp =
      typeof timestampData === 'string'
        ? parseInt(timestampData)
        : timestampData;
    const date = new Date(timestamp * 1000);

    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };
  }

  // If timestamp is a string with comma (e.g. "16/05/2025, 18:26")
  if (typeof timestampData === 'string' && timestampData.includes(',')) {
    const [date, time] = timestampData.split(', ');

    let formattedTime = time;
    if (time && !time.includes('AM') && !time.includes('PM')) {
      const [hours, minutes] = time.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12;
      formattedTime = `${hours12}:${minutes
        .toString()
        .padStart(2, '0')} ${period}`;
    }

    return {date, time: formattedTime};
  }

  // Default fallback
  return {
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }),
  };
};

export const fetchOrderDetails = createAsyncThunk(
  'orderDetails/fetchOrderDetails',
  async (
    {userId, orderId}: {userId: string; orderId: string},
    {rejectWithValue},
  ) => {
    try {
      console.log('fetchOrderDetails thunk called with:', {userId, orderId});

      const response = await fetchOrderDetailsApi(userId, orderId);

      if (!response.order_info) {
        throw new Error('Order information not found in response');
      }

      const orderInfo = response.order_info;

      // Transform products array if it exists
      const products = orderInfo.products
        ? orderInfo.products.map((product: any) => ({
            product_id: product.product_id,
            product: product.product,
            amount: parseInt(product.amount || '1'),
            price: product.price_format || `€${product.price}`,
            image_url: product.image_url || '',
          }))
        : [];

      // Normalize timestamp to ensure consistency
      const timeInfo = normalizeTimestamp(orderInfo.timestamp);

      const orderData: Order = {
        order_id: orderInfo.order_id,
        order_number: orderInfo.order_number || orderInfo.order_id,
        timestamp: orderInfo.timestamp,
        status: orderInfo.status,
        total: orderInfo.total ? `€${orderInfo.total}` : '€0.00',
        firstname: orderInfo.firstname,
        lastname: orderInfo.lastname,
        email: orderInfo.email,
        phone: orderInfo.phone,
        customer: {
          email: orderInfo.email,
          phone: orderInfo.phone,
          name: `${orderInfo.firstname || ''} ${
            orderInfo.lastname || ''
          }`.trim(),
        },
        products: products,
        shipping_cost: orderInfo.shipping_cost || '0.00',
        subtotal: orderInfo.subtotal || orderInfo.total || '0.00',
        formattedDate: timeInfo.date,
        formattedTime: timeInfo.time,
      };

      console.log('Transformed order data:', orderData);
      return orderData;
    } catch (error: any) {
      console.error('fetchOrderDetails thunk error:', error);
      return rejectWithValue(error.message || 'Failed to fetch order details');
    }
  },
);

export const updateOrderStatusDetails = createAsyncThunk(
  'orderDetails/updateOrderStatus',
  async (
    {
      userId,
      orderId,
      status,
    }: {
      userId: string;
      orderId: string;
      status: string;
    },
    {rejectWithValue},
  ) => {
    try {
      console.log('updateOrderStatusDetails thunk called with:', {
        userId,
        orderId,
        status,
      });

      const response = await updateOrderStatusApi(userId, orderId, status);

      if (!response.result) {
        throw new Error(response.message || 'Failed to update order status');
      }

      return {
        orderId,
        newStatus: status,
        message: response.message,
      };
    } catch (error: any) {
      console.error('updateOrderStatusDetails thunk error:', error);
      return rejectWithValue(error.message || 'Failed to update order status');
    }
  },
);

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    resetOrderDetails: () => {
      console.log('resetOrderDetails called');
      return initialState;
    },
    updateOrderStatusLocal: (state, action) => {
      console.log('updateOrderStatusLocal called with:', action.payload);
      if (state.orderDetails) {
        state.orderDetails.status = action.payload;
      }
    },
    clearStatusUpdateError: state => {
      console.log('clearStatusUpdateError called');
      state.statusUpdateError = null;
    },
    clearOrderDetailsError: state => {
      console.log('clearOrderDetailsError called');
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch Order Details
      .addCase(fetchOrderDetails.pending, state => {
        console.log('fetchOrderDetails.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        console.log(
          'fetchOrderDetails.fulfilled with order:',
          action.payload.order_id,
        );
        state.loading = false;
        state.orderDetails = action.payload;
        state.error = null;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        console.log('fetchOrderDetails.rejected with:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Order Status
      .addCase(updateOrderStatusDetails.pending, state => {
        console.log('updateOrderStatusDetails.pending');
        state.updatingStatus = true;
        state.statusUpdateError = null;
      })
      .addCase(updateOrderStatusDetails.fulfilled, (state, action) => {
        console.log('updateOrderStatusDetails.fulfilled with:', action.payload);
        state.updatingStatus = false;

        // Update order status in local state
        if (state.orderDetails) {
          state.orderDetails.status = action.payload.newStatus;
        }

        state.statusUpdateError = null;
      })
      .addCase(updateOrderStatusDetails.rejected, (state, action) => {
        console.log('updateOrderStatusDetails.rejected with:', action.payload);
        state.updatingStatus = false;
        state.statusUpdateError = action.payload as string;
      });
  },
});

export const {
  resetOrderDetails,
  updateOrderStatusLocal,
  clearStatusUpdateError,
  clearOrderDetailsError,
} = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
