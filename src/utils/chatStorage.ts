// src/utils/chatStorage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Message} from '../services/geminiService';

const STORAGE_KEYS = {
  CHAT_HISTORY: '@lucy_chat_history',
  LAST_CHAT_DATE: '@lucy_last_chat_date',
  CHAT_COUNT: '@lucy_chat_count',
};

export class ChatStorage {
  /**
   * Save chat messages to AsyncStorage
   */
  static async saveMessages(messages: Message[]): Promise<boolean> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.CHAT_HISTORY,
        JSON.stringify(messages),
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.LAST_CHAT_DATE,
        new Date().toISOString(),
      );
      return true;
    } catch (error) {
      console.error('Error saving messages:', error);
      return false;
    }
  }

  /**
   * Load chat messages from AsyncStorage
   */
  static async loadMessages(): Promise<Message[] | null> {
    try {
      const storedMessages = await AsyncStorage.getItem(
        STORAGE_KEYS.CHAT_HISTORY,
      );

      if (storedMessages) {
        return JSON.parse(storedMessages) as Message[];
      }
      return null;
    } catch (error) {
      console.error('Error loading messages:', error);
      return null;
    }
  }

  /**
   * Clear all chat history
   */
  static async clearHistory(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
      await AsyncStorage.removeItem(STORAGE_KEYS.LAST_CHAT_DATE);
      return true;
    } catch (error) {
      console.error('Error clearing history:', error);
      return false;
    }
  }

  /**
   * Get last chat date
   */
  static async getLastChatDate(): Promise<Date | null> {
    try {
      const dateString = await AsyncStorage.getItem(
        STORAGE_KEYS.LAST_CHAT_DATE,
      );

      if (dateString) {
        return new Date(dateString);
      }
      return null;
    } catch (error) {
      console.error('Error getting last chat date:', error);
      return null;
    }
  }

  /**
   * Increment chat count
   */
  static async incrementChatCount(): Promise<number> {
    try {
      const countString = await AsyncStorage.getItem(STORAGE_KEYS.CHAT_COUNT);
      const count = countString ? parseInt(countString, 10) : 0;
      const newCount = count + 1;

      await AsyncStorage.setItem(STORAGE_KEYS.CHAT_COUNT, newCount.toString());

      return newCount;
    } catch (error) {
      console.error('Error incrementing chat count:', error);
      return 0;
    }
  }

  /**
   * Get total chat count
   */
  static async getChatCount(): Promise<number> {
    try {
      const countString = await AsyncStorage.getItem(STORAGE_KEYS.CHAT_COUNT);
      return countString ? parseInt(countString, 10) : 0;
    } catch (error) {
      console.error('Error getting chat count:', error);
      return 0;
    }
  }

  /**
   * Export chat history as text
   */
  static async exportChatHistory(): Promise<string> {
    try {
      const messages = await this.loadMessages();

      if (!messages || messages.length === 0) {
        return 'No chat history available';
      }

      let exportText = '=== Lucy Chat History ===\n\n';

      messages.forEach(msg => {
        const sender = msg.isUser ? 'You' : 'Lucy';
        const timestamp = new Date(msg.timestamp).toLocaleString();
        exportText += `[${timestamp}] ${sender}:\n${msg.text}\n\n`;
      });

      return exportText;
    } catch (error) {
      console.error('Error exporting chat history:', error);
      return 'Error exporting chat history';
    }
  }
}

export default ChatStorage;
