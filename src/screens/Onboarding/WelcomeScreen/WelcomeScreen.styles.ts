import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {Spacing} from '../../../config/globalStyles';
import {getFigmaDimension} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: ColorPalette.White,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: getFigmaDimension(64),
  },
  scrollViewWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: getFigmaDimension(64),
  },
  image: {
    width: getFigmaDimension(240),
    height: getFigmaDimension(220),
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: getFigmaDimension(24),
    fontWeight: '600',
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
    marginTop: getFigmaDimension(32),
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
    borderRadius: 5,
    backgroundColor: ColorPalette.PURPLE_00,
  },
  activeDot: {
    backgroundColor: ColorPalette.PURPLE_300,
  },
  buttonContainer: {
    gap: getFigmaDimension(16),
    paddingHorizontal: Spacing.Medium,
    width: '100%',
    marginTop: getFigmaDimension(32),
  },
  text: {
    fontWeight: 'bold',
  },
  buttonContainerStyle:{ 
    borderWidth: 1
  }
});
