import {Spacing} from '../../../config/globalStyles';
import {ColorPalette} from '../../../config/colorPalette';
import {StyleSheet} from 'react-native';
import {getFigmaDimension} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: Spacing.XSmall,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorPalette.White,
  },
  primaryContainer: {
    gap: Spacing.XSmall,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  secondaryContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.XSmall,
  },
  footerContainer: {
    position: 'absolute',
    bottom: Spacing.XXLarge,
    alignItems: 'center',
  },
  imgOne: {
    height: getFigmaDimension(43.2),
    width: getFigmaDimension(43.2),
  },
  imgTwo: {
    width: getFigmaDimension(81),
    height: getFigmaDimension(27),
  },
  separator: {
    fontSize: 24,
    color: ColorPalette.MainHeading,
  },
  modalHeading: {
    color: ColorPalette.MainHeading,
    fontWeight: 'bold',
  },
  footerText: {
    color: ColorPalette.GREY_TEXT_500,
  },
});
