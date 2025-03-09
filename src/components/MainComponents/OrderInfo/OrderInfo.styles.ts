import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {Spacing} from '../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: Spacing.Medium,
    backgroundColor: ColorPalette.White,
    borderRadius: Spacing.Small,
  },
  headerContainer: {
    paddingVertical: getScreenHeight(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderNumberText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  dateTimeText: {
    color: ColorPalette.GREY_TEXT_300,
  },
  productContainer: {
    flexDirection: 'row',
    gap: Spacing.XSmall,
  },
  imageContainer: {
    width: getScreenWidth(24),
    height: getScreenWidth(24),
    borderRadius: Spacing.XSmall,
    overflow: 'hidden',
    backgroundColor: ColorPalette.GREY_50,
  },
  orderImage: {
    width: '100%',
    height: '100%',
  },
  productDetailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  orderName: {
    color: ColorPalette.GREY_TEXT_500,
  },
  quantityText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.XXSmall,
  },
  totalText: {
    color: ColorPalette.GREY_TEXT_300,
  },
  priceText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  statusSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getScreenHeight(2),
  },
  statusLabel: {
    color: ColorPalette.GREY_TEXT_300,
  },
  statusBadge: {
    borderRadius: Spacing.XSmall,
    paddingVertical: getScreenHeight(1.5),
  },
});
