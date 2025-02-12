import {StyleSheet} from 'react-native';
import {Spacing} from '../../../config/globalStyles';
import {ColorPalette} from '../../../config/colorPalette';
import {getFigmaDimension} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  // Layout Containers
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
    paddingVertical: getFigmaDimension(24),
  },
  contentWrapper: {
    gap: getFigmaDimension(24),
  },
  twoContainer: {
    gap: getFigmaDimension(16),
  },

  // Terms Containers
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

  // Typography
  heading: {
    paddingLeft: Spacing.Large,
    color: ColorPalette.TextPrimary,
  },
  caption: {
    color: ColorPalette.TextSecondary,
    textAlign: 'center',
  },
  captionTwo: {
    color: ColorPalette.TextPrimary,
    textAlign: 'center',
  },

  // Links
  linkText: {
    color: ColorPalette.ButtonPrimary,
  },
  linkTextTwo: {
    color: ColorPalette.ButtonPrimary,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },

  // Navigation
  backButton: {
    padding: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
});
