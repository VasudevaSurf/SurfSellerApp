import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../../config/colorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import {BorderRadius} from '../../../../../config/globalStyles';

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
    gap: getScreenHeight(1.5),
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
    paddingVertical: getScreenHeight(2.5),
    paddingHorizontal: getScreenWidth(4),
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
    paddingVertical: getScreenHeight(2.5),
    paddingHorizontal: getScreenWidth(8),
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.GREY_200,
  },
  menuItemText: {
    color: ColorPalette.GREY_TEXT_500,
    flex: 1,
    marginRight: getScreenWidth(10),
  },
  floatingChatButton: {
    position: 'absolute',
    bottom: getScreenHeight(8),
    right: getScreenWidth(5),
    borderRadius: BorderRadius.Full,
    backgroundColor: ColorPalette.PURPLE_300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: getScreenHeight(1.5),
  },
});
