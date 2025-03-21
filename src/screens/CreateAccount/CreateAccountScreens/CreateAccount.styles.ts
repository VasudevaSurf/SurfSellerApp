import {StyleSheet} from 'react-native';
import {Spacing} from '../../../config/globalStyles';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenWidth, getScreenHeight} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.White,
  },
  scrollContainer: {
    flexGrow: 1, // Only adding this property, keeping all other spacing intact
  },
  bannerContainer: {
    padding: getScreenWidth(5),
    paddingTop: getScreenHeight(2),
    marginBottom: getScreenHeight(3),
  },
  mainContainerTwo: {
    paddingHorizontal: getScreenWidth(5),
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
    paddingHorizontal: getScreenWidth(4), // Added for better spacing
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
