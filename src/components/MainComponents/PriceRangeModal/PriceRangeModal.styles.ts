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
    paddingVertical: getScreenHeight(2),
    gap: getScreenHeight(3),
  },
  priceRangeContainer: {
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(2),
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: BorderRadius.XSmall,
    backgroundColor: ColorPalette.White,
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
    justifyContent: 'space-between',
    alignItems: 'center', // Center align all items
    marginVertical: getScreenHeight(1),
  },
  priceLabel: {
    color: ColorPalette.GREY_TEXT_400,
    minWidth: getScreenWidth(12), // Ensure labels have consistent width
  },
  sliderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: getScreenWidth(2),
  },

  slider: {
    height: 40,
    width: '100%',
  },
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: ColorPalette.GREY_200,
  },
  selectedTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3A5AFE',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: ColorPalette.White,
    borderWidth: 3,
    borderColor: '#3A5AFE',
    shadowColor: ColorPalette.Black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  footer: {
    flexDirection: 'row',
    gap: getScreenWidth(3),
    marginTop: getScreenHeight(2),
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: ColorPalette.GREY_TEXT_400,
  },
});
