import { StyleSheet } from 'react-native';
import { ColorPalette } from '../../../../../../config/colorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import { BorderRadius } from '../../../../../../config/globalStyles';

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
    flexDirection: 'column',
    flexGrow: 1,
    gap: getScreenHeight(1),
    paddingHorizontal: getScreenWidth(4),
  },
  messageRow: {
    flexDirection: 'row',
    gap: getScreenWidth(1.5),
    alignItems: 'flex-end',
  },
  diffSenderSpacing: {
    marginTop: getScreenHeight(2),
  },
  userMessageRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  botMessageRow: {
    flexDirection: 'row',
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  botMessageBubble: {
    backgroundColor: ColorPalette.White,
    borderRadius: BorderRadius.Medium,
  },
  botMessageFirstBubble: {
    borderTopLeftRadius: getScreenWidth(1),
  },
  userMessageBubble: {
    backgroundColor: ColorPalette.PURPLE_300,
    borderRadius: BorderRadius.Medium,
  },
  userMessageFirstBubble: {
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
    gap: getScreenWidth(2),
    alignItems: 'flex-start',
  },
  quickReplyButton: {
    borderColor: ColorPalette.RED_100,
    borderWidth: 1,
    borderRadius: BorderRadius.Full,
    borderStyle: 'dashed',
    paddingHorizontal: getScreenWidth(3),
    paddingVertical: getScreenHeight(1),
  },
  quickReplyText: {
    color: ColorPalette.RED_100,
    textAlign: 'center',
  },
  uploadContainer: {
    width: getScreenWidth(11),
    height: getScreenWidth(11),
    borderRadius: BorderRadius.Full,
    backgroundColor: ColorPalette.SearchBack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickRepliesSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: getScreenWidth(1.5),
    marginTop: getScreenHeight(2.2),
  },
});
