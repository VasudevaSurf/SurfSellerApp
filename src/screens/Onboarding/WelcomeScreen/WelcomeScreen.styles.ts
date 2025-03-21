import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {BorderRadius, Spacing} from '../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: ColorPalette.White,
  },
  scrollContentContainer: {
    flexGrow: 1, // This ensures the ScrollView content can grow to fill the screen
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: getScreenHeight(8),
  },
  scrollViewWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenHeight(8),
    paddingHorizontal: getScreenWidth(4),
  },
  image: {
    width: getScreenWidth(60),
    height: getScreenHeight(30),
  },
  textContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenHeight(1),
    width: getScreenWidth(85),
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.XSmall,
    color: ColorPalette.GREY_TEXT_500,
    width: '100%',
  },
  subtitle: {
    textAlign: 'center',
    color: ColorPalette.GREY_TEXT_300,
    width: '100%',
    paddingHorizontal: getScreenWidth(2),
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationTrack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paginationGap: {
    marginTop: getScreenHeight(4),
  },
  dotContainer: {
    height: 10,
    marginHorizontal: getScreenWidth(1),
    overflow: 'hidden',
  },
  dot: {
    height: 10,
    borderRadius: BorderRadius.Large,
  },
  buttonContainer: {
    gap: getScreenHeight(2),
    paddingHorizontal: Spacing.Medium,
    width: '100%',
    marginTop: getScreenHeight(4),
  },
  buttonContainerStyle: {
    borderWidth: 1.5,
  },
});
