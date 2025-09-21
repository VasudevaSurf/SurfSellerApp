import {StyleSheet} from 'react-native';
import {
  getScreenWidth,
  getScreenHeight,
} from '../../../../../helpers/screenSize';
import {ColorPalette} from '../../../../../config/colorPalette';
import {Spacing, BorderRadius} from '../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    // Using Spacing enum for consistent padding
    // paddingHorizontal: Spacing.Small,
    // paddingVertical: getScreenHeight(1),
    // marginTop: getScreenHeight(2),
  },
  scrollContent: {
    // Using Spacing enum for gap
    gap: Spacing.Small,
  },
  mainContainerTwo: {
    display: 'flex',
    flexDirection: 'column',
    // Using Spacing for gap
    gap: Spacing.Medium,
    // Using getScreenHeight for vertical padding
    backgroundColor: ColorPalette.White,
  },
  mainContainerTwo1: {
    display: 'flex',
    flexDirection: 'column',
    // Using Spacing for gap
    gap: Spacing.Medium,
    // Using getScreenHeight for vertical padding
    backgroundColor: ColorPalette.White,
    paddingVertical: getScreenHeight(2),
  },
  inputBorder: {
    borderColor: ColorPalette.GREY_TEXT_400,
    borderWidth: 1,
    // Adding border radius using the enum
    borderRadius: BorderRadius.XSmall,
  },
  taxCheckContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: Spacing.Medium,
    paddingVertical: Spacing.Medium,
    gap: Spacing.XSmall,
    backgroundColor: ColorPalette.White,
  },
  taxCheckContainer1: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: Spacing.Medium,
    paddingVertical: Spacing.Medium,
    gap: Spacing.XSmall,
    backgroundColor: ColorPalette.White,
    marginBottom: getScreenHeight(2),
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
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: ColorPalette.GREY_300, // default border color
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#9101CF',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: BorderRadius.XSmall,
    paddingVertical: getScreenHeight(0.75),
    paddingHorizontal: getScreenWidth(3),
    borderColor: ColorPalette.SearchBack,
  },
  toolbarIcons: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbarIconsScrollView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerStyle: {
    backgroundColor: ColorPalette.SearchBack,
    paddingVertical: getScreenHeight(0.75),
    paddingHorizontal: getScreenWidth(2),
    borderRadius: BorderRadius.XSmall,
  },
  textAreaContainer: {
    borderRadius: BorderRadius.XSmall,
    borderWidth: 1,
    borderColor: ColorPalette.SearchBack,
    paddingHorizontal: getScreenWidth(3),
    paddingVertical: getScreenHeight(1),
    minHeight: getScreenHeight(40),
  },
  textAreaContainerFocused: {
    borderColor: ColorPalette.Primary,
  },
  textArea: {
    flex: 1,
    minHeight: getScreenHeight(12.5),
    fontFamily: 'Inter-Regular',
    fontSize: getScreenWidth(3.5), // Responsive font size
    color: ColorPalette.GREY_TEXT_500,
    padding: 0,
  },
  boldText: {
    fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  activeFormatButton: {
    borderRadius: getScreenWidth(1),
    padding: getScreenWidth(0.5),
  },
  formatButton: {
    height: getScreenWidth(7),
    width: getScreenWidth(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    paddingHorizontal: getScreenWidth(4),
    marginTop: getScreenHeight(1.25),
    marginBottom: getScreenHeight(1.25),
    backgroundColor: ColorPalette.White,
    paddingVertical: getScreenHeight(1.5),
  },
  customButton: {
    borderWidth: 1,
    borderColor: ColorPalette.PURPLE_300,
    borderRadius: BorderRadius.Small,
  },
  customText: {
    color: ColorPalette.GREY_TEXT_400,
  },
});
