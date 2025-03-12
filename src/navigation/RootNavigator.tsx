import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, ActivityIndicator} from 'react-native';
import {RootStackParamList} from '../types/navigation';
import {AuthNavigator} from './stacks/AuthNavigator';
import {CreateNavigator} from './stacks/CreateNavigator';
import {DashboardNavigator} from './stacks/DashBoardNavigator';
import {OnboardingNavigator} from './stacks/OnboardingNavigator';
import {VATNavigator} from './stacks/VATNavigator';
import {checkAuthStatus} from '../redux/slices/authSlice';
import type {RootState} from '../redux/store';
import type {AppDispatch} from '../redux/store';
import {globalStyles} from '../config/globalStyles';
import {ColorPalette} from '../config/colorPalette';

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
