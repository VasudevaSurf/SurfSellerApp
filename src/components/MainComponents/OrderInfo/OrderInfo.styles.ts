import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {Spacing} from '../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: Spacing.Medium,
    paddingHorizontal: Spacing.Small,
    backgroundColor: ColorPalette.White,
    borderRadius: Spacing.XSmall,
    gap: Spacing.Medium,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: Spacing.Medium,
  },
  imageContainer: {
    width: getScreenWidth(20.6), // Converted from getFigmaDimension(81)
    height: getScreenWidth(18.3), // Converted from getFigmaDimension(72)
    borderRadius: getScreenWidth(2),
    overflow: 'hidden',
  },
  orderImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.Small,
  },
  namePriceContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.XXSmall,
  },
  orderName: {
    flexShrink: 1,
    color: ColorPalette.GREY_TEXT_500,
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: Spacing.XXSmall,
    alignItems: 'center',
  },
  totalText: {
    color: ColorPalette.GREY_TEXT_300,
  },
  priceText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.XXLarge,
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.XXSmall,
  },
  infoRowTwo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: Spacing.XXSmall,
  },
  label: {
    color: ColorPalette.GREY_TEXT_300,
  },
  value: {
    color: ColorPalette.GREY_TEXT_500,
  },
  valueAbove: {
    color: ColorPalette.GREY_TEXT_300,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.XXSmall,
  },
  containerStyle: {
    paddingHorizontal: Spacing.Medium,
    paddingVertical: Spacing.XXSmall,
    height: getScreenHeight(5),
  },
  orderEmailContaienr: {
    // Note: There's a typo in the original - orderEmailContaienr
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.XXSmall,
  },
  dateStatusContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
