import { StyleSheet } from 'react-native';
import { Spacing } from '../../../config/globalStyles';
import { ColorPalette } from '../../../config/colorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.White,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.Medium,
    marginBottom: getScreenHeight(8)
  },
  successImage: {
    height: getScreenHeight(26),
    width: getScreenWidth(53),
    marginBottom: getScreenHeight(3),
  },
  textContainer: {
    alignItems: 'center',
    marginTop: getScreenHeight(4),
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.XSmall,
    color: ColorPalette.GREY_TEXT_500,
  },
  desc: {
    width: getScreenWidth(70),
    textAlign: 'center'
  },
  buttonContainer: {
    width: '100%',
  },
});
