import {StyleSheet} from 'react-native';
import {
  getFigmaDimension,
  getScreenWidth,
} from '../../../../helpers/screenSize';
import {ColorPalette} from '../../../../config/colorPalette';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: ColorPalette.White,
    paddingVertical: getFigmaDimension(11),
    paddingHorizontal: getFigmaDimension(18),
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: getFigmaDimension(16),
  },
});
