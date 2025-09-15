// src/screens/DashBoardScreens/HomeScreen/HomeSubScreens/NewOrdersPages/NewOrders.tsx

import React, {useEffect, useMemo, useState} from 'react';
import {
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BellIcon from '../../../../../assets/icons/BellIcon';
import QuestionMarkIcon from '../../../../../assets/icons/QuestionMarkIcon';
import {OrderInfo} from '../../../../../components/MainComponents/OrderInfo/OrderInfo';
import {OrderStatus} from '../../../../../components/MainComponents/OrderInfo/OrderInfo.types';
import {Header} from '../../../../../components/UserComponents/Header/Header';
import {Typography} from '../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import {getScreenHeight} from '../../../../../helpers/screenSize';
import {goBack, navigate} from '../../../../../navigation/utils/navigationRef';
import {styles} from './NewOrders.styles';
import ArrowLeft from '../../../../../assets/icons/ArrowLeft';
import {useDashboard} from '../../../../../hooks/useDashboard';
import {useRoute} from '@react-navigation/native';
import AnimatedLoader from '../../../../../assets/icons/LoaderIcon';

const NewOrders = () => {
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);

  // Get the filter type from navigation params if available
  const filterType = route.params?.filterType || 'pending';

  // Use the dashboard hook to get real order data
  const {recentOrders, loading, error, refreshDashboard} = useDashboard();

  // Map API status codes to readable status
  const mapOrderStatus = (status: string): OrderStatus => {
    const statusMap: Record<string, OrderStatus> = {
      O: 'Pending',
      P: 'Accepted',
      C: 'Completed',
      F: 'Failed',
      I: 'Cancelled',
      D: 'Declined',
      B: 'Backordered',
      Y: 'Awaiting call',
      A: 'Fraud checking',
    };
    return (statusMap[status] || 'Pending') as OrderStatus;
  };

  // Filter and transform orders based on type
  const orders = useMemo(() => {
    if (!recentOrders || recentOrders.length === 0) return [];

    // Filter based on the type of orders we want to show
    let filteredOrders = recentOrders;

    switch (filterType) {
      case 'pending':
        filteredOrders = recentOrders.filter(order => order.status === 'O');
        break;
      case 'toShip':
        filteredOrders = recentOrders.filter(order => order.status === 'P');
        break;
      case 'delivered':
        filteredOrders = recentOrders.filter(order => order.status === 'C');
        break;
      default:
        // Show all recent orders
        break;
    }

    // Transform the orders to match the OrderInfo component props
    return filteredOrders.map(order => {
      // Parse timestamp to get date and time
      const orderDate = new Date(parseInt(order.timestamp) * 1000);
      const formattedDate = orderDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
      const formattedTime = orderDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      // Extract product information if available
      // Since the dashboard API doesn't provide detailed product info,
      // we'll create a placeholder or use order info
      const productName = order.company || 'Order Item';
      const totalAmount = order.total.replace('€', '');

      return {
        id: order.order_id,
        orderImage: 'https://picsum.photos/202', // Placeholder image
        orderName: productName,
        orderPrice: totalAmount,
        orderNumber: parseInt(order.order_id),
        orderEmail: order.email,
        orderPhone: order.phone,
        orderDate: formattedDate,
        orderTime: formattedTime,
        orderStatus: mapOrderStatus(order.status),
        customerName: `${order.firstname} ${order.lastname}`,
        rawOrder: order, // Keep the raw order data for navigation
      };
    });
  }, [recentOrders, filterType]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshDashboard();
    setRefreshing(false);
  };

  const handleCardPress = (orderData: any) => {
    // Navigate to order detail with the order ID
    navigate('Dashboard', {
      screen: 'Orders',
      params: {
        screen: 'OrderDetail',
        params: {
          orderId: orderData.id,
          orderData: orderData.rawOrder, // Pass the raw order data
        },
      },
    });
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    // Handle status change
    // You would typically dispatch an action to update the order status
    console.log(`Order ${orderId} status changed to ${newStatus}`);
    // TODO: Implement order status update API call
  };

  // Get the appropriate title based on filter type
  const getTitle = () => {
    switch (filterType) {
      case 'pending':
        return 'New Orders';
      case 'toShip':
        return 'Orders to Ship';
      case 'delivered':
        return 'Delivered Orders';
      default:
        return 'Recent Orders';
    }
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AnimatedLoader size={52} />
        <Typography
          text="Loading"
          variant={TypographyVariant.PSMALL_MEDIUM}
          customTextStyles={{
            color: ColorPalette.PRIMARY_GRADIENT_SELLER.colors[0],
            marginTop: getScreenHeight(1),
          }}
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{flex: 1}} edges={['bottom']}>
        <Header
          name={getTitle()}
          leftIcon={<ArrowLeft style={undefined} size={16} onPress={goBack} />}
          variant={TypographyVariant.LMEDIUM_EXTRABOLD}
          textColor={ColorPalette.GREY_TEXT_500}
          rightIcons={[
            {
              icon: BellIcon,
              onPress: () =>
                navigate('Dashboard', {
                  screen: 'Account',
                  params: {screen: 'NotificationScreen'},
                }),
              size: 24,
              color: ColorPalette.IconColor,
              strokeWidth: 1.5,
            },
            {
              icon: QuestionMarkIcon,
              onPress: () => {
                navigate('Dashboard', {
                  screen: 'Account',
                  params: {screen: 'FAQScreen'},
                });
              },
              size: 24,
              color: ColorPalette.IconColor,
              strokeWidth: 1.5,
            },
          ]}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <Typography
            variant={TypographyVariant.LMEDIUM_REGULAR}
            text="Failed to load orders"
            customTextStyles={{color: ColorPalette.RED_200, marginBottom: 8}}
          />
          <Typography
            variant={TypographyVariant.LSMALL_REGULAR}
            text={error}
            customTextStyles={{
              color: ColorPalette.GREY_TEXT_300,
              textAlign: 'center',
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name={getTitle()}
        leftIcon={<ArrowLeft style={undefined} size={16} onPress={goBack} />}
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
            color: ColorPalette.GREY_TEXT_400,
            strokeWidth: 1.4,
          },
          {
            icon: QuestionMarkIcon,
            onPress: () =>
              navigate('Dashboard', {
                screen: 'Account',
                params: {screen: 'FAQScreen'},
              }),
            size: 24,
            color: ColorPalette.GREY_TEXT_400,
            strokeWidth: 1.4,
          },
        ]}
      />

      {orders.length > 0 ? (
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingBottom: getScreenHeight(4)},
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[ColorPalette.PURPLE_300]}
              tintColor={ColorPalette.PURPLE_300}
            />
          }>
          <View style={styles.productContainer}>
            {orders.map(order => (
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
                onStatusChange={status => handleStatusChange(order.id, status)}
                onCardPress={() => handleCardPress(order)}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: getScreenHeight(16),
          }}>
          <Image
            source={require('../../../../../assets/images/emptyBox.png')}
            style={styles.emptyBoxPng}
          />
          <Typography
            text={`${
              filterType === 'pending'
                ? 'No new orders'
                : filterType === 'toShip'
                ? 'Nothing to ship'
                : filterType === 'delivered'
                ? 'No orders to deliver yet'
                : ''
            }`}
            variant={TypographyVariant.PMEDIUM_SEMIBOLD}
            customTextStyles={styles.emptyStateText}
          />
          <Typography
            variant={TypographyVariant.LSMALL_REGULAR}
            text={`${
              filterType === 'pending'
                ? 'We’ll notify you as soon as a new one comes in.'
                : filterType === 'toShip'
                ? 'You’ll get an alert when an order is ready to be shipped.'
                : filterType === 'delivered'
                ? 'We’ll notify you if there’s an order to deliver.'
                : ''
            } `}
            customTextStyles={{
              color: ColorPalette.GREY_TEXT_300,
              textAlign: 'center',
              lineHeight: 24,
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default NewOrders;
