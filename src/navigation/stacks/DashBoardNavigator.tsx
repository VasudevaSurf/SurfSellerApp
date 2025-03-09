import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {DashboardStackParamList} from '../../types/navigation';
import {AccountSettingsNavigator} from './AccountSettingsNavigator';
import {HomeNavigator} from './HomeNavigator';
import {OrderNavigator} from './OrderNavigator';
import {ProductNavigator} from './ProductNavigator';

const Stack = createStackNavigator<DashboardStackParamList>();

export const DashboardNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeNavigator} />
      <Stack.Screen name="Product" component={ProductNavigator} />
      <Stack.Screen name="Orders" component={OrderNavigator} />
      <Stack.Screen name="Account" component={AccountSettingsNavigator} />
    </Stack.Navigator>
  );
};
