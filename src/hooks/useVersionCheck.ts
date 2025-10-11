// src/hooks/useVersionCheck.ts

import {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import {fetchInitializer} from '../redux/slices/initializerSlice';
import VersionCheckService from '../utils/versionCheck';

export const useVersionCheck = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [storeUrl, setStoreUrl] = useState('');

  const {
    data: initializerData,
    loading,
    error,
    lastFetched,
  } = useSelector((state: RootState) => state.initializer);

  // Log whenever hook state changes
  useEffect(() => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎣 [useVersionCheck HOOK] State Update');
    console.log('Hook State:', {
      showUpdateModal,
      storeUrl,
      hasInitializerData: !!initializerData,
      initializerLoading: loading,
      initializerError: error,
      lastFetched: lastFetched ? new Date(lastFetched).toLocaleString() : null,
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }, [showUpdateModal, storeUrl, initializerData, loading, error, lastFetched]);

  // Fetch initializer on mount if not already fetched
  useEffect(() => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎣 [useVersionCheck HOOK] Mount Check');
    console.log('Checking if initializer needs to be fetched...');
    console.log('Has data?', !!initializerData);
    console.log(
      'Last fetched:',
      lastFetched ? new Date(lastFetched).toLocaleString() : 'Never',
    );

    // Fetch if we don't have data or if it's older than 1 hour
    if (
      !initializerData ||
      (lastFetched && Date.now() - lastFetched > 3600000)
    ) {
      console.log('🚀 Fetching initializer data...');
      dispatch(fetchInitializer());
    } else {
      console.log('✅ Initializer data already available');
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }, []); // Only run on mount

  // Check version when initializer data changes
  useEffect(() => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎣 [useVersionCheck HOOK] Initializer Data Changed');
    console.log('Trigger Event: initializerData dependency changed');

    if (initializerData) {
      console.log('📡 Initializer Data Available:');
      console.log(
        '├─ Has app_update_config?',
        !!initializerData.app_update_config,
      );

      if (initializerData.app_update_config) {
        console.log('├─ Update Config Details:');
        console.log(
          '│  ├─ is_app_update_required:',
          initializerData.app_update_config.is_app_update_required,
        );
        console.log(
          '│  ├─ android_version:',
          initializerData.app_update_config.android_version,
        );
        console.log(
          '│  ├─ ios_version:',
          initializerData.app_update_config.ios_version,
        );
        console.log(
          '│  ├─ android_url:',
          initializerData.app_update_config.android_url,
        );
        console.log(
          '│  └─ ios_url:',
          initializerData.app_update_config.ios_url,
        );
        console.log('└─ Calling checkVersion()...\n');
        checkVersion();
      } else {
        console.log('└─ ⚠️ No app_update_config found in initializer data');
        console.log(
          'Full initializer data keys:',
          Object.keys(initializerData),
        );
      }
    } else {
      console.log('⚠️ Initializer Data is null/undefined');
      console.log('Loading:', loading);
      console.log('Error:', error);
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }, [initializerData]);

  const checkVersion = useCallback(async () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 [HOOK checkVersion] Starting version check process...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (!initializerData?.app_update_config) {
      console.log(
        '❌ [HOOK checkVersion] Cannot proceed - No app_update_config',
      );
      console.log('Initializer data:', initializerData);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      return;
    }

    const {
      is_app_update_required,
      android_version,
      ios_version,
      android_url,
      ios_url,
    } = initializerData.app_update_config;

    console.log('📋 [HOOK checkVersion] API Configuration:');
    console.log('═══════════════════════════════════════════');
    console.log('Update Required Flag:', is_app_update_required);
    console.log('Android Version:', android_version);
    console.log('iOS Version:', ios_version);
    console.log('Android URL:', android_url);
    console.log('iOS URL:', ios_url);
    console.log('═══════════════════════════════════════════\n');

    // Only check if update is required by backend
    if (!is_app_update_required) {
      console.log('⏭️ [HOOK checkVersion] Skipping version check');
      console.log('Reason: is_app_update_required = false');
      console.log('Backend has disabled update checks');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      return;
    }

    try {
      console.log('🚀 [HOOK checkVersion] Calling VersionCheckService...\n');

      const updateNeeded = await VersionCheckService.checkIfUpdateNeeded(
        android_version,
        ios_version,
      );

      console.log('\n📊 [HOOK checkVersion] Version Check Result:');
      console.log('═══════════════════════════════════════════');
      console.log('Update Needed?', updateNeeded);
      console.log('═══════════════════════════════════════════\n');

      if (updateNeeded) {
        console.log(
          '🚨 [HOOK checkVersion] UPDATE REQUIRED - Preparing modal...',
        );

        const url = VersionCheckService.getStoreUrl(android_url, ios_url);
        console.log('🔗 Store URL selected:', url);

        console.log('📱 Setting modal state:');
        console.log('├─ setStoreUrl:', url);
        console.log('└─ setShowUpdateModal: true\n');

        setStoreUrl(url);
        setShowUpdateModal(true);

        console.log('✅ [HOOK checkVersion] Modal should now be visible!');
      } else {
        console.log('✅ [HOOK checkVersion] No update needed - App is current');
      }

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    } catch (error) {
      console.error('❌ [HOOK checkVersion] Error during version check');
      console.error('Error Details:', {
        message: error.message,
        stack: error.stack,
        apiConfig: initializerData.app_update_config,
      });
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }
  }, [initializerData]);

  const handleUpdate = useCallback(async () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👆 [HOOK handleUpdate] User clicked Update button');
    console.log('Store URL:', storeUrl);
    console.log('Has Initializer Data?', !!initializerData);

    if (storeUrl) {
      console.log('✅ Store URL is valid, proceeding...\n');

      console.log('🏪 Opening app store...');
      await VersionCheckService.openAppStore(storeUrl);

      // Update stored version after user clicks update
      if (initializerData?.app_update_config) {
        console.log('\n💾 Updating stored version with new API values...');
        console.log('New values:', {
          android: initializerData.app_update_config.android_version,
          ios: initializerData.app_update_config.ios_version,
        });

        await VersionCheckService.updateStoredVersion(
          initializerData.app_update_config.android_version,
          initializerData.app_update_config.ios_version,
        );
      }

      console.log('\n🔒 Closing update modal...');
      console.log('setShowUpdateModal: false');
      setShowUpdateModal(false);

      console.log('✅ [HOOK handleUpdate] Update process completed!');
    } else {
      console.error('❌ [HOOK handleUpdate] No store URL available');
      console.error('Cannot proceed with update');
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }, [storeUrl, initializerData]);

  const dismissModal = useCallback(() => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('❌ [HOOK dismissModal] User dismissed update modal');
    console.log('setShowUpdateModal: false');
    setShowUpdateModal(false);
    console.log(
      '⚠️ Warning: User dismissed update - version not updated in storage',
    );
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }, []);

  // Manual refresh function for testing
  const manualCheckVersion = useCallback(async () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔄 [HOOK manualCheckVersion] Manual check triggered');
    console.log('Fetching fresh initializer data...');

    await dispatch(fetchInitializer());
    console.log('✅ Initializer fetched, checkVersion will run automatically');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }, [dispatch]);

  // Log hook mount/unmount
  useEffect(() => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎣 [useVersionCheck HOOK] Mounted');
    console.log('Hook initialized and ready');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return () => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🎣 [useVersionCheck HOOK] Unmounted');
      console.log('Hook cleanup complete');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    };
  }, []);

  return {
    showUpdateModal,
    handleUpdate,
    dismissModal,
    checkVersion: manualCheckVersion,
  };
};
