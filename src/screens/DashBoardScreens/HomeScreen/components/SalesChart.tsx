// src/screens/DashBoardScreens/HomeScreen/components/SalesChart.tsx
import React, { useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Typography } from '../../../../components/UserComponents/Typography/Typography';
import { TypographyVariant } from '../../../../components/UserComponents/Typography/Typography.types';
import { ColorPalette } from '../../../../config/colorPalette';

const { width: screenWidth } = Dimensions.get('window');

interface SalesChartProps {
  dashboardData: any;
  selectedPeriod?: '7days' | 'monthly';
}

interface ChartDataPoint {
  day: string;
  sales: number;
  date: string;
  orders: number;
}

const SalesChart: React.FC<SalesChartProps> = ({ dashboardData, selectedPeriod = '7days' }) => {
  // Process the API data to create chart data
  const chartData = useMemo(() => {
    if (!dashboardData?.recent_orders || dashboardData.recent_orders.length === 0) {
      return {
        labels: [],
        datasets: [{ data: [] }],
        rawData: []
      };
    }

    const orders = dashboardData.recent_orders;
    const dateRange = getDatesInRange(selectedPeriod);
    
    // Group orders by date and calculate daily totals
    const dailySales = dateRange.map(date => {
      const dayOrders = orders.filter((order: any) => {
        const orderDate = new Date(parseInt(order.timestamp) * 1000);
        return isSameDay(orderDate, date);
      });

      const totalSales = dayOrders.reduce((sum: number, order: any) => {
        const amount = parseFloat(order.total.replace('€', '')) || 0;
        return sum + amount;
      }, 0);

      return {
        day: formatDayLabel(date),
        sales: totalSales,
        date: date.toISOString(),
        orders: dayOrders.length
      };
    });

    // Prepare data for react-native-chart-kit
    const labels = dailySales.map(item => item.day);
    const data = dailySales.map(item => item.sales);

    return {
      labels,
      datasets: [
        {
          data: data.length > 0 ? data : [0], // Ensure at least one data point
          color: (opacity = 1) => `rgba(145, 1, 207, ${opacity})`, // Purple color
          strokeWidth: 3,
        }
      ],
      rawData: dailySales
    };
  }, [dashboardData, selectedPeriod]);

  // Get the peak value for highlighting
  const peakData = useMemo(() => {
    if (chartData.rawData.length === 0) return null;
    
    const maxSales = Math.max(...chartData.rawData.map(d => d.sales));
    if (maxSales === 0) return null;
    
    const peakDay = chartData.rawData.find(d => d.sales === maxSales);
    
    return peakDay ? {
      day: peakDay.day,
      value: maxSales,
      date: peakDay.date
    } : null;
  }, [chartData.rawData]);

  // Chart dimensions
  const chartWidth = screenWidth - 60; // Account for padding
  const chartHeight = 240;

  // Chart configuration
  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(145, 1, 207, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    fillShadowGradient: '#9101CF',
    fillShadowGradientOpacity: 0.3,
    propsForDots: {
      r: '0', // Hide dots by default
      strokeWidth: '0',
    },
    propsForBackgroundLines: {
      strokeDasharray: '3,3',
      stroke: '#E5E7EB',
      strokeWidth: 1,
    },
    propsForLabels: {
      fontSize: 12,
      fill: '#6B7280',
    },
    decimalPlaces: 0,
    formatYLabel: (value: string) => `€${value}`,
    segments: 4,
  };

  if (chartData.labels.length === 0 || chartData.datasets[0].data.every(val => val === 0)) {
    return (
      <View style={{
        width: chartWidth,
        height: chartHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 8
      }}>
        <Typography
          variant={TypographyVariant.LMEDIUM_REGULAR}
          text="No sales data available"
          customTextStyles={{ color: '#666' }}
        />
      </View>
    );
  }

  return (
    <View style={{ position: 'relative' }}>
      <LineChart
        data={chartData}
        width={chartWidth}
        height={chartHeight}
        chartConfig={chartConfig}
        bezier // Smooth curves
        style={{
          borderRadius: 8,
        }}
        withInnerLines={true}
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLines={true}
        withDots={false}
        withShadow={true}
        fromZero={true}
        onDataPointClick={(data) => {
          // Handle data point click if needed
          const dayData = chartData.rawData[data.index];
          if (dayData) {
            console.log(`Clicked on ${dayData.day}: €${dayData.sales} (${dayData.orders} orders)`);
          }
        }}
      />
      
      {/* Peak annotation outside chart */}
      {peakData && (
        <View style={{
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
            customTextStyles={{ color: 'white' }}
          />
          <Typography
            variant={TypographyVariant.LXXSMALL_REGULAR}
            text={new Date(peakData.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric'
            })}
            customTextStyles={{ color: 'white', opacity: 0.8 }}
          />
        </View>
      )}
    </View>
  );
};

// Helper functions
const getDatesInRange = (period: '7days' | 'monthly'): Date[] => {
  const dates: Date[] = [];
  const today = new Date();
  const days = period === '7days' ? 7 : 30;
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  
  return dates;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
};

const formatDayLabel = (date: Date): string => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
};

export default SalesChart;