import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {BorderRadius, Spacing} from '../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.White,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  bannerContainer: {
    padding: Spacing.Large,
    paddingTop: Spacing.Medium,
    marginBottom: Spacing.XLarge,
  },
  mainTwoContainer: {
    gap: getScreenWidth(3), // Using getScreenWidth instead of getFigmaDimension(12)
    marginTop: Spacing.Large,
  },
  mainContainerTwo: {
    paddingHorizontal: Spacing.Large,
    paddingVertical: getScreenHeight(3), // Using getScreenHeight instead of getFigmaDimension(24)
  },

  // Content Wrappers
  contentWrapper: {
    gap: getScreenWidth(1), // Using getScreenWidth instead of getFigmaDimension(4)
  },
  containerTwo: {
    flexDirection: 'row',
    gap: getScreenWidth(2), // Using getScreenWidth instead of getFigmaDimension(8)
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    gap: getScreenWidth(1), // Using getScreenWidth instead of getFigmaDimension(4)
    alignItems: 'center',
    justifyContent: 'center',
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
  otpContainer: {
    marginTop: Spacing.XXLarge,
    paddingHorizontal: Spacing.Large,
  },
  otpInputContainer: {
    width: '100%',
    gap: getScreenWidth(4), // Using getScreenWidth instead of getFigmaDimension(16)
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBox: {
    borderWidth: 1.5,
    borderRadius: BorderRadius.Medium,
    borderColor: ColorPalette.GREY_100, // Default unfocused state
    backgroundColor: ColorPalette.White,
    height: getScreenHeight(8), // Using getScreenHeight instead of convertDipToPixels(68)
    width: getScreenWidth(20), // Using getScreenWidth instead of convertDipToPixels(83)
  },
  otpBoxFocused: {
    borderColor: ColorPalette.GREY_TEXT_400, // Grey border when focused
    borderWidth: 2,
    // iOS shadow - purple glow
    shadowColor: 'rgba(237, 219, 251, 0.80)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 4,
    // Android shadow
    elevation: 6,
  },
  otpBoxFilled: {
    borderColor: ColorPalette.GREY_TEXT_400, // Filled but not focused state
    borderWidth: 1.5,
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
