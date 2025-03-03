import {StyleSheet} from 'react-native';
import {Spacing} from '../../../config/globalStyles';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenWidth, getScreenHeight} from '../../../helpers/screenSize';

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
    gap: getScreenWidth(6),
  },
  inputContainer: {
    gap: getScreenWidth(4),
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap', // Added for better text wrapping
    paddingHorizontal: Spacing.Medium, // Added for better spacing
  },
  termsContainerTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(1),
  },
  subCaptionContainer: {
    gap: getScreenWidth(1),
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
