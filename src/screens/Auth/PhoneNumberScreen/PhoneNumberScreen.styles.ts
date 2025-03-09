import {StyleSheet} from 'react-native';
import {Spacing, BorderRadius} from '../../../config/globalStyles';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  // Layout Containers
  container: {
    flex: 1,
    backgroundColor: ColorPalette.White,
  },
  bannerContainer: {
    padding: Spacing.Large,
    paddingTop: Spacing.Medium,
    marginBottom: Spacing.Large,
  },
  mainContainerTwo: {
    paddingHorizontal: Spacing.Large,
    paddingVertical: getScreenHeight(3),
  },
  contentWrapper: {
    gap: getScreenHeight(3),
  },
  twoContainer: {
    gap: getScreenHeight(2),
  },

  // Terms Containers
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
    gap: getScreenHeight(0.5),
  },

  // Typography
  heading: {
    paddingLeft: Spacing.Large,
    color: ColorPalette.GREY_TEXT_500,
  },
  caption: {
    color: ColorPalette.GREY_TEXT_300,
    textAlign: 'center',
  },
  captionTwo: {
    color: ColorPalette.GREY_TEXT_500,
    textAlign: 'center',
  },

  // Links
  linkText: {
    color: ColorPalette.PURPLE_300,
  },

  // Navigation
  backButton: {
    padding: getScreenHeight(2),
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
});
