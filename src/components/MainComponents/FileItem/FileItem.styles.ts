import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenWidth, getScreenHeight} from '../../../helpers/screenSize';
import {BorderRadius} from '../../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: getScreenHeight(1.5),
    backgroundColor: ColorPalette.White,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: getScreenWidth(1.5),
  },
  thumbnailContainer: {
    width: getScreenWidth(15),
    height: getScreenWidth(15),
    borderRadius: BorderRadius.XSmall,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderThumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: ColorPalette.GREY_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIconOverlay: {
    position: 'absolute',
    top: getScreenHeight(-1.25),
    left: getScreenWidth(-2.5),
    backgroundColor: ColorPalette.White,
    borderRadius: getScreenWidth(5),
    padding: getScreenWidth(1),
    zIndex: 10,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 3,
  },
  textContainer: {
    gap: getScreenHeight(0.5),
    justifyContent: 'center',
    flex: 1,
  },
  fileSizeText: {
    color: ColorPalette.GREY_TEXT_100,
  },
  fileDateText: {
    color: ColorPalette.GREY_TEXT_100,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optimiseButton: {
    borderRadius: getScreenWidth(4.5),
  },
});
