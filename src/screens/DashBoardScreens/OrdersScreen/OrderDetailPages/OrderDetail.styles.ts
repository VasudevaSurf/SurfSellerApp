import {StyleSheet} from 'react-native';
import {
  getFigmaDimension,
  getScreenHeight,
  getScreenWidth,
} from '../../../../helpers/screenSize';
import {ColorPalette} from '../../../../config/colorPalette';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: getFigmaDimension(8),
    paddingHorizontal: getFigmaDimension(16),
    gap: getFigmaDimension(16),
  },
  productCard: {
    backgroundColor: ColorPalette.White,
    padding: getFigmaDimension(16),
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(16),
    borderRadius: getFigmaDimension(8),
  },
  productRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: getFigmaDimension(16),
    alignItems: 'center',
  },
  imageContainer: {
    width: getScreenWidth(25),
    height: getScreenWidth(25),
    borderRadius: getScreenWidth(2),
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
    gap: getFigmaDimension(8),
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Allow wrapping if needed
  },
  priceContainerOne: {
    minWidth: getScreenWidth(25), // Ensure minimum width
    marginBottom: getFigmaDimension(4), // Add spacing when wrapped
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(8),
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  downContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(8),
  },
  sectionContainer: {
    backgroundColor: ColorPalette.White,
    borderRadius: getFigmaDimension(8),
    paddingVertical: getFigmaDimension(16),
    paddingHorizontal: getFigmaDimension(16),
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ColorPalette.White,
    borderRadius: getFigmaDimension(8),
    paddingVertical: getFigmaDimension(16),
    paddingHorizontal: getFigmaDimension(16),
  },
  accordionContent: {
    backgroundColor: ColorPalette.White,
    paddingVertical: getFigmaDimension(12),
    paddingHorizontal: getFigmaDimension(16),
    paddingBottom: getFigmaDimension(16),
    marginTop: -getFigmaDimension(8),
    borderBottomLeftRadius: getFigmaDimension(8),
    borderBottomRightRadius: getFigmaDimension(8),
  },
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(8),
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(16),
  },
});
