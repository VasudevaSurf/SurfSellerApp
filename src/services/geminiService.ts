// src/services/geminiService.ts

import { generateSystemPrompt } from '../data/lucyTrainingData';
// @ts-ignore
import { OPENROUTER_API_KEY, OPENROUTER_MODEL } from '@env';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'openrouter/free';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  time: string;
  timestamp: number;
}

export interface OpenRouterResponse {
  choices: Array<{
    message: {
      role: 'system' | 'user' | 'assistant';
      content: string;
    };
    finish_reason?: string;
  }>;
}

// Keep the old response interface name defined for backward compatibility (in case of dynamic imports)
export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: string;
    };
  }>;
}

class GeminiService {
  private conversationHistory: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }> = [];
  private systemPrompt: string;

  constructor() {
    // Generate comprehensive system prompt from training data
    this.systemPrompt = generateSystemPrompt();

    console.log('🎓 Lucy initialized with complete training data');
    console.log('📚 Knowledge base loaded successfully');

    // Initialize conversation with system prompt
    this.conversationHistory = [
      {
        role: 'system',
        content: this.systemPrompt,
      },
      {
        role: 'assistant',
        content: `I understand completely. I am Lucy, Surf's chatbot assistant. I'm ready to help sellers with:
- Seller registration and onboarding
- Product uploads and management
- Payments and payouts
- Deliveries and logistics
- Commission and pricing questions
- And all other Surf-related questions

I'll only provide verified information from Surf's official documentation, and I'll share relevant video tutorials when appropriate. If I can't help with something, I'll connect you with the support team at sales@surf.mt or WhatsApp +356 7965 0714.

How can I assist you today? 😊`,
      },
    ];
  }

  async sendMessage(userMessage: string): Promise<string> {
    try {
      console.log('📤 Lucy processing:', userMessage);

      // Get API Key and Model with fallbacks
      const apiKey = OPENROUTER_API_KEY || (process.env as any).OPENROUTER_API_KEY;
      const model = OPENROUTER_MODEL || (process.env as any).OPENROUTER_MODEL || DEFAULT_MODEL;

      // Gracefully warn user in the chat interface if API Key is not configured
      if (!apiKey || apiKey === 'YOUR_OPENROUTER_API_KEY' || apiKey.trim() === '') {
        console.warn('⚠️ OpenRouter API Key is not configured. Please add OPENROUTER_API_KEY to your .env file.');
        return "I'm sorry, my API configuration is incomplete. Please configure the `OPENROUTER_API_KEY` in the `.env` file.";
      }

      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage,
      });

      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://sell.surf.mt',
          'X-Title': 'Surf Seller App',
        },
        body: JSON.stringify({
          model: model,
          messages: this.conversationHistory,
          temperature: 0.7,
          max_tokens: 2048,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ OpenRouter API Error:', errorText);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: OpenRouterResponse = await response.json();

      if (data.choices && data.choices.length > 0) {
        const choice = data.choices[0];

        if (choice.message?.content) {
          const assistantMessage = choice.message.content;

          // Add assistant response to history
          this.conversationHistory.push({
            role: 'assistant',
            content: assistantMessage,
          });

          console.log('✅ Lucy responded successfully');
          return assistantMessage;
        }
      }

      throw new Error('Invalid response from OpenRouter');
    } catch (error: any) {
      console.error('💥 Error:', error.message);
      throw error;
    }
  }

  clearHistory(): void {
    console.log('🧹 Clearing conversation history');

    // Reset to system prompt
    this.conversationHistory = [
      {
        role: 'system',
        content: this.systemPrompt,
      },
      {
        role: 'assistant',
        content: `I understand completely. I am Lucy, Surf's chatbot assistant. I'm ready to help sellers with all their questions about registration, products, payments, deliveries, and more. How can I assist you today? 😊`,
      },
    ];
  }

  getConversationHistory(): Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }> {
    return this.conversationHistory;
  }

  getSystemPrompt(): string {
    return this.systemPrompt;
  }

  // Get conversation summary for analytics
  getConversationSummary(): {
    totalMessages: number;
    userMessages: number;
    botMessages: number;
  } {
    const userMessages =
      this.conversationHistory.filter(msg => msg.role === 'user').length;

    const botMessages =
      this.conversationHistory.filter(msg => msg.role === 'assistant').length - 1; // Subtract initial response

    return {
      totalMessages: this.conversationHistory.length - 2, // Subtract system and initial response
      userMessages,
      botMessages,
    };
  }

  // Method to check API connectivity
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      const apiKey = OPENROUTER_API_KEY || (process.env as any).OPENROUTER_API_KEY;
      const model = OPENROUTER_MODEL || (process.env as any).OPENROUTER_MODEL || DEFAULT_MODEL;

      if (!apiKey || apiKey === 'YOUR_OPENROUTER_API_KEY' || apiKey.trim() === '') {
        return {
          success: true, // Return true but with config instructions so frontend can test
          message: '❌ OpenRouter API Key is not configured. Please add OPENROUTER_API_KEY to your .env file.',
        };
      }

      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'user',
              content: 'Hello',
            },
          ],
        }),
      });

      if (response.ok) {
        return {
          success: true,
          message: `✅ API connection successful! Model: ${model}`,
        };
      } else {
        const errorText = await response.text();
        return {
          success: false,
          message: `❌ API returned ${response.status}: ${errorText.substring(
            0,
            100,
          )}`,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: `❌ Connection failed: ${error.message}`,
      };
    }
  }
}

// Export singleton instance
const geminiServiceInstance = new GeminiService();
export default geminiServiceInstance;
