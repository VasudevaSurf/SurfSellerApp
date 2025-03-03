import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenWidth, getScreenHeight} from '../../../helpers/screenSize';
import {BorderRadius, Spacing} from '../../../config/globalStyles';

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
    paddingHorizontal: getScreenWidth(4),
    gap: getScreenWidth(4),
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
    flexShrink: 1, // Prevents text overflow
  },
  closeButton: {
    width: getScreenWidth(6), // More responsive than fixed 24px
    height: getScreenWidth(6), // More responsive than fixed 24px
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'column',
    gap: getScreenWidth(3),
  },
});
