import React, {useState, useEffect} from 'react';
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
import {RootState} from '../../../redux/store';
import {
  fetchOrders,
  searchOrders,
  setStatusFilter,
  setSearchTerm,
} from '../../../redux/slices/ordersSlice';

const convertOrderStatus = (apiStatus: string): OrderStatus => {
  const statusMap: {[key: string]: OrderStatus} = {
    O: 'Pending',
    P: 'Processing',
    C: 'Completed',
    F: 'Failed',
    I: 'Cancelled',
    D: 'Declined',
    B: 'Shipping', // Backordered mapped to Shipping
    Y: 'Processing', // Awaiting call mapped to Processing
    A: 'Processing', // Fraud checking mapped to Processing
  };

  return statusMap[apiStatus] || 'Processing';
};

const getApiStatusFromFilter = (filterId: string): string | null => {
  if (filterId === 'all') return null;

  const filterToApiMap: {[key: string]: string} = {
    pending: 'O',
    processing: 'P',
    completed: 'C',
    failed: 'F',
    cancelled: 'I',
    shipping: 'B',
  };

  if (['O', 'P', 'C', 'F', 'I', 'D', 'B', 'Y', 'A'].includes(filterId)) {
    return filterId;
  }

  return filterToApiMap[filterId] || null;
};

const OrderScreen = () => {
  const dispatch = useDispatch();
  const userId = useSelector(
    (state: RootState) => state.auth.userData?.user_id,
  );
  const {
    orders,
    orderStatuses,
    loading,
    error,
    statusFilter,
    searchTerm,
    currentPage,
    totalItems,
  } = useSelector((state: RootState) => state.orders);

  // Debugging: Log userId
  useEffect(() => {
    console.log('OrderScreen - userId:', userId);
  }, [userId]);

  const [searchText, setSearchText] = useState('');

  // Log orders received
  useEffect(() => {
    console.log('OrderScreen - Orders received:', orders?.length || 0);
    if (orders && orders.length > 0) {
      console.log('OrderScreen - First order ID:', orders[0].order_id);
      console.log(
        'OrderScreen - First order details:',
        JSON.stringify(orders[0], null, 2),
      );
    }
  }, [orders]);

  const formattedOrders =
    orders?.map(order => {
      return {
        id: order.order_id || '',
        orderImage: 'https://picsum.photos/202',
        orderName:
          `${order.firstname || ''} ${order.lastname || ''}`.trim() ||
          `Customer Order`,
        orderPrice: order.total || '€0.00',
        orderNumber: parseInt(order.order_id || '0'),
        orderEmail: order.email || '',
        orderPhone: order.phone || '',
        orderDate: order.timestamp
          ? new Date(parseInt(order.timestamp) * 1000).toLocaleDateString()
          : '',
        orderTime: order.timestamp
          ? new Date(parseInt(order.timestamp) * 1000).toLocaleTimeString()
          : '',
        orderStatus: convertOrderStatus(order.status || ''),
      };
    }) || [];

  const defaultFilters = [
    {id: 'all', label: 'All'},
    {id: 'processing', label: 'Processing'},
    {id: 'completed', label: 'Completed'},
    {id: 'cancelled', label: 'Cancelled'},
    {id: 'pending', label: 'Pending'},
    {id: 'failed', label: 'Failed'},
    {id: 'shipping', label: 'Shipping'},
  ];

  const apiStatusMap = {
    O: 'pending',
    P: 'processing',
    C: 'completed',
    F: 'failed',
    I: 'cancelled',
    B: 'shipping',
  };

  const additionalFilters =
    orderStatuses
      ?.filter(status => !Object.keys(apiStatusMap).includes(status.status))
      .map(status => ({
        id: status.status,
        label: status.description,
      })) || [];

  const filterOptions = [...defaultFilters, ...additionalFilters];

  const selectedFilter =
    filterOptions.find(option => option.id === statusFilter) ||
    filterOptions[0];

  useEffect(() => {
    if (userId) {
      const apiStatus = getApiStatusFromFilter(statusFilter);
      console.log(
        'OrderScreen - Fetching orders with userId:',
        userId,
        'status:',
        apiStatus,
      );
      dispatch(fetchOrders({userId, status: apiStatus}) as any);
    }
  }, [dispatch, userId]);

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const handleSearch = () => {
    if (userId) {
      if (searchText.trim()) {
        console.log('OrderScreen - Searching orders with term:', searchText);
        dispatch(searchOrders({userId, searchTerm: searchText}) as any);
      } else {
        const apiStatus = getApiStatusFromFilter(statusFilter);
        console.log(
          'OrderScreen - Clearing search, fetching with status:',
          apiStatus,
        );
        dispatch(fetchOrders({userId, status: apiStatus}) as any);
      }
    }
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    console.log(`Order ${orderId} status changed to ${newStatus}`);

    if (userId) {
      const apiStatus = getApiStatusFromFilter(statusFilter);
      dispatch(fetchOrders({userId, status: apiStatus}) as any);
    }
  };

  const handleFilterSelect = (filter: {id: string; label: string}) => {
    console.log('OrderScreen - Filter selected:', filter.id);
    dispatch(setStatusFilter(filter.id));
    const apiStatus = getApiStatusFromFilter(filter.id);

    if (userId) {
      console.log('OrderScreen - Fetching with new filter, status:', apiStatus);
      dispatch(fetchOrders({userId, status: apiStatus}) as any);
    }
  };

  const handleCardPress = (params: any) => {
    console.log(
      'OrderScreen - Card pressed with params:',
      JSON.stringify(params, null, 2),
    );
    navigate('Dashboard', {
      screen: 'Orders',
      params: {
        screen: 'OrderDetail',
        params: params,
      },
    });
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name="Orders"
        variant={TypographyVariant.LMEDIUM_BOLD}
        textColor={ColorPalette.GREY_TEXT_500}
        rightIcons={[
          {
            icon: BellIcon,
            onPress: () => console.log('Bell icon pressed'),
            size: 20,
            color: ColorPalette.IconColor,
            strokeWidth: 1.5,
          },
          {
            icon: QuestionMarkIcon,
            onPress: () => console.log('Info icon pressed'),
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

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={ColorPalette.PRIMARY} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Typography
            text={`Error: ${error}`}
            variant={TypographyVariant.MEDIUM}
            color={ColorPalette.ERROR}
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
                  onStatusChange={status =>
                    handleStatusChange(order.id, status)
                  }
                  onCardPress={() =>
                    handleCardPress({
                      orderId: order.id,
                      orderImage: order.orderImage,
                      orderName: order.orderName,
                      orderPrice: order.orderPrice,
                      orderNumber: order.orderNumber,
                      orderEmail: order.orderEmail,
                      orderPhone: order.orderPhone,
                      orderDate: order.orderDate,
                      orderTime: order.orderTime,
                      orderStatus: order.orderStatus,
                    })
                  }
                />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Typography
                  text="No orders found"
                  variant={TypographyVariant.MEDIUM}
                  color={ColorPalette.GREY_TEXT_400}
                />
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default OrderScreen;
