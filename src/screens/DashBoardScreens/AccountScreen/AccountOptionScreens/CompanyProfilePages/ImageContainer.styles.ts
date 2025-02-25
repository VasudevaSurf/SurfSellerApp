import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../../config/colorPalette';
import {
  getFigmaDimension,
  getScreenWidth,
} from '../../../../../helpers/screenSize';

export const containerStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getScreenWidth(4),
    marginBottom: getFigmaDimension(12),
  },
  logoContainer: {
    alignItems: 'center',
    width: '45%',
    gap: getFigmaDimension(6),
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: getFigmaDimension(8),
  },
  image: {
    width: getFigmaDimension(80),
    height: getFigmaDimension(80),
    borderRadius: getScreenWidth(35) / 2,
  },
  invoiceImage: {
    backgroundColor: '#f0e6ff',
  },
  editButton: {
    height: getFigmaDimension(20),
    width: getFigmaDimension(20),
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    color: ColorPalette.GREY_TEXT_500,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: getFigmaDimension(100),
    backgroundColor: ColorPalette.GREY_200,
    marginHorizontal: getScreenWidth(2),
  },
});
