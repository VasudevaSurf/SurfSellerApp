import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../config/colorPalette';
import {BorderRadius, Spacing} from '../../../../config/globalStyles';
import {getScreenWidth} from '../../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: Spacing.XSmall,
    paddingHorizontal: Spacing.Medium,
    gap: Spacing.Medium,
  },
  productCard: {
    backgroundColor: ColorPalette.White,
    padding: Spacing.Medium,
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.Medium,
    borderRadius: BorderRadius.XSmall,
  },
  productRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: Spacing.Medium,
    alignItems: 'center',
  },
  imageContainer: {
    width: getScreenWidth(25),
    height: getScreenWidth(25),
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
    overflow: 'hidden',
    justifyContent: 'center',
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
    gap: Spacing.XSmall,
  },
  sectionContainer: {
    backgroundColor: ColorPalette.White,
    borderRadius: BorderRadius.XSmall,
    paddingVertical: Spacing.Medium,
    paddingHorizontal: Spacing.Medium,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ColorPalette.White,
    borderRadius: BorderRadius.XSmall,
    paddingVertical: Spacing.Medium,
    paddingHorizontal: Spacing.Medium,
  },
  accordionContent: {
    backgroundColor: ColorPalette.White,
    paddingVertical: Spacing.Small,
    paddingHorizontal: Spacing.Medium,
    paddingBottom: Spacing.Medium,
    marginTop: -Spacing.XSmall,
    borderBottomLeftRadius: BorderRadius.XSmall,
    borderBottomRightRadius: BorderRadius.XSmall,
  },
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.XSmall,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.Medium,
  },
});
