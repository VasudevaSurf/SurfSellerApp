import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, View, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BellIcon from '../../../assets/icons/BellIcon';
import QuestionMarkIcon from '../../../assets/icons/QuestionMarkIcon';
import {OrderInfo} from '../../../components/MainComponents/OrderInfo/OrderInfo';
import {OrderStatus} from '../../../components/MainComponents/OrderInfo/OrderInfo.types';
import {Header} from '../../../components/UserComponents/Header/Header';
import {SearchBox} from '../../../components/UserComponents/SearchBox/SearchBox';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight} from '../../../helpers/screenSize';
import {navigate} from '../../../navigation/utils/navigationRef';
import {styles} from './OrderScreen.styles';
import {SlidingBar} from '../../../components/MainComponents/SlidingBar/SlidingBar';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../../redux/store';
import {
  fetchOrders,
  searchOrders,
  setStatusFilter,
  setSearchTerm,
  updateOrderStatus,
  clearStatusUpdateError,
} from '../../../redux/slices/ordersSlice';
import FilterIcon from '../../../assets/icons/FilterIcon';
import {
  FilterOrdersModal,
  FilterOrdersData,
} from '../../../components/MainComponents/FilterOrdersModal';
import AnimatedLoader from '../../../assets/icons/LoaderIcon';

// Map API status codes to display status
const convertOrderStatus = (apiStatus: string): OrderStatus => {
  const statusMap: {[key: string]: OrderStatus} = {
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
  const statusMap: {[key: string]: string} = {
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

  const filterToApiMap: {[key: string]: string} = {
    pending: 'O',
    processing: 'P',
    completed: 'C',
    failed: 'F',
    cancelled: 'I',
    declined: 'D',
    shipped: 'B',
  };

  // Check if it's already an API status code
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
  } = useSelector((state: RootState) => state.orders);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<OrderFilters>({});

  const handleApplyFilters = (filters: OrderFilters) => {
    console.log('Applied filters:', filters);
    setCurrentFilters(filters);

    // Apply your filtering logic here
    // For example, update your orders list based on filters
    // fetchFilteredOrders(filters);
  };

  const openFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalVisible(false);
  };

  const [searchText, setSearchText] = useState('');
  const [searchTimeoutRef, setSearchTimeoutRef] =
    useState<NodeJS.Timeout | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false); // added for filter icon

  // Debugging: Log userId and orders
  // useEffect(() => {
  //   console.log('OrderScreen - userId:', userId);
  //   console.log('OrderScreen - Orders received:', orders?.length || 0);

  //   if (orders && orders.length > 0) {
  //     console.log('OrderScreen - First order:', orders[0]);
  //   }
  // }, [userId, orders]);

  // Initialize orders fetch
  useEffect(() => {
    if (userId) {
      const apiStatus = getApiStatusFromFilter(statusFilter);
      dispatch(fetchOrders({userId, status: apiStatus}));
    }
  }, [dispatch, userId]);

  // Format orders for display
  const formattedOrders =
    orders?.map(order => {
      // Extract customer name from order data
      const customerName =
        order.customer?.name ||
        `${order.firstname || ''} ${order.lastname || ''}`.trim() ||
        'Customer';

      // Extract product info (use first product if multiple)
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
    {id: 'all', label: 'All'},
    {id: 'pending', label: 'Pending'},
    {id: 'processing', label: 'Processing'},
    {id: 'completed', label: 'Completed'},
    {id: 'shipped', label: 'Shipped'},
    {id: 'cancelled', label: 'Cancelled'},
    {id: 'failed', label: 'Failed'},
    {id: 'declined', label: 'Declined'},
  ];

  const selectedFilter =
    filterOptions.find(option => option.id === statusFilter) ||
    filterOptions[0];

  // Handle search with debouncing
  const handleSearchTextChange = useCallback(
    (text: string) => {
      setSearchText(text);

      // Clear existing timeout
      if (searchTimeoutRef) {
        clearTimeout(searchTimeoutRef);
      }

      // Set new timeout for debounced search
      const timeoutId = setTimeout(() => {
        if (userId) {
          if (text.trim()) {
            dispatch(searchOrders({userId, searchTerm: text}));
          } else {
            // Clear search, fetch with current filter
            const apiStatus = getApiStatusFromFilter(statusFilter);

            dispatch(fetchOrders({userId, status: apiStatus}));
          }
        }
      }, 500); // 500ms debounce

      setSearchTimeoutRef(timeoutId);
    },
    [dispatch, userId, statusFilter, searchTimeoutRef],
  );

  // Handle search submission
  const handleSearch = useCallback(() => {
    if (userId) {
      if (searchText.trim()) {
        dispatch(searchOrders({userId, searchTerm: searchText}));
      } else {
        const apiStatus = getApiStatusFromFilter(statusFilter);

        dispatch(fetchOrders({userId, status: apiStatus}));
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
        await dispatch(
          updateOrderStatus({userId, orderId, status: apiStatus}),
        ).unwrap();

        // Refresh orders list after successful update
        setTimeout(() => {
          const currentApiStatus = getApiStatusFromFilter(statusFilter);
          dispatch(fetchOrders({userId: userId!, status: currentApiStatus}));
        }, 1000);
      } catch (error: any) {
        console.error('Failed to update order status:', error);
        // Error handling is managed by the Redux state
      }
    },
    [dispatch, userId, statusFilter],
  );

  // Handle filter selection
  const handleFilterSelect = useCallback(
    (filter: {id: string; label: string}) => {
      dispatch(setStatusFilter(filter.id));

      if (userId) {
        const apiStatus = getApiStatusFromFilter(filter.id);

        dispatch(fetchOrders({userId, status: apiStatus}));
      }
    },
    [dispatch, userId],
  );

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
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
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
                params: {screen: 'NotificationScreen'},
              }),
            size: 22,
            color: ColorPalette.IconColor,
            strokeWidth: 1.5,
          },
          {
            icon: FilterIcon,
            onPress: () => setIsFilterModalVisible(true), // Change this
            size: 24,
            color: ColorPalette.IconColor,
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

      <View style={styles.slidingBarsContainer}>
        <SlidingBar
          options={filterOptions}
          selectedOption={selectedFilter}
          onOptionSelect={handleFilterSelect}
        />
      </View>

      {/* Show status update error if any */}
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
            customTextStyles={{color: '#C62828'}}
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
            customTextStyles={{color: ColorPalette.RED_200}}
          />
        </View>
      ) : (
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingBottom: getScreenHeight(4)},
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
                <Typography
                  text="No orders found"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_400}}
                />
                {searchText.trim() && (
                  <Typography
                    text={`Try searching for different terms or clear the search`}
                    variant={TypographyVariant.PSMALL_REGULAR}
                    customTextStyles={{
                      color: ColorPalette.GREY_TEXT_300,
                      marginTop: 8,
                      textAlign: 'center',
                    }}
                  />
                )}
              </View>
            )}
          </View>
        </ScrollView>
      )}
      <FilterOrdersModal
        isVisible={isFilterModalVisible}
        onClose={closeFilterModal}
        onApply={handleApplyFilters}
        initialFilters={currentFilters}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;
