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

export const fetchOrderDetails = createAsyncThunk(
  'orderDetails/fetchOrderDetails',
  async (
    {userId, orderId}: {userId: string; orderId: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await fetchOrderDetailsApi(userId, orderId);
      return response.order_data;
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

export const {resetOrderDetails} = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
