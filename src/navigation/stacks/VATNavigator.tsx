import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {VATStackParamList} from '../../types/navigation';
import VATVerification from '../../screens/VATVerificationScreens/VATVerificationScreens/VATVerification';
import VATSuccess from '../../screens/VATVerificationScreens/VATSuccessScreens/VATSuccess';

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
