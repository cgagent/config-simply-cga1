
import { useState } from 'react';
import { Message } from '../constants';

export const useMessageState = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content
    };
    
    addMessage(userMessage);
  };

  const addBotMessage = (content: string) => {
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'bot',
      content
    };
    
    addMessage(botMessage);
  };

  const resetMessages = () => {
    setMessages([]);
    setInputValue('');
  };

  return {
    messages,
    isProcessing,
    setIsProcessing,
    inputValue,
    setInputValue,
    addUserMessage,
    addBotMessage,
    resetMessages
  };
};
