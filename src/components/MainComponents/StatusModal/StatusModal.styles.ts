import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {BorderRadius} from '../../../config/globalStyles';

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: ColorPalette.White,
    borderTopLeftRadius: BorderRadius.XSmall, // Using enum instead of getFigmaDimension(8)
    borderTopRightRadius: BorderRadius.XSmall, // Using enum instead of getFigmaDimension(8)
  },
  searchContainer: {
    padding: getScreenWidth(4), // Already using getScreenWidth
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorPalette.White,
  },
  contentContainer: {
    paddingTop: getScreenHeight(1), // Already using getScreenHeight
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: getScreenWidth(5), // Already using getScreenWidth
    paddingVertical: getScreenHeight(2), // Already using getScreenHeight
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
  },
  heading: {
    color: ColorPalette.GREY_TEXT_500,
  },
  closeButton: {
    marginLeft: getScreenWidth(2), // Already using getScreenWidth
  },
  scrollContainer: {
    flexGrow: 0,
  },
  sectionContainer: {
    paddingHorizontal: getScreenWidth(5), // Already using getScreenWidth
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getScreenHeight(1.5), // Already using getScreenHeight
    gap: getScreenWidth(3), // Already using getScreenWidth
  },
  radioButton: {
    width: getScreenWidth(6), // Already using getScreenWidth
    height: getScreenWidth(6), // Already using getScreenWidth
    borderRadius: getScreenWidth(3), // Already using getScreenWidth
    borderWidth: getScreenWidth(0.5), // Already using getScreenWidth
    borderColor: ColorPalette.GREY_200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: ColorPalette.PURPLE_300,
    backgroundColor: ColorPalette.White,
  },
  radioButtonInner: {
    width: getScreenWidth(2.5), // Already using getScreenWidth
    height: getScreenWidth(2.5), // Already using getScreenWidth
    borderRadius: getScreenWidth(1.25), // Already using getScreenWidth
    backgroundColor: ColorPalette.PURPLE_300,
  },
  optionLabel: {
    flex: 1,
    fontSize: getScreenWidth(4), // Already using getScreenWidth
    lineHeight: getScreenHeight(3), // Already using getScreenHeight
  },
  optionLabelSelected: {
    color: ColorPalette.GREY_TEXT_500,
    fontWeight: '500',
  },
  optionLabelUnselected: {
    color: ColorPalette.GREY_TEXT_300,
    fontWeight: '400',
  },
  footer: {
    padding: getScreenWidth(5), // Already using getScreenWidth
    borderTopWidth: 1,
    borderColor: ColorPalette.GREY_200,
  },
  checkbox: {
    width: getScreenWidth(6), // Updated from fixed 24px
    height: getScreenWidth(6), // Updated from fixed 24px
    borderRadius: BorderRadius.XXSmall, // Using enum instead of fixed 4px
    borderWidth: 1,
    borderColor: ColorPalette.GREY_200,
  },
  checkboxSelected: {
    borderColor: ColorPalette.PURPLE_300,
    backgroundColor: ColorPalette.PURPLE_300,
  },
});
