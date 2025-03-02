import {Dimensions, PixelRatio, Platform, StatusBar} from 'react-native';

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return totalScreenHeight >= 812 ? 44 : 20;
  } else {
    return StatusBar.currentHeight;
  }
};
/**
 * @param {string | number}
 * @returns {number}
 * @description gets screen width as per percentage and screen size
 * @example const width = getScreenWidth(80);
 */
const getScreenWidth = (widthPercent: string | number) => {
  const screenWidth = Dimensions.get('window').width;
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

/**
 * @param {string | number}
 * @returns {number}
 * @description gets screen height as per percentage and screen size
 * @example const height = getScreenHeight(80);
 */
const getScreenHeight = (heightPercent: string | number) => {
  const screenHeight = Dimensions.get('window').height;
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

/**
 * @param {number}
 * @returns {number}
 * @description converts device independent pixels to pixels
 * @example const height = getScreenHeight(80);
 */
const convertDipToPixels = (dip: number) => {
  return PixelRatio.roundToNearestPixel(dip);
};

const getFigmaDimension = (size: number) => {
  return convertDipToPixels(size);
};

const totalScreenWidth = getScreenWidth(100);
const totalScreenHeight = getScreenHeight(100);
const statusBarHeight = getStatusBarHeight();

export {
  convertDipToPixels,
  getFigmaDimension,
  getScreenHeight,
  getScreenWidth,
  statusBarHeight,
  totalScreenHeight,
  totalScreenWidth,
};
