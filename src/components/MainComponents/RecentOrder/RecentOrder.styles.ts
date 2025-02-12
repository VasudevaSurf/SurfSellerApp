import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {getFigmaDimension} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: ColorPalette.White,
    paddingVertical: getFigmaDimension(16),
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.Divider,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  containerOne: {
    display: 'flex',
    flexDirection: 'row',
    gap: getFigmaDimension(8),
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: getFigmaDimension(4),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(4),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  seperateContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderIdText: {
    color: ColorPalette.TextSecondary,
  },
  amountText: {
    color: ColorPalette.TextPrimary,
  },
  customerRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getFigmaDimension(4),
  },
  separatorDot: {
    width: 1,
    height: 10,
    borderRadius: 1,
    backgroundColor: ColorPalette.TextName,
    marginHorizontal: 8,
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getFigmaDimension(40),
    paddingVertical: getFigmaDimension(4),
    paddingHorizontal: getFigmaDimension(12),
  },
  statusText: {
    color: ColorPalette.Warning500,
  },
});
