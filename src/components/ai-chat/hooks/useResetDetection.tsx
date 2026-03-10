import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface UseResetDetectionProps {
  resetMessages: () => void;
}

// Event name constant for consistent usage
const CHAT_RESET_EVENT = 'chat-reset-event';

export const useResetDetection = ({ resetMessages }: UseResetDetectionProps) => {
  const location = useLocation();
  // Reset detection flag
  const resetDetectedRef = useRef(false);
  // Reference for last processed input
  const lastProcessedInputRef = useRef<string>('');
  // Processing reference
  const processingRef = useRef(false);
  // Track last pathname
  const lastPathRef = useRef(location.pathname);

  // Listen for global reset event
  useEffect(() => {
    const handleResetEvent = () => {
      console.log("useResetDetection: Global reset event received");
      if (!resetDetectedRef.current) {
        resetDetectedRef.current = true;
        resetMessages();
        lastProcessedInputRef.current = '';
        processingRef.current = false;
        
        // Reset detection flag after delay to allow future resets
        setTimeout(() => {
          resetDetectedRef.current = false;
        }, 200);
      }
    };

    // Add global event listener
    window.addEventListener(CHAT_RESET_EVENT, handleResetEvent);
    
    return () => {
      window.removeEventListener(CHAT_RESET_EVENT, handleResetEvent);
    };
  }, [resetMessages]);

  // Still handle path changes as a fallback
  useEffect(() => {
    const isNavigatingBetweenPaths = location.pathname !== lastPathRef.current;
    
    if (isNavigatingBetweenPaths && !resetDetectedRef.current) {
      console.log("useResetDetection: Path change detected, resetting chat state");
      resetDetectedRef.current = true;
      resetMessages();
      lastProcessedInputRef.current = '';
      processingRef.current = false;
      
      // Reset detection flag after delay to allow future resets
      setTimeout(() => {
        resetDetectedRef.current = false;
      }, 200);
    }
    
    // Update last path reference
    lastPathRef.current = location.pathname;
  }, [location.pathname, resetMessages]);

  return { lastProcessedInputRef, processingRef };
};
