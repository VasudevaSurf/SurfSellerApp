import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AccountSettingsStackParamList} from '../../types/navigation';
import BottomNavigation from './BottomTabNavigator/BottomTabNavigator';
import NewOrders from '../../screens/DashBoardScreens/HomeScreen/HomeSubScreens/NewOrdersPages/NewOrders';

const Stack = createStackNavigator<AccountSettingsStackParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={BottomNavigation} />
      <Stack.Screen name="NewOrders" component={NewOrders} />
    </Stack.Navigator>
  );
};
