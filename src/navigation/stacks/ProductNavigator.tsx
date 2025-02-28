import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AccountSettingsStackParamList} from '../../types/navigation';
import ProductScreen from '../../screens/DashBoardScreens/ProductScreen/ProductScreen';
import AddProduct from '../../screens/DashBoardScreens/ProductScreen/AddProductScreens/AddProduct';

const Stack = createStackNavigator<AccountSettingsStackParamList>();

export const ProductNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProductsPage" component={ProductScreen} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
    </Stack.Navigator>
  );
};
