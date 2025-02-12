import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DashboardStackParamList} from '../../types/navigation';
import ProductScreen from '../../screens/DashBoardScreens/ProductScreen/ProductScreen';
import OrderScreen from '../../screens/DashBoardScreens/OrdersScreen/OrderScreen';
import AccountScreen from '../../screens/DashBoardScreens/AccountScreen/AccountScreen';
import BottomNavigation from './BottomTabNavigator/BottomTabNavigator';

const Stack = createStackNavigator<DashboardStackParamList>();

export const DashboardNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={BottomNavigation} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Orders" component={OrderScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  );
};
