import React, { useEffect, useRef, useState } from 'react';
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
import { Header } from '../../../../../../components/UserComponents/Header/Header';
import { Typography } from '../../../../../../components/UserComponents/Typography/Typography';
import { TypographyVariant } from '../../../../../../components/UserComponents/Typography/Typography.types';
import { ColorPalette } from '../../../../../../config/colorPalette';
import { styles } from './ChatScreen.styles';
import { goBack } from '../../../../../../navigation/utils/navigationRef';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef(null);

  const initialMessages = [
    {
      id: 1,
      text: 'Hi there! I’m Lucy from Surf.',
      time: '2:30 pm',
      isUser: false,
    },
    {
      id: 2,
      text: 'I’m here to help you with seller registration, account setup, or any questions about selling on Surf.',
      time: '2:30 pm',
      isUser: false,
    },
    {
      id: 2,
      text: 'How can I assist you today?',
      time: '2:30 pm',
      isUser: false,
    },
  ];

  const [messages, setMessages] = useState(initialMessages);

  const quickReplies = [
    { id: 1, text: 'Contact customer care' },
    { id: 2, text: 'Payment issue' },
    { id: 3, text: "Can't list my product" },
    { id: 4, text: 'App not working?' },
    { id: 5, text: 'Account suspended' },
  ];

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
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

  const isFirstInGroup = (messages, index) => {
    if (index === 0) return true;
    return messages[index].isUser !== messages[index - 1].isUser;
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
        leftIcon={<ArrowLeftIcon size={15} onPress={goBack} />}
        rightIcons={null}
        subHeader
        subText="Active"
      />

      <View style={styles.mainContainer}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollViewContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, index) => {
            const prevMsg = messages[index - 1];
            const sameSenderAsPrev = prevMsg && prevMsg.isUser === msg.isUser;
            const firstInGroup = isFirstInGroup(messages, index);

            return (
              <View
                key={index}
                style={[
                  styles.messageRow,
                  msg.isUser ? styles.userMessageRow : styles.botMessageRow,
                  sameSenderAsPrev
                    ? null
                    : styles.diffSenderSpacing,
                ]}
              >
                {firstInGroup ? (
                  <Image
                    source={
                      msg.isUser
                        ? require('../../../../../../assets/images/placeholder-profile.png')
                        : require('../../../../../../assets/images/logo.png')
                    }
                    style={styles.avatarImage}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder} />
                )}

                <View
                  style={[
                    styles.messageBubble,
                    msg.isUser
                      ? styles.userMessageBubble
                      : styles.botMessageBubble,
                    firstInGroup &&
                      (msg.isUser
                        ? styles.userMessageFirstBubble
                        : styles.botMessageFirstBubble),
                  ]}
                >
                  <Typography
                    variant={TypographyVariant.PSMALL_REGULAR}
                    customTextStyles={
                      msg.isUser
                        ? styles.userMessageText
                        : styles.botMessageText
                    }
                    text={msg.text}
                  />
                </View>

                <Typography
                  variant={TypographyVariant.LXSMALL_REGULAR}
                  customTextStyles={[
                    styles.messageTime,
                    msg.isUser
                      ? styles.userMessageTime
                      : styles.botMessageTime,
                  ]}
                  text={msg.time}
                />
              </View>
            );
          })}

          <View style={styles.quickRepliesSection}>
            <Image
              source={require('../../../../../../assets/images/logo.png')}
              style={styles.avatarImage}
            />
            <View style={styles.quickRepliesContainer}>
              {quickReplies.map(reply => (
                <TouchableOpacity
                  key={reply.id}
                  style={styles.quickReplyButton}
                  onPress={() => handleQuickReplyPress(reply.text)}
                >
                  <Typography
                    variant={TypographyVariant.PXSMALL_REGULAR}
                    customTextStyles={styles.quickReplyText}
                    text={reply.text}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.uploadContainer}>
          <ImageUploadIcon />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Write your message here..."
            value={message}
            onChangeText={setMessage}
            multiline
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
