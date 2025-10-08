import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  createWithdrawalApi,
  WithdrawalResponse,
} from '../../services/apiService';

interface WithdrawalState {
  loading: boolean;
  success: boolean;
  error: string | null;
  lastWithdrawal: WithdrawalResponse | null;
}

const initialState: WithdrawalState = {
  loading: false,
  success: false,
  error: null,
  lastWithdrawal: null,
};

export const createWithdrawal = createAsyncThunk(
  'withdrawal/create',
  async (
    {
      userId,
      amount,
      comments,
    }: {
      userId: string;
      amount: number;
      comments?: string;
    },
    {rejectWithValue},
  ) => {
    try {
      const response = await createWithdrawalApi(userId, amount, comments);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create withdrawal');
    }
  },
);

const withdrawalSlice = createSlice({
  name: 'withdrawal',
  initialState,
  reducers: {
    clearWithdrawalState: state => {
      state.success = false;
      state.error = null;
      state.lastWithdrawal = null;
    },
    clearWithdrawalError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createWithdrawal.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createWithdrawal.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.lastWithdrawal = action.payload;
        state.error = null;
      })
      .addCase(createWithdrawal.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearWithdrawalState, clearWithdrawalError} =
  withdrawalSlice.actions;
export default withdrawalSlice.reducer;
