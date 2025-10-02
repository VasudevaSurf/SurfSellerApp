import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../../config/colorPalette';
import {BorderRadius, Spacing} from '../../../../../config/globalStyles';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.SearchBack,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: Spacing.Medium,
  },
  scrollContent: {
    paddingTop: getScreenHeight(2),
    paddingBottom: getScreenHeight(12),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: ColorPalette.White,
    paddingHorizontal: Spacing.Medium,
    paddingTop: Spacing.Medium,
    paddingBottom: getScreenHeight(4),
    borderTopLeftRadius: BorderRadius.Medium,
    borderTopRightRadius: BorderRadius.Medium,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButton: {
    borderWidth: 1,
    borderColor: ColorPalette.PURPLE_300,
    borderRadius: BorderRadius.Medium,
  },
  addButtonText: {
    color: ColorPalette.PURPLE_300,
  },
});
