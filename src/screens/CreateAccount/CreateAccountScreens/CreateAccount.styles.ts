import {StyleSheet} from 'react-native';
import {Spacing} from '../../../config/globalStyles';
import {ColorPalette} from '../../../config/colorPalette';
import {getFigmaDimension} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    padding: Spacing.Large,
    paddingTop: Spacing.Medium,
    marginBottom: Spacing.XXLarge,
  },
  mainContainerTwo: {
    paddingHorizontal: Spacing.Large,
  },
  contentWrapper: {
    gap: Spacing.XLarge,
  },
  containerTwo: {
    gap: getFigmaDimension(24),
  },
  inputContainer: {
    gap: getFigmaDimension(16),
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsContainerTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getFigmaDimension(4),
  },
  subCaptionContainer: {
    gap: getFigmaDimension(4),
  },
  heading: {
    paddingLeft: Spacing.Large,
    color: ColorPalette.TextPrimary,
  },
  subheading: {
    paddingLeft: Spacing.Large,
    color: ColorPalette.TextSecondary,
  },
  caption: {
    color: ColorPalette.TextSecondary,
    textAlign: 'center',
  },
  captionTwo: {
    color: ColorPalette.TextPrimary,
    textAlign: 'center',
  },
  linkText: {
    color: ColorPalette.ButtonPrimary,
  },
});
