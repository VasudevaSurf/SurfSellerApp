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
    backgroundColor: ColorPalette.White,
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: getScreenHeight(15),
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
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: Spacing.Medium,
    backgroundColor: ColorPalette.White,
    marginBottom: getScreenHeight(2),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: getScreenHeight(2),
  },
  sectionTitle: {
    color: ColorPalette.GREY_TEXT_500,
  },
  infoIcon: {
    color: ColorPalette.GREY_TEXT_400,
    fontSize: 20,
  },
  inputsContainer: {
    gap: getScreenHeight(2),
  },
  countryContainer: {
    paddingVertical: getScreenHeight(1),
  },
  countryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 50, 106, 0.10)',
    borderRadius: BorderRadius.Small,
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: Spacing.Medium,
  },
  countryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.Small,
  },
  countryText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  lockIcon: {
    padding: Spacing.XXSmall,
  },
  deleteContainer: {
    paddingHorizontal: Spacing.Medium,
    paddingVertical: getScreenHeight(2),
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.Small,
    paddingVertical: getScreenHeight(1.5),
  },
  deleteText: {
    color: ColorPalette.RED_200,
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
});
