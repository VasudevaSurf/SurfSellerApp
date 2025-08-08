// src/hooks/useCategories.ts

import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {
  fetchCategories,
  clearCategoriesError,
  resetCategories,
} from '../redux/slices/categoriesSlice';

export const useCategories = () => {
  const dispatch = useDispatch<AppDispatch>();

  const userId = useSelector(
    (state: RootState) => state.auth.userData?.user_id,
  );

  const {categories, loading, error, lastFetched} = useSelector(
    (state: RootState) => state.categories,
  );

  // Load categories
  const loadCategories = useCallback(
    (productId?: string, forceRefresh: boolean = false) => {
      if (!userId) {
        console.warn('No userId available for fetching categories');
        return;
      }

      // Only fetch if we don't have data or if force refresh is requested
      // or if data is older than 1 hour
      const shouldFetch =
        forceRefresh ||
        categories.length === 0 ||
        !lastFetched ||
        Date.now() - lastFetched > 3600000;

      if (shouldFetch) {
        console.log(
          'Fetching categories for userId:',
          userId,
          'productId:',
          productId,
        );
        dispatch(fetchCategories({userId, productId}));
      }
    },
    [dispatch, userId, categories.length, lastFetched],
  );

  // Auto-load categories when userId becomes available
  useEffect(() => {
    if (userId && categories.length === 0 && !loading) {
      loadCategories();
    }
  }, [userId, categories.length, loading, loadCategories]);

  // Clear error
  const clearError = useCallback(() => {
    dispatch(clearCategoriesError());
  }, [dispatch]);

  // Reset categories
  const reset = useCallback(() => {
    dispatch(resetCategories());
  }, [dispatch]);

  // Refresh categories
  const refreshCategories = useCallback(
    (productId?: string) => {
      loadCategories(productId, true);
    },
    [loadCategories],
  );

  return {
    // State
    categories,
    loading,
    error,
    lastFetched,

    // Actions
    loadCategories,
    refreshCategories,
    clearError,
    reset,
  };
};
