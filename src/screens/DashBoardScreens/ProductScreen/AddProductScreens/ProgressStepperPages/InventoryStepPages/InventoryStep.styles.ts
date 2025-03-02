import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {getFigmaDimension} from '../../../../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: getFigmaDimension(12),
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: getFigmaDimension(12),
    backgroundColor: ColorPalette.White,
    gap: getFigmaDimension(16),
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    gap: getFigmaDimension(4),
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: getFigmaDimension(16),
  },
  sectionTitle: {
    color: ColorPalette.GREY_TEXT_500,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(16),
  },
  sectionItem: {
    flexDirection: 'column',
    backgroundColor: ColorPalette.White,
    paddingVertical: getFigmaDimension(12),
    paddingHorizontal: getFigmaDimension(16),
    gap: getFigmaDimension(6),
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
    marginRight: getFigmaDimension(20),
  },
  toggleContainer: {
    height: getFigmaDimension(32),
    backgroundColor: ColorPalette.White,
    borderRadius: getFigmaDimension(16),
    gap: getFigmaDimension(10),
  },
  toggleButton: {
    borderRadius: getFigmaDimension(48),
    paddingVertical: getFigmaDimension(8),
    paddingHorizontal: getFigmaDimension(24),
    borderWidth: 1,
    borderColor: ColorPalette.toggleBorder,
  },
  toggleButtonText: {
    textAlign: 'center',
  },
  taxCheckContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: getFigmaDimension(16),
    paddingVertical: getFigmaDimension(12),
    gap: getFigmaDimension(8),
    backgroundColor: ColorPalette.White,
  },
  checkBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getFigmaDimension(12),
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: getFigmaDimension(4),
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
