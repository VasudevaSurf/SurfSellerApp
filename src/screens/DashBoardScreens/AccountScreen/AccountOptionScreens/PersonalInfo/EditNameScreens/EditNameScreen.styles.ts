import {StyleSheet} from 'react-native';
import {
  getScreenWidth,
  getScreenHeight,
  getFigmaDimension,
} from '../../../../../../helpers/screenSize';
import {ColorPalette} from '../../../../../../config/colorPalette';

export const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    // paddingHorizontal: getScreenWidth(4),
    // paddingVertical: getScreenHeight(1),
    // marginTop: getScreenHeight(2),
  },
  scrollContent: {
    flexGrow: 1, // Makes content fill available space
    justifyContent: 'space-between', // Pushes content to top and button to bottom
    gap: getScreenWidth(4),
  },
  mainContainerTwo: {
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(24),
    paddingVertical: getFigmaDimension(18),
    backgroundColor: ColorPalette.White,
  },
  inputBorder: {
    borderColor: ColorPalette.GREY_TEXT_400,
    borderWidth: 1,
  },
  buttonContainer: {
    paddingVertical: getFigmaDimension(20),
    paddingHorizontal: getFigmaDimension(16),
    backgroundColor: ColorPalette.White,
    borderTopEndRadius: getFigmaDimension(12),
    borderTopStartRadius: getFigmaDimension(12),
    marginTop: 'auto',
  },
});
