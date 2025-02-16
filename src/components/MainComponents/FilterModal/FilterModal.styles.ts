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
  contentContainer: {
    paddingTop: getScreenHeight(0.02),
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    padding: getFigmaDimension(16),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    color: ColorPalette.GREY_TEXT_500,
  },
  subtitle: {
    color: ColorPalette.GREY_TEXT_300,
  },
  sectionContainer: {
    paddingVertical: getFigmaDimension(8),
    paddingHorizontal: getFigmaDimension(16),
    gap: getFigmaDimension(20),
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getFigmaDimension(12),
  },
  uncheckedBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: ColorPalette.GREY_200,
  },
  optionLabel: {
    marginLeft: getScreenWidth(0.03),
    color: ColorPalette.GREY_TEXT_300,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    padding: getFigmaDimension(16),
    gap: getFigmaDimension(8),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customButton: {
    width: getFigmaDimension(190),
    borderWidth: 1,
  },
  customButtonTwo: {
    width: getFigmaDimension(190),
  },
});
