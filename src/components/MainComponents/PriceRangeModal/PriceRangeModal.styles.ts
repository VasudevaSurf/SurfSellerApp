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
    borderTopLeftRadius: BorderRadius.XSmall,
    borderTopRightRadius: BorderRadius.XSmall,
    gap: getScreenWidth(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
  },
  headerContent: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  headerText: {
    textAlign: 'left',
    flexShrink: 1,
  },
  closeButton: {
    width: getScreenWidth(6),
    height: getScreenWidth(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    gap: getScreenHeight(3),
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
  },
  priceRangeContainer: {
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(2),
    borderWidth: 2,
    borderColor: ColorPalette.SearchBack,
    borderRadius: BorderRadius.Small,
    backgroundColor: ColorPalette.White,
    marginBottom: getScreenHeight(12), // Large gap below the entire slider container
  },
  priceRangeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getScreenWidth(2),
    marginBottom: getScreenHeight(2),
  },
  infoIcon: {
    width: 20,
    height: 20,
  },
  priceLabelsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceLabelWrapper: {
    width: getScreenWidth(15), // Fixed width for consistent spacing
    justifyContent: 'center',
  },
  priceLabel: {
    color: ColorPalette.GREY_TEXT_400,
    textAlign: 'left', // Default alignment, will be overridden for right label
  },
  sliderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: getScreenWidth(3), // Equal margins on both sides
    paddingVertical: getScreenHeight(1),
  },
  slider: {
    width: getScreenHeight(25),
    height: getScreenHeight(3),
  },
  track: {
    height: getScreenHeight(1),
    borderRadius: BorderRadius.Small,
    backgroundColor: ColorPalette.SearchBack,
    marginVertical: -getScreenHeight(0.4),
  },
  selectedTrack: {
    height: getScreenHeight(1),
    borderRadius: BorderRadius.Small,
    backgroundColor: ColorPalette.ProgressLine,
    marginVertical: -getScreenHeight(0.4),
  },
  thumb: {
    width: getScreenWidth(6),
    height: getScreenHeight(3),
    borderRadius: BorderRadius.XLarge,
    backgroundColor: ColorPalette.White,
    borderWidth: 5,
    borderColor: ColorPalette.ProgressLine,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    gap: getScreenWidth(3),
    marginTop: getScreenHeight(2),
    borderTopWidth: 1,
    borderColor: ColorPalette.GREY_200,
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: ColorPalette.PURPLE_300,
  },
});
