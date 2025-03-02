import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AddProduct from '../../screens/DashBoardScreens/ProductScreen/AddProductScreens/AddProduct';
import ProductScreen from '../../screens/DashBoardScreens/ProductScreen/ProductScreen';
import {AccountSettingsStackParamList} from '../../types/navigation';
import CategorySelectionScreen from '../../screens/DashBoardScreens/ProductScreen/AddProductScreens/ProgressStepperPages/ProductInfoPages/CategorySelectionScreen';

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
      <Stack.Screen name="CategoryScreen" component={CategorySelectionScreen} />
    </Stack.Navigator>
  );
};
