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
    gap: getScreenHeight(2),
    paddingVertical: getScreenHeight(2),
    backgroundColor: ColorPalette.White,
  },
  inputBorder: {
    borderColor: ColorPalette.GREY_TEXT_400,
    borderWidth: 1,
    borderRadius: BorderRadius.XSmall,
  },
  imageContainer: {
    width: '100%',
    paddingHorizontal: getScreenWidth(4),
    marginTop: getScreenHeight(1.25),
    marginBottom: getScreenHeight(1.25),
  },
  customButton: {
    borderWidth: 1,
    borderColor: ColorPalette.PURPLE_300,
    borderRadius: BorderRadius.Small,
  },
  customText: {
    color: ColorPalette.GREY_TEXT_400,
  },
});
