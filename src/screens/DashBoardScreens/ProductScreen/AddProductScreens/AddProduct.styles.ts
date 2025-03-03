import {StyleSheet} from 'react-native';
import {getScreenWidth, getScreenHeight} from '../../../../helpers/screenSize';
import {ColorPalette} from '../../../../config/colorPalette';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    padding: getScreenWidth(4),
    backgroundColor: ColorPalette.White,
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4.5),
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: getScreenHeight(2),
  },
});
