import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../config/colorPalette';
import {BorderRadius, Spacing} from '../../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    position: 'relative', // Add this to allow absolute positioning of children
  },
  scrollContent: {
    flexGrow: 1,
    gap: Spacing.Medium,
    paddingBottom: getScreenHeight(8),
    paddingHorizontal: getScreenWidth(4), // Add padding to ensure content doesn't get hidden behind the button
  },
  productCard: {
    backgroundColor: ColorPalette.White,
    paddingHorizontal: Spacing.Medium,
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.Medium,
    paddingBottom: Spacing.Medium,
    // Border radius removed as it will be handled by CustomSquircle
  },
  productCardContent: {
    paddingHorizontal: Spacing.Medium,
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.Medium,
    paddingBottom: Spacing.Medium,
  },
  productRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: Spacing.Medium,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: ColorPalette.GREY_300,
    paddingBottom: getScreenHeight(2),
  },
  imageContainer: {
    width: getScreenWidth(15.1),
    height: getScreenWidth(15.1),
    borderRadius: BorderRadius.XSmall,
    overflow: 'hidden',
    flexShrink: 0,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.XSmall,
    flex: 1,
    maxWidth: '70%',
    justifyContent: 'flex-start',
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  priceContainerOne: {
    minWidth: getScreenWidth(25),
    marginBottom: Spacing.XXSmall,
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.XSmall,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  downContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionContainer: {
    backgroundColor: ColorPalette.White,
    borderRadius: BorderRadius.XSmall,
    paddingVertical: Spacing.Medium,
    paddingHorizontal: Spacing.Medium,
  },
  accordionWrapper: {
    overflow: 'hidden',
    marginBottom: Spacing.XSmall,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getScreenHeight(2.5),
    paddingHorizontal: getScreenHeight(2),
    // Remove backgroundColor as it's handled by CustomSquircle
  },
  accordionContent: {
    paddingVertical: Spacing.Small,
    paddingHorizontal: Spacing.Medium,
    paddingBottom: Spacing.Medium,
    marginTop: -Spacing.XSmall,
    // Remove backgroundColor and borderRadius as they're handled by CustomSquircle
  },
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: getScreenHeight(2),
    backgroundColor: ColorPalette.White,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerContainer: {
    paddingVertical: getScreenHeight(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderNumberText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  dateTimeText: {
    color: ColorPalette.GREY_TEXT_300,
  },
});
