import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../../config/colorPalette';
import {
  getScreenWidth,
  getScreenHeight,
} from '../../../../../helpers/screenSize';
import {BorderRadius} from '../../../../../config/globalStyles';

export const containerStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getScreenWidth(4),
    marginBottom: getScreenHeight(1.5),
  },
  logoContainer: {
    alignItems: 'center',
    width: '45%',
    gap: getScreenHeight(0.75),
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: getScreenHeight(1),
  },
  image: {
    width: getScreenWidth(20),
    height: getScreenWidth(20),
    borderRadius: getScreenWidth(10),
  },
  invoiceImage: {
    backgroundColor: '#f0e6ff',
  },
  editButton: {
    height: getScreenWidth(5),
    width: getScreenWidth(5),
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.Full,
    padding: getScreenWidth(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    color: ColorPalette.GREY_TEXT_500,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: getScreenHeight(12),
    backgroundColor: ColorPalette.GREY_200,
    marginHorizontal: getScreenWidth(0.5),
  },
});
