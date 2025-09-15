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
    paddingBottom: getScreenHeight(8),
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
    // gap: Spacing.XXSmall,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: Spacing.Medium,
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
    marginTop: Spacing.Small,
  },
  toggleButton: {
    borderRadius: BorderRadius.Full,
    paddingVertical: Spacing.XSmall,
    paddingHorizontal: Spacing.XXLarge,
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
  sectionHeaderDiscount: {
    display: 'flex',
    flexDirection: 'row',
    gap: Spacing.XXSmall,
    alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  customButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: ColorPalette.GREY_200,
    height: getScreenHeight(7),
    borderRadius: BorderRadius.Medium,
  },
  customText: {
    color: ColorPalette.GREY_TEXT_100,
  },
});
