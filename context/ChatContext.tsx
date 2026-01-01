
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { ChatMessage } from '../types';
import { useChat as useChatHook } from '../hooks/useChat';
import { usePreferences } from '../hooks/usePreferences';

interface ChatContextType {
  chatHistory: ChatMessage[];
  isLoading: boolean;
  isChatOpen: boolean;
  isSoundEnabled: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearHistory: () => void;
  toggleChat: (state?: boolean) => void;
  toggleSound: () => void;
  navigateToSection: (sectionId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { playNotificationSound, isSoundEnabled, toggleSound } = usePreferences();
  const { chatHistory, isLoading, sendMessage, clearHistory } = useChatHook(playNotificationSound);

  const toggleChat = (state?: boolean) => {
    setIsChatOpen(state !== undefined ? state : !isChatOpen);
  };

  const navigateToSection = (sectionId: string) => {
    setIsChatOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <ChatContext.Provider value={{
      chatHistory,
      isLoading,
      isChatOpen,
      isSoundEnabled,
      sendMessage,
      clearHistory,
      toggleChat,
      toggleSound,
      navigateToSection
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChatContext must be used within a ChatProvider');
  return context;
};
