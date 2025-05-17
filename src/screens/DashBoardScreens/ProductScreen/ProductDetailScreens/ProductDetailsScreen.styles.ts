import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.BG,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: getScreenHeight(4),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: getScreenWidth(5),
  },
  floatingProductNameContainer: {
    position: 'absolute',
    top: getScreenHeight(5),
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    paddingHorizontal: getScreenWidth(12),
  },
  floatingProductName: {
    color: ColorPalette.AgreeTerms,
  },
  imageSection: {
    width: '100%',
    height: getScreenHeight(35),
    backgroundColor: ColorPalette.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },
  carouselImageContainer: {
    height: getScreenHeight(35),
    justifyContent: 'center',
    alignItems: 'center',
    padding: getScreenWidth(5),
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    width: '100%',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ColorPalette.GREY_300,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: ColorPalette.ProgressLine,
    width: 16,
    height: 8,
    borderRadius: 4,
  },
  infoSection: {
    padding: getScreenWidth(5),
    backgroundColor: ColorPalette.WHITE,
    marginTop: getScreenHeight(2),
    borderRadius: 12,
    marginHorizontal: getScreenWidth(2),
  },
  productHeader: {
    marginBottom: getScreenHeight(2),
  },
  nameAndPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getScreenHeight(2),
  },
  productNameText: {
    color: ColorPalette.AgreeTerms,
    flex: 1,
    marginRight: getScreenWidth(2),
  },
  priceText: {
    color: ColorPalette.ProgressLine,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getScreenHeight(2),
    borderTopWidth: 1,
    borderTopColor: ColorPalette.GREY_100,
  },
  detailItem: {
    marginBottom: getScreenHeight(2.5),
  },
  labelText: {
    color: ColorPalette.GREY_TEXT_400,
    marginBottom: getScreenHeight(1),
  },
  valueText: {
    color: ColorPalette.AgreeTerms,
  },
  categoriesWrapper: {
    marginBottom: getScreenHeight(2),
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: getScreenHeight(0.5),
  },
  categoryTag: {
    backgroundColor: ColorPalette.GREY_100,
    paddingHorizontal: getScreenWidth(3),
    paddingVertical: getScreenHeight(0.7),
    borderRadius: 16,
    marginRight: getScreenWidth(2),
    marginBottom: getScreenHeight(1),
    borderWidth: 1,
    borderColor: ColorPalette.GREY_200,
  },
  categoryText: {
    color: ColorPalette.GREY_TEXT_700,
    fontSize: 12,
  },
  infoCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getScreenHeight(1),
  },
  infoCard: {
    width: '48%',
    backgroundColor: ColorPalette.SearchBack,
    padding: getScreenWidth(3),
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ColorPalette.GREY_100,
  },
  infoCardIconContainer: {
    marginBottom: getScreenHeight(1),
  },
  infoCardLabel: {
    color: ColorPalette.GREY_TEXT_400,
    marginBottom: getScreenHeight(0.5),
    textAlign: 'center',
  },
  infoCardValue: {
    color: ColorPalette.AgreeTerms,
    textAlign: 'center',
    fontSize: 16,
  },
  sectionHeader: {
    marginBottom: getScreenHeight(2.5),
  },
  sectionHeaderText: {
    color: ColorPalette.AgreeTerms,
    marginBottom: getScreenHeight(1),
  },
  divider: {
    height: 1,
    backgroundColor: ColorPalette.GREY_100,
    width: '100%',
  },
  inventoryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getScreenHeight(2.5),
  },
  inventoryCard: {
    width: '31%',
    backgroundColor: ColorPalette.BG,
    padding: getScreenWidth(2),
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ColorPalette.GREY_100,
  },
  inventoryLabel: {
    color: ColorPalette.GREY_TEXT_400,
    marginBottom: getScreenHeight(0.5),
    textAlign: 'center',
    fontSize: 11,
  },
  inventoryValue: {
    color: ColorPalette.AgreeTerms,
    textAlign: 'center',
  },
  platformFeeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(3),
    backgroundColor: ColorPalette.GREY_50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ColorPalette.GREY_100,
  },
  platformFeeValue: {
    color: ColorPalette.Success,
  },
  additionalInfoLabel: {
    fontSize: 14,
    color: ColorPalette.GREY_TEXT_600,
    marginBottom: getScreenHeight(1.5),
  },
  htmlContentWrapper: {
    backgroundColor: ColorPalette.GREY_50,
    padding: getScreenWidth(3),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ColorPalette.GREY_100,
  },
  promoTextContainer: {
    backgroundColor: ColorPalette.GREY_50,
    padding: getScreenWidth(3),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ColorPalette.GREY_100,
  },
  promoTextValue: {
    color: ColorPalette.GREY_TEXT_700,
    lineHeight: 20,
  },
  descriptionContainer: {
    marginTop: getScreenHeight(1),
    backgroundColor: ColorPalette.GREY_50,
    padding: getScreenWidth(3),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ColorPalette.GREY_100,
  },
  toggleLabel: {
    fontSize: 14,
    color: ColorPalette.GREY_TEXT_400,
    marginRight: getScreenWidth(2),
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerIcon: {
    padding: 4,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
    padding: 12,
    marginVertical: 8,
  },
  saveButtonContainer: {
    padding: 16,
    backgroundColor: ColorPalette.White,
    borderTopWidth: 1,
    borderTopColor: ColorPalette.GrayLight,
  },
  editableField: {
    backgroundColor: ColorPalette.White,
    borderWidth: 1,
    borderColor: ColorPalette.Gray,
    borderRadius: 4,
    padding: 8,
    marginVertical: 4,
  },
});
