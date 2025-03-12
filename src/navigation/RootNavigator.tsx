import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootStackParamList} from '../types/navigation';
import {AuthNavigator} from './stacks/AuthNavigator';
import {CreateNavigator} from './stacks/CreateNavigator';
import {DashboardNavigator} from './stacks/DashBoardNavigator';
import {OnboardingNavigator} from './stacks/OnboardingNavigator';
import {VATNavigator} from './stacks/VATNavigator';
import type {RootState} from '../redux/store';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const {isLoggedIn} = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Onboarding">
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
          <Stack.Screen name="Auth" component={AuthNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="Dashboard" component={DashboardNavigator} />
          <Stack.Screen name="Create" component={CreateNavigator} />
          <Stack.Screen name="VAT" component={VATNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
};
