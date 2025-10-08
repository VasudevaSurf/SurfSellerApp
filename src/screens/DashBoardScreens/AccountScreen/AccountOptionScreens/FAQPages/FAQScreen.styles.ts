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
    // gap: getScreenHeight(1.2),
    // marginTop: getScreenHeight(1.2),
    // paddingBottom: getScreenHeight(5),
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
  containerStyle: {
    paddingHorizontal: getScreenWidth(1),
    backgroundColor: ColorPalette.White,
    paddingTop: getScreenHeight(2),
    paddingBottom: getScreenHeight(1),
    gap: getScreenHeight(1),
  },
  menuContainer: {
    width: '100%',
    gap: getScreenHeight(1),
  },
  ChatWithUsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(1),
    marginBottom: getScreenHeight(4)
  },
  captionTwo: {
    color: ColorPalette.GREY_TEXT_500,
    textAlign: 'center',
  },
});
