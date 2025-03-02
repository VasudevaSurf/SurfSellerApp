import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AccountSettingsStackParamList} from '../../types/navigation';
import AddProduct from '../../screens/DashBoardScreens/ProductScreen/AddProductScreens/AddProduct';
import ProductScreen from '../../screens/DashBoardScreens/ProductScreen/ProductScreen';

const Stack = createStackNavigator<AccountSettingsStackParamList>();

export const ProductNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProductsPage" component={ProductScreen} />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
