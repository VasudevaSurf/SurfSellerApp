import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {BorderRadius, Spacing} from '../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: ColorPalette.White,
    borderTopLeftRadius: BorderRadius.Small,
    borderTopRightRadius: BorderRadius.Small,
    paddingVertical: getScreenHeight(2.5),
    gap: getScreenWidth(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getScreenWidth(4),
  },
  headerContent: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  headerText: {
    textAlign: 'center',
    flexShrink: 1,
    color: ColorPalette.GREY_TEXT_500,
  },
  closeButton: {
    width: getScreenWidth(6),
    height: getScreenWidth(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    gap: getScreenHeight(1.5),
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
  },
  section: {
    gap: getScreenHeight(1.5),
    borderWidth: 2,
    borderColor: ColorPalette.SearchBack,
    borderRadius: BorderRadius.Small,
    paddingVertical: getScreenHeight(2),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getScreenWidth(4),
    gap: getScreenWidth(2), // Add gap between text and icon
  },
  sectionTitle: {
    color: ColorPalette.GREY_TEXT_400,
    marginBottom: 0, // Remove the margin since we're using flexDirection: 'row'
    marginLeft: 0,
    // Remove flex: 1 to allow text to take only needed space
  },
  inputGroup: {
    gap: getScreenHeight(1.5),
  },
  textInputFocused: {
    borderColor: ColorPalette.PURPLE_300,
    borderWidth: 2,
  },
  rangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rangeInput: {
    flex: 1,
    paddingHorizontal: getScreenWidth(4),
  },
  rangeInputContainer: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#F3F4F6',
    overflow: 'visible',
  },
  rangeInputFocused: {
    borderColor: ColorPalette.PURPLE_300,
    borderWidth: 2,
  },
  rangeSeparator: {
    color: ColorPalette.GREY_TEXT_300,
  },
  dropdownContainer: {
    borderRadius: 12,
    borderColor: '#F3F4F6',
    borderTopColor: ColorPalette.GREY_100,
    paddingHorizontal: getScreenWidth(4),
  },
  footer: {
    flexDirection: 'row',
    gap: getScreenWidth(3),
    borderTopWidth: 1,
    borderColor: ColorPalette.GREY_200,
    paddingTop: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
  },
  button: {
    flex: 1,
  },
  clearButton: {
    borderWidth: 1,
    borderColor: ColorPalette.PURPLE_300,
  },
});
