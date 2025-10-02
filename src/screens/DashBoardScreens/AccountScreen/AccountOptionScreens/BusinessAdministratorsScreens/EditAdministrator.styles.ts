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
  },
  mainContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  scrollContent: {
    paddingTop: getScreenHeight(2),
    gap: Spacing.Small,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.Medium,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.Medium,
  },
  section: {
    backgroundColor: ColorPalette.White,
    marginBottom: getScreenHeight(3),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: ColorPalette.GREY_TEXT_500,
    marginTop: getScreenHeight(3),
    paddingHorizontal: getScreenHeight(2),
  },
  infoIcon: {
    color: ColorPalette.GREY_TEXT_400,
    fontSize: 20,
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    // Using Spacing for gap
    gap: Spacing.Medium,
    // Using getScreenHeight for vertical padding
    backgroundColor: ColorPalette.White,
    paddingVertical: getScreenHeight(2),
  },
  buttonContainer: {
    backgroundColor: ColorPalette.White,
    paddingVertical: getScreenHeight(2.5),
    paddingHorizontal: getScreenWidth(4),
    borderTopStartRadius: BorderRadius.Small,
    borderTopEndRadius: BorderRadius.Small,
  },
});
