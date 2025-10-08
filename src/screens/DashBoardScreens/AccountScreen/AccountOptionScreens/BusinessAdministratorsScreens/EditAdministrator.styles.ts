import { StyleSheet } from 'react-native';
import { ColorPalette } from '../../../../../config/colorPalette';
import { BorderRadius, Spacing } from '../../../../../config/globalStyles';
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
    paddingTop: getScreenHeight(1.2),
    gap: getScreenHeight(1.2),
    paddingBottom: getScreenHeight(4),
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
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(1),
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: getScreenWidth(4),
    marginTop: getScreenHeight(3),
  },
  sectionTitle: {
    color: ColorPalette.GREY_TEXT_500,
  },
  infoIcon: {
    color: ColorPalette.GREY_TEXT_400,
    fontSize: 20,
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.Medium,
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
  // Role Section
  roleContainer: {
    paddingHorizontal: getScreenHeight(2),
    paddingVertical: getScreenHeight(2),
    backgroundColor: ColorPalette.White,
  },
  slidingBarContainer: {
    backgroundColor: 'transparent',
  },
  // Permissions Section
  permissionsContainer: {
    paddingHorizontal: getScreenHeight(2),
    paddingVertical: getScreenHeight(2),
    backgroundColor: ColorPalette.White,
    gap: Spacing.Medium,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getScreenHeight(1),
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: ColorPalette.GREY_TEXT_400,
    borderRadius: 4,
    marginRight: Spacing.Medium,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorPalette.White,
  },
  checkboxChecked: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  checkmark: {
    color: ColorPalette.White,
    fontSize: 16,
  },
  permissionLabel: {
    color: ColorPalette.GREY_TEXT_500,
    flex: 1,
  },
});
