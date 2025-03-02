import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import OTPVerificationScreen from '../../screens/Auth/OTPVerificationScreen/OTPVerificationScreen';
import CreateAccount from '../../screens/CreateAccount/CreateAccountScreens/CreateAccount';
import CreateSuccess from '../../screens/CreateAccount/CreateAccountSuccess/CreateSuccess';
import {CreateStackParamList} from '../../types/navigation';

const Stack = createStackNavigator<CreateStackParamList>();

export const CreateNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="CreateSuccess" component={CreateSuccess} />
    </Stack.Navigator>
  );
};
