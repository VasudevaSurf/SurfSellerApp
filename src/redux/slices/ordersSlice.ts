import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchOrdersApi,
  searchOrdersApi,
  Order,
} from '../../services/apiService';

interface OrdersState {
  orders: Order[];
  totalItems: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  searchTerm: string;
  statusFilter: string;
}

const initialState: OrdersState = {
  orders: [],
  totalItems: 0,
  loading: false,
  error: null,
  currentPage: 1,
  searchTerm: '',
  statusFilter: 'all',
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
      const response = await fetchOrdersApi(userId, page, itemsPerPage, status);
      return {
        orders: response.orders,
        totalItems: parseInt(response.total_items, 10),
        currentPage: page,
        statusFilter: status,
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch orders');
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
      const response = await searchOrdersApi(userId, searchTerm, page);
      return {
        orders: response.orders,
        totalItems: parseInt(response.total_items, 10),
        currentPage: page,
        searchTerm,
      };
    } catch (error) {
      return rejectWithValue('Failed to search orders');
    }
  },
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
      state.currentPage = 1; // Reset to first page when changing filters
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },
    resetOrdersState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalItems = action.payload.totalItems;
        state.currentPage = action.payload.currentPage;
        state.statusFilter = action.payload.statusFilter;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalItems = action.payload.totalItems;
        state.currentPage = action.payload.currentPage;
        state.searchTerm = action.payload.searchTerm;
      })
      .addCase(searchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setStatusFilter, setSearchTerm, resetOrdersState} =
  ordersSlice.actions;
export default ordersSlice.reducer;
