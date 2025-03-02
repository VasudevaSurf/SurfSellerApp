import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import VATSuccess from '../../screens/VATVerificationScreens/VATSuccessScreens/VATSuccess';
import VATVerification from '../../screens/VATVerificationScreens/VATVerificationScreens/VATVerification';
import {VATStackParamList} from '../../types/navigation';

const Stack = createStackNavigator<VATStackParamList>();

export const VATNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="VATVerification" component={VATVerification} />
      <Stack.Screen name="VATSuccess" component={VATSuccess} />
    </Stack.Navigator>
  );
};
