import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {Spacing} from '../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenHeight(2),
  },
  scrollContent: {
    gap: getScreenHeight(2),
  },
  verifyContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: getScreenWidth(3),
    paddingVertical: getScreenHeight(2.5),
    gap: getScreenHeight(2.5),
    overflow: 'hidden',
  },
  textVerifyContainer: {
    flexDirection: 'column',
    gap: getScreenHeight(0.5),
  },
  textOne: {
    lineHeight: getScreenHeight(2.5),
    color: ColorPalette.GREY_TEXT_500,
    flexShrink: 1,
  },
  textTwo: {
    color: ColorPalette.GREY_TEXT_300,
    lineHeight: getScreenHeight(1.8),
    flexShrink: 1,
  },
  verifyStepsContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: getScreenWidth(2),
    paddingVertical: getScreenHeight(1.5),
    minHeight: getScreenHeight(30),
    maxHeight: getScreenHeight(40),
    overflow: 'hidden',
  },
  OrderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingVertical: getScreenHeight(1),
    width: '100%',
  },
  menuContainer: {
    paddingVertical: getScreenHeight(2),
    width: '100%',
  },
  leftIconBackgroundColor: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: getScreenHeight(1),
    overflow: 'hidden',
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: getScreenHeight(2),
    width: '100%',
    padding: getScreenHeight(2),
    overflow: 'hidden',
  },
  containerOne: {
    flexDirection: 'row',
    gap: getScreenWidth(4),
    width: '100%',
  },
  containerTwo: {
    flexDirection: 'row',
    gap: getScreenWidth(4),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  totalSales: {
    flex: 1,
    paddingVertical: getScreenHeight(2.9),
    paddingHorizontal: getScreenWidth(4),
    flexDirection: 'column',
    gap: getScreenHeight(1.5),
    overflow: 'hidden',
  },
  salesOne: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: getScreenWidth(2),
  },
  salesTwo: {
    flexDirection: 'column',
    flexShrink: 1,
  },
  iconBack: {
    padding: getScreenHeight(1),
    overflow: 'hidden',
  },
  iconBackSale: {
    padding: getScreenHeight(1),
    overflow: 'hidden',
  },
  iconBackOne: {
    padding: getScreenHeight(1),
    overflow: 'hidden',
  },
  iconBackTwo: {
    padding: getScreenHeight(0.5),
    overflow: 'hidden',
  },
  iconBackThree: {
    padding: getScreenHeight(0.5),
    overflow: 'hidden',
  },
  countBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: getScreenWidth(1),
    flexShrink: 1,
  },
  countText: {
    color: ColorPalette.RiseText,
  },
  countValue: {
    color: ColorPalette.GREY_TEXT_500,
    flexShrink: 1,
  },
  countCaptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  countCaption: {
    color: ColorPalette.GREY_TEXT_300,
  },
  countCaptionOne: {
    color: ColorPalette.PURPLE_300,
  },
  activeProduct: {
    flex: 1,
    flexDirection: 'row',
    padding: getScreenHeight(1.5),
    gap: getScreenWidth(3),
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  stockContainer: {
    flexDirection: 'column',
    gap: getScreenHeight(1),
    padding: getScreenHeight(1.5),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  salesOverview: {
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(3),
    flexDirection: 'column',
    gap: getScreenHeight(3),
    width: '100%',
    overflow: 'hidden',
  },
  salesHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  LeftHeading: {
    flexDirection: 'column',
    flex: 1,
  },
  rightHeadingButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: getScreenHeight(0.5),
    flexDirection: 'row',
    gap: getScreenWidth(1),
    overflow: 'hidden',
  },
  salesGraph: {
    width: '100%',
    height: getScreenHeight(30),
    minHeight: getScreenHeight(20),
  },
  recentOrdersContainer: {
    flexDirection: 'column',
    paddingVertical: getScreenHeight(2.5),
    paddingHorizontal: getScreenWidth(3),
    gap: getScreenHeight(2.5),
    width: '100%',
    overflow: 'hidden',
  },
  recentOrderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(1),
  },
  viewAllText: {
    color: ColorPalette.PURPLE_200,
  },
  recentAllOrders: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  twoContainer: {
    flexDirection: 'row',
    gap: getScreenWidth(3),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexShrink: 1,
  },
  containerAnother: {
    flexDirection: 'row',
    gap: getScreenWidth(4),
    width: '100%',
  },
  containerAnotherOne: {
    flex: 1,
    flexDirection: 'column',
    gap: getScreenHeight(2),
  },
  containerProportional: {
    flexDirection: 'column',
    gap: getScreenHeight(2),
    flex: 0.5,
  },
  buttonStyles: {
    borderRadius: Spacing.XLarge,
  },
});
