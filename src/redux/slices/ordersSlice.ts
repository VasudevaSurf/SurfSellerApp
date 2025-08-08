import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchOrdersApi,
  searchOrdersApi,
  updateOrderStatusApi,
  Order,
  OrdersResponse,
  OrderStatusUpdateResponse,
} from '../../services/apiService';

interface OrdersState {
  orders: Order[];
  totalItems: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  searchTerm: string;
  statusFilter: string;
  updatingStatus: string[]; // Array of order IDs being updated
  statusUpdateError: string | null;
}

const initialState: OrdersState = {
  orders: [],
  totalItems: 0,
  loading: false,
  error: null,
  currentPage: 1,
  searchTerm: '',
  statusFilter: 'all',
  updatingStatus: [],
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

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (
    {
      userId,
      page = 1,
      itemsPerPage = 10,
      status = 'all',
    }: {
      userId: string;
      page?: number;
      itemsPerPage?: number;
      status?: string;
    },
    {rejectWithValue},
  ) => {
    try {
      console.log('fetchOrders thunk called with:', {
        userId,
        page,
        itemsPerPage,
        status,
      });

      const response = await fetchOrdersApi(
        userId,
        page,
        itemsPerPage,
        status === 'all' ? undefined : status,
      );

      // Normalize timestamps for all orders
      const normalizedOrders = response.orders.map(order => {
        const timeInfo = normalizeTimestamp(order.timestamp);
        return {
          ...order,
          formattedDate: timeInfo.date,
          formattedTime: timeInfo.time,
        };
      });

      return {
        orders: normalizedOrders,
        totalItems: parseInt(response.total_items, 10),
        currentPage: page,
        statusFilter: status,
      };
    } catch (error: any) {
      console.error('fetchOrders thunk error:', error);
      return rejectWithValue(error.message || 'Failed to fetch orders');
    }
  },
);

export const searchOrders = createAsyncThunk(
  'orders/searchOrders',
  async (
    {
      userId,
      searchTerm,
      page = 1,
    }: {
      userId: string;
      searchTerm: string;
      page?: number;
    },
    {rejectWithValue},
  ) => {
    try {
      console.log('searchOrders thunk called with:', {
        userId,
        searchTerm,
        page,
      });

      const response = await searchOrdersApi(userId, searchTerm, page);

      // Normalize timestamps for all orders
      const normalizedOrders = response.orders.map(order => {
        const timeInfo = normalizeTimestamp(order.timestamp);
        return {
          ...order,
          formattedDate: timeInfo.date,
          formattedTime: timeInfo.time,
        };
      });

      return {
        orders: normalizedOrders,
        totalItems: parseInt(response.total_items, 10),
        currentPage: page,
        searchTerm,
      };
    } catch (error: any) {
      console.error('searchOrders thunk error:', error);
      return rejectWithValue(error.message || 'Failed to search orders');
    }
  },
);

// NEW: Update Order Status Thunk
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
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
      console.log('updateOrderStatus thunk called with:', {
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
      console.error('updateOrderStatus thunk error:', error);
      return rejectWithValue(error.message || 'Failed to update order status');
    }
  },
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      console.log('setStatusFilter called with:', action.payload);
      state.statusFilter = action.payload;
      state.currentPage = 1; // Reset to first page when changing filters
    },
    setSearchTerm: (state, action) => {
      console.log('setSearchTerm called with:', action.payload);
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },
    resetOrdersState: () => {
      console.log('resetOrdersState called');
      return initialState;
    },
    clearStatusUpdateError: state => {
      console.log('clearStatusUpdateError called');
      state.statusUpdateError = null;
    },
    // Local status update for optimistic UI
    updateOrderStatusLocal: (state, action) => {
      const {orderId, status} = action.payload;
      console.log('updateOrderStatusLocal called with:', {orderId, status});

      const orderIndex = state.orders.findIndex(o => o.order_id === orderId);
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
      }
    },
  },
  extraReducers: builder => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, state => {
        console.log('fetchOrders.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        console.log('fetchOrders.fulfilled with:', action.payload);
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalItems = action.payload.totalItems;
        state.currentPage = action.payload.currentPage;
        state.statusFilter = action.payload.statusFilter;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        console.log('fetchOrders.rejected with:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })

      // Search Orders
      .addCase(searchOrders.pending, state => {
        console.log('searchOrders.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(searchOrders.fulfilled, (state, action) => {
        console.log('searchOrders.fulfilled with:', action.payload);
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalItems = action.payload.totalItems;
        state.currentPage = action.payload.currentPage;
        state.searchTerm = action.payload.searchTerm;
      })
      .addCase(searchOrders.rejected, (state, action) => {
        console.log('searchOrders.rejected with:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Order Status Cases
      .addCase(updateOrderStatus.pending, (state, action) => {
        console.log('updateOrderStatus.pending');
        const {orderId} = action.meta.arg;

        // Add order to updating list
        if (!state.updatingStatus.includes(orderId)) {
          state.updatingStatus.push(orderId);
        }
        state.statusUpdateError = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        console.log('updateOrderStatus.fulfilled with:', action.payload);

        const {orderId, newStatus} = action.payload;

        // Update order status in local state
        const orderIndex = state.orders.findIndex(o => o.order_id === orderId);
        if (orderIndex !== -1) {
          state.orders[orderIndex].status = newStatus;
        }

        // Remove from updating list
        state.updatingStatus = state.updatingStatus.filter(
          id => id !== orderId,
        );

        state.statusUpdateError = null;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        console.log('updateOrderStatus.rejected with:', action.payload);

        const {orderId} = action.meta.arg;

        // Remove from updating list
        state.updatingStatus = state.updatingStatus.filter(
          id => id !== orderId,
        );

        state.statusUpdateError = action.payload as string;
      });
  },
});

export const {
  setStatusFilter,
  setSearchTerm,
  resetOrdersState,
  clearStatusUpdateError,
  updateOrderStatusLocal,
} = ordersSlice.actions;

export default ordersSlice.reducer;
