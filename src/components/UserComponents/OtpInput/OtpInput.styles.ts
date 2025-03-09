import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {convertDipToPixels, getScreenWidth} from '../../../helpers/screenSize';
import {BorderRadius, Spacing} from '../../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: ColorPalette.BackgroundPrimary,
    gap: getScreenWidth(1),
  },
  codeContainer: {
    borderWidth: 1,
    borderRadius: BorderRadius.Medium,
    borderColor: ColorPalette.SurfacePrimary,
    height: convertDipToPixels(58),
    width: getScreenWidth(13.6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorPalette.SurfacePrimary,
    // Adding default shadow
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2, // For Android
  },
  codeText: {
    color: ColorPalette.GREY_TEXT_300,
    marginTop: Spacing.XXSmall,
  },
  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
  },
  stick: {
    width: 3,
    height: 38,
  },
  dash: {
    alignSelf: 'center',
    marginHorizontal: getScreenWidth(1.5),
  },
  dashText: {
    color: ColorPalette.Black,
  },
});
