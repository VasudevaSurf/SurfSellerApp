import {StyleSheet} from 'react-native';
import {Spacing} from '../../../config/globalStyles';
import {ColorPalette} from '../../../config/colorPalette';
import {getFigmaDimension} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.Medium,
    backgroundColor: ColorPalette.White,
  },
  successImage: {
    height: getFigmaDimension(208),
    width: getFigmaDimension(208),
    marginBottom: getFigmaDimension(24),
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: getFigmaDimension(32),
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.XSmall,
    color: ColorPalette.GREY_TEXT_500,
  },
  buttonContainer: {
    width: '100%',
  },
});
