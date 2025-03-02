import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {getFigmaDimension, getScreenWidth} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: getFigmaDimension(12),
    backgroundColor: ColorPalette.White,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: getFigmaDimension(6),
  },
  thumbnailContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    position: 'relative',
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
    top: getFigmaDimension(-10),
    left: getFigmaDimension(-10),
    backgroundColor: ColorPalette.White,
    borderRadius: getFigmaDimension(20),
    padding: 4,
    zIndex: 10,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 3,
  },
  textContainer: {
    gap: getFigmaDimension(4),
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
    borderRadius: 18,
  },
});
