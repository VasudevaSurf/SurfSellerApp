// src/screens/VersionDebugScreen.tsx
// Optional: Add this to your Account settings for easy testing

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import VersionTestUtils from '../utils/versionTestUtils';
import VersionCheckService from '../utils/versionCheck';
import {ColorPalette} from '../config/colorPalette';

const VersionDebugScreen = () => {
  const [currentVersion, setCurrentVersion] = useState<any>(null);
  const {data: initializerData} = useSelector(
    (state: RootState) => state.initializer,
  );

  const handleGetCurrentVersion = async () => {
    console.log('\n📱 User Action: Get Current Version');
    const version = await VersionTestUtils.getCurrentVersion();
    setCurrentVersion(version);

    Alert.alert(
      'Current Version',
      version
        ? `Android: ${version.androidVersion}\niOS: ${version.iosVersion}`
        : 'No version stored',
    );
  };

  const handleResetVersion = async () => {
    console.log('\n📱 User Action: Reset Version');
    await VersionTestUtils.resetVersion();
    setCurrentVersion(null);
    Alert.alert(
      'Success',
      'Version data cleared! Next launch will be like first install.',
    );
  };

  const handleSetTestVersion = async () => {
    console.log('\n📱 User Action: Set Test Version');
    await VersionTestUtils.setTestVersion('1.0', '1.0');
    Alert.alert('Success', 'Test version 1.0 set in storage');
  };

  const handleSimulateUpdate = async () => {
    console.log('\n📱 User Action: Simulate Update');
    const updateNeeded = await VersionTestUtils.simulateUpdate(
      '1.0',
      '2.0',
      'android',
    );

    Alert.alert(
      'Simulation Result',
      updateNeeded
        ? '✅ Update would be shown (versions differ)'
        : '❌ Update would NOT be shown (versions match)',
    );
  };

  const handleRunFullTest = async () => {
    console.log('\n📱 User Action: Run Full Test Suite');
    Alert.alert('Test Suite', 'Running full test suite. Check console logs!');
    await VersionTestUtils.runFullTestSuite();
    Alert.alert('Complete', 'Test suite finished! Check console for results.');
  };

  const handleDebugAllKeys = async () => {
    console.log('\n📱 User Action: Debug All Keys');
    await VersionCheckService.debugLogAllKeys();
    Alert.alert('Debug', 'AsyncStorage keys logged to console');
  };

  const handleForceCheck = async () => {
    console.log('\n📱 User Action: Force Version Check');

    if (!initializerData?.app_update_config) {
      Alert.alert('Error', 'No initializer data available');
      return;
    }

    const {android_version, ios_version} = initializerData.app_update_config;
    const updateNeeded = await VersionCheckService.checkIfUpdateNeeded(
      android_version,
      ios_version,
    );

    Alert.alert(
      'Force Check Result',
      updateNeeded ? '✅ Update modal will appear' : '❌ No update needed',
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔧 Version Check Debug</Text>
        <Text style={styles.subtitle}>Test version update functionality</Text>
      </View>

      {/* Current State Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Current State</Text>

        {currentVersion ? (
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Android Version:</Text>
            <Text style={styles.infoValue}>
              {currentVersion.androidVersion}
            </Text>

            <Text style={styles.infoLabel}>iOS Version:</Text>
            <Text style={styles.infoValue}>{currentVersion.iosVersion}</Text>

            <Text style={styles.infoLabel}>Last Checked:</Text>
            <Text style={styles.infoValue}>
              {new Date(currentVersion.lastChecked).toLocaleString()}
            </Text>
          </View>
        ) : (
          <Text style={styles.noData}>No version data loaded</Text>
        )}

        {initializerData?.app_update_config && (
          <View style={[styles.infoBox, {marginTop: 10}]}>
            <Text style={styles.infoLabel}>API Android Version:</Text>
            <Text style={styles.infoValue}>
              {initializerData.app_update_config.android_version}
            </Text>

            <Text style={styles.infoLabel}>API iOS Version:</Text>
            <Text style={styles.infoValue}>
              {initializerData.app_update_config.ios_version}
            </Text>

            <Text style={styles.infoLabel}>Update Required:</Text>
            <Text style={styles.infoValue}>
              {initializerData.app_update_config.is_app_update_required
                ? 'Yes'
                : 'No'}
            </Text>
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Quick Actions</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleGetCurrentVersion}>
          <Text style={styles.buttonText}>📖 Get Current Version</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonWarning]}
          onPress={handleResetVersion}>
          <Text style={styles.buttonText}>
            🗑️ Reset Version (Clear Storage)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleForceCheck}>
          <Text style={styles.buttonText}>🔄 Force Version Check</Text>
        </TouchableOpacity>
      </View>

      {/* Test Scenarios */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧪 Test Scenarios</Text>

        <TouchableOpacity
          style={[styles.button, styles.buttonTest]}
          onPress={handleSetTestVersion}>
          <Text style={styles.buttonText}>Set Test Version (1.0)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonTest]}
          onPress={handleSimulateUpdate}>
          <Text style={styles.buttonText}>Simulate Update (1.0 → 2.0)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonTest]}
          onPress={handleRunFullTest}>
          <Text style={styles.buttonText}>🧪 Run Full Test Suite</Text>
        </TouchableOpacity>
      </View>

      {/* Debug Tools */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🐛 Debug Tools</Text>

        <TouchableOpacity
          style={[styles.button, styles.buttonDebug]}
          onPress={handleDebugAllKeys}>
          <Text style={styles.buttonText}>📋 Log All Storage Keys</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 All actions log detailed information to console
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: ColorPalette.PURPLE_300,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  section: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: ColorPalette.GREY_TEXT_800,
    marginBottom: 15,
  },
  infoBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: ColorPalette.PURPLE_300,
  },
  infoLabel: {
    fontSize: 12,
    color: ColorPalette.GREY_TEXT_600,
    marginTop: 8,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: ColorPalette.GREY_TEXT_800,
    marginBottom: 4,
  },
  noData: {
    fontSize: 14,
    color: ColorPalette.GREY_TEXT_500,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: ColorPalette.PURPLE_300,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonWarning: {
    backgroundColor: '#ff6b6b',
  },
  buttonTest: {
    backgroundColor: '#4dabf7',
  },
  buttonDebug: {
    backgroundColor: '#868e96',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: ColorPalette.GREY_TEXT_600,
    textAlign: 'center',
  },
});

export default VersionDebugScreen;
