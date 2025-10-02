import { StyleSheet } from 'react-native';
import { ColorPalette } from '../../../../../config/colorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';

export const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(1),
    marginTop: getScreenHeight(0.2),
  },
  scrollContent: {
    gap: getScreenHeight(1.2),
  },
  textStyle: {
    color: ColorPalette.GREY_TEXT_500,
  },
  productContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenHeight(1.2),
  },
  emptyMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // gap: getScreenHeight(2),
  },
  emptyBoxPng: {
    width: getScreenWidth(45),
    height: getScreenWidth(45),
    resizeMode: 'contain',
  },
  emptyStateText: {
    // color: ColorPalette.GREY_TEXT_300,
    textAlign: 'center',
  },
});
