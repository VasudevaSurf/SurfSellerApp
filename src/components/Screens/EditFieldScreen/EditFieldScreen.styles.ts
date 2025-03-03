import {StyleSheet} from 'react-native';
import {getScreenWidth, getScreenHeight} from '../../../helpers/screenSize';
import {ColorPalette} from '../../../config/colorPalette';
import {BorderRadius} from '../../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  mainContainerTwo: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenHeight(3),
    paddingVertical: getScreenHeight(2.25),
    backgroundColor: ColorPalette.White,
  },
  inputBorder: {
    borderColor: ColorPalette.GREY_TEXT_400,
    borderWidth: 1,
    borderRadius: BorderRadius.XSmall,
  },
  buttonContainer: {
    backgroundColor: ColorPalette.White,
    paddingVertical: getScreenHeight(2.5),
    paddingHorizontal: getScreenWidth(4),
    borderTopStartRadius: BorderRadius.Small,
    borderTopEndRadius: BorderRadius.Small,
  },
});
