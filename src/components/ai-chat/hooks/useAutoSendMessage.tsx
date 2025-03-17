
import { useEffect, useRef } from 'react';

interface UseAutoSendMessageProps {
  shouldSendMessage: boolean;
  inputValue: string;
  isProcessing: boolean;
  clearShouldSendMessage?: () => void;
  handleSendMessage: (content: string) => void;
}

export const useAutoSendMessage = ({
  shouldSendMessage,
  inputValue,
  isProcessing,
  clearShouldSendMessage,
  handleSendMessage
}: UseAutoSendMessageProps) => {
  const hasSentRef = useRef(false);
  
  // Reset the flag when input value changes
  useEffect(() => {
    hasSentRef.current = false;
  }, [inputValue]);
  
  // Handle automatic message sending
  useEffect(() => {
    if (!shouldSendMessage || inputValue.trim() === '' || isProcessing || hasSentRef.current) {
      return;
    }
    
    console.log("Auto-sending message:", inputValue);
    hasSentRef.current = true;
    
    // Add a slight delay to ensure UI is ready
    const sendTimeoutId = setTimeout(() => {
      handleSendMessage(inputValue);
      
      // Clear the should-send flag after sending
      if (clearShouldSendMessage) {
        const clearTimeoutId = setTimeout(() => {
          clearShouldSendMessage();
        }, 100);
        
        return () => clearTimeout(clearTimeoutId);
      }
    }, 200);
    
    return () => clearTimeout(sendTimeoutId);
  }, [shouldSendMessage, inputValue, isProcessing, clearShouldSendMessage, handleSendMessage]);
};
