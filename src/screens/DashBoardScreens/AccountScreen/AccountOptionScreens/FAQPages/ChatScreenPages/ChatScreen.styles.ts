import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import {BorderRadius} from '../../../../../../config/globalStyles';

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
    paddingHorizontal: getScreenWidth(4),
  },
  searchContainer: {
    padding: getScreenWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorPalette.White,
  },
  messageRow: {
    flexDirection: 'row',
    gap: getScreenWidth(1.5), // Consistent gap for both user and bot messages
    position: 'relative',
    paddingVertical: getScreenHeight(0.5),
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  botMessageRow: {
    justifyContent: 'flex-start',
  },
  avatarImage: {
    width: getScreenWidth(8),
    height: getScreenWidth(8),
    borderRadius: BorderRadius.Medium,
  },
  avatarPlaceholder: {
    width: getScreenWidth(8),
    height: getScreenWidth(8),
  },
  messageBubble: {
    maxWidth: '70%',
    padding: getScreenHeight(1.5),
    borderRadius: BorderRadius.Medium,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  botMessageBubble: {
    backgroundColor: ColorPalette.White,
    borderTopLeftRadius: getScreenWidth(1),
  },
  userMessageBubble: {
    backgroundColor: ColorPalette.PURPLE_300,
    borderTopRightRadius: getScreenWidth(1),
  },
  botMessageText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  userMessageText: {
    color: ColorPalette.White,
  },
  messageTime: {
    color: ColorPalette.GREY_TEXT_500,
    alignSelf: 'center',
  },
  userMessageTime: {
    marginRight: getScreenWidth(2.5),
  },
  botMessageTime: {
    marginLeft: getScreenWidth(2.5),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: ColorPalette.GREY_200,
    backgroundColor: ColorPalette.White,
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(1.5),
    gap: getScreenWidth(1.5),
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorPalette.SearchBack,
    borderRadius: BorderRadius.Full,
    paddingHorizontal: getScreenWidth(3),
    minHeight: getScreenHeight(8),
  },
  textInput: {
    flex: 1,
    paddingVertical: getScreenHeight(1.75),
  },
  sendButton: {
    width: getScreenWidth(10),
    height: getScreenWidth(10),
    borderRadius: BorderRadius.Full,
    backgroundColor: ColorPalette.PURPLE_300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickRepliesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: getScreenHeight(1),
    gap: getScreenWidth(2),
    paddingLeft: getScreenWidth(9.5),
  },
  quickReplyButton: {
    borderColor: ColorPalette.RED_100,
    borderWidth: 1,
    borderRadius: BorderRadius.Small,
    borderStyle: 'dashed',
    paddingHorizontal: getScreenWidth(3),
    paddingVertical: getScreenHeight(1),
  },
  quickReplyText: {
    color: ColorPalette.RED_100,
    textAlign: 'center',
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  uploadContainer: {
    width: getScreenWidth(10),
    height: getScreenWidth(10),
    borderRadius: BorderRadius.Full,
    backgroundColor: ColorPalette.SearchBack,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
