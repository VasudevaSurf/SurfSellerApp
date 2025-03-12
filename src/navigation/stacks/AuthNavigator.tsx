import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AuthSuccessScreen from '../../screens/Auth/AuthSuccessScreen/AuthSuccessScreen';
import OTPVerificationScreen from '../../screens/Auth/OTPVerificationScreen/OTPVerificationScreen';
import PhoneNumberScreen from '../../screens/Auth/PhoneNumberScreen/PhoneNumberScreen';
import {AuthStackParamList} from '../../types/navigation';
import EmailSignIn from '../../screens/Auth/EmailSignInPages/EmailSignIn';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
      <Stack.Screen name="EmailSignIn" component={EmailSignIn} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="AuthSuccess" component={AuthSuccessScreen} />
    </Stack.Navigator>
  );
};
