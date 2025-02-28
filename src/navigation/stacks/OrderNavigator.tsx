import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AccountSettingsStackParamList} from '../../types/navigation';
import OrderScreen from '../../screens/DashBoardScreens/OrdersScreen/OrderScreen';
import OrderDetail from '../../screens/DashBoardScreens/OrdersScreen/OrderDetailPages/OrderDetail';

const Stack = createStackNavigator<AccountSettingsStackParamList>();

export const OrderNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OrderPage" component={OrderScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
    </Stack.Navigator>
  );
};
