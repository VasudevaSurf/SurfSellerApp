import { StyleSheet } from 'react-native';
import { ColorPalette } from '../../../../../config/colorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import { BorderRadius, Spacing } from '../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.SearchBack,
  },
  mainContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: getScreenHeight(1.2),
    paddingBottom: getScreenHeight(2),
  },

  // 🔹 Section items (old settings layout, still reusable)
  sectionItem: {
    flexDirection: 'column',
    backgroundColor: ColorPalette.White,
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
    gap: getScreenWidth(1),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    gap: getScreenHeight(0.5),
  },
  primaryText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  secondaryText: {
    color: ColorPalette.GREY_TEXT_300,
  },

  // 🔹 Toggle buttons
  toggleContainer: {
    height: getScreenHeight(4),
    backgroundColor: ColorPalette.White,
    borderRadius: BorderRadius.XLarge,
    gap: getScreenWidth(2.5),
  },
  toggleButton: {
    borderRadius: BorderRadius.Full,
    paddingVertical: getScreenHeight(1),
    paddingHorizontal: getScreenWidth(6),
    borderWidth: 1,
    borderColor: ColorPalette.GREY_TEXT_100,
  },
  toggleButtonText: {
    textAlign: 'center',
  },

  // 🔹 Input container (old layout, still reusable)
  mainInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ColorPalette.White,
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
  },

  // ==========================================================
  // 🔹 Tab Bar as segmented buttons
  tabBarContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: ColorPalette.White,
    // borderRadius: BorderRadius.XLarge,
    paddingTop: getScreenHeight(3),
    paddingBottom: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    marginBottom: getScreenHeight(1.8),
    marginTop: getScreenWidth(0),
    gap: Spacing.XXSmall,
  },
  tabButton: {
    // flex: 1,
    paddingHorizontal: getScreenWidth(6),
    alignItems: 'center',
    paddingVertical: getScreenHeight(2),
    borderRadius: BorderRadius.Small,
    backgroundColor: ColorPalette.SearchBack,
    // minWidth: getScreenWidth(20),
  },
  activeTabButton: {
    backgroundColor: ColorPalette.Black,
  },

  // 🔹 Notification card
  notificationCard: {
    backgroundColor: ColorPalette.White,
    borderRadius: BorderRadius.Medium,
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    marginBottom: getScreenHeight(1.5),
    shadowColor: 'rgba(16, 24, 40, 0.08)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: BorderRadius.Medium,
    elevation: 12,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingBottom: getScreenHeight(2),
    gap: getScreenWidth(12),
  },

  notificationTitle: {
    flex: 1,
    // marginRight: getScreenWidth(16),
    color: ColorPalette.Black,
    fontSize: 16,
    // width: '50%',
  },
  notificationTime: {
    color: ColorPalette.GREY_TEXT_100,
  },
  notificationDescription: {
    color: ColorPalette.GREY_TEXT_100,
    marginTop: 2,
    fontSize: 16,
    lineHeight: 22,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: getScreenWidth(6),
    marginBottom: getScreenHeight(16),
  },

  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    marginBottom: getScreenHeight(2),
  },

  emptyTitle: {
    marginBottom: getScreenHeight(1),
    fontSize: 22,
    color: ColorPalette.GREY_TEXT_500,
  },

  emptySubtitle: {
    color: ColorPalette.CreatedText,
    textAlign: 'center',
    lineHeight: 20,
  },

  emptyButton: {
    minWidth: getScreenWidth(90),
    borderRadius: BorderRadius.Small,
    color: ColorPalette.White,
  },

  customButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: ColorPalette.GREY_200,
    height: getScreenHeight(7),
    borderRadius: BorderRadius.Medium,
  },
  customText: {
    color: ColorPalette.GREY_TEXT_100,
  },
  swipeDeleteAction: {
    flex: 1, // fill available space
    justifyContent: 'center', // vertically center
    alignItems: 'flex-end', // align to the right
    backgroundColor: 'red', // red background
    paddingHorizontal: 20, // spacing on left/right
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: getScreenWidth(5),
  },
});

