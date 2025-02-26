import {StyleSheet} from 'react-native';
import {
  getFigmaDimension,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import {ColorPalette} from '../../../../../../config/colorPalette';

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
    gap: getFigmaDimension(24),
    paddingVertical: getFigmaDimension(18),
    backgroundColor: ColorPalette.White,
  },
  inputBorder: {
    borderColor: ColorPalette.GREY_TEXT_400,
    borderWidth: 1,
  },
  buttonContainer: {
    backgroundColor: ColorPalette.White,
    padding: getFigmaDimension(16),
    borderTopStartRadius: getFigmaDimension(12),
    borderTopEndRadius: getFigmaDimension(12),
    gap: getFigmaDimension(8),
  },
  mainInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(16),
    backgroundColor: ColorPalette.White,
    paddingVertical: getFigmaDimension(12),
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: getFigmaDimension(4),
    paddingHorizontal: getFigmaDimension(16),
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(16),
  },
});
