import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {getFigmaDimension} from '../../../helpers/screenSize';

const ToggleButtons = () => {
  const [activeButton, setActiveButton] = useState('7days');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, activeButton === '7days' && styles.activeButton]}
        onPress={() => setActiveButton('7days')}>
        <Typography
          variant={TypographyVariant.BODY_SMALL}
          text="Last 7 days"
          customTextStyles={[
            styles.buttonText,
            activeButton === '7days' && styles.activeButtonText,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          activeButton === 'monthly' && styles.activeButton,
        ]}
        onPress={() => setActiveButton('monthly')}>
        <Typography
          variant={TypographyVariant.BODY_SMALL}
          text="Monthly"
          customTextStyles={[
            styles.buttonText,
            activeButton === 'monthly' && styles.activeButtonText,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingVertical: getFigmaDimension(4),
    paddingHorizontal: getFigmaDimension(8),
    borderRadius: getFigmaDimension(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: ColorPalette.ButtonPrimary,
  },
  buttonText: {
    color: ColorPalette.TextSecondary,
    fontSize: getFigmaDimension(12),
    lineHeight: getFigmaDimension(16),
  },
  activeButtonText: {
    color: ColorPalette.BackgroundPrimary,
  },
});

export default ToggleButtons;
