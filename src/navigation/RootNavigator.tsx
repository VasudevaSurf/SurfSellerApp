import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {checkAuthStatus} from '../redux/slices/authSlice';
import {fetchInitializer} from '../redux/slices/initializerSlice'; // ✅ Add this import
import type {AppDispatch, RootState} from '../redux/store';
import {RootStackParamList} from '../types/navigation';
import {AuthNavigator} from './stacks/AuthNavigator';
import {CreateNavigator} from './stacks/CreateNavigator';
import {DashboardNavigator} from './stacks/DashBoardNavigator';
import {OnboardingNavigator} from './stacks/OnboardingNavigator';
import {VATNavigator} from './stacks/VATNavigator';
import {View, ActivityIndicator} from 'react-native';
import {ColorPalette} from '../config/colorPalette';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoggedIn, isLoading} = useSelector((state: RootState) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);

  // ✅ IMPORTANT: Load initializer data on app startup
  useEffect(() => {
    const initialize = async () => {
      console.log('🚀 [ROOT NAVIGATOR] Starting app initialization...');

      try {
        // ✅ STEP 1: Load initializer data FIRST
        console.log('📡 [ROOT NAVIGATOR] Fetching initializer data...');
        await dispatch(fetchInitializer()).unwrap();
        console.log('✅ [ROOT NAVIGATOR] Initializer data loaded successfully');

        // ✅ STEP 2: Check auth status
        console.log('🔐 [ROOT NAVIGATOR] Checking auth status...');
        await dispatch(checkAuthStatus());
        console.log('✅ [ROOT NAVIGATOR] Auth status checked');

        setIsInitialized(true);
        console.log('✅ [ROOT NAVIGATOR] App initialization complete');
      } catch (error) {
        console.error('❌ [ROOT NAVIGATOR] Initialization error:', error);
        // Still set initialized to true to show the app
        // even if initializer fails
        setIsInitialized(true);
      }
    };

    initialize();
  }, [dispatch]);

  // ✅ Show loading screen while initializing
  if (!isInitialized) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: ColorPalette.White,
        }}>
        <ActivityIndicator size="large" color={ColorPalette.PURPLE_300} />
      </View>
    );
  }

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
          <Stack.Screen name="Auth" component={AuthNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
};
