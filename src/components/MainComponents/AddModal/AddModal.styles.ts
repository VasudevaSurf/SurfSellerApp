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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
  },
  closeButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'column',
    gap: getFigmaDimension(12),
  },
});
