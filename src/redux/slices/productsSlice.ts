import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchProductsApi,
  fetchProductDetailsApi,
  fetchProductsByStatusApi,
  fetchLowStockProductsApi,
  Product,
  searchProductsApi,
  ProductFilters,
  deleteProductApi,
  DeleteProductResponse,
  toggleProductStatusApi,
  updateProductStatusApi,
  updateMultipleProductsStatusApi,
  StatusUpdateResponse,
} from '../../services/apiService';

// Define the ProductDetail interface
export interface ProductDetail extends Product {
  full_description?: string;
  // Add any additional fields that might be in the product details response
}

interface ProductsState {
  products: Product[];
  productDetails: ProductDetail | null;
  loading: boolean;
  error: string | null;
  totalItems: number;
  currentPage: number;
  currentFilter: string;
  filterCounts: {
    all: number;
    active: number;
    pending: number;
    disabled: number;
    lowStock: number;
  };
  searchTerm: string;
  // Deletion state
  deletingProducts: string[]; // Array of product IDs being deleted
  deleteError: string | null;
  // Status update state
  updatingStatus: string[]; // Array of product IDs being updated
  statusUpdateError: string | null;
}

const initialState: ProductsState = {
  products: [],
  productDetails: null,
  loading: false,
  error: null,
  totalItems: 0,
  currentPage: 1,
  currentFilter: 'all',
  filterCounts: {
    all: 0,
    active: 0,
    pending: 0,
    disabled: 0,
    lowStock: 0,
  },
  searchTerm: '',
  // Initialize deletion state
  deletingProducts: [],
  deleteError: null,
  // Initialize status update state
  updatingStatus: [],
  statusUpdateError: null,
};

// Enhanced fetchProducts with filters
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (
    {
      userId,
      filters,
    }: {
      userId: string;
      filters?: ProductFilters;
    },
    {rejectWithValue},
  ) => {
    try {
      console.log('fetchProducts thunk called with:', {userId, filters});
      const response = await fetchProductsApi(userId, filters);
      return {
        products: response.products,
        totalItems: parseInt(response.total_items),
        page: filters?.page || 1,
        filter: filters?.status || 'all',
      };
    } catch (error: any) {
      console.error('fetchProducts thunk error:', error);
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  },
);

// New thunk for fetching products by status
export const fetchProductsByStatus = createAsyncThunk(
  'products/fetchProductsByStatus',
  async (
    {
      userId,
      status,
      page = 1,
    }: {
      userId: string;
      status: 'A' | 'P' | 'D';
      page?: number;
    },
    {rejectWithValue},
  ) => {
    try {
      console.log('fetchProductsByStatus thunk called with:', {
        userId,
        status,
        page,
      });
      const response = await fetchProductsByStatusApi(userId, status, page);
      return {
        products: response.products,
        totalItems: parseInt(response.total_items),
        page,
        filter: status,
      };
    } catch (error: any) {
      console.error('fetchProductsByStatus thunk error:', error);
      return rejectWithValue(
        error.message || 'Failed to fetch products by status',
      );
    }
  },
);

// New thunk for fetching low stock products
export const fetchLowStockProducts = createAsyncThunk(
  'products/fetchLowStockProducts',
  async (
    {
      userId,
      threshold = 2,
      page = 1,
    }: {
      userId: string;
      threshold?: number;
      page?: number;
    },
    {rejectWithValue},
  ) => {
    try {
      console.log('fetchLowStockProducts thunk called with:', {
        userId,
        threshold,
        page,
      });
      const response = await fetchLowStockProductsApi(userId, threshold, page);
      return {
        products: response.products,
        totalItems: parseInt(response.total_items),
        page,
        filter: 'lowStock',
      };
    } catch (error: any) {
      console.error('fetchLowStockProducts thunk error:', error);
      return rejectWithValue(
        error.message || 'Failed to fetch low stock products',
      );
    }
  },
);

// Enhanced search with filters
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (
    {
      userId,
      searchTerm,
      filters,
    }: {
      userId: string;
      searchTerm: string;
      filters?: ProductFilters;
    },
    {rejectWithValue},
  ) => {
    try {
      console.log('searchProducts thunk called with:', {
        userId,
        searchTerm,
        filters,
      });
      const response = await searchProductsApi(userId, searchTerm, filters);
      return {
        products: response.products,
        totalItems: parseInt(response.total_items),
        page: filters?.page || 1,
        searchTerm,
        filter: filters?.status || 'all',
      };
    } catch (error: any) {
      console.error('searchProducts thunk error:', error);
      return rejectWithValue(error.message || 'Failed to search products');
    }
  },
);

// Thunk to fetch filter counts
export const fetchFilterCounts = createAsyncThunk(
  'products/fetchFilterCounts',
  async ({userId}: {userId: string}, {rejectWithValue}) => {
    try {
      console.log('fetchFilterCounts thunk called with:', {userId});

      // Fetch counts for each filter in parallel
      const [
        allResponse,
        activeResponse,
        pendingResponse,
        disabledResponse,
        lowStockResponse,
      ] = await Promise.allSettled([
        fetchProductsApi(userId, {status: 'all', page: 1, itemsPerPage: 1}),
        fetchProductsByStatusApi(userId, 'A', 1, 1),
        fetchProductsByStatusApi(userId, 'P', 1, 1),
        fetchProductsByStatusApi(userId, 'D', 1, 1),
        fetchLowStockProductsApi(userId, 2, 1, 1),
      ]);

      const getCounts = (response: PromiseSettledResult<any>) => {
        if (response.status === 'fulfilled') {
          return parseInt(response.value.total_items) || 0;
        }
        return 0;
      };

      const counts = {
        all: getCounts(allResponse),
        active: getCounts(activeResponse),
        pending: getCounts(pendingResponse),
        disabled: getCounts(disabledResponse),
        lowStock: getCounts(lowStockResponse),
      };

      console.log('Filter counts fetched:', counts);
      return counts;
    } catch (error: any) {
      console.error('fetchFilterCounts thunk error:', error);
      return rejectWithValue(error.message || 'Failed to fetch filter counts');
    }
  },
);

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (
    {userId, productId}: {userId: string; productId: string},
    {rejectWithValue},
  ) => {
    try {
      console.log('fetchProductDetails thunk called with:', {
        userId,
        productId,
      });
      const response = await fetchProductDetailsApi(userId, productId);
      return response;
    } catch (error: any) {
      console.error('fetchProductDetails thunk error:', error);
      return rejectWithValue(
        error.message || 'Failed to fetch product details',
      );
    }
  },
);

// NEW: Product Status Update Thunk
export const updateProductStatus = createAsyncThunk(
  'products/updateProductStatus',
  async (
    {
      userId,
      productId,
      isActive,
    }: {
      userId: string;
      productId: string;
      isActive: boolean;
    },
    {rejectWithValue},
  ) => {
    try {
      console.log('updateProductStatus thunk called with:', {
        userId,
        productId,
        isActive,
      });

      const response = await toggleProductStatusApi(
        userId,
        productId,
        isActive,
      );

      if (!response.result) {
        throw new Error(response.message || 'Failed to update product status');
      }

      return {
        productId,
        newStatus: isActive ? 'A' : 'D',
        message: response.message,
      };
    } catch (error: any) {
      console.error('updateProductStatus thunk error:', error);
      return rejectWithValue(
        error.message || 'Failed to update product status',
      );
    }
  },
);

// NEW: Bulk Status Update Thunk
export const updateMultipleProductsStatus = createAsyncThunk(
  'products/updateMultipleProductsStatus',
  async (
    {
      userId,
      productIds,
      status,
    }: {
      userId: string;
      productIds: string[];
      status: 'A' | 'D' | 'H' | 'X';
    },
    {rejectWithValue},
  ) => {
    try {
      console.log('updateMultipleProductsStatus thunk called with:', {
        userId,
        productIds,
        status,
      });

      const response = await updateMultipleProductsStatusApi(
        userId,
        productIds,
        status,
      );

      if (!response.result) {
        throw new Error(response.message || 'Failed to update products status');
      }

      return {
        productIds,
        newStatus: status,
        message: response.message,
      };
    } catch (error: any) {
      console.error('updateMultipleProductsStatus thunk error:', error);
      return rejectWithValue(
        error.message || 'Failed to update products status',
      );
    }
  },
);

// Delete Product Thunk
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (
    {
      userId,
      productIds,
    }: {
      userId: string;
      productIds: string | string[];
    },
    {rejectWithValue},
  ) => {
    try {
      console.log('deleteProduct thunk called with:', {userId, productIds});

      const response = await deleteProductApi(userId, productIds);

      if (!response.result) {
        throw new Error(response.message || 'Failed to delete product');
      }

      return {
        deletedProductIds: Array.isArray(productIds)
          ? productIds
          : [productIds],
        message: response.message,
      };
    } catch (error: any) {
      console.error('deleteProduct thunk error:', error);
      return rejectWithValue(error.message || 'Failed to delete product');
    }
  },
);

// Delete Multiple Products Thunk
export const deleteMultipleProducts = createAsyncThunk(
  'products/deleteMultipleProducts',
  async (
    {
      userId,
      productIds,
    }: {
      userId: string;
      productIds: string[];
    },
    {rejectWithValue},
  ) => {
    try {
      console.log('deleteMultipleProducts thunk called with:', {
        userId,
        productIds,
      });

      if (productIds.length === 0) {
        throw new Error('No products selected for deletion');
      }

      const response = await deleteProductApi(userId, productIds);

      if (!response.result) {
        throw new Error(response.message || 'Failed to delete products');
      }

      return {
        deletedProductIds: productIds,
        message: response.message,
      };
    } catch (error: any) {
      console.error('deleteMultipleProducts thunk error:', error);
      return rejectWithValue(error.message || 'Failed to delete products');
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentFilter: (state, action) => {
      console.log('setCurrentFilter called with:', action.payload);
      state.currentFilter = action.payload;
      state.currentPage = 1; // Reset page when changing filter
    },
    setSearchTerm: (state, action) => {
      console.log('setSearchTerm called with:', action.payload);
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset page when searching
    },
    clearProducts: state => {
      console.log('clearProducts called');
      state.products = [];
      state.totalItems = 0;
      state.currentPage = 1;
    },
    resetProductsState: () => {
      console.log('resetProductsState called');
      return initialState;
    },
    // Local status update for optimistic UI
    updateProductStatusLocal: (state, action) => {
      const {productId, status} = action.payload;
      const productIndex = state.products.findIndex(
        p => p.product_id === productId,
      );
      if (productIndex !== -1) {
        state.products[productIndex].status = status;
      }
    },
    // Clear errors
    clearDeleteError: state => {
      console.log('clearDeleteError called');
      state.deleteError = null;
    },
    clearStatusUpdateError: state => {
      console.log('clearStatusUpdateError called');
      state.statusUpdateError = null;
    },
    // Remove product from local state (optimistic update)
    removeProductFromState: (state, action) => {
      const productId = action.payload;
      console.log('removeProductFromState called with:', productId);
      state.products = state.products.filter(p => p.product_id !== productId);
      state.totalItems = Math.max(0, state.totalItems - 1);
    },
    // Remove multiple products from local state
    removeMultipleProductsFromState: (state, action) => {
      const productIds = action.payload;
      console.log('removeMultipleProductsFromState called with:', productIds);
      state.products = state.products.filter(
        p => !productIds.includes(p.product_id),
      );
      state.totalItems = Math.max(0, state.totalItems - productIds.length);
    },
  },
  extraReducers: builder => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, state => {
        console.log('fetchProducts.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log('fetchProducts.fulfilled with:', action.payload);
        state.loading = false;
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
        state.currentPage = action.payload.page;
        state.currentFilter = action.payload.filter;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log('fetchProducts.rejected with:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Products By Status
      .addCase(fetchProductsByStatus.pending, state => {
        console.log('fetchProductsByStatus.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByStatus.fulfilled, (state, action) => {
        console.log('fetchProductsByStatus.fulfilled with:', action.payload);
        state.loading = false;
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
        state.currentPage = action.payload.page;
        state.currentFilter = action.payload.filter;
      })
      .addCase(fetchProductsByStatus.rejected, (state, action) => {
        console.log('fetchProductsByStatus.rejected with:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Low Stock Products
      .addCase(fetchLowStockProducts.pending, state => {
        console.log('fetchLowStockProducts.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLowStockProducts.fulfilled, (state, action) => {
        console.log('fetchLowStockProducts.fulfilled with:', action.payload);
        state.loading = false;
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
        state.currentPage = action.payload.page;
        state.currentFilter = action.payload.filter;
      })
      .addCase(fetchLowStockProducts.rejected, (state, action) => {
        console.log('fetchLowStockProducts.rejected with:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })

      // Search Products
      .addCase(searchProducts.pending, state => {
        console.log('searchProducts.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        console.log('searchProducts.fulfilled with:', action.payload);
        state.loading = false;
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
        state.currentPage = action.payload.page;
        state.searchTerm = action.payload.searchTerm;
        state.currentFilter = action.payload.filter;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        console.log('searchProducts.rejected with:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Filter Counts
      .addCase(fetchFilterCounts.pending, state => {
        console.log('fetchFilterCounts.pending');
        // Don't set loading for filter counts as it's background operation
      })
      .addCase(fetchFilterCounts.fulfilled, (state, action) => {
        console.log('fetchFilterCounts.fulfilled with:', action.payload);
        state.filterCounts = action.payload;
      })
      .addCase(fetchFilterCounts.rejected, (state, action) => {
        console.log('fetchFilterCounts.rejected with:', action.payload);
        console.error('Failed to fetch filter counts:', action.payload);
      })

      // Fetch Product Details
      .addCase(fetchProductDetails.pending, state => {
        console.log('fetchProductDetails.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        console.log('fetchProductDetails.fulfilled with:', action.payload);
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        console.log('fetchProductDetails.rejected with:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Product Status Cases
      .addCase(updateProductStatus.pending, (state, action) => {
        console.log('updateProductStatus.pending');
        const {productId} = action.meta.arg;

        // Add product to updating list
        if (!state.updatingStatus.includes(productId)) {
          state.updatingStatus.push(productId);
        }
        state.statusUpdateError = null;
      })
      .addCase(updateProductStatus.fulfilled, (state, action) => {
        console.log('updateProductStatus.fulfilled with:', action.payload);

        const {productId, newStatus} = action.payload;

        // Update product status in local state
        const productIndex = state.products.findIndex(
          p => p.product_id === productId,
        );
        if (productIndex !== -1) {
          state.products[productIndex].status = newStatus;
        }

        // Remove from updating list
        state.updatingStatus = state.updatingStatus.filter(
          id => id !== productId,
        );

        state.statusUpdateError = null;
      })
      .addCase(updateProductStatus.rejected, (state, action) => {
        console.log('updateProductStatus.rejected with:', action.payload);

        const {productId} = action.meta.arg;

        // Remove from updating list
        state.updatingStatus = state.updatingStatus.filter(
          id => id !== productId,
        );

        state.statusUpdateError = action.payload as string;
      })

      // Update Multiple Products Status Cases
      .addCase(updateMultipleProductsStatus.pending, (state, action) => {
        console.log('updateMultipleProductsStatus.pending');
        const {productIds} = action.meta.arg;

        // Add products to updating list
        productIds.forEach(id => {
          if (!state.updatingStatus.includes(id)) {
            state.updatingStatus.push(id);
          }
        });
        state.statusUpdateError = null;
      })
      .addCase(updateMultipleProductsStatus.fulfilled, (state, action) => {
        console.log(
          'updateMultipleProductsStatus.fulfilled with:',
          action.payload,
        );

        const {productIds, newStatus} = action.payload;

        // Update products status in local state
        productIds.forEach(productId => {
          const productIndex = state.products.findIndex(
            p => p.product_id === productId,
          );
          if (productIndex !== -1) {
            state.products[productIndex].status = newStatus;
          }
        });

        // Remove from updating list
        state.updatingStatus = state.updatingStatus.filter(
          id => !productIds.includes(id),
        );

        state.statusUpdateError = null;
      })
      .addCase(updateMultipleProductsStatus.rejected, (state, action) => {
        console.log(
          'updateMultipleProductsStatus.rejected with:',
          action.payload,
        );

        const {productIds} = action.meta.arg;

        // Remove from updating list
        state.updatingStatus = state.updatingStatus.filter(
          id => !productIds.includes(id),
        );

        state.statusUpdateError = action.payload as string;
      })

      // Delete Product Cases
      .addCase(deleteProduct.pending, (state, action) => {
        console.log('deleteProduct.pending');
        const productIds = Array.isArray(action.meta.arg.productIds)
          ? action.meta.arg.productIds
          : [action.meta.arg.productIds];

        // Add products to deleting list
        state.deletingProducts = [...state.deletingProducts, ...productIds];
        state.deleteError = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log('deleteProduct.fulfilled with:', action.payload);

        const {deletedProductIds} = action.payload;

        // Remove products from local state
        state.products = state.products.filter(
          product => !deletedProductIds.includes(product.product_id),
        );

        // Update total items count
        state.totalItems = Math.max(
          0,
          state.totalItems - deletedProductIds.length,
        );

        // Remove from deleting list
        state.deletingProducts = state.deletingProducts.filter(
          id => !deletedProductIds.includes(id),
        );

        state.deleteError = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        console.log('deleteProduct.rejected with:', action.payload);

        // Remove from deleting list on error
        const productIds = Array.isArray(action.meta.arg.productIds)
          ? action.meta.arg.productIds
          : [action.meta.arg.productIds];

        state.deletingProducts = state.deletingProducts.filter(
          id => !productIds.includes(id),
        );

        state.deleteError = action.payload as string;
      })

      // Delete Multiple Products Cases
      .addCase(deleteMultipleProducts.pending, (state, action) => {
        console.log('deleteMultipleProducts.pending');
        const {productIds} = action.meta.arg;

        // Add products to deleting list
        state.deletingProducts = [...state.deletingProducts, ...productIds];
        state.deleteError = null;
      })
      .addCase(deleteMultipleProducts.fulfilled, (state, action) => {
        console.log('deleteMultipleProducts.fulfilled with:', action.payload);

        const {deletedProductIds} = action.payload;

        // Remove products from local state
        state.products = state.products.filter(
          product => !deletedProductIds.includes(product.product_id),
        );

        // Update total items count
        state.totalItems = Math.max(
          0,
          state.totalItems - deletedProductIds.length,
        );

        // Remove from deleting list
        state.deletingProducts = state.deletingProducts.filter(
          id => !deletedProductIds.includes(id),
        );

        state.deleteError = null;
      })
      .addCase(deleteMultipleProducts.rejected, (state, action) => {
        console.log('deleteMultipleProducts.rejected with:', action.payload);

        // Remove from deleting list on error
        const {productIds} = action.meta.arg;
        state.deletingProducts = state.deletingProducts.filter(
          id => !productIds.includes(id),
        );

        state.deleteError = action.payload as string;
      });
  },
});

export const {
  setCurrentFilter,
  setSearchTerm,
  clearProducts,
  resetProductsState,
  updateProductStatusLocal,
  clearDeleteError,
  clearStatusUpdateError,
  removeProductFromState,
  removeMultipleProductsFromState,
} = productsSlice.actions;

export default productsSlice.reducer;
