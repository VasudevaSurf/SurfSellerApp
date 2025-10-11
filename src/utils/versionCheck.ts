// src/utils/versionCheck.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, Linking, Alert} from 'react-native';

const VERSION_STORAGE_KEY = '@app_version';

export interface AppVersionData {
  androidVersion: string;
  iosVersion: string;
  lastChecked: number;
}

export class VersionCheckService {
  /**
   * Get stored version from AsyncStorage
   */
  static async getStoredVersion(): Promise<AppVersionData | null> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 [GET STORED VERSION] Starting...');
    console.log('Storage Key:', VERSION_STORAGE_KEY);

    try {
      const storedData = await AsyncStorage.getItem(VERSION_STORAGE_KEY);

      console.log('📦 Raw AsyncStorage Data:', storedData);

      if (storedData) {
        const parsedData = JSON.parse(storedData) as AppVersionData;
        console.log('✅ [GET STORED VERSION] Success!');
        console.log('📱 Parsed Version Data:', {
          androidVersion: parsedData.androidVersion,
          iosVersion: parsedData.iosVersion,
          lastChecked: new Date(parsedData.lastChecked).toLocaleString(),
          lastCheckedTimestamp: parsedData.lastChecked,
        });
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        return parsedData;
      }

      console.log('⚠️ [GET STORED VERSION] No stored version found');
      console.log('This is likely the first app launch');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      return null;
    } catch (error) {
      console.error('❌ [GET STORED VERSION] Error:', error);
      console.error('Error Details:', {
        message: error.message,
        stack: error.stack,
      });
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      return null;
    }
  }

  /**
   * Save version to AsyncStorage
   */
  static async saveVersion(versionData: AppVersionData): Promise<boolean> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💾 [SAVE VERSION] Starting...');
    console.log('Storage Key:', VERSION_STORAGE_KEY);
    console.log('📝 Version Data to Save:', {
      androidVersion: versionData.androidVersion,
      iosVersion: versionData.iosVersion,
      lastChecked: new Date(versionData.lastChecked).toLocaleString(),
      lastCheckedTimestamp: versionData.lastChecked,
    });
    console.log('📦 Stringified Data:', JSON.stringify(versionData, null, 2));

    try {
      await AsyncStorage.setItem(
        VERSION_STORAGE_KEY,
        JSON.stringify(versionData),
      );

      console.log('✅ [SAVE VERSION] Successfully saved to AsyncStorage!');

      // Verify the save by reading it back
      const verifyData = await AsyncStorage.getItem(VERSION_STORAGE_KEY);
      console.log('🔍 Verification - Read back from storage:', verifyData);

      if (verifyData === JSON.stringify(versionData)) {
        console.log('✅ Verification passed - Data matches!');
      } else {
        console.warn('⚠️ Verification warning - Data mismatch');
      }

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      return true;
    } catch (error) {
      console.error('❌ [SAVE VERSION] Error:', error);
      console.error('Error Details:', {
        message: error.message,
        stack: error.stack,
      });
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      return false;
    }
  }

  /**
   * Compare API version with stored version
   * Returns true if update is needed
   *
   * IMPORTANT: This does NOT update the stored version automatically
   * Version is only updated when user clicks "Update Now" button
   */
  static async checkIfUpdateNeeded(
    apiAndroidVersion: string,
    apiIosVersion: string,
  ): Promise<boolean> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 [VERSION CHECK] Starting version comparison...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    console.log('📱 Current Platform:', Platform.OS.toUpperCase());
    console.log('📡 API Versions from Initializer:', {
      android: apiAndroidVersion,
      ios: apiIosVersion,
    });

    try {
      console.log('\n🔎 Step 1: Retrieving stored version...');
      const storedVersion = await this.getStoredVersion();

      if (!storedVersion) {
        console.log('\n📝 Step 2: First time setup detected');
        console.log(
          'This is the first app launch - initializing version tracking',
        );
        console.log(
          'Creating initial version entry with current API values...',
        );

        const newVersionData = {
          androidVersion: apiAndroidVersion,
          iosVersion: apiIosVersion,
          lastChecked: Date.now(),
        };

        console.log(
          '💾 Saving initial version to AsyncStorage:',
          newVersionData,
        );
        await this.saveVersion(newVersionData);

        console.log('✅ [VERSION CHECK] First launch - Version initialized');
        console.log(
          '📌 Next time: Will compare API version with this stored version',
        );
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        return false;
      }

      console.log('\n📊 Step 2: Version Comparison Analysis');
      console.log('═══════════════════════════════════════════');

      const currentPlatformVersion =
        Platform.OS === 'android' ? apiAndroidVersion : apiIosVersion;

      const storedPlatformVersion =
        Platform.OS === 'android'
          ? storedVersion.androidVersion
          : storedVersion.iosVersion;

      console.log('Platform-specific versions:');
      console.log('├─ Stored Version (Last Known):', storedPlatformVersion);
      console.log('├─ API Version (Current):', currentPlatformVersion);
      console.log('└─ Platform:', Platform.OS);

      console.log('\nAll Versions (both platforms):');
      console.log('┌─ Android:');
      console.log('│  ├─ Stored:', storedVersion.androidVersion);
      console.log('│  └─ API:', apiAndroidVersion);
      console.log('└─ iOS:');
      console.log('   ├─ Stored:', storedVersion.iosVersion);
      console.log('   └─ API:', apiIosVersion);

      console.log('\n🔢 Comparison Details:');
      console.log(
        '├─ String comparison:',
        `"${storedPlatformVersion}" === "${currentPlatformVersion}"`,
      );
      console.log(
        '├─ Are they equal?',
        storedPlatformVersion === currentPlatformVersion,
      );
      console.log(
        '└─ Type check:',
        `stored: ${typeof storedPlatformVersion}, api: ${typeof currentPlatformVersion}`,
      );

      // Check if versions are different
      if (currentPlatformVersion !== storedPlatformVersion) {
        console.log('\n🚨 [VERSION CHECK] UPDATE REQUIRED!');
        console.log('═══════════════════════════════════════════');
        console.log('Version mismatch detected:');
        console.log(`├─ Your App Version (Stored): ${storedPlatformVersion}`);
        console.log(`├─ Latest App Version (API): ${currentPlatformVersion}`);
        console.log(`├─ Platform: ${Platform.OS}`);
        console.log(
          `├─ Last checked: ${new Date(
            storedVersion.lastChecked,
          ).toLocaleString()}`,
        );
        console.log(
          `└─ Time since last check: ${Math.floor(
            (Date.now() - storedVersion.lastChecked) / 1000 / 60,
          )} minutes`,
        );
        console.log('\n🎯 Action: Will show update modal to user');
        console.log(
          '📌 Note: Stored version will ONLY update when user clicks "Update Now"',
        );
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        return true;
      }

      console.log('\n✅ [VERSION CHECK] App is up to date!');
      console.log('═══════════════════════════════════════════');
      console.log('No update needed:');
      console.log(`├─ Your Version: ${storedPlatformVersion}`);
      console.log(`├─ API Version: ${currentPlatformVersion}`);
      console.log(`├─ Platform: ${Platform.OS}`);
      console.log(
        `└─ Last checked: ${new Date(
          storedVersion.lastChecked,
        ).toLocaleString()}`,
      );
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      return false;
    } catch (error) {
      console.error('\n❌ [VERSION CHECK] Error during comparison');
      console.error('Error Details:', {
        message: error.message,
        stack: error.stack,
        apiVersions: {android: apiAndroidVersion, ios: apiIosVersion},
      });
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      return false;
    }
  }

  /**
   * Open app store based on platform
   */
  static async openAppStore(storeUrl: string): Promise<void> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🏪 [OPEN APP STORE] Attempting to open store...');
    console.log('Platform:', Platform.OS.toUpperCase());
    console.log('Store URL:', storeUrl);

    try {
      console.log('🔍 Checking if URL can be opened...');
      const canOpen = await Linking.canOpenURL(storeUrl);
      console.log('Can open URL?', canOpen);

      if (canOpen) {
        console.log('✅ URL is valid, opening store...');
        await Linking.openURL(storeUrl);
        console.log('✅ [OPEN APP STORE] Store opened successfully!');
        console.log(
          'User will be redirected to:',
          Platform.OS === 'android' ? 'Play Store' : 'App Store',
        );
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      } else {
        console.error('❌ Cannot open store URL:', storeUrl);
        console.error('Reason: URL scheme not supported or invalid');
        Alert.alert(
          'Error',
          'Unable to open app store. Please update manually.',
        );
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      }
    } catch (error) {
      console.error('❌ [OPEN APP STORE] Error:', error);
      console.error('Error Details:', {
        message: error.message,
        stack: error.stack,
        url: storeUrl,
      });
      Alert.alert('Error', 'Unable to open app store. Please try again later.');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }
  }

  /**
   * Get the appropriate store URL based on platform
   */
  static getStoreUrl(androidUrl: string, iosUrl: string): string {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔗 [GET STORE URL] Determining platform URL...');
    console.log('Platform:', Platform.OS.toUpperCase());
    console.log('Available URLs:', {
      android: androidUrl,
      ios: iosUrl,
    });

    const selectedUrl = Platform.OS === 'android' ? androidUrl : iosUrl;
    console.log('✅ Selected URL:', selectedUrl);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return selectedUrl;
  }

  /**
   * Update stored version (ONLY called when user clicks "Update Now" button)
   * This is the ONLY place where we update the stored version after initial setup
   */
  static async updateStoredVersion(
    apiAndroidVersion: string,
    apiIosVersion: string,
  ): Promise<void> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔄 [UPDATE STORED VERSION] User clicked Update button');
    console.log('Updating stored version to match API version...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('📊 Previous stored version:');
    const previousVersion = await this.getStoredVersion();
    if (previousVersion) {
      console.log('├─ Android:', previousVersion.androidVersion);
      console.log('├─ iOS:', previousVersion.iosVersion);
      console.log(
        '└─ Last checked:',
        new Date(previousVersion.lastChecked).toLocaleString(),
      );
    }

    console.log('\n📊 New version to store:');
    const newVersionData = {
      androidVersion: apiAndroidVersion,
      iosVersion: apiIosVersion,
      lastChecked: Date.now(),
    };
    console.log('├─ Android:', newVersionData.androidVersion);
    console.log('├─ iOS:', newVersionData.iosVersion);
    console.log(
      '└─ Timestamp:',
      new Date(newVersionData.lastChecked).toLocaleString(),
    );

    console.log('\n💾 Saving new version to AsyncStorage...');
    const success = await this.saveVersion(newVersionData);

    if (success) {
      console.log('✅ [UPDATE STORED VERSION] Version updated successfully!');
      console.log('📌 Next app launch will compare against these new values');
      console.log(
        '📌 User will not see update modal again until API version changes',
      );
    } else {
      console.error('❌ [UPDATE STORED VERSION] Failed to update version');
      console.error('⚠️ User may see update modal again on next launch');
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }

  /**
   * Clear stored version (for testing or reset)
   */
  static async clearStoredVersion(): Promise<void> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🗑️ [CLEAR VERSION] Removing stored version...');
    console.log('Storage Key:', VERSION_STORAGE_KEY);

    try {
      // Check what's there before clearing
      const existingData = await AsyncStorage.getItem(VERSION_STORAGE_KEY);
      console.log('📦 Data before clearing:', existingData);

      await AsyncStorage.removeItem(VERSION_STORAGE_KEY);

      // Verify it's cleared
      const verifyData = await AsyncStorage.getItem(VERSION_STORAGE_KEY);
      console.log('🔍 Data after clearing:', verifyData);

      if (verifyData === null) {
        console.log('✅ [CLEAR VERSION] Successfully cleared!');
        console.log('📌 Next app launch will behave as first install');
      } else {
        console.warn('⚠️ [CLEAR VERSION] Data still exists after clear');
      }
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    } catch (error) {
      console.error('❌ [CLEAR VERSION] Error:', error);
      console.error('Error Details:', {
        message: error.message,
        stack: error.stack,
      });
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }
  }

  /**
   * Debug: Log all AsyncStorage keys
   */
  static async debugLogAllKeys(): Promise<void> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🐛 [DEBUG] Listing all AsyncStorage keys...');
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log('📋 Total keys found:', keys.length);
      console.log('Keys:', keys);

      // Log version key specifically
      const versionExists = keys.includes(VERSION_STORAGE_KEY);
      console.log(
        `\n🔍 Version key "${VERSION_STORAGE_KEY}" exists?`,
        versionExists,
      );

      if (versionExists) {
        const value = await AsyncStorage.getItem(VERSION_STORAGE_KEY);
        console.log('📦 Version key value:', value);
      }
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    } catch (error) {
      console.error('❌ [DEBUG] Error:', error);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }
  }
}

export default VersionCheckService;
