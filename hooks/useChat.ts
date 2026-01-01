
import { useState, useEffect } from 'react';
import { getAIStrategy } from '../services/geminiService';
import { ChatMessage } from '../types';

const LOCAL_STORAGE_KEY = 'ai_catalyst_chat_history';

export function useChat(onResponseReceived?: (role: 'user' | 'assistant') => void) {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chatHistory));
  }, [chatHistory]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const newMessage: ChatMessage = { role: 'user', content };
    setChatHistory(prev => [...prev, newMessage]);
    onResponseReceived?.('user');
    setIsLoading(true);

    try {
      const aiResponse = await getAIStrategy(content);
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: aiResponse.text,
        suggestion: aiResponse.suggestion
      }]);
      onResponseReceived?.('assistant');
    } catch (error) {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: "Извините, произошла техническая ошибка. Пожалуйста, попробуйте позже." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    if (window.confirm('Вы уверены, что хотите очистить историю переписки?')) {
      setChatHistory([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  return { chatHistory, isLoading, sendMessage, clearHistory };
}
