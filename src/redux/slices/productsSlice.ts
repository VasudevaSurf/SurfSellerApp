import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchProductsApi,
  fetchProductDetailsApi,
  Product,
  searchProductsApi,
} from '../../services/apiService';

// Define the ProductDetail interface
export interface ProductDetail extends Product {
  full_description?: string;
  // Add any additional fields that might be in the product details response
}

interface ProductsState {
  products: Product[];
  productDetails: ProductDetail | null;  // Add this line
  loading: boolean;
  error: string | null;
  totalItems: number;
  currentPage: number;
}

const initialState: ProductsState = {
  products: [],
  productDetails: null,  // Initialize the productDetails
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

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (productId: string, {rejectWithValue}) => {
    try {
      const response = await fetchProductDetailsApi(productId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Failed to fetch product details',
      );
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
    
    // Fetch Product Details
    builder.addCase(fetchProductDetails.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.productDetails = action.payload;
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default productsSlice.reducer;