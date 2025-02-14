import {StyleSheet} from 'react-native';
import {Spacing} from '../../../config/globalStyles';
import {ColorPalette} from '../../../config/colorPalette';
import {getFigmaDimension} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.White,
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
    color: ColorPalette.GREY_TEXT_500,
  },
  subheading: {
    paddingLeft: Spacing.Large,
    color: ColorPalette.GREY_TEXT_300,
  },
  caption: {
    color: ColorPalette.AgreeTerms,
    textAlign: 'center',
  },
  captionTwo: {
    color: ColorPalette.GREY_TEXT_500,
    textAlign: 'center',
  },
  linkText: {
    color: ColorPalette.ButtonPrimary,
  },
});
