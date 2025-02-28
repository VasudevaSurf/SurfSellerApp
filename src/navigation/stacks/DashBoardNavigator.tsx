import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DashboardStackParamList} from '../../types/navigation';
import BottomNavigation from './BottomTabNavigator/BottomTabNavigator';
import {AccountSettingsNavigator} from './AccountSettingsNavigator';
import {OrderNavigator} from './OrderNavigator';
import {ProductNavigator} from './ProductNavigator';

const Stack = createStackNavigator<DashboardStackParamList>();

export const DashboardNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={BottomNavigation} />
      <Stack.Screen name="Product" component={ProductNavigator} />
      <Stack.Screen name="Orders" component={OrderNavigator} />
      <Stack.Screen name="Account" component={AccountSettingsNavigator} />
    </Stack.Navigator>
  );
};
