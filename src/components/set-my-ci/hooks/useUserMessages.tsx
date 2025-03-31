
import { useState, useEffect } from 'react';
import { ChatMessage } from '../ChatMessage';

export interface UserMessagesProps {
  userMessages: Array<{
    id: string;
    text: string;
    type: 'user' | 'system';
    timestamp: Date;
  }>;
  messages: Array<{ id: string, component: React.ReactNode }>;
  setMessages: React.Dispatch<React.SetStateAction<Array<{ id: string, component: React.ReactNode }>>>;
}

export function useUserMessages({
  userMessages,
  messages,
  setMessages
}: UserMessagesProps) {
  // Track which user messages have been processed
  const [processedMessageIds, setProcessedMessageIds] = useState<Set<string>>(new Set());

  // Add user messages to the chat - fixed to avoid duplicates
  useEffect(() => {
    if (userMessages.length > 0) {
      // Process only unprocessed messages to avoid duplicates
      userMessages.forEach(message => {
        if (!processedMessageIds.has(message.id)) {
          // Add this message to the processed set
          setProcessedMessageIds(prev => {
            const newSet = new Set(prev);
            newSet.add(message.id);
            return newSet;
          });
          
          // Add the message to the chat
          setMessages(prev => [
            ...prev,
            {
              id: `user-msg-${message.id}`,
              component: (
                <ChatMessage 
                  type="system" 
                  content={message.text}
                  isUser={true}
                />
              )
            }
          ]);
        }
      });
    }
  }, [userMessages, processedMessageIds, setMessages]);

  return {
    processedMessageIds
  };
}
