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
    flexDirection: 'column',
    paddingHorizontal: getScreenWidth(3),
    paddingVertical: getScreenHeight(2.5),
    gap: getScreenHeight(2.5),
    backgroundColor: ColorPalette.White,
    borderRadius: getScreenWidth(3),
  },
  textVerifyContainer: {
    flexDirection: 'column',
    gap: getScreenHeight(0.5),
  },
  textOne: {
    lineHeight: getScreenHeight(2.5), // Add line height for text wrapping
    color: ColorPalette.GREY_TEXT_500,
    flexShrink: 1, // Allow text to shrink
  },
  textTwo: {
    color: ColorPalette.GREY_TEXT_300,
    lineHeight: getScreenHeight(1.8), // Add line height for text wrapping
    flexShrink: 1, // Allow text to shrink
  },
  verifyStepsContainer: {
    flexDirection: 'column',
    paddingHorizontal: getScreenWidth(2),
    paddingVertical: getScreenHeight(1.5),
    backgroundColor: ColorPalette.PRIMARY_WHITE_SELLER,
    borderRadius: getScreenWidth(3),
    minHeight: getScreenHeight(30), // Use min-height instead of fixed height
    maxHeight: getScreenHeight(40), // Add max-height constraint
  },
  OrderContainer: {
    borderRadius: getScreenWidth(3),
    backgroundColor: ColorPalette.White,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingVertical: getScreenHeight(1),
    width: '100%', // Ensure full width
  },
  menuContainer: {
    paddingVertical: getScreenHeight(2),
    width: '100%', // Ensure full width
  },
  leftIconBackgroundColor: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: getScreenHeight(1),
    borderRadius: getScreenWidth(2),
  },
  statsContainer: {
    flexDirection: 'column',
    gap: getScreenHeight(2),
    width: '100%', // Ensure full width
    padding: getScreenHeight(2),
    backgroundColor: ColorPalette.PURPLE_100,
    borderRadius: getScreenWidth(3),
  },
  containerOne: {
    flexDirection: 'row',
    gap: getScreenWidth(4),
    width: '100%', // Ensure full width
  },
  containerTwo: {
    flexDirection: 'row',
    gap: getScreenWidth(4),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', // Ensure full width
  },
  totalSales: {
    flex: 1, // Changed from flex: 2 to flex: 1 for better proportional scaling
    backgroundColor: ColorPalette.White,
    paddingVertical: getScreenHeight(2.9),
    paddingHorizontal: getScreenWidth(4), // Reduced padding
    borderRadius: getScreenWidth(4),
    flexDirection: 'column',
    gap: getScreenHeight(1.5), // Reduced gap
    shadowColor: '#cfc3c3',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
  },
  salesOne: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: getScreenWidth(2), // Reduced gap
  },
  salesTwo: {
    flexDirection: 'column',
    flexShrink: 1, // Allow content to shrink
  },
  iconBack: {
    borderRadius: getScreenWidth(2),
    padding: getScreenHeight(1),
    backgroundColor: 'rgba(31, 193, 107, 0.10)',
  },
  iconBackSale: {
    borderRadius: getScreenWidth(2),
    padding: getScreenHeight(1),
    backgroundColor: 'rgba(31, 193, 107, 0.10)',
  },
  iconBackOne: {
    borderRadius: getScreenWidth(2),
    padding: getScreenHeight(1),
    backgroundColor: 'rgba(145, 1, 207, 0.10)',
  },
  iconBackTwo: {
    borderRadius: getScreenWidth(1),
    padding: getScreenHeight(0.5),
    backgroundColor: 'rgba(208, 4, 22, 0.10)',
  },
  iconBackThree: {
    borderRadius: getScreenWidth(1),
    padding: getScreenHeight(0.5),
    backgroundColor: 'rgba(223, 180, 0, 0.10)',
  },
  countBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: getScreenWidth(1),
    flexShrink: 1, // Allow content to shrink
  },
  countText: {
    color: ColorPalette.RiseText,
  },
  countValue: {
    color: ColorPalette.GREY_TEXT_500,
    flexShrink: 1, // Allow content to shrink
  },
  countCaptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow text to wrap
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
    padding: getScreenHeight(1.5), // Reduced padding
    backgroundColor: ColorPalette.White,
    borderRadius: getScreenWidth(4),
    gap: getScreenWidth(3), // Reduced gap
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#cfc3c3',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
  },
  stockContainer: {
    flexDirection: 'column',
    gap: getScreenHeight(1),
    padding: getScreenHeight(1.5), // Reduced padding
    backgroundColor: ColorPalette.White,
    borderRadius: getScreenWidth(4),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    shadowColor: '#cfc3c3',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
  },
  salesOverview: {
    borderRadius: getScreenWidth(3),
    backgroundColor: ColorPalette.White,
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(3),
    flexDirection: 'column',
    gap: getScreenHeight(3),
    width: '100%', // Ensure full width
  },
  salesHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Ensure full width
  },
  LeftHeading: {
    flexDirection: 'column',
    flex: 1, // Allow it to take available space
  },
  rightHeadingButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: getScreenHeight(0.5),
    flexDirection: 'row',
    gap: getScreenWidth(1),
    backgroundColor: ColorPalette.SearchBack,
    borderRadius: Spacing.Medium,
  },
  salesGraph: {
    width: '100%', // Use percentage instead of fixed width
    height: getScreenHeight(30), // Adjusted height
    minHeight: getScreenHeight(20), // Add min-height
  },
  recentOrdersContainer: {
    flexDirection: 'column',
    paddingVertical: getScreenHeight(2.5),
    paddingHorizontal: getScreenWidth(3),
    gap: getScreenHeight(2.5),
    backgroundColor: ColorPalette.White,
    borderRadius: getScreenWidth(3),
    width: '100%', // Ensure full width
  },
  recentOrderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', // Ensure full width
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(1), // Add gap between text and icon
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
    gap: getScreenWidth(3), // Reduced gap
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed to flex-start for better alignment
    flexShrink: 1, // Allow content to shrink
  },
  containerAnother: {
    flexDirection: 'row',
    gap: getScreenWidth(4),
    width: '100%', // Ensure full width
  },
  containerAnotherOne: {
    flex: 1,
    flexDirection: 'column',
    gap: getScreenHeight(2),
  },
  containerProportional: {
    flexDirection: 'column',
    gap: getScreenHeight(2),
    flex: 0.5, // Allocate less space compared to containerAnotherOne
  },
  buttonStyles: {
    borderRadius: Spacing.XLarge,
  },
});
