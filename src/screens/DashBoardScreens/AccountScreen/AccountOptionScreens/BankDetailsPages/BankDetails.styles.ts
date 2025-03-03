import {StyleSheet} from 'react-native';
import {
  getScreenWidth,
  getScreenHeight,
} from '../../../../../helpers/screenSize';
import {ColorPalette} from '../../../../../config/colorPalette';
import {BorderRadius} from '../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    // Commented per original but kept for reference
    // paddingHorizontal: getScreenWidth(4),
    // paddingVertical: getScreenHeight(1),
    // marginTop: getScreenHeight(2),
  },
  scrollContent: {
    gap: getScreenWidth(4),
  },
  mainContainerTwo: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenHeight(2),
    paddingVertical: getScreenHeight(2.25),
    backgroundColor: ColorPalette.White,
  },
  inputBorder: {
    borderColor: ColorPalette.GREY_TEXT_400,
    borderWidth: 1,
  },
});
