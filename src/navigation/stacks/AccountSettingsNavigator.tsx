import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AccountSettingsStackParamList} from '../../types/navigation';
import AccountScreen from '../../screens/DashBoardScreens/AccountScreen/AccountScreen';
import PersonalInfo from '../../screens/DashBoardScreens/AccountScreen/AccountOptionScreens/PersonalInfo/PersonalInfo';
import EditFieldScreen from '../../components/Screens/EditFieldScreen/EditFieldScreen';
import CompanyProfile from '../../screens/DashBoardScreens/AccountScreen/AccountOptionScreens/CompanyProfilePages/CompanyProfile';

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
    </Stack.Navigator>
  );
};
