import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../../config/colorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import {BorderRadius} from '../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.SearchBack,
  },
  mainContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: getScreenHeight(1.5),
  },
  sectionItem: {
    flexDirection: 'column',
    backgroundColor: ColorPalette.White,
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
    gap: getScreenWidth(1),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    gap: getScreenHeight(0.5),
  },
  primaryText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  secondaryText: {
    color: ColorPalette.GREY_TEXT_300,
  },
  toggleContainer: {
    height: getScreenHeight(4),
    backgroundColor: ColorPalette.White,
    borderRadius: BorderRadius.XLarge,
    gap: getScreenWidth(2.5),
  },
  toggleButton: {
    borderRadius: BorderRadius.Full,
    paddingVertical: getScreenHeight(1),
    paddingHorizontal: getScreenWidth(6),
    borderWidth: 1,
    borderColor: ColorPalette.GREY_TEXT_100,
  },
  toggleButtonText: {
    textAlign: 'center',
  },
  mainInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ColorPalette.White,
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
  },
});
