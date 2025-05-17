import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchOrderDetailsApi, Order} from '../../services/apiService';

interface OrderDetailsState {
  orderDetails: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderDetailsState = {
  orderDetails: null,
  loading: false,
  error: null,
};

// Helper function to ensure consistent timestamp format
const normalizeTimestamp = (timestampData: any) => {
  // If timestamp is a string with comma (e.g. "16/05/2025, 18:26")
  if (typeof timestampData === 'string' && timestampData.includes(',')) {
    // Split into date and time
    const [date, time] = timestampData.split(', ');

    // Parse the date to ensure consistent format
    let formattedDate = date;
    let formattedTime = time;

    // Convert time to 12-hour format if it's in 24-hour format
    if (time && !time.includes('AM') && !time.includes('PM')) {
      // Parse hours and minutes
      const [hours, minutes] = time.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12; // Convert 0 to 12
      formattedTime = `${hours12}:${minutes
        .toString()
        .padStart(2, '0')} ${period}`;
    }

    return {date: formattedDate, time: formattedTime};
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
        second: '2-digit',
        hour12: true,
      }),
    };
  }

  // Default fallback
  return {
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
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
      const response = await fetchOrderDetailsApi(userId, orderId);

      // Normalize timestamp to ensure consistency with OrderScreen
      const timeInfo = normalizeTimestamp(response.order_data.timestamp);

      return {
        ...response.order_data,
        formattedDate: timeInfo.date,
        formattedTime: timeInfo.time,
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch order details');
    }
  },
);

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    resetOrderDetails: () => initialState,
    updateOrderStatus: (state, action) => {
      if (state.orderDetails) {
        state.orderDetails.status = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrderDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {resetOrderDetails, updateOrderStatus} = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
