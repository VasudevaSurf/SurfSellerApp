// src/screens/DashBoardScreens/HomeScreen/HomeScreen.tsx
import React, {useEffect, useMemo, useState} from 'react';
import {
  ScrollView,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import BellIcon from '../../../assets/icons/BellIcon';
import BookmarkNoteIcon from '../../../assets/icons/BookmarkNoteIcon';
import BrainIcon from '../../../assets/icons/BrainIcon';
import CurrencyIcon from '../../../assets/icons/CurrencyIcon';
import DownloadIcon from '../../../assets/icons/DownloadIcon';
import PackageIcon from '../../../assets/icons/PackageIcon';
import QuestionMarkIcon from '../../../assets/icons/QuestionMarkIcon';
import SearchIcon from '../../../assets/icons/SearchIcon';
import TotalSalesIcon from '../../../assets/icons/TotalSalesIcon';
import TrendIcon from '../../../assets/icons/TrendIcon';
import {MenuItem} from '../../../components/MainComponents/MenuItem/MenuItem';
import {RecentOrder} from '../../../components/MainComponents/RecentOrder/RecentOrder';
import {SlidingBar} from '../../../components/MainComponents/SlidingBar/SlidingBar';
import ToggleButtons from '../../../components/MainComponents/ToggleButtons/ToggleButtons';
import {Header} from '../../../components/UserComponents/Header/Header';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {styles} from './HomeScreen.styles';
import {navigate} from '../../../navigation/utils/navigationRef';
import {RootState} from '../../../redux/store';
import {useSelector} from 'react-redux';
import ArrowRightStyle from '../../../assets/icons/ArrowRightStyle';
import {useDashboard} from '../../../hooks/useDashboard';
import SalesChart from './components/SalesChart'; // Import the React Native chart component

const HomeScreen = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);

  // Use the dashboard hook
  const {
    loading,
    error,
    recentOrders,
    currentBalance,
    income,
    sales,
    taxes,
    activeProducts,
    outOfStock,
    ordersCount,
    orderCounts,
    refreshDashboard,
    dashboardData, // Get the full dashboard data for the chart
  } = useDashboard();

  const [refreshing, setRefreshing] = useState(false);
  const [selectedToggle, setSelectedToggle] = useState('7days'); // For toggle buttons

  const handleNewOrderPress = (
    filterType: 'pending' | 'toShip' | 'delivered' = 'pending',
  ) => {
    navigate('Dashboard', {
      screen: 'Home',
      params: {
        screen: 'NewOrders',
        params: {
          filterType,
        },
      },
    });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshDashboard();
    setRefreshing(false);
  };

  // Handle toggle button change
  const handleToggleChange = (value: string) => {
    setSelectedToggle(value);
    console.log('Toggle changed to:', value);
  };

  const menuItems = useMemo(
    () => [
      {
        label:
          orderCounts.pending > 0
            ? `${orderCounts.pending} new orders`
            : 'No new orders',
        leftIcon: (
          <PackageIcon style={undefined} color={ColorPalette.HomeIcon} />
        ),
        rightIcon: <ArrowRightIcon style={undefined} />,
        onPress: () => handleNewOrderPress('pending'),
        leftIconBackgroundColor: ColorPalette.VerySmallIconBack,
      },
      {
        label:
          orderCounts.accepted > 0
            ? `${orderCounts.accepted} orders to ship`
            : 'No orders to ship',
        leftIcon: (
          <PackageIcon style={undefined} color={ColorPalette.PURPLE_200} />
        ),
        rightIcon: <ArrowRightIcon style={undefined} />,
        onPress: () => handleNewOrderPress('toShip'),
        leftIconBackgroundColor: 'rgba(145, 1, 207, 0.10)',
      },
      {
        label:
          orderCounts.completed > 0
            ? `${orderCounts.completed} orders delivered`
            : 'No orders delivered',
        leftIcon: (
          <PackageIcon style={undefined} color={ColorPalette.Green_200} />
        ),
        rightIcon: <ArrowRightIcon style={undefined} />,
        onPress: () => handleNewOrderPress('delivered'),
        leftIconBackgroundColor: 'rgba(31, 193, 107, 0.10)',
      },
    ],
    [orderCounts],
  );

  const statusOptions = [
    {id: 'pending', label: 'Pending'},
    {id: 'accepted', label: 'Accepted'},
    {id: 'cancelled', label: 'Cancelled'},
  ];

  const [selectedOption, setSelectedOption] = useState(statusOptions[0]);

  // Filter recent orders based on selected status
  const filteredOrders = useMemo(() => {
    if (!recentOrders || recentOrders.length === 0) return [];

    const statusMap = {
      pending: 'O',
      accepted: 'P',
      cancelled: 'I',
    };

    return recentOrders
      .filter(order => order.status === statusMap[selectedOption.id])
      .slice(0, 4) // Show max 4 recent orders
      .map(order => ({
        orderImage:
          'https://prosodylondon.com/wp-content/uploads/2024/01/perfume-bottles-ingredients.jpg', // Placeholder image
        productName: `Order from ${order.firstname} ${order.lastname}`,
        orderId: order.order_id,
        customerName: `${order.firstname} ${order.lastname}`,
        orderDate: new Date(
          parseInt(order.timestamp) * 1000,
        ).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        orderAmount: parseFloat(order.total.replace('€', '')),
        status: order.status_details.description as any,
      }));
  }, [recentOrders, selectedOption]);

  // Calculate percentage changes (you can replace this with real historical data calculation)
  const calculateTrend = () => {
    // You can implement real trend calculation here using historical data
    // For now, using mock data as requested in original implementation
    return {
      sales: '+12.8%',
      orders: '+8.3%',
      products: '0%',
      income: '0%',
    };
  };

  const trends = calculateTrend();

  // Calculate current week sales from the dashboard data using statistics
  const currentWeekSales = useMemo(() => {
    if (!dashboardData?.statistics) return '€0.00';
    
    // Find sales from statistics array
    const salesStat = dashboardData.statistics.find(
      (stat: any) => stat.icon === 'sales'
    );
    
    if (salesStat && salesStat.value !== '€0.00') {
      return salesStat.value;
    }

    // Fallback: calculate from recent orders if statistics show 0
    if (!dashboardData?.recent_orders) return '€0.00';
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weeklyTotal = dashboardData.recent_orders
      .filter(order => {
        const orderDate = new Date(parseInt(order.timestamp) * 1000);
        return orderDate >= oneWeekAgo;
      })
      .reduce((sum, order) => {
        const amount = parseFloat(order.total.replace('€', '')) || 0;
        return sum + amount;
      }, 0);
    
    return `€${weeklyTotal.toFixed(2)}`;
  }, [dashboardData]);

  if (loading && !refreshing) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={ColorPalette.PURPLE_300} />
        <Typography
          variant={TypographyVariant.LMEDIUM_REGULAR}
          text="Loading dashboard..."
          customTextStyles={{marginTop: 16, color: ColorPalette.GREY_TEXT_300}}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name={`Hello, ${userData?.firstname || 'User'}! 👋`}
        image={{
          source: require('../../../assets/images/placeholder-profile.png'),
        }}
        variant={TypographyVariant.H6_SMALL_SEMIBOLD}
        textColor={ColorPalette.GREY_TEXT_500}
        rightIcons={[
          {
            icon: SearchIcon,
            onPress: () => console.log('Search pressed'),
            size: 20,
            color: ColorPalette.GREY_TEXT_400,
            strokeWidth: 1.5,
          },
          {
            icon: BellIcon,
            onPress: () => console.log('Bell pressed'),
            size: 20,
            color: ColorPalette.GREY_TEXT_400,
            strokeWidth: 1.5,
          },
          {
            icon: QuestionMarkIcon,
            onPress: () => console.log('Help pressed'),
            size: 24,
            color: ColorPalette.GREY_TEXT_400,
            strokeWidth: 1.5,
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
        
        {/* Get Started Section */}
        <View style={styles.verifyContainer}>
          <View style={styles.textVerifyContainer}>
            <Typography
              variant={TypographyVariant.H6_BOLD}
              text="Get Started with Selling"
              customTextStyles={styles.textOne}
              numberOfLines={2}
            />
            <Typography
              variant={TypographyVariant.LSMALL_REGULAR}
              text="Complete these steps to activate your seller account."
              customTextStyles={styles.textTwo}
              numberOfLines={2}
            />
          </View>
          <View style={styles.verifyStepsContainer}></View>
        </View>

        {/* Orders Menu */}
        <View style={styles.OrderContainer}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              label={item.label}
              leftIcon={item.leftIcon}
              rightIcon={item.rightIcon}
              onPress={item.onPress}
              textStyle={{color: ColorPalette.GREY_TEXT_500}}
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              containerStyle={styles.menuContainer}
              contentStyle={{
                gap: getScreenWidth(4),
              }}
              leftIconBackgroundColor={item.leftIconBackgroundColor}
              leftIconContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: getScreenWidth(2),
                paddingVertical: getScreenWidth(2),
                borderRadius: getScreenWidth(2),
              }}
              showBottomBorder={true}
              isLastItem={index === menuItems.length - 1}
            />
          ))}
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.containerOne}>
            <View style={styles.totalSales}>
              <View style={styles.salesOne}>
                <View style={styles.iconBackSale}>
                  <TotalSalesIcon style={undefined} />
                </View>
                <View style={styles.countBlock}>
                  <Typography
                    variant={TypographyVariant.PXSMALL_REGULAR}
                    text={trends.sales}
                    customTextStyles={styles.countText}
                    numberOfLines={1}
                  />
                  <TrendIcon size={18} style={undefined} />
                </View>
              </View>
              <View style={styles.salesTwo}>
                <Typography
                  variant={TypographyVariant.H4_BOLD}
                  text={sales}
                  customTextStyles={styles.countValue}
                  numberOfLines={1}
                />
                <Typography
                  variant={TypographyVariant.LMEDIUM_REGULAR}
                  text="Total Sales"
                  customTextStyles={styles.countCaption}
                  numberOfLines={1}
                />
              </View>
            </View>
            <View style={styles.totalSales}>
              <View style={styles.salesOne}>
                <View style={styles.iconBackOne}>
                  <PackageIcon style={undefined} />
                </View>
                <View style={styles.countBlock}>
                  <Typography
                    variant={TypographyVariant.PXSMALL_REGULAR}
                    text={trends.orders}
                    customTextStyles={styles.countText}
                    numberOfLines={1}
                  />
                  <TrendIcon size={18} style={undefined} />
                </View>
              </View>
              <View style={styles.salesTwo}>
                <Typography
                  variant={TypographyVariant.H4_BOLD}
                  text={ordersCount.toString()}
                  customTextStyles={styles.countValue}
                  numberOfLines={1}
                />
                <Typography
                  variant={TypographyVariant.LMEDIUM_REGULAR}
                  text="Total Orders"
                  customTextStyles={styles.countCaption}
                  numberOfLines={1}
                />
              </View>
            </View>
          </View>

          <View style={styles.containerAnother}>
            <View style={styles.containerAnotherOne}>
              <View style={styles.activeProduct}>
                <View style={styles.twoContainer}>
                  <View style={styles.iconBackOne}>
                    <BrainIcon style={undefined} />
                  </View>
                  <View style={styles.salesTwo}>
                    <Typography
                      variant={TypographyVariant.H4_BOLD}
                      text={activeProducts}
                      customTextStyles={styles.countValue}
                      numberOfLines={1}
                    />
                    <Typography
                      variant={TypographyVariant.LMEDIUM_REGULAR}
                      text="Active Products"
                      customTextStyles={styles.countCaption}
                      numberOfLines={1}
                    />
                  </View>
                </View>
                <View style={styles.countBlock}>
                  <Typography
                    variant={TypographyVariant.PXSMALL_REGULAR}
                    text={trends.products}
                    customTextStyles={styles.countText}
                    numberOfLines={1}
                  />
                  <TrendIcon size={18} style={undefined} />
                </View>
              </View>

              <View style={styles.activeProduct}>
                <View style={styles.twoContainer}>
                  <View style={styles.iconBack}>
                    <CurrencyIcon style={undefined} />
                  </View>
                  <View style={styles.salesTwo}>
                    <Typography
                      variant={TypographyVariant.H4_BOLD}
                      text={income}
                      customTextStyles={styles.countValue}
                      numberOfLines={1}
                    />
                    <Typography
                      variant={TypographyVariant.LMEDIUM_REGULAR}
                      text="Your income"
                      customTextStyles={styles.countCaption}
                      numberOfLines={1}
                    />
                  </View>
                </View>
                <View style={styles.countBlock}>
                  <Typography
                    variant={TypographyVariant.PXSMALL_REGULAR}
                    text={trends.income}
                    customTextStyles={styles.countText}
                    numberOfLines={1}
                  />
                  <TrendIcon size={18} style={undefined} />
                </View>
              </View>
            </View>

            <View style={styles.containerProportional}>
              <View style={styles.stockContainer}>
                <View style={styles.iconBackTwo}>
                  <DownloadIcon style={undefined} />
                </View>
                <View style={styles.salesTwo}>
                  <Typography
                    variant={TypographyVariant.LSMALL_BOLD}
                    text={outOfStock}
                    customTextStyles={styles.countValue}
                    numberOfLines={1}
                  />
                  <Typography
                    variant={TypographyVariant.LSMALL_REGULAR}
                    text="Out of Stock"
                    customTextStyles={styles.countCaption}
                    numberOfLines={1}
                  />
                </View>
              </View>

              <View style={styles.stockContainer}>
                <View style={styles.iconBackThree}>
                  <BookmarkNoteIcon style={undefined} />
                </View>
                <View style={styles.salesTwo}>
                  <Typography
                    variant={TypographyVariant.LSMALL_BOLD}
                    text={taxes.replace('€', '')}
                    customTextStyles={styles.countValue}
                    numberOfLines={1}
                  />
                  <Typography
                    variant={TypographyVariant.LSMALL_REGULAR}
                    text="Taxes"
                    customTextStyles={styles.countCaption}
                    numberOfLines={1}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Sales Overview Section with Chart */}
        <View style={styles.salesOverview}>
          <View style={styles.salesHeading}>
            <View style={styles.LeftHeading}>
              <Typography
                variant={TypographyVariant.H5_SEMIBOLD}
                text="Sales Overview"
                customTextStyles={styles.countValue}
                numberOfLines={1}
              />
              <View style={styles.countCaptionContainer}>
                <Typography
                  variant={TypographyVariant.LSMALL_REGULAR}
                  text="Total sales this week - "
                  customTextStyles={styles.countCaption}
                  numberOfLines={1}
                />
                <Typography
                  variant={TypographyVariant.LSMALL_SEMIBOLD}
                  text={currentWeekSales}
                  customTextStyles={styles.countCaptionOne}
                  numberOfLines={1}
                />
              </View>
            </View>
            <View style={styles.rightHeadingButtons}>
              <ToggleButtons 
                buttonStyle={styles.buttonStyles}
                onSelectionChange={handleToggleChange}
                initialActiveButton={selectedToggle}
                leftButtonText="Last 7 days"
                rightButtonText="Monthly"
                leftButtonValue="7days"
                rightButtonValue="monthly"
              />
            </View>
          </View>
          
          {/* Sales Chart */}
          <View style={styles.salesGraph}>
            {dashboardData ? (
              <SalesChart 
                dashboardData={dashboardData} 
                selectedPeriod={selectedToggle as '7days' | 'monthly'}
              />
            ) : (
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: 8
              }}>
                <ActivityIndicator size="small" color={ColorPalette.PURPLE_300} />
                <Typography
                  variant={TypographyVariant.LSMALL_REGULAR}
                  text="Loading chart..."
                  customTextStyles={{marginTop: 8, color: ColorPalette.GREY_TEXT_300}}
                />
              </View>
            )}
          </View>
        </View>

        {/* Recent Orders Section */}
        <View style={styles.recentOrdersContainer}>
          <View style={styles.recentOrderTitle}>
            <Typography
              variant={TypographyVariant.H6_SEMIBOLD}
              text="Recent Orders"
              customTextStyles={styles.countValue}
              numberOfLines={1}
            />
            <View style={styles.viewAll}>
              <Typography
                variant={TypographyVariant.PSMALL_MEDIUM}
                text="View All"
                customTextStyles={styles.viewAllText}
                numberOfLines={1}
              />
              <ArrowRightStyle
                style={undefined}
                color={ColorPalette.PURPLE_200}
                size={13}
                onPress={undefined}
              />
            </View>
          </View>

          <View>
            <SlidingBar
              options={statusOptions}
              selectedOption={selectedOption}
              onOptionSelect={setSelectedOption}
              customOptionStyle={{
                paddingVertical: getScreenHeight(1.5),
                paddingHorizontal: getScreenWidth(7),
              }}
            />
          </View>

          <View style={styles.recentAllOrders}>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index, array) => (
                <RecentOrder
                  key={`${order.orderId}-${index}`}
                  {...order}
                  isLastItem={index === array.length - 1}
                />
              ))
            ) : (
              <View style={{padding: 20, alignItems: 'center'}}>
                <Typography
                  variant={TypographyVariant.LMEDIUM_REGULAR}
                  text={`No ${selectedOption.label.toLowerCase()} orders`}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;