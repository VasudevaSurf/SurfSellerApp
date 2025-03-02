import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import OrderDetail from '../../screens/DashBoardScreens/OrdersScreen/OrderDetailPages/OrderDetail';
import OrderScreen from '../../screens/DashBoardScreens/OrdersScreen/OrderScreen';
import {AccountSettingsStackParamList} from '../../types/navigation';

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
