// src/utils/versionTestUtils.ts

import VersionCheckService from './versionCheck';

/**
 * Utility functions for testing version check functionality
 */
export class VersionTestUtils {
  /**
   * Reset stored version to test first-time installation
   */
  static async resetVersion() {
    console.log('\n🧪 ═══════════════════════════════════════════');
    console.log('🧪 [TEST UTIL] Reset Version');
    console.log('🧪 ═══════════════════════════════════════════');
    console.log('🧪 Purpose: Simulate first app installation');
    console.log('🧪 Action: Clearing all stored version data\n');

    await VersionCheckService.clearStoredVersion();

    console.log('🧪 Verification: Checking if cleared...');
    const check = await VersionCheckService.getStoredVersion();

    if (check === null) {
      console.log('🧪 ✅ SUCCESS: Version data cleared successfully');
      console.log('🧪 Next app launch will behave as first install');
    } else {
      console.log('🧪 ❌ FAILED: Version data still exists:', check);
    }
    console.log('🧪 ═══════════════════════════════════════════\n');
  }

  /**
   * Set a specific version in storage for testing
   */
  static async setTestVersion(androidVersion: string, iosVersion: string) {
    console.log('\n🧪 ═══════════════════════════════════════════');
    console.log('🧪 [TEST UTIL] Set Test Version');
    console.log('🧪 ═══════════════════════════════════════════');
    console.log('🧪 Setting custom version for testing:');
    console.log('🧪 ├─ Android Version:', androidVersion);
    console.log('🧪 ├─ iOS Version:', iosVersion);
    console.log('🧪 └─ Timestamp:', new Date().toLocaleString());
    console.log('🧪\n');

    await VersionCheckService.saveVersion({
      androidVersion,
      iosVersion,
      lastChecked: Date.now(),
    });

    console.log('🧪 Verification: Reading back stored value...');
    const stored = await VersionCheckService.getStoredVersion();

    if (stored) {
      console.log('🧪 ✅ Verification passed!');
      console.log('🧪 Stored values:', {
        android: stored.androidVersion,
        ios: stored.iosVersion,
        lastChecked: new Date(stored.lastChecked).toLocaleString(),
      });
    } else {
      console.log('🧪 ❌ Verification failed - No data stored!');
    }
    console.log('🧪 ═══════════════════════════════════════════\n');
  }

  /**
   * Get current stored version
   */
  static async getCurrentVersion() {
    console.log('\n🧪 ═══════════════════════════════════════════');
    console.log('🧪 [TEST UTIL] Get Current Version');
    console.log('🧪 ═══════════════════════════════════════════');
    console.log('🧪 Reading stored version from AsyncStorage...\n');

    const version = await VersionCheckService.getStoredVersion();

    if (version) {
      console.log('🧪 ✅ Version found in storage:');
      console.log('🧪 ├─ Android Version:', version.androidVersion);
      console.log('🧪 ├─ iOS Version:', version.iosVersion);
      console.log(
        '🧪 ├─ Last Checked:',
        new Date(version.lastChecked).toLocaleString(),
      );
      console.log('🧪 └─ Last Checked (ms):', version.lastChecked);
    } else {
      console.log('🧪 ⚠️ No version found in storage');
      console.log('🧪 This indicates first app launch or cleared data');
    }

    console.log('🧪 ═══════════════════════════════════════════\n');
    return version;
  }

  /**
   * Simulate version update scenario
   */
  static async simulateUpdate(
    oldVersion: string,
    newVersion: string,
    platform: 'android' | 'ios' = 'android',
  ) {
    console.log('\n🧪 ═══════════════════════════════════════════');
    console.log('🧪 [TEST UTIL] Simulate Update Scenario');
    console.log('🧪 ═══════════════════════════════════════════');
    console.log('🧪 Test Configuration:');
    console.log('🧪 ├─ Platform:', platform.toUpperCase());
    console.log('🧪 ├─ Old Version:', oldVersion);
    console.log('🧪 ├─ New Version:', newVersion);
    console.log('🧪 └─ Expected Result: Update should be needed');
    console.log('🧪\n');

    console.log('🧪 Step 1: Setting old version in storage...');
    // Set old version
    if (platform === 'android') {
      await this.setTestVersion(oldVersion, '1.0.0');
    } else {
      await this.setTestVersion('1.0.0', oldVersion);
    }

    console.log('\n🧪 Step 2: Simulating API call with new version...');
    console.log('🧪 Calling checkIfUpdateNeeded with new version...');

    // Check if update would be needed with new version
    const updateNeeded = await VersionCheckService.checkIfUpdateNeeded(
      platform === 'android' ? newVersion : '1.0.0',
      platform === 'ios' ? newVersion : '1.0.0',
    );

    console.log('\n🧪 ═══════════════════════════════════════════');
    console.log('🧪 TEST RESULT:');
    console.log('🧪 ═══════════════════════════════════════════');
    console.log('🧪 Update Needed?', updateNeeded);
    console.log('🧪 Expected: true');
    console.log('🧪 Result:', updateNeeded === true ? '✅ PASS' : '❌ FAIL');

    if (updateNeeded) {
      console.log('🧪\n✅ Test successful! Update modal should appear.');
    } else {
      console.log('🧪\n❌ Test failed! Update modal will not appear.');
      console.log('🧪 Possible reasons:');
      console.log('🧪 - Versions are the same');
      console.log('🧪 - Storage error occurred');
      console.log('🧪 - Platform mismatch');
    }

    console.log('🧪 ═══════════════════════════════════════════\n');
    return updateNeeded;
  }

  /**
   * Run comprehensive test suite
   */
  static async runFullTestSuite() {
    console.log('\n🧪🧪🧪 ═══════════════════════════════════════════');
    console.log('🧪🧪🧪 FULL VERSION CHECK TEST SUITE');
    console.log('🧪🧪🧪 ═══════════════════════════════════════════\n');

    console.log('🧪 Test 1: Check current state');
    await this.getCurrentVersion();

    console.log('\n🧪 Test 2: Clear version (first install)');
    await this.resetVersion();

    console.log('\n🧪 Test 3: Set version 1.0');
    await this.setTestVersion('1.0', '1.0');

    console.log('\n🧪 Test 4: Check for update (1.0 -> 2.0)');
    await this.simulateUpdate('1.0', '2.0', 'android');

    console.log('\n🧪 Test 5: Debug - List all AsyncStorage keys');
    await VersionCheckService.debugLogAllKeys();

    console.log('\n🧪🧪🧪 ═══════════════════════════════════════════');
    console.log('🧪🧪🧪 TEST SUITE COMPLETE');
    console.log('🧪🧪🧪 ═══════════════════════════════════════════\n');
  }

  /**
   * Quick test for current setup
   */
  static async quickTest() {
    console.log('\n🧪 ═══════════════════════════════════════════');
    console.log('🧪 QUICK TEST - Current Setup');
    console.log('🧪 ═══════════════════════════════════════════\n');

    console.log('🧪 Reading current stored version...');
    const current = await this.getCurrentVersion();

    console.log('\n🧪 All AsyncStorage keys:');
    await VersionCheckService.debugLogAllKeys();

    console.log('🧪 ═══════════════════════════════════════════\n');
    return current;
  }
}

export default VersionTestUtils;
