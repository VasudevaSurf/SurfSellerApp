import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {getFigmaDimension} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: ColorPalette.White,
    borderTopLeftRadius: getFigmaDimension(12),
    borderTopRightRadius: getFigmaDimension(12),
    paddingVertical: getFigmaDimension(20),
    paddingHorizontal: getFigmaDimension(16),
    gap: getFigmaDimension(16),
  },
  header: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  headerContent: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    marginBottom: 4,
    color: ColorPalette.TextPrimary,
  },
  subtitle: {
    color: ColorPalette.TextSecondary,
  },
  closeButton: {
    padding: 4,
  },
  footer: {
    flexDirection: 'column',
    gap: 12,
  },
  customButton: {
    color: ColorPalette.ButtonPrimary,
    fontWeight: 'bold',
  },
});
