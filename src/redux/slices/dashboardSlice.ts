// src/redux/slices/dashboardSlice.ts

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchDashboardApi, DashboardResponse} from '../../services/apiService';

export interface DashboardState {
  data: DashboardResponse | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
  lastFetched: null,
};

// Async thunk to fetch dashboard data
export const fetchDashboard = createAsyncThunk(
  'dashboard/fetchDashboard',
  async (userId: string, {rejectWithValue}) => {
    try {
      console.log('Fetching dashboard for userId:', userId);
      const response = await fetchDashboardApi(userId);
      return response;
    } catch (error: any) {
      console.error('Fetch dashboard error:', error);
      return rejectWithValue(error.message || 'Failed to fetch dashboard data');
    }
  },
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardError: state => {
      state.error = null;
    },
    resetDashboard: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDashboard.pending, state => {
        console.log('fetchDashboard.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        console.log('fetchDashboard.fulfilled with data:', action.payload);
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        state.lastFetched = Date.now();
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        console.log('fetchDashboard.rejected with error:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearDashboardError, resetDashboard} = dashboardSlice.actions;
export default dashboardSlice.reducer;
