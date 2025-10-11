// src/navigation/RootNavigator.tsx

import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {checkAuthStatus} from '../redux/slices/authSlice';
import type {AppDispatch, RootState} from '../redux/store';
import {RootStackParamList} from '../types/navigation';
import {AuthNavigator} from './stacks/AuthNavigator';
import {CreateNavigator} from './stacks/CreateNavigator';
import {DashboardNavigator} from './stacks/DashBoardNavigator';
import {OnboardingNavigator} from './stacks/OnboardingNavigator';
import {VATNavigator} from './stacks/VATNavigator';
import AppUpdateModal from '../components/MainComponents/AppUpdateModal';
import VersionCheckService from '../utils/versionCheck';
import {fetchInitializer} from '../redux/slices/initializerSlice';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoggedIn} = useSelector((state: RootState) => state.auth);
  const {data: initializerData} = useSelector(
    (state: RootState) => state.initializer,
  );

  const [isInitialized, setIsInitialized] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [storeUrl, setStoreUrl] = useState('');

  // Check auth status when app starts
  useEffect(() => {
    const initialize = async () => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🚀 [ROOT NAVIGATOR] App Initialization Starting...');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      console.log('Step 1: Checking auth status...');
      await dispatch(checkAuthStatus());

      console.log(
        'Step 2: Fetching initializer data (includes app version)...',
      );
      await dispatch(fetchInitializer());

      console.log('✅ App initialization complete');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      setIsInitialized(true);
    };

    initialize();
  }, [dispatch]);

  // Check version when initializer data is available
  useEffect(() => {
    if (!isInitialized || !initializerData) {
      return;
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 [ROOT NAVIGATOR] Version Check Trigger');
    console.log('Initializer data loaded, checking if app update is needed...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    checkAppVersion();
  }, [isInitialized, initializerData]);

  const checkAppVersion = async () => {
    if (!initializerData?.app_update_config) {
      console.log('⚠️ No app_update_config in initializer data');
      console.log('Available keys:', Object.keys(initializerData || {}));
      return;
    }

    const {
      is_app_update_required,
      android_version,
      ios_version,
      android_url,
      ios_url,
    } = initializerData.app_update_config;

    console.log('📋 App Update Config from Initializer API:');
    console.log('═══════════════════════════════════════════');
    console.log('├─ Update Required (Backend Flag):', is_app_update_required);
    console.log('├─ Android Version (API):', android_version);
    console.log('├─ iOS Version (API):', ios_version);
    console.log('├─ Android URL:', android_url);
    console.log('└─ iOS URL:', ios_url);
    console.log('═══════════════════════════════════════════\n');

    if (!is_app_update_required) {
      console.log(
        '⏭️ Update not required by backend (is_app_update_required = false)',
      );
      console.log('Skipping version check');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      return;
    }

    try {
      console.log('🚀 Calling VersionCheckService to compare versions...\n');

      const updateNeeded = await VersionCheckService.checkIfUpdateNeeded(
        android_version,
        ios_version,
      );

      if (updateNeeded) {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🚨 [ROOT NAVIGATOR] UPDATE REQUIRED!');
        console.log('Showing update modal to user...');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        const url = VersionCheckService.getStoreUrl(android_url, ios_url);
        setStoreUrl(url);
        setShowUpdateModal(true);

        console.log('✅ Update modal displayed');
        console.log('📌 Waiting for user to click "Update Now" button');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      } else {
        console.log('✅ No update needed - app is current');
      }
    } catch (error) {
      console.error('❌ Error checking version:', error);
    }
  };

  const handleUpdate = async () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👆 [ROOT NAVIGATOR] USER CLICKED "UPDATE NOW" BUTTON');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('Store URL:', storeUrl);
    console.log('Platform:', Platform.OS.toUpperCase());

    if (storeUrl) {
      console.log('Step 1: Opening app store...');
      await VersionCheckService.openAppStore(storeUrl);

      // CRITICAL: Update stored version ONLY when user clicks update
      if (initializerData?.app_update_config) {
        console.log('\nStep 2: Updating stored version in AsyncStorage...');
        console.log(
          "This ensures user won't see update modal again until API version changes",
        );
        console.log('New version to store:', {
          android: initializerData.app_update_config.android_version,
          ios: initializerData.app_update_config.ios_version,
        });

        await VersionCheckService.updateStoredVersion(
          initializerData.app_update_config.android_version,
          initializerData.app_update_config.ios_version,
        );

        console.log('✅ Stored version updated successfully!');
      }

      console.log('\nStep 3: Closing update modal...');
      setShowUpdateModal(false);

      console.log('✅ [ROOT NAVIGATOR] Update flow completed!');
      console.log(
        '📌 Next app launch: Will compare stored version with API version',
      );
      console.log('📌 Modal will only show again if API version changes');
    } else {
      console.error('❌ [ROOT NAVIGATOR] No store URL available');
      console.error('Cannot proceed with update');
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  };

  // Don't render anything until initialized
  if (!isInitialized) {
    console.log('⏳ Waiting for initialization...');
    return null;
  }

  return (
    <>
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

      {/* App Update Modal - Only shown when version mismatch detected */}
      <AppUpdateModal
        visible={showUpdateModal}
        onUpdate={handleUpdate}
        appName="Surf Seller"
      />
    </>
  );
};
