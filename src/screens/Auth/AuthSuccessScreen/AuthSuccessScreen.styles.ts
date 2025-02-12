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
    fontSize: getFigmaDimension(24),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Spacing.XSmall,
    color: ColorPalette.TextPrimary,
  },
  subtitle: {
    textAlign: 'center',
    color: ColorPalette.TextSecondary,
  },
  buttonContainer: {
    width: '100%',
  },
});
