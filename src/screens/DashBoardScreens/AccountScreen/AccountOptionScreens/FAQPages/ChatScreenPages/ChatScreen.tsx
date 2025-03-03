import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowLeftIcon from '../../../../../../assets/icons/ArrowLeftIcon';
import ImageUploadIcon from '../../../../../../assets/icons/ImageUploadIcon';
import SendIcon from '../../../../../../assets/icons/SendIcon';
import {Header} from '../../../../../../components/UserComponents/Header/Header';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {getScreenHeight} from '../../../../../../helpers/screenSize';
import {goBack} from '../../../../../../navigation/utils/navigationRef';
import {styles} from './ChatScreen.styles';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef(null);

  const initialMessages = [
    {
      id: 1,
      text: 'Hello Aditya, welcome to the Surf chatbot!',
      time: '2:30 pm',
      isUser: false,
    },
    {
      id: 2,
      text: 'How can we help you today?',
      time: '2:30 pm',
      isUser: false,
    },
  ];

  const [messages, setMessages] = useState(initialMessages);

  const quickReplies = [
    {id: 1, text: 'Contact customer care'},
    {id: 2, text: 'Payment issue'},
    {id: 3, text: "Can't list my product"},
    {id: 4, text: 'App not working?'},
    {id: 5, text: 'Account suspended'},
  ];

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({animated: true});
      }, 100);
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isUser: true,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const isSameSenderAsPrevious = index => {
    if (index === 0) return false;
    return messages[index].isUser === messages[index - 1].isUser;
  };

  const handleQuickReplyPress = replyText => {
    setMessage(replyText);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name="Surf Chatbot"
        variant={TypographyVariant.PMEDIUM_REGULAR}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={
          <ArrowLeftIcon style={undefined} size={15} onPress={goBack} />
        }
        rightIcons={null}
        subHeader
        subText="Active"
      />

      <View style={styles.mainContainer}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollViewContainer}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingTop: getScreenHeight(2)},
          ]}
          showsVerticalScrollIndicator={false}>
          {messages.map((msg, index) => (
            <View
              key={msg.id}
              style={[
                styles.messageRow,
                msg.isUser ? styles.userMessageRow : styles.botMessageRow,
              ]}>
              {/* For bot messages */}
              {!msg.isUser && !isSameSenderAsPrevious(index) && (
                <Image
                  source={require('../../../../../../assets/images/logo.png')}
                  style={styles.avatarImage}
                />
              )}

              {!msg.isUser && isSameSenderAsPrevious(index) && (
                <View style={styles.avatarPlaceholder} />
              )}

              {/* User message time (left side) */}
              {msg.isUser && (
                <Typography
                  variant={TypographyVariant.LXSMALL_REGULAR}
                  customTextStyles={[
                    styles.messageTime,
                    styles.userMessageTime,
                  ]}
                  text={msg.time}
                />
              )}

              {/* Message bubble */}
              <View
                style={[
                  styles.messageBubble,
                  msg.isUser
                    ? styles.userMessageBubble
                    : styles.botMessageBubble,
                ]}>
                <Typography
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={[
                    msg.isUser ? styles.userMessageText : styles.botMessageText,
                  ]}
                  text={msg.text}
                />
              </View>

              {/* Bot message time (right side) */}
              {!msg.isUser && (
                <Typography
                  variant={TypographyVariant.LXSMALL_REGULAR}
                  customTextStyles={[styles.messageTime, styles.botMessageTime]}
                  text={msg.time}
                />
              )}

              {/* For user messages */}
              {msg.isUser && !isSameSenderAsPrevious(index) && (
                <Image
                  source={require('../../../../../../assets/images/placeholder-profile.png')}
                  style={styles.avatarImage}
                />
              )}

              {msg.isUser && isSameSenderAsPrevious(index) && (
                <View style={styles.avatarPlaceholder} />
              )}
            </View>
          ))}

          <View style={styles.quickRepliesContainer}>
            {quickReplies.map(reply => (
              <TouchableOpacity
                key={reply.id}
                style={styles.quickReplyButton}
                onPress={() => handleQuickReplyPress(reply.text)}>
                <Typography
                  variant={TypographyVariant.PXSMALL_REGULAR}
                  customTextStyles={styles.quickReplyText}
                  text={reply.text}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}>
        <View style={styles.uploadContainer}>
          <ImageUploadIcon style={undefined} />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Write your message here..."
            value={message}
            onChangeText={setMessage}
            multiline={true}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <SendIcon size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
