import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {BorderRadius, Spacing} from '../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: ColorPalette.White,
    borderTopLeftRadius: BorderRadius.Small,
    borderTopRightRadius: BorderRadius.Small,
    paddingVertical: getScreenHeight(2.5),
    paddingHorizontal: getScreenWidth(4),
    gap: getScreenWidth(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    flexShrink: 1,
  },
  closeButton: {
    width: getScreenWidth(6),
    height: getScreenWidth(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingVertical: getScreenHeight(2),
    gap: getScreenHeight(3),
  },
  priceRangeContainer: {
    paddingHorizontal: getScreenWidth(2),
  },
  sliderContainer: {
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(2),
  },
  priceLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getScreenHeight(2),
  },
  priceLabel: {
    color: ColorPalette.GREY_TEXT_400,
  },
  selectedPricesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(2),
  },
  selectedPriceItem: {
    flex: 1,
    alignItems: 'center',
  },
  selectedPriceLabel: {
    color: ColorPalette.GREY_TEXT_300,
    marginBottom: getScreenHeight(0.5),
  },
  selectedPriceValue: {
    color: ColorPalette.GREY_TEXT_500,
  },
  separator: {
    width: getScreenWidth(8),
    height: 1,
    backgroundColor: ColorPalette.GREY_200,
    marginHorizontal: getScreenWidth(2),
  },
  slider: {
    height: 40,
  },
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: ColorPalette.GREY_200,
  },
  selectedTrack: {
    backgroundColor: ColorPalette.PURPLE_300,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: ColorPalette.PURPLE_300,
    shadowColor: ColorPalette.Black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  footer: {
    flexDirection: 'row',
    gap: getScreenWidth(3),
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: ColorPalette.GREY_TEXT_400,
  },
});
