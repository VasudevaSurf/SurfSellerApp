import {StyleSheet} from 'react-native';
import {
  getScreenWidth,
  getScreenHeight,
  getFigmaDimension,
} from '../../../../../../helpers/screenSize';
import {ColorPalette} from '../../../../../../config/colorPalette';

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
    padding: getFigmaDimension(16),
  },
  stripEditContainerOne: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: getFigmaDimension(12),
    gap: getFigmaDimension(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(4),
  },
  connectContainerOne: {
    display: 'flex',
    flexDirection: 'row',
    gap: getFigmaDimension(6),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  statusIcon: {
    width: getFigmaDimension(16),
    height: getFigmaDimension(16),
  },
  editButton: {
    marginRight: getFigmaDimension(12),
  },

  // Balance Section
  withdrawContainer: {
    padding: getFigmaDimension(16),
    backgroundColor: ColorPalette.White,
  },
  bgContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: getFigmaDimension(24),
    paddingHorizontal: getFigmaDimension(12),
    backgroundColor: 'rgba(145, 1, 207, 0.10)',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: getFigmaDimension(12),
  },
  walletBalanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: getFigmaDimension(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletBalanceContainerOne: {
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(2),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  withdrawButton: {
    width: getFigmaDimension(102),
    height: getFigmaDimension(36),
    borderRadius: getFigmaDimension(18),
    paddingHorizontal: getFigmaDimension(10),
  },
  withdrawButtonText: {
    fontSize: getFigmaDimension(12),
  },

  // Tab Navigation
  tabsContainer: {
    backgroundColor: ColorPalette.White,
    flex: 1,
    paddingVertical: getFigmaDimension(12),
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
    paddingVertical: getFigmaDimension(12),
    paddingHorizontal: getFigmaDimension(48),
    borderRadius: getFigmaDimension(8),
    backgroundColor: 'transparent',
  },
  activeTabButton: {
    backgroundColor: '#000000',
  },

  // Tab Content
  divider: {
    height: getScreenHeight(2),
    backgroundColor: ColorPalette.SearchBack,
    marginTop: getFigmaDimension(10),
  },
  tabContent: {
    padding: getFigmaDimension(10),
    backgroundColor: ColorPalette.White,
    paddingVertical: getFigmaDimension(16),
  },
  sectionTitle: {
    color: ColorPalette.GREY_TEXT_500,
    marginBottom: getFigmaDimension(16),
  },
  slidingBarContainer: {
    marginBottom: getFigmaDimension(8),
  },

  // History Items
  payoutsList: {
    marginTop: getFigmaDimension(8),
  },
  payoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: getFigmaDimension(20),
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.GREY_100,
  },
  payoutItemLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: getFigmaDimension(4),
  },
  payoutItemHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getFigmaDimension(4),
  },
  payoutItemRight: {
    alignItems: 'center',
    gap: getFigmaDimension(4),
    justifyContent: 'center',
  },
  statusBadge: {
    paddingVertical: getFigmaDimension(2),
    paddingHorizontal: getFigmaDimension(8),
    borderRadius: getFigmaDimension(12),
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: getFigmaDimension(40),
  },
  customButton: {
    borderWidth: 1,
    borderColor: ColorPalette.PURPLE_300,
  },
});
