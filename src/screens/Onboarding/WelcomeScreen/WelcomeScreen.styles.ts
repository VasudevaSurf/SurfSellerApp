import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {Spacing, BorderRadius} from '../../../config/globalStyles';
import {
  getScreenWidth,
  getScreenHeight,
  totalScreenWidth,
} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: ColorPalette.White,
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
  },
  image: {
    width: getScreenWidth(60),
    height: getScreenHeight(30),
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.XSmall,
    color: ColorPalette.TextPrimary,
  },
  subtitle: {
    textAlign: 'center',
    color: ColorPalette.GREY_TEXT_300,
    paddingHorizontal: Spacing.Medium,
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
    width: 10,
    height: 10,
    marginHorizontal: 4,
    overflow: 'hidden',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: BorderRadius.XXSmall,
    backgroundColor: ColorPalette.PURPLE_00,
  },
  activeDot: {
    backgroundColor: ColorPalette.PURPLE_300,
  },
  buttonContainer: {
    gap: getScreenHeight(2),
    paddingHorizontal: Spacing.Medium,
    width: '100%',
    marginTop: getScreenHeight(4),
  },
  buttonContainerStyle: {
    borderWidth: 1,
  },
});
