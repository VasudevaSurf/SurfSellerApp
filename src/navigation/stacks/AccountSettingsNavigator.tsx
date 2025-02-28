import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AccountSettingsStackParamList} from '../../types/navigation';
import AccountScreen from '../../screens/DashBoardScreens/AccountScreen/AccountScreen';
import PersonalInfo from '../../screens/DashBoardScreens/AccountScreen/AccountOptionScreens/PersonalInfo/PersonalInfo';
import EditFieldScreen from '../../components/Screens/EditFieldScreen/EditFieldScreen';
import CompanyProfile from '../../screens/DashBoardScreens/AccountScreen/AccountOptionScreens/CompanyProfilePages/CompanyProfile';
import BankDetails from '../../screens/DashBoardScreens/AccountScreen/AccountOptionScreens/BankDetailsPages/BankDetails';
import PaymentInfo from '../../screens/DashBoardScreens/AccountScreen/AccountOptionScreens/PaymentScreens/PaymentInfoPages/PaymentInfo';
import WithdrawScreen from '../../screens/DashBoardScreens/AccountScreen/AccountOptionScreens/PaymentScreens/WithdrawPages/WithdrawScreen';
import NotificationScreen from '../../screens/DashBoardScreens/AccountScreen/AccountOptionScreens/NotificationPages/NotificationScreen';

const Stack = createStackNavigator<AccountSettingsStackParamList>();

export const AccountSettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AccountSettings" component={AccountScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="EditField" component={EditFieldScreen} />
      <Stack.Screen name="CompanyProfile" component={CompanyProfile} />
      <Stack.Screen name="BankDetails" component={BankDetails} />
      <Stack.Screen name="PaymentInfo" component={PaymentInfo} />
      <Stack.Screen name="WithdrawScreen" component={WithdrawScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    </Stack.Navigator>
  );
};
