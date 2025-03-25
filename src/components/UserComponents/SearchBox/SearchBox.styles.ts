import {StyleSheet} from 'react-native';
import {
  getScreenWidth,
  getScreenHeight,
  getFigmaDimension,
} from '../../../helpers/screenSize';
import {ColorPalette} from '../../../config/colorPalette';

export const styles = StyleSheet.create({
  container: {
    height: getScreenHeight(6),
    backgroundColor: ColorPalette.White,
    borderRadius: getScreenWidth(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: getScreenWidth(3),
    paddingVertical: getScreenHeight(1),
    borderWidth: 1,
    borderColor: ColorPalette.GREY_100,
  },
  input: {
    flex: 1,
    marginLeft: getScreenWidth(3),
    color: ColorPalette.Black,
    fontFamily: 'Poppins-Regular',
    fontSize: getFigmaDimension(14),
    padding: 0,
  },
  searchIcon: {
    width: getScreenWidth(5),
    height: getScreenWidth(5),
    tintColor: ColorPalette.SearchIcon,
  },
});
