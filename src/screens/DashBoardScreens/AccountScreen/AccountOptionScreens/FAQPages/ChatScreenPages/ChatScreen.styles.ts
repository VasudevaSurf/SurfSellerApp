import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {
  getFigmaDimension,
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';

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
    gap: getFigmaDimension(10),
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
    gap: getFigmaDimension(6), // Consistent gap for both user and bot messages
    position: 'relative',
    paddingVertical: getFigmaDimension(4),
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  botMessageRow: {
    justifyContent: 'flex-start',
  },
  avatarImage: {
    width: getFigmaDimension(32),
    height: getFigmaDimension(32),
    borderRadius: 15,
  },
  avatarPlaceholder: {
    width: getFigmaDimension(32),
    height: getFigmaDimension(32),
  },
  messageBubble: {
    maxWidth: '70%',
    padding: getFigmaDimension(12),
    borderRadius: 16,
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
    borderTopLeftRadius: getFigmaDimension(4),
  },
  userMessageBubble: {
    backgroundColor: ColorPalette.PURPLE_300,
    borderTopRightRadius: getFigmaDimension(4),
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
    marginRight: getFigmaDimension(10),
  },
  botMessageTime: {
    marginLeft: getFigmaDimension(10),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: ColorPalette.GREY_200,
    backgroundColor: ColorPalette.White,
    paddingHorizontal: getFigmaDimension(16),
    paddingVertical: getFigmaDimension(12),
    gap: getFigmaDimension(6),
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorPalette.SearchBack,
    borderRadius: getFigmaDimension(48),
    paddingHorizontal: getFigmaDimension(12),
    minHeight: getFigmaDimension(64),
  },
  textInput: {
    flex: 1,
    paddingVertical: getFigmaDimension(14),
  },
  sendButton: {
    width: getFigmaDimension(40),
    height: getFigmaDimension(40),
    borderRadius: getFigmaDimension(80),
    backgroundColor: ColorPalette.PURPLE_300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickRepliesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: getFigmaDimension(8),
    gap: getFigmaDimension(8),
    paddingLeft: getFigmaDimension(38),
  },
  quickReplyButton: {
    borderColor: ColorPalette.RED_100,
    borderWidth: 1,
    borderRadius: getFigmaDimension(12),
    borderStyle: 'dashed',
    paddingHorizontal: getFigmaDimension(12),
    paddingVertical: getFigmaDimension(8),
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
    width: getFigmaDimension(40),
    height: getFigmaDimension(40),
    borderRadius: getFigmaDimension(80),
    backgroundColor: ColorPalette.SearchBack,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
