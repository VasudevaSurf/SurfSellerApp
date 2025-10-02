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
    paddingBottom: getScreenHeight(4),
  },
  buttonContainer: {
    paddingBottom: Spacing.Medium,
  },
  addButton: {
    borderWidth: 1,
    borderColor: ColorPalette.PURPLE_300,
    borderRadius: BorderRadius.Medium,
  },
  addButtonText: {
    color: ColorPalette.PURPLE_300,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: getScreenWidth(5),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: getScreenWidth(5),
  },
});
