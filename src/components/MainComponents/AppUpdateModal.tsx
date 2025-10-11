// src/components/AppUpdateModal/AppUpdateModal.tsx

import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import {ColorPalette} from '../../config/colorPalette';

interface AppUpdateModalProps {
  visible: boolean;
  onUpdate: () => void;
  appName?: string;
}

const AppUpdateModal: React.FC<AppUpdateModalProps> = ({
  visible,
  onUpdate,
  appName = 'Surf Seller',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Icon/Image Section */}
          <View style={styles.iconContainer}>
            <View style={styles.updateIcon}>
              <Text style={styles.updateIconText}>⬆️</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Update Available</Text>

          {/* Message */}
          <Text style={styles.message}>
            A new version of {appName} is available. Please update to continue
            using the app with the latest features and improvements.
          </Text>

          {/* Version Info */}
          <View style={styles.versionInfo}>
            <Text style={styles.versionLabel}>Platform:</Text>
            <Text style={styles.versionValue}>
              {Platform.OS === 'android' ? 'Android' : 'iOS'}
            </Text>
          </View>

          {/* Update Button */}
          <TouchableOpacity
            style={styles.updateButton}
            onPress={onUpdate}
            activeOpacity={0.8}>
            <Text style={styles.updateButtonText}>Update Now</Text>
          </TouchableOpacity>

          {/* Info Text */}
          <Text style={styles.infoText}>
            You'll be redirected to the{' '}
            {Platform.OS === 'android' ? 'Play Store' : 'App Store'}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    width: width * 0.85,
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    marginBottom: 20,
  },
  updateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: ColorPalette.PURPLE_300 + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateIconText: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: ColorPalette.GREY_TEXT_800,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: ColorPalette.GREY_TEXT_600,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  versionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: ColorPalette.GREY_TEXT_100,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
  },
  versionLabel: {
    fontSize: 14,
    color: ColorPalette.GREY_TEXT_600,
    marginRight: 8,
  },
  versionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: ColorPalette.GREY_TEXT_800,
  },
  updateButton: {
    backgroundColor: ColorPalette.PURPLE_300,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: ColorPalette.PURPLE_300,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  infoText: {
    fontSize: 12,
    color: ColorPalette.GREY_TEXT_500,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default AppUpdateModal;
