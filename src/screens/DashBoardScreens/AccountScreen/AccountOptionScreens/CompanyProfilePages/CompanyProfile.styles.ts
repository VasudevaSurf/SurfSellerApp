import {StyleSheet} from 'react-native';
import {
  getScreenWidth,
  getScreenHeight,
  getFigmaDimension,
} from '../../../../../helpers/screenSize';
import {ColorPalette} from '../../../../../config/colorPalette';

export const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ColorPalette.SearchBack,
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
    gap: getFigmaDimension(16),
    paddingVertical: getFigmaDimension(18),
    backgroundColor: ColorPalette.White,
  },
  inputBorder: {
    borderColor: ColorPalette.GREY_TEXT_400,
    borderWidth: 1,
  },
  imageContainer: {
    width: '100%',
    paddingHorizontal: getScreenWidth(4),
    marginTop: getFigmaDimension(10),
    marginBottom: getFigmaDimension(10),
  },
  customButton: {
    borderWidth: 1,
    borderColor: ColorPalette.PURPLE_300,
  },
  customText: {
    color: ColorPalette.GREY_TEXT_400,
  },
});
