import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../../config/colorPalette';
import {
  getFigmaDimension,
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.White,
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
    gap: getFigmaDimension(12),
  },
  searchContainer: {
    padding: getScreenWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorPalette.White,
  },
  categoryContainer: {
    width: '100%',
  },
  titleContainer: {
    paddingVertical: getFigmaDimension(20),
    paddingHorizontal: getFigmaDimension(16),
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.GREY_200,
  },
  categoryTitle: {
    color: ColorPalette.Black,
  },
  faqItemsContainer: {
    overflow: 'hidden',
  },
  menuItemContainer: {
    paddingVertical: getFigmaDimension(20),
    paddingHorizontal: getFigmaDimension(32),
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.GREY_200,
  },
  menuItemText: {
    color: ColorPalette.GREY_TEXT_500,
    flex: 1,
    marginRight: getFigmaDimension(40),
  },
  floatingChatButton: {
    position: 'absolute',
    bottom: getScreenHeight(8),
    right: getScreenWidth(5),
    borderRadius: getFigmaDimension(48),
    backgroundColor: ColorPalette.PURPLE_300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: getFigmaDimension(12),
  },
});
