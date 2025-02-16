import {StyleSheet} from 'react-native';
import {BorderRadius, Spacing} from '../../../config/globalStyles';
import {ColorPalette} from '../../../config/colorPalette';
import {
  convertDipToPixels,
  getFigmaDimension,
} from '../../../helpers/screenSize';

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
  mainTwoContainer: {
    gap: getFigmaDimension(12),
    marginTop: Spacing.XXLarge,
  },
  mainContainerTwo: {
    paddingHorizontal: Spacing.Large,
    paddingVertical: getFigmaDimension(24),
  },

  // Content Wrappers
  contentWrapper: {
    gap: getFigmaDimension(4),
  },
  containerTwo: {
    flexDirection: 'row',
    gap: getFigmaDimension(8),
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    gap: getFigmaDimension(4),
    alignItems: 'center',
  },

  // Typography Styles
  heading: {
    paddingLeft: Spacing.Large,
    color: ColorPalette.GREY_TEXT_500,
  },
  subCaption: {
    paddingLeft: Spacing.Large,
    color: ColorPalette.GREY_TEXT_300,
  },
  subCaptionTwo: {
    color: ColorPalette.GREY_TEXT_500,
  },

  // OTP Input Styles
  // OTP Input Styles
  otpContainer: {
    marginTop: Spacing.XXLarge,
    paddingHorizontal: Spacing.Large,
  },
  otpInputContainer: {
    width: '100%',
    gap: getFigmaDimension(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBox: {
    borderWidth: 1,
    borderRadius: BorderRadius.Medium,
    borderColor: ColorPalette.GREY_100, // Default unfocused state
    backgroundColor: ColorPalette.White,
    height: convertDipToPixels(68),
    width: convertDipToPixels(83),
  },
  otpBoxFocused: {
    borderColor: ColorPalette.GREY_TEXT_400, // Focused state
    borderWidth: 2,
  },
  otpBoxFilled: {
    borderColor: ColorPalette.GREY_TEXT_400, // Filled but not focused state
    borderWidth: 1,
    backgroundColor: ColorPalette.White,
  },

  // Icon Styles
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowBite: {
    alignSelf: 'center',
  },

  // Button Container
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: Spacing.Large,
    marginBottom: Spacing.Medium,
  },
});
