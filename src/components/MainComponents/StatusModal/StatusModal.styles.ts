import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {
  getFigmaDimension,
  getScreenHeight,
  getScreenWidth,
} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: ColorPalette.White,
    borderTopLeftRadius: getFigmaDimension(8),
    borderTopRightRadius: getFigmaDimension(8),
  },
  searchContainer: {
    padding: getScreenWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorPalette.White,
  },
  contentContainer: {
    paddingTop: getScreenHeight(1),
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: getScreenWidth(5),
    paddingVertical: getScreenHeight(2),
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
    marginLeft: getScreenWidth(2),
  },
  scrollContainer: {
    flexGrow: 0,
  },
  sectionContainer: {
    paddingHorizontal: getScreenWidth(5),
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getScreenHeight(1.5),
    gap: getScreenWidth(3),
  },
  radioButton: {
    width: getScreenWidth(6),
    height: getScreenWidth(6),
    borderRadius: getScreenWidth(3),
    borderWidth: getScreenWidth(0.5),
    borderColor: ColorPalette.GREY_200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: ColorPalette.PURPLE_300,
    backgroundColor: ColorPalette.White,
  },
  radioButtonInner: {
    width: getScreenWidth(2.5),
    height: getScreenWidth(2.5),
    borderRadius: getScreenWidth(1.25),
    backgroundColor: ColorPalette.PURPLE_300,
  },
  optionLabel: {
    flex: 1,
    fontSize: getScreenWidth(4),
    lineHeight: getScreenHeight(3),
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
    padding: getScreenWidth(5),
    borderTopWidth: 1,
    borderColor: ColorPalette.GREY_200,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: ColorPalette.GREY_200,
  },
  checkboxSelected: {
    borderColor: ColorPalette.PURPLE_300,
    backgroundColor: ColorPalette.PURPLE_300,
  },
});
