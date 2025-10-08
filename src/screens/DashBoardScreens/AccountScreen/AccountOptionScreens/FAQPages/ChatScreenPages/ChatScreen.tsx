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
  ActivityIndicator,
  Linking,
  Text,
} from 'react-native';
import ArrowLeftIcon from '../../../../../../assets/icons/ArrowLeftIcon';
import ImageUploadIcon from '../../../../../../assets/icons/ImageUploadIcon';
import SendIcon from '../../../../../../assets/icons/SendIcon';
import {Header} from '../../../../../../components/UserComponents/Header/Header';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {styles} from './ChatScreen.styles';
import {goBack} from '../../../../../../navigation/utils/navigationRef';
import geminiService, {Message} from '../../../../../../services/geminiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@lucy_chat_history';

// Custom component to render text with clickable links and markdown formatting
const MessageText = ({text, isUser}: {text: string; isUser: boolean}) => {
  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
  };

  // Parse text for both URLs and markdown bold
  const parseText = (inputText: string) => {
    const elements: JSX.Element[] = [];
    let currentIndex = 0;

    // Combined regex for URLs and bold markdown
    const combinedRegex = /(https?:\/\/[^\s]+)|(\*\*[^*]+\*\*)/g;
    let match;

    while ((match = combinedRegex.exec(inputText)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        elements.push(
          <Text key={`text-${currentIndex}`}>
            {inputText.substring(currentIndex, match.index)}
          </Text>,
        );
      }

      // Check if it's a URL or bold text
      if (match[1]) {
        // It's a URL
        const url = match[1];
        elements.push(
          <Text
            key={`link-${match.index}`}
            style={{
              color: isUser ? '#FFFFFF' : ColorPalette.PURPLE_300,
              textDecorationLine: 'underline',
              fontWeight: '600',
            }}
            onPress={() => handleLinkPress(url)}>
            {url}
          </Text>,
        );
      } else if (match[2]) {
        // It's bold text (remove the ** markers)
        const boldText = match[2].replace(/\*\*/g, '');
        elements.push(
          <Text key={`bold-${match.index}`} style={{fontWeight: 'bold'}}>
            {boldText}
          </Text>,
        );
      }

      currentIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (currentIndex < inputText.length) {
      elements.push(
        <Text key={`text-${currentIndex}`}>
          {inputText.substring(currentIndex)}
        </Text>,
      );
    }

    return elements;
  };

  return (
    <Text
      style={[
        isUser ? styles.userMessageText : styles.botMessageText,
        {fontSize: 14, lineHeight: 20},
      ]}>
      {parseText(text)}
    </Text>
  );
};

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  const initialGreeting: Message = {
    id: '0',
    text: "Hi there! I'm Lucy from Surf.",
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    isUser: false,
    timestamp: Date.now(),
  };

  const initialMessage: Message = {
    id: '1',
    text: "I'm here to help you with seller registration, account setup, or any questions about selling on Surf. How can I assist you today?",
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    isUser: false,
    timestamp: Date.now(),
  };

  const quickReplies = [
    {id: 1, text: 'How do I register as a seller?'},
    {id: 2, text: 'What commission does Surf charge?'},
    {id: 3, text: 'How do I upload products?'},
    {id: 4, text: 'When will I receive payouts?'},
    {id: 5, text: 'Contact support'},
  ];

  // Load chat history on mount
  useEffect(() => {
    loadChatHistory();
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    if (scrollViewRef.current && messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({animated: true});
      }, 100);
    }
  }, [messages]);

  const loadChatHistory = async () => {
    try {
      setIsLoading(true);
      const storedMessages = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedMessages) {
        const parsedMessages: Message[] = JSON.parse(storedMessages);
        setMessages(parsedMessages);
        // Hide quick replies if there are existing messages (user has interacted before)
        if (parsedMessages.length > 2) {
          setShowQuickReplies(false);
        }
      } else {
        // First time - show initial messages
        setMessages([initialGreeting, initialMessage]);
        setShowQuickReplies(true);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      setMessages([initialGreeting, initialMessage]);
      setShowQuickReplies(true);
    } finally {
      setIsLoading(false);
    }
  };

  const saveChatHistory = async (updatedMessages: Message[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || message.trim();
    if (!textToSend || isSending) return;

    // Hide quick replies after first message
    if (showQuickReplies) {
      setShowQuickReplies(false);
    }

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      text: textToSend,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isUser: true,
      timestamp: Date.now(),
    };

    // Add user message immediately
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setMessage('');
    setIsSending(true);

    try {
      // Get response from Gemini
      const response = await geminiService.sendMessage(textToSend);

      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        text: response,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isUser: false,
        timestamp: Date.now(),
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      await saveChatHistory(finalMessages);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again or contact our support team at sales@surf.mt or WhatsApp: +356 7965 0714",
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isUser: false,
        timestamp: Date.now(),
      };

      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      await saveChatHistory(finalMessages);
    } finally {
      setIsSending(false);
    }
  };

  const isFirstInGroup = (index: number) => {
    if (index === 0) return true;
    return messages[index].isUser !== messages[index - 1].isUser;
  };

  const handleQuickReplyPress = (replyText: string) => {
    // Directly send the message instead of just filling the input
    sendMessage(replyText);
  };

  // Render content
  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={ColorPalette.PURPLE_300} />
          <Typography
            variant={TypographyVariant.PSMALL_REGULAR}
            text="Loading chat..."
            customTextStyles={{
              marginTop: 10,
              color: ColorPalette.GREY_TEXT_500,
            }}
          />
        </View>
      );
    }

    return (
      <>
        <View style={styles.mainContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollViewContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {messages.map((msg, index) => {
              const prevMsg = messages[index - 1];
              const sameSenderAsPrev = prevMsg && prevMsg.isUser === msg.isUser;
              const firstInGroup = isFirstInGroup(index);

              return (
                <View
                  key={msg.id}
                  style={[
                    styles.messageRow,
                    msg.isUser ? styles.userMessageRow : styles.botMessageRow,
                    sameSenderAsPrev ? null : styles.diffSenderSpacing,
                  ]}>
                  {firstInGroup ? (
                    msg.isUser ? (
                      <View
                        style={[
                          styles.avatarImage,
                          {
                            backgroundColor: ColorPalette.PURPLE_300,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100,
                          },
                        ]}>
                        <Typography
                          variant={TypographyVariant.PMEDIUM_BOLD}
                          text="👤"
                          customTextStyles={{
                            fontSize: 20,
                            color: ColorPalette.White,
                          }}
                        />
                      </View>
                    ) : (
                      <Image
                        source={require('../../../../../../assets/images/logo.png')}
                        style={styles.avatarImage}
                      />
                    )
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
                    ]}>
                    <MessageText text={msg.text} isUser={msg.isUser} />
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

            {isSending && (
              <View
                style={[
                  styles.messageRow,
                  styles.botMessageRow,
                  styles.diffSenderSpacing,
                ]}>
                <Image
                  source={require('../../../../../../assets/images/logo.png')}
                  style={styles.avatarImage}
                />
                <View style={[styles.messageBubble, styles.botMessageBubble]}>
                  <ActivityIndicator
                    size="small"
                    color={ColorPalette.PURPLE_300}
                  />
                </View>
                <View style={styles.avatarPlaceholder} />
              </View>
            )}

            {/* Only show quick replies initially or when showQuickReplies is true */}
            {showQuickReplies && !isSending && (
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
                      disabled={isSending}>
                      <Typography
                        variant={TypographyVariant.PXSMALL_REGULAR}
                        customTextStyles={styles.quickReplyText}
                        text={reply.text}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputContainer}>
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
              editable={!isSending}
              onSubmitEditing={() => {
                if (message.trim() && !isSending) {
                  sendMessage();
                }
              }}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                (!message.trim() || isSending) && {opacity: 0.5},
              ]}
              onPress={() => sendMessage()}
              disabled={!message.trim() || isSending}>
              {isSending ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <SendIcon size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name="Lucy - Surf Assistant"
        variant={TypographyVariant.PMEDIUM_REGULAR}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={<ArrowLeftIcon size={15} onPress={goBack} />}
        rightIcons={null}
        subHeader
        subText="Active"
      />
      {renderContent()}
    </SafeAreaView>
  );
};

export default ChatScreen;
