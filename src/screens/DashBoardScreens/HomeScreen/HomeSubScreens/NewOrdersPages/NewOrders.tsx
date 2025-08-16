// src/screens/DashBoardScreens/HomeScreen/HomeSubScreens/NewOrdersPages/NewOrders.tsx

import React, {useEffect, useMemo, useState} from 'react';
import {
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl,
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
        <ActivityIndicator size="large" color={ColorPalette.PURPLE_300} />
        <Typography
          variant={TypographyVariant.LMEDIUM_REGULAR}
          text="Loading orders..."
          customTextStyles={{marginTop: 16, color: ColorPalette.GREY_TEXT_300}}
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
          variant={TypographyVariant.LMEDIUM_BOLD}
          textColor={ColorPalette.GREY_TEXT_500}
          rightIcons={[
            {
              icon: BellIcon,
              onPress: () => console.log('Bell icon pressed'),
              size: 24,
              color: ColorPalette.GREY_TEXT_400,
              strokeWidth: 2,
            },
            {
              icon: QuestionMarkIcon,
              onPress: () => {},
              size: 24,
              color: ColorPalette.GREY_TEXT_400,
              strokeWidth: 2,
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
        variant={TypographyVariant.LMEDIUM_BOLD}
        textColor={ColorPalette.GREY_TEXT_500}
        rightIcons={[
          {
            icon: BellIcon,
            onPress: () => console.log('Bell icon pressed'),
            size: 24,
            color: ColorPalette.GREY_TEXT_400,
            strokeWidth: 2,
          },
          {
            icon: QuestionMarkIcon,
            onPress: () => {},
            size: 24,
            color: ColorPalette.GREY_TEXT_400,
            strokeWidth: 2,
          },
        ]}
      />

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
          {orders.length > 0 ? (
            orders.map(order => (
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
            ))
          ) : (
            <View style={{padding: 40, alignItems: 'center'}}>
              <Typography
                variant={TypographyVariant.H6_SEMIBOLD}
                text="No Orders Found"
                customTextStyles={{
                  color: ColorPalette.GREY_TEXT_500,
                  marginBottom: 8,
                }}
              />
              <Typography
                variant={TypographyVariant.LMEDIUM_REGULAR}
                text={`You don't have any ${
                  filterType === 'pending'
                    ? 'new'
                    : filterType === 'toShip'
                    ? 'orders to ship'
                    : filterType === 'delivered'
                    ? 'delivered'
                    : 'recent'
                } orders at the moment.`}
                customTextStyles={{
                  color: ColorPalette.GREY_TEXT_300,
                  textAlign: 'center',
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewOrders;
