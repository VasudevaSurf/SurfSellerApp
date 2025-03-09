import {StyleSheet} from 'react-native';
import {getScreenWidth, getScreenHeight} from '../../../helpers/screenSize';
import {ColorPalette} from '../../../config/colorPalette';

export const styles = StyleSheet.create({
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: getScreenWidth(4),
    alignItems: 'center',
    justifyContent: 'space-between', // Changed from 'center' to 'space-between'
    backgroundColor: ColorPalette.White,
    gap: getScreenWidth(2.5), // Added gap between search box and button
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: getScreenHeight(1),
    paddingHorizontal: getScreenWidth(4),
    marginTop: getScreenHeight(2),
  },
  scrollContent: {
    gap: getScreenWidth(4),
  },
  slidingBarsContainer: {
    padding: getScreenWidth(4),
    backgroundColor: ColorPalette.White,
  },
  textStyle: {
    color: ColorPalette.TotalText,
  },
  ProductContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenWidth(4),
  },
  modalContainer: {
    marginTop: 'auto',
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: ColorPalette.PURPLE_300,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getScreenWidth(3),
    padding: getScreenWidth(3),
  },
});
