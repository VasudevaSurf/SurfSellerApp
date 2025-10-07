import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AccountSettingsStackParamList } from '../../types/navigation';
import BottomNavigation from './BottomTabNavigator/BottomTabNavigator';
import NewOrders from '../../screens/DashBoardScreens/HomeScreen/HomeSubScreens/NewOrdersPages/NewOrders';
import FAQAnswer from '../../screens/DashBoardScreens/AccountScreen/AccountOptionScreens/FAQPages/FAQAnswer';
import FAQScreen from '../../screens/DashBoardScreens/AccountScreen/AccountOptionScreens/FAQPages/FAQScreen';

const Stack = createStackNavigator<AccountSettingsStackParamList>();

export const FaqNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="FAQScreen" component={FAQScreen} />
            <Stack.Screen name="FAQAnswer" component={FAQAnswer} />
        </Stack.Navigator>
    );
};
