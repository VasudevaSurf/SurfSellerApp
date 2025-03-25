import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchProductsApi,
  Product,
  searchProductsApi,
} from '../../services/apiService';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  currentPage: number;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  totalItems: 0,
  currentPage: 1,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (
    {userId, page}: {userId: string; page?: number},
    {rejectWithValue},
  ) => {
    try {
      const response = await fetchProductsApi(userId, page);
      return {
        products: response.products,
        totalItems: parseInt(response.total_items),
        page: page || 1,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  },
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (
    {
      userId,
      searchTerm,
      page,
    }: {userId: string; searchTerm: string; page?: number},
    {rejectWithValue},
  ) => {
    try {
      const response = await searchProductsApi(userId, searchTerm, page);
      return {
        products: response.products,
        totalItems: parseInt(response.total_items),
        page: page || 1,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to search products');
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Fetch Products
    builder.addCase(fetchProducts.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.totalItems = action.payload.totalItems;
      state.currentPage = action.payload.page;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Search Products
    builder.addCase(searchProducts.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.totalItems = action.payload.totalItems;
      state.currentPage = action.payload.page;
    });
    builder.addCase(searchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default productsSlice.reducer;
