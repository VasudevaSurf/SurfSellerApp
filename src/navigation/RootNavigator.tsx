import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {checkAuthStatus} from '../redux/slices/authSlice';
import type {AppDispatch, RootState} from '../redux/store';
import {RootStackParamList} from '../types/navigation';
import {AuthNavigator} from './stacks/AuthNavigator';
import {CreateNavigator} from './stacks/CreateNavigator';
import {DashboardNavigator} from './stacks/DashBoardNavigator';
import {OnboardingNavigator} from './stacks/OnboardingNavigator';
import {VATNavigator} from './stacks/VATNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoggedIn, isLoading} = useSelector((state: RootState) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check auth status when app starts
  useEffect(() => {
    const initialize = async () => {
      await dispatch(checkAuthStatus());
      setIsInitialized(true);
    };

    initialize();
  }, [dispatch]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="Create" component={CreateNavigator} />
          <Stack.Screen name="VAT" component={VATNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="Dashboard" component={DashboardNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
};
