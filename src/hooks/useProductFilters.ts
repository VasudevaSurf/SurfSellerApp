// src/hooks/useProductFilters.ts

import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {
  fetchProducts,
  fetchProductsByStatus,
  fetchLowStockProducts,
  searchProducts,
  fetchFilterCounts,
  setCurrentFilter,
  setSearchTerm,
  updateProductStatus,
  updateMultipleProductsStatus,
  clearStatusUpdateError,
} from '../redux/slices/productsSlice';
import {SlidingBarOption} from '../components/MainComponents/SlidingBar/SlidingBar.types';

export const useProductFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const userId = useSelector(
    (state: RootState) => state.auth.userData?.user_id,
  );

  const {
    products,
    loading,
    error,
    totalItems,
    currentFilter,
    filterCounts,
    searchTerm,
    updatingStatus,
    statusUpdateError,
  } = useSelector((state: RootState) => state.products);

  console.log('useProductFilters - Current state:', {
    userId,
    productsCount: products.length,
    loading,
    error,
    totalItems,
    currentFilter,
    filterCounts,
    searchTerm,
    updatingStatus,
    statusUpdateError,
  });

  // Create filter options with dynamic counts
  const filterOptions: SlidingBarOption[] = useMemo(() => {
    const options = [
      {
        id: 'all',
        label: `All${filterCounts.all > 0 ? ` ${filterCounts.all}` : ''}`,
      },
      {
        id: 'active',
        label: `Active${
          filterCounts.active > 0 ? ` ${filterCounts.active}` : ''
        }`,
      },
      {
        id: 'lowStock',
        label: `Low Stock${
          filterCounts.lowStock > 0 ? ` ${filterCounts.lowStock}` : ''
        }`,
      },
      {
        id: 'pending',
        label: `Pending${
          filterCounts.pending > 0 ? ` ${filterCounts.pending}` : ''
        }`,
      },
      {
        id: 'disabled',
        label: `Hidden${
          filterCounts.disabled > 0 ? ` ${filterCounts.disabled}` : ''
        }`,
      },
    ];

    console.log('Generated filter options:', options);
    return options;
  }, [filterCounts]);

  // Get current selected filter option
  const selectedFilter = useMemo(() => {
    const selected =
      filterOptions.find(option => option.id === currentFilter) ||
      filterOptions[0];
    console.log('Selected filter:', selected);
    return selected;
  }, [filterOptions, currentFilter]);

  // Function to fetch products based on filter
  const fetchProductsForFilter = useCallback(
    (filterId: string, search: string = '', page: number = 1) => {
      if (!userId) {
        console.log('fetchProductsForFilter - No userId, skipping');
        return;
      }

      console.log(`fetchProductsForFilter called with:`, {
        filterId,
        search,
        page,
        userId,
      });

      if (search.trim()) {
        // If there's a search term, use search API with filter
        const statusMap: {[key: string]: 'A' | 'P' | 'D' | 'all'} = {
          all: 'all',
          active: 'A',
          pending: 'P',
          disabled: 'D',
          lowStock: 'A', // Low stock is subset of active
        };

        console.log('Dispatching searchProducts with search term');
        dispatch(
          searchProducts({
            userId,
            searchTerm: search,
            filters: {
              status: statusMap[filterId] || 'all',
              lowStock: filterId === 'lowStock',
              page,
            },
          }),
        );
      } else {
        // No search term, use appropriate filter API
        console.log(`Dispatching filter API for: ${filterId}`);
        switch (filterId) {
          case 'active':
            dispatch(fetchProductsByStatus({userId, status: 'A', page}));
            break;
          case 'pending':
            dispatch(fetchProductsByStatus({userId, status: 'P', page}));
            break;
          case 'disabled':
            dispatch(fetchProductsByStatus({userId, status: 'D', page}));
            break;
          case 'lowStock':
            dispatch(fetchLowStockProducts({userId, threshold: 2, page}));
            break;
          case 'all':
          default:
            dispatch(fetchProducts({userId, filters: {status: 'all', page}}));
            break;
        }
      }
    },
    [dispatch, userId],
  );

  // Function to refresh filter counts
  const refreshFilterCounts = useCallback(() => {
    if (userId) {
      console.log('refreshFilterCounts called');
      dispatch(fetchFilterCounts({userId}));
    }
  }, [dispatch, userId]);

  // Function to handle filter selection
  const handleFilterSelect = useCallback(
    (option: SlidingBarOption) => {
      console.log('handleFilterSelect called with:', option);
      dispatch(setCurrentFilter(option.id as string));
      fetchProductsForFilter(option.id as string, searchTerm);
    },
    [dispatch, fetchProductsForFilter, searchTerm],
  );

  // Function to handle search with debouncing
  const handleSearch = useCallback(
    (text: string) => {
      console.log('handleSearch called with:', text);
      dispatch(setSearchTerm(text));

      // Clear existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Set new timeout for debounced search
      searchTimeoutRef.current = setTimeout(() => {
        console.log('Executing debounced search');
        fetchProductsForFilter(currentFilter, text);
      }, 300); // 300ms debounce
    },
    [dispatch, fetchProductsForFilter, currentFilter],
  );

  // Function to refresh current view
  const refreshProducts = useCallback(async () => {
    console.log('refreshProducts called');
    refreshFilterCounts();
    fetchProductsForFilter(currentFilter, searchTerm);
  }, [refreshFilterCounts, fetchProductsForFilter, currentFilter, searchTerm]);

  // Load next page
  const loadNextPage = useCallback(
    (page: number) => {
      console.log('loadNextPage called with page:', page);
      fetchProductsForFilter(currentFilter, searchTerm, page);
    },
    [fetchProductsForFilter, currentFilter, searchTerm],
  );

  // NEW: Toggle product status
  const toggleProductStatus = useCallback(
    async (productId: string, isActive: boolean) => {
      if (!userId) {
        console.error('No userId available for status update');
        throw new Error('User ID not available');
      }

      console.log('toggleProductStatus called:', {productId, isActive});

      try {
        const result = await dispatch(
          updateProductStatus({
            userId,
            productId,
            isActive,
          }),
        ).unwrap();

        console.log('Product status updated successfully:', result);

        // Refresh filter counts after status change
        setTimeout(() => {
          refreshFilterCounts();
        }, 500);

        return result;
      } catch (error) {
        console.error('Failed to update product status:', error);
        throw error;
      }
    },
    [dispatch, userId, refreshFilterCounts],
  );

  // NEW: Bulk status update
  const updateMultipleStatus = useCallback(
    async (productIds: string[], status: 'A' | 'D' | 'H' | 'X') => {
      if (!userId) {
        console.error('No userId available for bulk status update');
        throw new Error('User ID not available');
      }

      console.log('updateMultipleStatus called:', {productIds, status});

      try {
        const result = await dispatch(
          updateMultipleProductsStatus({
            userId,
            productIds,
            status,
          }),
        ).unwrap();

        console.log('Multiple products status updated successfully:', result);

        // Refresh filter counts after status change
        setTimeout(() => {
          refreshFilterCounts();
        }, 500);

        return result;
      } catch (error) {
        console.error('Failed to update multiple products status:', error);
        throw error;
      }
    },
    [dispatch, userId, refreshFilterCounts],
  );

  // Clear status update error
  const clearStatusError = useCallback(() => {
    dispatch(clearStatusUpdateError());
  }, [dispatch]);

  // Initialize filter counts on mount
  useEffect(() => {
    console.log('useProductFilters - Initialize effect, userId:', userId);
    if (userId) {
      refreshFilterCounts();
    }
  }, [userId, refreshFilterCounts]);

  // Initialize products on mount if none exist
  useEffect(() => {
    console.log('useProductFilters - Products initialization effect');
    if (userId && products.length === 0 && !loading && !error) {
      console.log('Initializing products fetch');
      fetchProductsForFilter('all');
    }
  }, [userId, products.length, loading, error, fetchProductsForFilter]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    products,
    loading,
    error,
    totalItems,
    currentFilter,
    filterCounts,
    searchTerm,
    filterOptions,
    selectedFilter,
    updatingStatus,
    statusUpdateError,

    // Actions
    handleFilterSelect,
    handleSearch,
    refreshProducts,
    refreshFilterCounts,
    loadNextPage,
    fetchProductsForFilter,
    toggleProductStatus,
    updateMultipleStatus,
    clearStatusError,
  };
};
