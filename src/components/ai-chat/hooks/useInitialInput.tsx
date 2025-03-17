
import { useState, useEffect, useRef } from 'react';

interface UseInitialInputProps {
  initialInputValue: string;
  clearInitialInputValue?: () => void;
  setInputValue: (value: string) => void;
  isProcessing: boolean;
}

export const useInitialInput = ({
  initialInputValue,
  clearInitialInputValue,
  setInputValue,
  isProcessing
}: UseInitialInputProps) => {
  const [hasInitialInput, setHasInitialInput] = useState(false);
  const previousInputRef = useRef('');
  const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // When we get a new initial input value that's different from what we've seen before
    if (initialInputValue && initialInputValue !== previousInputRef.current) {
      console.log("Processing new initial input value:", initialInputValue);
      
      // Update our tracking of the current input
      previousInputRef.current = initialInputValue;
      
      // Clear any existing timeout
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
        processingTimeoutRef.current = null;
      }
      
      // Update the input value and mark that we have initial input
      setInputValue(initialInputValue);
      setHasInitialInput(true);
      
      // Schedule clearing of the initial input value after it has been processed
      if (clearInitialInputValue) {
        processingTimeoutRef.current = setTimeout(() => {
          clearInitialInputValue();
          processingTimeoutRef.current = null;
        }, 500);
      }
    }
    
    // Reset state when initial input is cleared and not processing
    if (!initialInputValue && hasInitialInput && !isProcessing) {
      previousInputRef.current = '';
      setHasInitialInput(false);
    }
  }, [initialInputValue, clearInitialInputValue, setInputValue, hasInitialInput, isProcessing]);

  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
    };
  }, []);

  return { hasInitialInput };
};
