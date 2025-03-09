import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {Spacing} from '../../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: ColorPalette.White,
    padding: Spacing.Medium,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.GREY_200,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  contentSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textSection: {
    width: '100%',
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: Spacing.XSmall,
  },
  statusMain: {
    borderRadius: getScreenWidth(6.1), // 24/393*100 ≈ 6.1
    alignSelf: 'flex-start',
  },
  productImage: {
    width: getScreenWidth(15), // 60/393*100 ≈ 15.3
    height: getScreenWidth(15), // 60/393*100 ≈ 15.3
    borderRadius: Spacing.XXSmall,
  },
  priceSection: {
    alignItems: 'flex-end',
    gap: Spacing.XXSmall,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.XXSmall,
  },
  orderIdText: {
    color: ColorPalette.GREY_TEXT_500,
    marginBottom: Spacing.XXSmall,
  },
  productNameText: {
    color: ColorPalette.GREY_TEXT_300,
    flexWrap: 'wrap',
    width: '90%',
  },
  amountText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  dateText: {
    color: ColorPalette.GREY_TEXT_300,
  },
  customerText: {
    color: ColorPalette.GREY_TEXT_300,
  },
  dotIcon: {
    marginHorizontal: Spacing.XXSmall,
  },
});
