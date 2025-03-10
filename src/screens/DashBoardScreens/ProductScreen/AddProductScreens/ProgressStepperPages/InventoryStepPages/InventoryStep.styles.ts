import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import {BorderRadius, Spacing} from '../../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: Spacing.Small,
    marginBottom: Spacing.Medium,
    backgroundColor: ColorPalette.SearchBack,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: Spacing.Small,
    backgroundColor: ColorPalette.White,
    gap: Spacing.Medium,
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    gap: Spacing.XXSmall,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: Spacing.Medium,
  },
  sectionTitle: {
    color: ColorPalette.GREY_TEXT_500,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.Medium,
  },
  sectionItem: {
    flexDirection: 'column',
    backgroundColor: ColorPalette.White,
    paddingVertical: Spacing.Small,
    paddingHorizontal: Spacing.Medium,
    gap: Spacing.XXSmall,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  secondaryText: {
    color: ColorPalette.GREY_TEXT_300,
    marginRight: Spacing.Medium,
  },
  toggleContainer: {
    height: getScreenHeight(4),
    backgroundColor: ColorPalette.White,
    borderRadius: BorderRadius.Medium,
    gap: Spacing.XSmall,
  },
  toggleButton: {
    borderRadius: BorderRadius.Full,
    paddingVertical: Spacing.XSmall,
    paddingHorizontal: Spacing.XLarge,
    borderWidth: 1,
    borderColor: ColorPalette.GREY_TEXT_100,
  },
  toggleButtonText: {
    textAlign: 'center',
  },
  taxCheckContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: Spacing.Medium,
    paddingVertical: Spacing.Small,
    gap: Spacing.XSmall,
    backgroundColor: ColorPalette.White,
  },
  checkBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.Small,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.XXSmall,
    borderWidth: 1,
    borderColor: ColorPalette.GREY_200,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
