import {StyleSheet} from 'react-native';
import {Spacing} from '../../../config/globalStyles';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenWidth, getScreenHeight} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.White,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.Medium,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.Medium,
  },
  successImage: {
    height: getScreenHeight(208 / 8), // Converting pixel values to percentage
    width: getScreenWidth(208 / 4), // Converting pixel values to percentage
    marginBottom: getScreenHeight(24 / 8),
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: getScreenHeight(32 / 8),
    gap: getScreenHeight(8 / 8),
  },
  title: {
    fontSize: getScreenHeight(24 / 8),
    textAlign: 'center',
    marginBottom: Spacing.XSmall,
    color: ColorPalette.GREY_TEXT_500,
  },
  subtitle: {
    textAlign: 'center',
    color: ColorPalette.CreatedText,
  },
  buttonContainer: {
    width: '100%',
    gap: getScreenHeight(16 / 8),
  },
  buttonContainerStyle: {
    borderWidth: 1,
  },
});
