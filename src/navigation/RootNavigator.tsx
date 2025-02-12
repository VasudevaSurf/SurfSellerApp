import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import {OnboardingNavigator} from './stacks/OnboardingNavigator';
import {AuthNavigator} from './stacks/AuthNavigator';
import {CreateNavigator} from './stacks/CreateNavigator';
import {VATNavigator} from './stacks/VATNavigator';
import {DashboardNavigator} from './stacks/DashBoardNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Create" component={CreateNavigator} />
      <Stack.Screen name="VAT" component={VATNavigator} />
      <Stack.Screen name="Dashboard" component={DashboardNavigator} />
    </Stack.Navigator>
  );
};
