import {Platform, StyleSheet} from 'react-native';
import {getScreenHeight, getScreenWidth} from '../helpers/screenSize';
import {ColorPalette} from './colorPalette';

export const globalStyles = StyleSheet.create({
  androidStatusBarPadding: {
    paddingTop: Platform.OS === 'android' ? getScreenHeight(3) : 0,
  },
  primaryContainer: {
    paddingTop: Platform.OS === 'android' ? getScreenHeight(3) : 0,
    flex: 1,
    backgroundColor: ColorPalette.White,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  successContainer: {
    paddingTop: Platform.OS === 'android' ? getScreenHeight(3) : 0,
    flex: 1,
    backgroundColor: ColorPalette.White,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  secondaryContainer: {
    paddingTop: Platform.OS === 'android' ? getScreenHeight(3) : 0,
    flex: 1,
    backgroundColor: ColorPalette.White,
  },
  container: {
    flex: 1,
  },
  absoluteCenter: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  alignCenter: {
    alignItems: 'center',
  },
  centerElement: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexWhole: {
    flex: 1,
  },
  hideFlex: {opacity: 0},
  bottomButtonPadding: {
    paddingBottom: getScreenHeight(4),
  },
  primaryText: {
    color: ColorPalette.GREY_400,
  },
  secondaryText: {
    color: ColorPalette.GREY_400,
  },
});

export enum BorderRadius {
  XXSmall = 4,
  XSmall = 8,
  Small = 12,
  Medium = 16,
  Large = 20,
  XLarge = 24,
  Full = 999,
}

const figmaScreenWidth = 393;

const calculateWidthPercentage = (x: number) =>
  getScreenWidth((x / figmaScreenWidth) * 100);

export enum Spacing {
  Zero = calculateWidthPercentage(0),
  XXSmall = calculateWidthPercentage(4),
  XSmall = calculateWidthPercentage(8),
  Small = calculateWidthPercentage(12),
  Medium = calculateWidthPercentage(16),
  Large = calculateWidthPercentage(20),
  XLarge = calculateWidthPercentage(24),
  XXLarge = calculateWidthPercentage(32),
  XXXLarge = calculateWidthPercentage(48),
}
