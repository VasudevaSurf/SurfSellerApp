import {StyleSheet} from 'react-native';
import {getScreenWidth, getScreenHeight} from '../../../helpers/screenSize';
import {ColorPalette} from '../../../config/colorPalette';

export const styles = StyleSheet.create({
  container: {
    height: getScreenHeight(6),
    backgroundColor: ColorPalette.ButtonBackHome,
    borderRadius: getScreenWidth(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: getScreenWidth(3),
    paddingVertical: getScreenHeight(1),
  },
  input: {
    flex: 1,
    marginLeft: getScreenWidth(3),
    color: ColorPalette.TextPrimary,
    fontFamily: 'Poppins-Regular',
    fontSize: getScreenWidth(3.5),
    padding: 0,
  },
  searchIcon: {
    width: getScreenWidth(5),
    height: getScreenWidth(5),
    tintColor: ColorPalette.TextSecondary,
  },
});
