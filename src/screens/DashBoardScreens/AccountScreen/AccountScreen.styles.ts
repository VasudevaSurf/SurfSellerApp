import {StyleSheet} from 'react-native';
import {
  getScreenWidth,
  getScreenHeight,
  getFigmaDimension,
} from '../../../helpers/screenSize';
import {ColorPalette} from '../../../config/colorPalette';

export const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    // paddingHorizontal: getScreenWidth(4),
    // paddingVertical: getScreenHeight(1),
    // marginTop: getScreenHeight(2),
  },
  scrollContent: {
    gap: getScreenWidth(4),
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: getFigmaDimension(12),
    paddingHorizontal: getFigmaDimension(16),
    backgroundColor: ColorPalette.White,
    gap: getFigmaDimension(12),
    marginTop: getScreenHeight(2),
  },
  imageContainer: {
    width: getFigmaDimension(60),
    height: getFigmaDimension(60),
    borderRadius: getScreenWidth(2),
    overflow: 'hidden',
  },
  orderImage: {
    width: '100%',
    height: '100%',
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: getFigmaDimension(2),
  },
  profileName: {
    color: ColorPalette.GREY_TEXT_500,
  },
  profileCaption: {
    color: ColorPalette.GREY_TEXT_300,
  },
  salesContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: getFigmaDimension(8),
    paddingVertical: getFigmaDimension(12),
    paddingHorizontal: getFigmaDimension(16),
    backgroundColor: ColorPalette.White,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  twoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: getFigmaDimension(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: getFigmaDimension(10),
    paddingVertical: getFigmaDimension(10),
    borderRadius: getFigmaDimension(12),
    borderColor: ColorPalette.SearchBack,
  },
  iconBack: {
    display: 'flex',
    borderRadius: getFigmaDimension(8),
    padding: getFigmaDimension(8),
    backgroundColor: ColorPalette.SmallIconBack,
  },
  iconBackOne: {
    display: 'flex',
    borderRadius: getFigmaDimension(8),
    padding: getFigmaDimension(8),
    backgroundColor: ColorPalette.SmallIconBack2,
  },
  salesTwo: {
    display: 'flex',
    flexDirection: 'column',
  },
  countValue: {
    color: ColorPalette.GREY_TEXT_500,
  },
  countCaption: {
    color: ColorPalette.GREY_TEXT_300,
  },
  profileOptionsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  customButton: {
    borderWidth: 1,
    borderColor: ColorPalette.GREY_200,
  },
  customText: {
    color: ColorPalette.GREY_TEXT_100,
  },
});
