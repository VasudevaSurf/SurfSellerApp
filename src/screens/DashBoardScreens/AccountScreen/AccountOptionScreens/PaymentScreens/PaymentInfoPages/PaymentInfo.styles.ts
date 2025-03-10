import {StyleSheet} from 'react-native';
import {
  getScreenWidth,
  getScreenHeight,
} from '../../../../../../helpers/screenSize';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {BorderRadius} from '../../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  scrollContent: {
    gap: getScreenWidth(4),
    flexGrow: 1,
  },
  // Stripe Connect Section
  stripEditContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ColorPalette.White,
    padding: getScreenWidth(4),
  },
  stripEditContainerOne: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: getScreenWidth(3),
    gap: getScreenWidth(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenWidth(1),
  },
  connectContainerOne: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(1.5),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  statusIcon: {
    width: getScreenWidth(4),
    height: getScreenWidth(4),
  },
  editButton: {
    marginRight: getScreenWidth(3),
  },

  // Balance Section
  withdrawContainer: {
    padding: getScreenWidth(4),
    backgroundColor: ColorPalette.White,
  },
  bgContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: getScreenHeight(3),
    paddingHorizontal: getScreenWidth(3),
    backgroundColor: 'rgba(145, 1, 207, 0.10)',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: BorderRadius.Small,
  },
  walletBalanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletBalanceContainerOne: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenWidth(0.5),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  withdrawButton: {
    width: getScreenWidth(26),
    height: getScreenHeight(4),
    borderRadius: BorderRadius.Full,
    paddingHorizontal: getScreenWidth(2.5),
  },
  withdrawButtonText: {
    fontSize: getScreenWidth(3),
  },

  // Tab Navigation
  tabsContainer: {
    backgroundColor: ColorPalette.White,
    flex: 1,
    paddingVertical: getScreenHeight(1.5),
  },
  tabView: {
    backgroundColor: ColorPalette.White,
    flex: 1,
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
  },
  tab: {
    width: 'auto',
  },
  tabButton: {
    paddingVertical: getScreenHeight(1),
    paddingHorizontal: getScreenWidth(13),
    borderRadius: BorderRadius.XSmall,
    backgroundColor: 'transparent',
  },
  activeTabButton: {
    backgroundColor: ColorPalette.ProgressLine,
  },

  // Tab Content
  divider: {
    height: getScreenHeight(2),
    backgroundColor: ColorPalette.SearchBack,
    marginTop: getScreenHeight(1),
  },
  tabContent: {
    padding: getScreenWidth(2.5),
    backgroundColor: ColorPalette.White,
  },
  sectionTitle: {
    color: ColorPalette.GREY_TEXT_500,
    marginBottom: getScreenHeight(2),
  },
  slidingBarContainer: {
    marginBottom: getScreenHeight(1),
  },

  // History Items
  payoutsList: {
    marginTop: getScreenHeight(1),
  },
  payoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: getScreenHeight(2.5),
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.GREY_100,
  },
  payoutItemLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: getScreenHeight(0.5),
  },
  payoutItemHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(1),
  },
  payoutItemRight: {
    alignItems: 'center',
    gap: getScreenHeight(0.5),
    justifyContent: 'center',
  },
  statusBadge: {
    paddingVertical: getScreenHeight(0.25),
    paddingHorizontal: getScreenWidth(2),
    borderRadius: BorderRadius.Small,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: getScreenHeight(5),
  },
  customButton: {
    borderWidth: 1,
    borderColor: ColorPalette.PURPLE_300,
  },
});
