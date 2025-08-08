import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchCategoriesApi,
  CategoryData,
  CategoriesResponse,
} from '../../services/apiService';

export interface CategoriesState {
  categories: CategoryData[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
  lastFetched: null,
};

// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (
    {userId, productId}: {userId: string; productId?: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await fetchCategoriesApi(userId, productId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch categories');
    }
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategoriesError: state => {
      state.error = null;
    },
    resetCategories: state => {
      state.categories = [];
      state.error = null;
      state.lastFetched = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.error = null;
        state.lastFetched = Date.now();
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearCategoriesError, resetCategories} = categoriesSlice.actions;
export default categoriesSlice.reducer;
