// src/hooks/useDashboard.ts

import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {
  fetchDashboard,
  clearDashboardError,
  resetDashboard,
} from '../redux/slices/dashboardSlice';

export const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const userId = useSelector(
    (state: RootState) => state.auth.userData?.user_id,
  );
  const {data, loading, error, lastFetched} = useSelector(
    (state: RootState) => state.dashboard,
  );

  // Load dashboard data
  const loadDashboard = useCallback(
    (forceRefresh: boolean = false) => {
      if (!userId) {
        console.warn('No userId available for fetching dashboard');
        return;
      }

      // Only fetch if we don't have data or if force refresh is requested
      // or if data is older than 5 minutes
      const shouldFetch =
        forceRefresh ||
        !data ||
        !lastFetched ||
        Date.now() - lastFetched > 300000; // 5 minutes

      if (shouldFetch) {
        console.log('Fetching dashboard for userId:', userId);
        dispatch(fetchDashboard(userId));
      }
    },
    [dispatch, userId, data, lastFetched],
  );

  // Auto-load dashboard when userId becomes available
  useEffect(() => {
    if (userId && !data && !loading) {
      loadDashboard();
    }
  }, [userId, data, loading, loadDashboard]);

  // Clear error
  const clearError = useCallback(() => {
    dispatch(clearDashboardError());
  }, [dispatch]);

  // Reset dashboard
  const reset = useCallback(() => {
    dispatch(resetDashboard());
  }, [dispatch]);

  // Refresh dashboard
  const refreshDashboard = useCallback(() => {
    loadDashboard(true);
  }, [loadDashboard]);

  // Parse statistics data
  const parseStatistics = useCallback(() => {
    if (!data?.statistics) return null;

    const stats = data.statistics.reduce((acc, stat) => {
      acc[stat.icon] = {
        name: stat.name,
        value: stat.value,
        icon: stat.icon,
      };
      return acc;
    }, {} as Record<string, (typeof data.statistics)[0]>);

    return stats;
  }, [data]);

  // Get order counts by status
  const getOrderCounts = useCallback(() => {
    if (!data?.recent_orders)
      return {pending: 0, accepted: 0, completed: 0, failed: 0, canceled: 0};

    const counts = data.recent_orders.reduce(
      (acc, order) => {
        switch (order.status) {
          case 'O':
            acc.pending++;
            break;
          case 'P':
            acc.accepted++;
            break;
          case 'C':
            acc.completed++;
            break;
          case 'F':
            acc.failed++;
            break;
          case 'I':
            acc.canceled++;
            break;
        }
        return acc;
      },
      {pending: 0, accepted: 0, completed: 0, failed: 0, canceled: 0},
    );

    return counts;
  }, [data]);

  return {
    // Raw data
    dashboardData: data,
    loading,
    error,
    lastFetched,

    // Parsed data
    recentOrders: data?.recent_orders || [],
    statistics: parseStatistics(),
    orderStatuses: data?.order_statuses || [],
    appConfig: data?.app_configuration,
    currencies: data?.currencies || [],
    defaultCurrency: data?.default_currency || 'EUR',
    dateRange: data ? {from: data.from, to: data.to} : null,

    // Computed values
    orderCounts: getOrderCounts(),
    currentBalance: parseStatistics()?.current_bal?.value || '€0.00',
    income: parseStatistics()?.income?.value || '€0.00',
    sales: parseStatistics()?.sales?.value || '€0.00',
    taxes: parseStatistics()?.taxes?.value || '€0.00',
    activeProducts: parseStatistics()?.active_products?.value || '0',
    outOfStock: parseStatistics()?.out_stock_pdts?.value || '0',
    ordersCount: parseStatistics()?.orders?.value || 0,

    // Actions
    loadDashboard,
    refreshDashboard,
    clearError,
    reset,
  };
};
