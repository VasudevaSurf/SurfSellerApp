import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {Spacing} from '../../../config/globalStyles';
import {getFigmaDimension} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.XSmall,
  },
  logoImage: {
    height: getFigmaDimension(32),
    width: getFigmaDimension(32),
  },
  surfNameImage: {
    width: getFigmaDimension(60),
    height: getFigmaDimension(20),
  },
  separator: {
    width: 2,
    height: getFigmaDimension(22),
    backgroundColor: ColorPalette.MainHeading,
    marginHorizontal: Spacing.XXSmall,
  },
  heading: {
    color: ColorPalette.MainHeading,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
