import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {
  getFigmaDimension,
  getScreenHeight,
  getScreenWidth,
} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'relative',
    backgroundColor: ColorPalette.White,
    width: '100%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  slider: {
    position: 'absolute',
    top: -getScreenHeight(1),
    height: getScreenHeight(1),
    backgroundColor: ColorPalette.PURPLE_300,
    borderTopLeftRadius: getScreenWidth(2),
    borderTopRightRadius: getScreenWidth(2),
    shadowColor: ColorPalette.PURPLE_300,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: getScreenHeight(2),
    paddingBottom: getScreenHeight(2),
    width: '100%',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: getFigmaDimension(4),
  },
  tabText: {
    marginTop: getScreenHeight(0.5),
    fontSize: getScreenHeight(1.4),
  },
  focusedTabText: {
    color: ColorPalette.PURPLE_300,
  },
  unfocusedTabText: {
    color: ColorPalette.GREY_TEXT_200,
  },
});
