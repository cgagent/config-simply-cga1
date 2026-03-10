
import { useEffect } from 'react';
import { Message } from '../constants';
interface UseChatStateNotifierProps {
  messages: Array<Message>;
  onChatStateChange?: (isChatActive: boolean) => void;
}

export const useChatStateNotifier = ({ 
  messages, 
  onChatStateChange 
}: UseChatStateNotifierProps) => {
  // Notify parent about chat state changes
  useEffect(() => {
    if (onChatStateChange) {
      onChatStateChange(messages.length > 0);
    }
  }, [messages.length, onChatStateChange]);
};
