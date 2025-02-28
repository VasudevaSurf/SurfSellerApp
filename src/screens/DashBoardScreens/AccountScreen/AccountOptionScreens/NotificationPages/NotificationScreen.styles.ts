import {StyleSheet} from 'react-native';
import {
  getFigmaDimension,
  getScreenWidth,
  getScreenHeight,
} from '../../../../../helpers/screenSize';
import {ColorPalette} from '../../../../../config/colorPalette';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mainContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: getFigmaDimension(12),
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ColorPalette.White,
    paddingVertical: getFigmaDimension(12),
    paddingHorizontal: getFigmaDimension(16),
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
    gap: getFigmaDimension(3),
  },
  primaryText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  secondaryText: {
    color: ColorPalette.GREY_TEXT_300,
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
    fontSize: getFigmaDimension(12),
    fontWeight: '500',
    textAlign: 'center',
  },
  mainInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ColorPalette.White,
    paddingVertical: getFigmaDimension(12),
    paddingHorizontal: getFigmaDimension(16),
  },
});
