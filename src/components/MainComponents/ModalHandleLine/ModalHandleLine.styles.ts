import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  lineContainer: {
    paddingTop: getScreenHeight(1),
    paddingBottom: getScreenHeight(2),
    alignItems: 'center',
  },
  line: {
    width: getScreenWidth(10.2),
    height: getScreenHeight(0.45),
    backgroundColor: ColorPalette.SurfaceInversePrimary,
    borderRadius: 2,
  },
});
