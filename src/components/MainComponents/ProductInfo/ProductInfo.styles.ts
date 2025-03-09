import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenWidth, getScreenHeight} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: getScreenWidth(4),
    backgroundColor: ColorPalette.White,
    gap: getScreenHeight(1.5),
    borderRadius: getScreenWidth(3),
  },
  imageContainer: {
    width: getScreenWidth(26),
    borderRadius: getScreenWidth(2),
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  infoContainerOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productNameWrapper: {
    flex: 1,
    marginRight: getScreenWidth(3.2),
  },
  productNameText: {
    color: ColorPalette.GREY_TEXT_500,
    flexShrink: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: getScreenWidth(2),
    alignItems: 'center',
  },
  infoContainerTwo: {
    flexDirection: 'row',
    gap: getScreenWidth(4.8),
    marginTop: getScreenHeight(1.5),
  },
  sellerContainer: {
    gap: getScreenWidth(1),
  },
  platFormContainer: {
    gap: getScreenWidth(1),
  },
  infoContainerThree: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getScreenHeight(1.5),
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getScreenWidth(1),
  },
  toggleContainer: {
    alignItems: 'center',
  },
  labelText: {
    color: ColorPalette.GREY_TEXT_100,
  },
  valueText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  toggleLabel: {
    color: ColorPalette.GREY_TEXT_500,
    fontWeight: '500',
  },
});
