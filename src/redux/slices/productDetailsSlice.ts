import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchProductDetailsApi,
  ProductDetailsResponse,
} from '../../services/apiService';

// Define types
interface ProductDetailsState {
  data: ProductDetailsResponse | null;
  loading: boolean;
  error: string | null;
}

interface FetchProductDetailsParams {
  userId: string; // Changed from number to string to match API expectations
  productId: string;
}

// Create async thunk using the API client
export const fetchProductDetails = createAsyncThunk(
  'productDetails/fetchProductDetails',
  async ({userId, productId}: FetchProductDetailsParams, {rejectWithValue}) => {
    try {
      console.log(
        `Thunk fetchProductDetails - userId: ${userId}, productId: ${productId}`,
      );
      const response = await fetchProductDetailsApi(userId, productId);
      return response;
    } catch (error: any) {
      console.error('Error in fetchProductDetails thunk:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch product details',
      );
    }
  },
);

// Create slice
const initialState: ProductDetailsState = {
  data: null,
  loading: false,
  error: null,
};

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    clearProductDetails: state => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearProductDetails} = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
