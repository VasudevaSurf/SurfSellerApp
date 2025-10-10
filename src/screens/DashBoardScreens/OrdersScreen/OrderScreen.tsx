import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { ScrollView, View, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BellIcon from '../../../assets/icons/BellIcon';
import { OrderInfo } from '../../../components/MainComponents/OrderInfo/OrderInfo';
import { OrderStatus } from '../../../components/MainComponents/OrderInfo/OrderInfo.types';
import { Header } from '../../../components/UserComponents/Header/Header';
import { SearchBox } from '../../../components/UserComponents/SearchBox/SearchBox';
import { Typography } from '../../../components/UserComponents/Typography/Typography';
import { TypographyVariant } from '../../../components/UserComponents/Typography/Typography.types';
import { ColorPalette } from '../../../config/colorPalette';
import { getScreenHeight } from '../../../helpers/screenSize';
import { navigate } from '../../../navigation/utils/navigationRef';
import { styles } from './OrderScreen.styles';
import { SlidingBar } from '../../../components/MainComponents/SlidingBar/SlidingBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import {
  fetchOrders,
  searchOrders,
  setStatusFilter,
  setSearchTerm,
  updateOrderStatus,
  clearStatusUpdateError,
  fetchFilteredOrders,
  setActiveFilters,
  clearActiveFilters,
  OrderFilters,
} from '../../../redux/slices/ordersSlice';
import FilterIcon from '../../../assets/icons/FilterIcon';
import SuccessTickSquareIcon from '../../../assets/icons/ToastIcons/SuccessTick';
import { showCustomToast } from '../../../components/MainComponents/Toast/ToastComponent';
import { FilterOrdersModal } from '../../../components/MainComponents/FilterOrdersModal';
import AnimatedLoader from '../../../assets/icons/LoaderIcon';

export const statusIconMap: { [key: string]: ReactNode | string } = {
  'Pending': '⏳',
  'Open': '📂',
  'Accepted':'✅',
  'Paid': '💰',
  'Declined':'🚫',
  'Failed': '❌',
  'Backordered': '📦',
  'Shipped': '🚚',
  'Delivered': '📬',
  'Completed': '🏆',
  'Cancelled': '🗑️',
  'Returned': '🔄',
  'Exchanged': '♻️',
};

export const showStatusToast = (status: string) => {  
  const message = `Order marked as ${status}`;
  const iconComponent = statusIconMap[status] || <SuccessTickSquareIcon size={18} />;
  
  showCustomToast(message, iconComponent);
};


// Map API status codes to display status
export const convertOrderStatus = (apiStatus: string): OrderStatus => {
  const statusMap: { [key: string]: OrderStatus } = {
    O: 'Pending',
    P: 'Processing',
    C: 'Completed',
    F: 'Failed',
    I: 'Cancelled',
    D: 'Declined',
    B: 'Shipped',
    Y: 'Processing',
    A: 'Processing',
  };

  return statusMap[apiStatus] || 'Processing';
};

// Map display status back to API status codes
const convertStatusToApi = (displayStatus: OrderStatus): string => {
  const statusMap: { [key: string]: string } = {
    Pending: 'O',
    Processing: 'P',
    Completed: 'C',
    Failed: 'F',
    Cancelled: 'I',
    Declined: 'D',
    Shipped: 'B',
  };

  return statusMap[displayStatus] || 'P';
};

// Get API status from filter ID
const getApiStatusFromFilter = (filterId: string): string | undefined => {
  if (filterId === 'all') return undefined;

  const filterToApiMap: { [key: string]: string } = {
    pending: 'O',
    processing: 'P',
    completed: 'C',
    failed: 'F',
    cancelled: 'I',
    declined: 'D',
    shipped: 'B',
  };

  if (['O', 'P', 'C', 'F', 'I', 'D', 'B', 'Y', 'A'].includes(filterId)) {
    return filterId;
  }

  return filterToApiMap[filterId];
};

const OrderScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector(
    (state: RootState) => state.auth.userData?.user_id,
  );

  const {
    orders,
    loading,
    error,
    statusFilter,
    searchTerm,
    currentPage,
    totalItems,
    updatingStatus,
    statusUpdateError,
    activeFilters,
  } = useSelector((state: RootState) => state.orders);

  // State for filter modal
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<OrderFilters>(
    activeFilters || {},
  );

  const [searchText, setSearchText] = useState('');
  const [searchTimeoutRef, setSearchTimeoutRef] =
    useState<NodeJS.Timeout | null>(null);

  // Sync local filters with Redux state
  useEffect(() => {
    if (activeFilters) {
      setCurrentFilters(activeFilters);
    }
  }, [activeFilters]);

  // Debugging: Log userId and orders
  useEffect(() => {
    console.log('OrderScreen - userId:', userId);
    console.log('OrderScreen - Orders received:', orders?.length || 0);

    if (orders && orders.length > 0) {
      console.log('OrderScreen - First order:', orders[0]);
    }
  }, [userId, orders]);

  // Initialize orders fetch
  useEffect(() => {
    if (userId) {
      const apiStatus = getApiStatusFromFilter(statusFilter);
      dispatch(fetchOrders({ userId, status: apiStatus }));
    }
  }, [dispatch, userId]);

  // Format orders for display
  const formattedOrders =
    orders?.map(order => {
      const customerName =
        order.customer?.name ||
        `${order.firstname || ''} ${order.lastname || ''}`.trim() ||
        'Customer';

      const firstProduct =
        order.products && order.products.length > 0 ? order.products[0] : null;
      const productName = firstProduct?.product || customerName;
      const productImage =
        firstProduct?.image_url || 'https://picsum.photos/202';

      return {
        id: order.order_id || '',
        orderImage: productImage,
        orderName: productName,
        orderPrice: order.total || '€0.00',
        orderNumber: parseInt(order.order_id || '0'),
        orderEmail: order.email || '',
        orderPhone: order.phone || '',
        orderDate: order.formattedDate || new Date().toLocaleDateString(),
        orderTime: order.formattedTime || new Date().toLocaleTimeString(),
        orderStatus: convertOrderStatus(order.status || ''),
        orderQuantity: firstProduct?.amount || 1,
      };
    }) || [];

  // Define filter options
  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'processing', label: 'Processing' },
    { id: 'completed', label: 'Completed' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'cancelled', label: 'Cancelled' },
    { id: 'failed', label: 'Failed' },
    { id: 'declined', label: 'Declined' },
  ];

  const [selectedFilter, setSelectedFilter] = useState(
    filterOptions.find(option => option.id === statusFilter) ||
    filterOptions[0],
  );

  // Update selected filter when statusFilter changes
  useEffect(() => {
    const newSelectedFilter = filterOptions.find(
      option => option.id === statusFilter,
    );
    if (newSelectedFilter) {
      setSelectedFilter(newSelectedFilter);
    }
  }, [statusFilter]);

  // Handle search with debouncing
  const handleSearchTextChange = useCallback(
    (text: string) => {
      setSearchText(text);

      if (searchTimeoutRef) {
        clearTimeout(searchTimeoutRef);
      }

      const timeoutId = setTimeout(() => {
        if (userId) {
          if (text.trim()) {
            dispatch(searchOrders({ userId, searchTerm: text }));
          } else {
            const apiStatus = getApiStatusFromFilter(statusFilter);
            dispatch(fetchOrders({ userId, status: apiStatus }));
          }
        }
      }, 500);

      setSearchTimeoutRef(timeoutId);
    },
    [dispatch, userId, statusFilter, searchTimeoutRef],
  );

  // Handle search submission
  const handleSearch = useCallback(() => {
    if (userId) {
      if (searchText.trim()) {
        dispatch(searchOrders({ userId, searchTerm: searchText }));
      } else {
        const apiStatus = getApiStatusFromFilter(statusFilter);
        dispatch(fetchOrders({ userId, status: apiStatus }));
      }
    }
  }, [dispatch, userId, searchText, statusFilter]);

  // Handle status change for individual orders
  const handleStatusChange = useCallback(
    async (orderId: string, newStatus: OrderStatus) => {
      try {
        if (!userId) {
          console.error('No userId available for status update');
          return;
        }

        const apiStatus = convertStatusToApi(newStatus);
        const res = await dispatch(
          updateOrderStatus({ userId, orderId, status: apiStatus }),
        ).unwrap();

        const updatedStatus = convertOrderStatus(res.newStatus);
        showStatusToast(updatedStatus);

        // Refresh orders list after successful update
        setTimeout(() => {
          const currentApiStatus = getApiStatusFromFilter(statusFilter);
          dispatch(fetchOrders({ userId: userId!, status: currentApiStatus }));
        }, 1000);
      } catch (error: any) {
        console.error('Failed to update order status:', error);
      }
    },
    [dispatch, userId, statusFilter],
  );

  // Handle filter selection
  const handleFilterSelect = useCallback(
    (filter: { id: string; label: string }) => {
      dispatch(setStatusFilter(filter.id));

      if (userId) {
        const apiStatus = getApiStatusFromFilter(filter.id);

        // If there are active filters, apply them with the new status filter
        if (hasActiveFilters()) {
          const updatedFilters = {
            ...currentFilters,
            orderStatus: filter.id,
          };
          dispatch(
            fetchFilteredOrders({
              userId,
              filters: updatedFilters,
            }),
          );
        } else {
          dispatch(fetchOrders({ userId, status: apiStatus }));
        }
      }
    },
    [dispatch, userId, currentFilters],
  );

  // NEW: Handle apply filters
  const handleApplyFilters = (filters: OrderFilters) => {
    console.log('Applying order filters:', filters);

    setCurrentFilters(filters);

    dispatch(setActiveFilters(filters));

    if (userId) {
      dispatch(
        fetchFilteredOrders({
          userId,
          filters,
          page: 1,
        }),
      );
    }

    setIsFilterModalVisible(false);
  };

  // NEW: Handle clear filters
  const handleClearFilters = () => {
    console.log('Clearing order filters');

    setCurrentFilters({});

    dispatch(clearActiveFilters());

    if (userId) {
      const apiStatus = getApiStatusFromFilter(statusFilter);
      dispatch(fetchOrders({ userId, status: apiStatus }));
    }
  };

  // NEW: Check if any filters are active
  const hasActiveFilters = (): boolean => {
    return (
      Object.keys(currentFilters).length > 0 &&
      Object.values(currentFilters).some(value => value && value !== 'all')
    );
  };

  // NEW: Count active filters
  const getActiveFilterCount = (): number => {
    let count = 0;
    if (currentFilters.customerName) count++;
    if (currentFilters.email) count++;
    if (currentFilters.phoneNumber) count++;
    if (currentFilters.minOrderValue || currentFilters.maxOrderValue) count++;
    if (currentFilters.orderStatus && currentFilters.orderStatus !== 'all')
      count++;
    return count;
  };

  // Handle card press to navigate to order details
  const handleCardPress = useCallback((params: any) => {
    navigate('Dashboard', {
      screen: 'Orders',
      params: {
        screen: 'OrderDetail',
        params: {
          orderId: params.id,
          orderImage: params.orderImage,
          orderName: params.orderName,
          orderPrice: params.orderPrice,
          orderNumber: params.orderNumber,
          orderEmail: params.orderEmail,
          orderPhone: params.orderPhone,
          orderDate: params.orderDate,
          orderTime: params.orderTime,
          orderStatus: params.orderStatus,
          orderQuantity: params.orderQuantity,
        },
      },
    });
  }, []);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      if (statusUpdateError) {
        dispatch(clearStatusUpdateError());
      }
      if (searchTimeoutRef) {
        clearTimeout(searchTimeoutRef);
      }
    };
  }, [statusUpdateError, searchTimeoutRef, dispatch]);

  console.log(
    'loading:',
    loading,
    'error:',
    error,
    'orders:',
    formattedOrders.length,
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <Header
        name="Orders"
        variant={TypographyVariant.H6_BOLD}
        textColor={ColorPalette.GREY_TEXT_500}
        rightIcons={[
          {
            icon: BellIcon,
            onPress: () =>
              navigate('Dashboard', {
                screen: 'Account',
                params: { screen: 'NotificationScreen' },
              }),
            size: 22,
            color: ColorPalette.IconColor,
            strokeWidth: 1.5,
          },
          {
            icon: FilterIcon,
            onPress: () => setIsFilterModalVisible(true),
            size: 24,
            color: hasActiveFilters()
              ? ColorPalette.PURPLE_300
              : ColorPalette.IconColor,
            strokeWidth: 1.5,
          },
        ]}
      />

      <View style={styles.searchContainer}>
        <SearchBox
          value={searchText}
          onChangeText={handleSearchTextChange}
          placeholder="Search Orders"
          onSubmitEditing={handleSearch}
        />
      </View>

      {/* NEW: Active filters indicator */}
      {hasActiveFilters() && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: getScreenWidth(4),
            paddingVertical: getScreenHeight(1),
            backgroundColor: '#F3E8FF',
            borderBottomWidth: 1,
            borderBottomColor: ColorPalette.GREY_100,
          }}>
          <View style={{ flex: 1 }}>
            <Typography
              text={`${getActiveFilterCount()} filter${getActiveFilterCount() > 1 ? 's' : ''
                } applied`}
              variant={TypographyVariant.PSMALL_MEDIUM}
              customTextStyles={{ color: ColorPalette.PURPLE_300 }}
            />
            {currentFilters.customerName && (
              <Typography
                text={`• Name: ${currentFilters.customerName}`}
                variant={TypographyVariant.PXSMALL_REGULAR}
                customTextStyles={{
                  color: ColorPalette.GREY_TEXT_400,
                  marginTop: 2,
                }}
              />
            )}
            {currentFilters.email && (
              <Typography
                text={`• Email: ${currentFilters.email}`}
                variant={TypographyVariant.PXSMALL_REGULAR}
                customTextStyles={{
                  color: ColorPalette.GREY_TEXT_400,
                  marginTop: 2,
                }}
              />
            )}
            {currentFilters.phoneNumber && (
              <Typography
                text={`• Phone: ${currentFilters.phoneNumber}`}
                variant={TypographyVariant.PXSMALL_REGULAR}
                customTextStyles={{
                  color: ColorPalette.GREY_TEXT_400,
                  marginTop: 2,
                }}
              />
            )}
            {(currentFilters.minOrderValue || currentFilters.maxOrderValue) && (
              <Typography
                text={`• Value: €${currentFilters.minOrderValue || '0'} - €${currentFilters.maxOrderValue || '∞'
                  }`}
                variant={TypographyVariant.PXSMALL_REGULAR}
                customTextStyles={{
                  color: ColorPalette.GREY_TEXT_400,
                  marginTop: 2,
                }}
              />
            )}
          </View>
          <TouchableOpacity onPress={handleClearFilters}>
            <Typography
              text="Clear All"
              variant={TypographyVariant.PSMALL_SEMIBOLD}
              customTextStyles={{ color: ColorPalette.RED_100 }}
            />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.slidingBarsContainer}>
        <SlidingBar
          options={filterOptions}
          selectedOption={selectedFilter}
          onOptionSelect={handleFilterSelect}
        />
      </View>

      {statusUpdateError && (
        <View
          style={{
            backgroundColor: '#FFEBEE',
            padding: 12,
            marginHorizontal: 16,
            marginVertical: 8,
            borderRadius: 8,
          }}>
          <Typography
            text={`Error updating status: ${statusUpdateError}`}
            variant={TypographyVariant.PSMALL_MEDIUM}
            customTextStyles={{ color: '#C62828' }}
          />
        </View>
      )}

      {loading ? (
        <View style={styles.loadingContainer}>
          <AnimatedLoader size={52} />
          <Typography
            text="Loading"
            variant={TypographyVariant.PSMALL_MEDIUM}
            customTextStyles={{
              color: ColorPalette.PRIMARY_GRADIENT_SELLER.colors[0],
              marginTop: getScreenHeight(1),
            }}
          />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Typography
            text={`Error: ${error}`}
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{ color: ColorPalette.RED_200 }}
          />
        </View>
      ) : (
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: getScreenHeight(4) },
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.productContainer}>
            {formattedOrders.length > 0 ? (
              formattedOrders.map(order => (
                <OrderInfo
                  key={order.id}
                  orderId={order.id}
                  orderImage={order.orderImage}
                  orderName={order.orderName}
                  orderPrice={order.orderPrice}
                  orderNumber={order.orderNumber}
                  orderEmail={order.orderEmail}
                  orderPhone={order.orderPhone}
                  orderDate={order.orderDate}
                  orderTime={order.orderTime}
                  orderStatus={order.orderStatus}
                  orderQuantity={order.orderQuantity}
                  onStatusChange={status =>
                    handleStatusChange(order.id, status)
                  }
                  onCardPress={() => handleCardPress(order)}
                />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Image
                  source={require('../../../assets/images/emptyBox.png')}
                  style={styles.emptyBoxPng}
                />
                <Typography
                  text={
                    hasActiveFilters()
                      ? 'No orders match your filters'
                      : searchText.trim()
                        ? `No orders found for "${searchText}"`
                        : 'No orders found'
                  }
                  variant={TypographyVariant.PMEDIUM_SEMIBOLD}
                  customTextStyles={{ color: ColorPalette.GREY_TEXT_400 }}
                />
                {(searchText.trim() || hasActiveFilters()) && (
                  <TouchableOpacity
                    onPress={() => {
                      setSearchText('');
                      handleClearFilters();
                    }}
                    style={{ marginTop: getScreenHeight(1) }}>
                    <Typography
                      text="Clear search and filters"
                      variant={TypographyVariant.PSMALL_MEDIUM}
                      customTextStyles={{
                        color: ColorPalette.PURPLE_300,
                        textDecorationLine: 'underline',
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      )}

      {/* NEW: FilterOrdersModal */}
      <FilterOrdersModal
        isVisible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onApply={handleApplyFilters}
        initialFilters={currentFilters}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;
