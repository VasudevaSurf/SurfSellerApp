import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {BorderRadius, Spacing} from '../../../config/globalStyles';

const ToggleButtons = ({
  initialActiveButton = '7days',
  leftButtonText = 'Last 7 days',
  rightButtonText = 'Monthly',
  leftButtonValue = '7days',
  rightButtonValue = 'monthly',
  onSelectionChange = () => {},
  containerStyle = {},
  buttonStyle = {},
  activeButtonStyle = {},
  textStyle = {},
  activeTextStyle = {},
  inactiveBackgroundColor = 'transparent',
  activeBackgroundColor = ColorPalette.PURPLE_300,
  inactiveTextColor = ColorPalette.AgreeTerms,
  activeTextColor = ColorPalette.White,
  typographyVariant = TypographyVariant.LXSMALL_REGULAR,
}) => {
  const [activeButton, setActiveButton] = useState(initialActiveButton);

  const handlePress = buttonValue => {
    setActiveButton(buttonValue);
    onSelectionChange(buttonValue);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: inactiveBackgroundColor},
          buttonStyle,
          activeButton === leftButtonValue && [
            styles.activeButton,
            {backgroundColor: activeBackgroundColor},
            activeButtonStyle,
          ],
        ]}
        onPress={() => handlePress(leftButtonValue)}>
        <Typography
          variant={typographyVariant}
          text={leftButtonText}
          customTextStyles={[
            styles.buttonText,
            {color: inactiveTextColor},
            textStyle,
            activeButton === leftButtonValue && [
              styles.activeButtonText,
              {color: activeTextColor},
              activeTextStyle,
            ],
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: inactiveBackgroundColor},
          buttonStyle,
          activeButton === rightButtonValue && [
            styles.activeButton,
            {backgroundColor: activeBackgroundColor},
            activeButtonStyle,
          ],
        ]}
        onPress={() => handlePress(rightButtonValue)}>
        <Typography
          variant={typographyVariant}
          text={rightButtonText}
          customTextStyles={[
            styles.buttonText,
            {color: inactiveTextColor},
            textStyle,
            activeButton === rightButtonValue && [
              styles.activeButtonText,
              {color: activeTextColor},
              activeTextStyle,
            ],
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
    paddingVertical: getScreenHeight(0.5),
    paddingHorizontal: getScreenWidth(2),
    borderRadius: BorderRadius.XSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {},
  buttonText: {
    fontSize: getScreenHeight(1.5),
    lineHeight: getScreenHeight(2),
  },
  activeButtonText: {},
});

export default ToggleButtons;
