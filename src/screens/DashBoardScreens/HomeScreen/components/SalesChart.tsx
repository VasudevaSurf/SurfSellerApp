// src/screens/DashBoardScreens/HomeScreen/components/SalesChart.tsx
import React, {useMemo} from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Typography} from '../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../config/colorPalette';

const {width: screenWidth} = Dimensions.get('window');

interface SalesChartProps {
  dashboardData: any;
  selectedPeriod?: '7days' | 'monthly';
}

const SalesChart: React.FC<SalesChartProps> = ({
  dashboardData,
  selectedPeriod = '7days',
}) => {
  const chartData = useMemo(() => {
    console.log('📊 Processing sales chart data:', {
      hasData: !!dashboardData,
      ordersCount: dashboardData?.recent_orders?.length || 0,
      period: selectedPeriod,
    });

    // Create date range based on period
    const dateRange = getDatesInRange(selectedPeriod);

    // If no orders, create empty chart structure
    if (
      !dashboardData?.recent_orders ||
      dashboardData.recent_orders.length === 0
    ) {
      console.log('⚠️ No orders data available');
      return createEmptyChartData(dateRange, selectedPeriod);
    }

    const orders = dashboardData.recent_orders;
    console.log(
      '📦 Processing orders:',
      orders.map((order: any) => ({
        id: order.order_id,
        total: order.total,
        timestamp: order.timestamp,
        date: new Date(parseInt(order.timestamp) * 1000).toDateString(),
        customer: `${order.firstname} ${order.lastname}`,
      })),
    );

    // Process each day in the range
    const dailySales = dateRange.map(targetDate => {
      // Find orders for this specific date
      const dayOrders = orders.filter((order: any) => {
        const orderDate = parseOrderDate(order.timestamp);
        const isMatch = isSameDay(orderDate, targetDate);

        if (isMatch) {
          console.log(
            `✅ Order ${order.order_id} matches ${targetDate.toDateString()}`,
          );
        }

        return isMatch;
      });

      // Calculate total sales for the day
      const totalSales = dayOrders.reduce((sum: number, order: any) => {
        const amount = parseFloat(order.total.replace('€', '')) || 0;
        return sum + amount;
      }, 0);

      const dayData = {
        day: formatDayLabel(targetDate, selectedPeriod),
        sales: totalSales,
        date: targetDate.toISOString(),
        orders: dayOrders.length,
        fullDate: targetDate,
      };

      if (totalSales > 0) {
        console.log(
          `💰 ${targetDate.toDateString()}: €${totalSales.toFixed(2)} from ${
            dayOrders.length
          } orders`,
        );
      }

      return dayData;
    });

    // For monthly view, we might want to show only every few days to avoid congestion
    let processedSales = dailySales;
    if (selectedPeriod === 'monthly') {
      // Show only every 3rd day for monthly view to reduce congestion
      processedSales = dailySales.filter((_, index) => index % 3 === 0);
    }

    // Calculate summary
    const totalSales = dailySales.reduce((sum, day) => sum + day.sales, 0);
    const totalOrders = dailySales.reduce((sum, day) => sum + day.orders, 0);

    console.log('📈 Chart summary:', {
      totalSales: `€${totalSales.toFixed(2)}`,
      totalOrders,
      daysWithSales: dailySales.filter(d => d.sales > 0).length,
    });

    // Prepare chart data
    const labels = processedSales.map(item => item.day);
    const data = processedSales.map(item => item.sales);
    const hasRealData = data.some(value => value > 0);

    // If no sales in the selected period but orders exist, try to include them anyway
    if (!hasRealData && orders.length > 0) {
      console.log(
        '🔍 No sales in selected period, but orders exist. Checking order dates:',
      );

      // Show all order dates for debugging
      orders.forEach((order: any) => {
        const orderDate = parseOrderDate(order.timestamp);
        const daysDiff = Math.floor(
          (new Date().getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24),
        );
        console.log(
          `  Order ${
            order.order_id
          }: ${orderDate.toDateString()} (${daysDiff} days ago)`,
        );
      });
    }

    return {
      labels,
      datasets: [
        {
          data: hasRealData ? data : generateMinimalData(data.length),
          color: (opacity = 1) => `rgba(145, 1, 207, ${opacity})`,
          strokeWidth: hasRealData ? 3 : 1,
        },
      ],
      rawData: dailySales, // Keep full data for peak calculation
      processedData: processedSales, // Show processed data
      hasRealData,
    };
  }, [dashboardData, selectedPeriod]);

  // Dynamic chart width based on period
  const baseChartWidth = screenWidth - 60;
  const chartWidth =
    selectedPeriod === 'monthly'
      ? Math.max(baseChartWidth, chartData.labels.length * 50) // Ensure enough space for monthly labels
      : baseChartWidth;

  const chartHeight = 240;

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(145, 1, 207, ${opacity})`,
    strokeWidth: chartData.hasRealData ? 3 : 1,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    fillShadowGradient: '#9101CF',
    fillShadowGradientOpacity: chartData.hasRealData ? 0.3 : 0.1,
    propsForDots: {
      r: chartData.hasRealData ? '4' : '2',
      strokeWidth: '2',
      stroke: '#9101CF',
    },
    propsForBackgroundLines: {
      strokeDasharray: '3,3',
      stroke: '#E5E7EB',
      strokeWidth: 1,
    },
    propsForLabels: {
      fontSize: selectedPeriod === 'monthly' ? 10 : 12, // Smaller font for monthly
      fill: '#6B7280',
    },
    decimalPlaces: 0,
    formatYLabel: (value: string) => {
      const num = parseFloat(value);
      if (num === 0) return '€0';
      return `€${num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num.toFixed(0)}`;
    },
    segments: 4,
  };

  // Get peak data for annotation
  const peakData = useMemo(() => {
    if (chartData.rawData.length === 0) return null;

    const maxSales = Math.max(...chartData.rawData.map(d => d.sales));
    if (maxSales === 0) return null;

    const peakDay = chartData.rawData.find(d => d.sales === maxSales);

    return peakDay
      ? {
          day: peakDay.day,
          value: maxSales,
          date: peakDay.date,
        }
      : null;
  }, [chartData.rawData]);

  if (chartData.labels.length === 0) {
    return (
      <View
        style={{
          width: baseChartWidth,
          height: chartHeight,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
          borderRadius: 8,
        }}>
        <Typography
          variant={TypographyVariant.LMEDIUM_REGULAR}
          text="Unable to load chart data"
          customTextStyles={{color: '#666'}}
        />
      </View>
    );
  }

  const ChartComponent = () => (
    <LineChart
      data={chartData}
      width={chartWidth}
      height={chartHeight}
      chartConfig={chartConfig}
      bezier={chartData.hasRealData}
      style={{borderRadius: 8}}
      withInnerLines={true}
      withOuterLines={false}
      withVerticalLines={false}
      withHorizontalLines={true}
      withDots={true}
      withShadow={chartData.hasRealData}
      fromZero={true}
      onDataPointClick={data => {
        const dayData = chartData.processedData[data.index];
        if (dayData) {
          console.log(
            `Clicked ${dayData.day}: €${dayData.sales} (${dayData.orders} orders)`,
          );
        }
      }}
    />
  );

  return (
    <View style={{position: 'relative'}}>
      {/* For monthly view, wrap in ScrollView for horizontal scrolling */}
      {selectedPeriod === 'monthly' && chartWidth > baseChartWidth ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{paddingRight: 20}}
          style={{maxWidth: baseChartWidth}}>
          <ChartComponent />
        </ScrollView>
      ) : (
        <ChartComponent />
      )}

      {/* Overlay for no data periods */}
      {!chartData.hasRealData && dashboardData?.recent_orders?.length > 0 && (
        <View
          style={{
            position: 'absolute',
            top: 60,
            left: 20,
            right: selectedPeriod === 'monthly' ? 40 : 20,
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#E5E7EB',
          }}>
          <Typography
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            text="No sales in selected period"
            customTextStyles={{color: '#666', marginBottom: 4}}
          />
          <Typography
            variant={TypographyVariant.LSMALL_REGULAR}
            text={`${
              dashboardData.recent_orders.length
            } order(s) exist but outside ${
              selectedPeriod === '7days' ? '7 day' : '30 day'
            } window`}
            customTextStyles={{color: '#999', textAlign: 'center'}}
          />
        </View>
      )}

      {!chartData.hasRealData &&
        (!dashboardData?.recent_orders ||
          dashboardData.recent_orders.length === 0) && (
          <View
            style={{
              position: 'absolute',
              top: 80,
              left: 20,
              right: selectedPeriod === 'monthly' ? 40 : 20,
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              paddingVertical: 16,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#E5E7EB',
            }}>
            <Typography
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              text="No orders yet"
              customTextStyles={{color: '#666', marginBottom: 4}}
            />
            <Typography
              variant={TypographyVariant.LSMALL_REGULAR}
              text="Sales data will appear here once you receive orders"
              customTextStyles={{color: '#999', textAlign: 'center'}}
            />
          </View>
        )}

      {/* Peak annotation */}
      {peakData && (
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 20,
            backgroundColor: '#9101CF',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
          }}>
          <Typography
            variant={TypographyVariant.LXSMALL_MEDIUM}
            text={`€${peakData.value.toFixed(0)}`}
            customTextStyles={{color: 'white'}}
          />
          <Typography
            variant={TypographyVariant.LXXSMALL_REGULAR}
            text={new Date(peakData.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
            customTextStyles={{color: 'white', opacity: 0.8}}
          />
        </View>
      )}
    </View>
  );
};

// Helper functions
const parseOrderDate = (timestamp: string | number): Date => {
  // Handle both string and number timestamps
  const ts = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp;

  // Check if timestamp is in milliseconds or seconds
  // Timestamps > 1000000000000 are likely in milliseconds
  const date = ts > 1000000000000 ? new Date(ts) : new Date(ts * 1000);

  // Validate the date
  if (isNaN(date.getTime())) {
    console.warn(`Invalid timestamp: ${timestamp}`);
    return new Date(); // Return current date as fallback
  }

  return date;
};

const getDatesInRange = (period: '7days' | 'monthly'): Date[] => {
  const dates: Date[] = [];
  const today = new Date();
  const days = period === '7days' ? 7 : 30;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    dates.push(date);
  }

  return dates;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  if (!date1 || !date2) return false;

  const d1 = new Date(date1);
  const d2 = new Date(date2);

  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  return d1.getTime() === d2.getTime();
};

const formatDayLabel = (date: Date, period: '7days' | 'monthly'): string => {
  if (period === '7days') {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  } else {
    // For monthly view, show date numbers
    return date.getDate().toString();
  }
};

const createEmptyChartData = (
  dateRange: Date[],
  period: '7days' | 'monthly',
) => {
  const emptyData = dateRange.map(date => ({
    day: formatDayLabel(date, period),
    sales: 0,
    date: date.toISOString(),
    orders: 0,
    fullDate: date,
  }));

  // For monthly view, filter to show every 3rd day
  const processedData =
    period === 'monthly'
      ? emptyData.filter((_, index) => index % 3 === 0)
      : emptyData;

  return {
    labels: processedData.map(item => item.day),
    datasets: [
      {
        data: new Array(processedData.length).fill(0), // Match the processed data length
        color: (opacity = 1) => `rgba(145, 1, 207, ${opacity * 0.3})`,
        strokeWidth: 1,
      },
    ],
    rawData: emptyData,
    processedData: processedData,
    hasRealData: false,
  };
};

const generateMinimalData = (length: number): number[] => {
  // Generate minimal data points to show chart structure
  return new Array(length)
    .fill(0)
    .map((_, index) => (index === Math.floor(length / 2) ? 0.1 : 0));
};

export default SalesChart;
