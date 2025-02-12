import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackParamList} from '../../types/navigation';
import PhoneNumberScreen from '../../screens/Auth/PhoneNumberScreen/PhoneNumberScreen';
import OTPVerificationScreen from '../../screens/Auth/OTPVerificationScreen/OTPVerificationScreen';
import AuthSuccessScreen from '../../screens/Auth/AuthSuccessScreen/AuthSuccessScreen';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="AuthSuccess" component={AuthSuccessScreen} />
    </Stack.Navigator>
  );
};
