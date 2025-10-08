// src/services/geminiService.ts

import {generateSystemPrompt} from '../data/lucyTrainingData';

// ✅ CORRECT API KEY AND MODEL FOR YOUR FREE TIER
const GEMINI_API_KEY = 'AIzaSyD-osVY0YvL9tA0cu522l2LlbYGVLKVYco';
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  time: string;
  timestamp: number;
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: string;
    };
    finishReason?: string;
    index?: number;
    safetyRatings?: Array<{
      category: string;
      probability: string;
    }>;
  }>;
  promptFeedback?: {
    safetyRatings: Array<{
      category: string;
      probability: string;
    }>;
  };
}

class GeminiService {
  private conversationHistory: Array<{
    role: string;
    parts: Array<{text: string}>;
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
        role: 'user',
        parts: [{text: this.systemPrompt}],
      },
      {
        role: 'model',
        parts: [
          {
            text: `I understand completely. I am Lucy, Surf's chatbot assistant. I'm ready to help sellers with:
- Seller registration and onboarding
- Product uploads and management
- Payments and payouts
- Deliveries and logistics
- Commission and pricing questions
- And all other Surf-related questions

I'll only provide verified information from Surf's official documentation, and I'll share relevant video tutorials when appropriate. If I can't help with something, I'll connect you with the support team at sales@surf.mt or WhatsApp +356 7965 0714.

How can I assist you today? 😊`,
          },
        ],
      },
    ];
  }

  async sendMessage(userMessage: string): Promise<string> {
    try {
      console.log('📤 Lucy processing:', userMessage);

      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        parts: [{text: userMessage}],
      });

      const requestBody = {
        contents: this.conversationHistory,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
          stopSequences: [],
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
        ],
      };

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Gemini API Error:', errorText);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();

      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];

        if (candidate.content?.parts?.[0]?.text) {
          const assistantMessage = candidate.content.parts[0].text;

          // Add assistant response to history
          this.conversationHistory.push({
            role: 'model',
            parts: [{text: assistantMessage}],
          });

          console.log('✅ Lucy responded successfully');
          return assistantMessage;
        }
      }

      throw new Error('Invalid response from Gemini');
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
        role: 'user',
        parts: [{text: this.systemPrompt}],
      },
      {
        role: 'model',
        parts: [
          {
            text: `I understand completely. I am Lucy, Surf's chatbot assistant. I'm ready to help sellers with all their questions about registration, products, payments, deliveries, and more. How can I assist you today? 😊`,
          },
        ],
      },
    ];
  }

  getConversationHistory(): Array<{
    role: string;
    parts: Array<{text: string}>;
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
      this.conversationHistory.filter(msg => msg.role === 'user').length - 1; // Subtract system prompt

    const botMessages =
      this.conversationHistory.filter(msg => msg.role === 'model').length - 1; // Subtract initial response

    return {
      totalMessages: this.conversationHistory.length - 2, // Subtract system messages
      userMessages,
      botMessages,
    };
  }

  // Method to check API connectivity
  async testConnection(): Promise<{success: boolean; message: string}> {
    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{text: 'Hello'}],
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          message: `✅ API connection successful! Model: ${GEMINI_MODEL}`,
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
