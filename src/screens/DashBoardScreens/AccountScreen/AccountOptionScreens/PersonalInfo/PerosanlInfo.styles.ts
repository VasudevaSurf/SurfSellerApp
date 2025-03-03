import {StyleSheet} from 'react-native';
import {
  getScreenWidth,
  getScreenHeight,
} from '../../../../../helpers/screenSize';
import {ColorPalette} from '../../../../../config/colorPalette';
import {Spacing, BorderRadius} from '../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    // Using Spacing enum for consistent padding
    // paddingHorizontal: Spacing.Small,
    // paddingVertical: getScreenHeight(1),
    // marginTop: getScreenHeight(2),
  },
  scrollContent: {
    // Using Spacing enum for gap
    gap: Spacing.Small,
  },
  mainContainerTwo: {
    display: 'flex',
    flexDirection: 'column',
    // Using Spacing for gap
    gap: Spacing.Medium,
    // Using getScreenHeight for vertical padding
    paddingVertical: getScreenHeight(2),
    backgroundColor: ColorPalette.White,
  },
  inputBorder: {
    borderColor: ColorPalette.GREY_TEXT_400,
    borderWidth: 1,
    // Adding border radius using the enum
    borderRadius: BorderRadius.XSmall,
  },
});
