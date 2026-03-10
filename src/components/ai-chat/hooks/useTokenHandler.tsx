import { useState, useCallback } from 'react';
import { ChatOption } from '@/components/shared/types';
import { MessageFactory } from '../utils/messageFactory';
import { useToast } from '@/hooks/use-toast';
import { useMessageState } from './useMessageState';

/**
 * A hook to handle token generation flow
 */
export function useTokenHandler() {
  const { toast } = useToast();
  const {
    addUserMessage,
    addBotMessage,
    setIsProcessing,
  } = useMessageState();

  const [tokenFlowState, setTokenFlowState] = useState<null | {
    step: 'name' | 'expiration' | 'confirmation';
    tokenName?: string;
    tokenExpiration?: string;
  }>(null);

  // Reset the token flow state
  const resetTokenFlow = useCallback(() => {
    setTokenFlowState(null);
  }, []);

  // Start the token generation flow
  const startTokenFlow = useCallback(() => {
    setTokenFlowState({
      step: 'name'
    });
    
    // Show initial prompt
    addBotMessage("To generate a new access token, please name it first with a descriptive name that will help you identify this token later.\n\nWhat would you like to name your token?");
  }, [addBotMessage]);

  // Handle message input for token flow
  const handleTokenMessage = useCallback((content: string) => {
    if (!tokenFlowState) return false;
    
    setIsProcessing(true);
    
    try {
      // Handle token flow based on current step
      if (tokenFlowState.step === 'name') {
        // Store the token name and move to expiration step
        const tokenName = content.trim();
        setTokenFlowState({
          step: 'expiration',
          tokenName
        });
        
        // Show duration options
        const message = MessageFactory.createActionOptionsMessage(
          `Your token name will be "${tokenName}"\n\nWhat should be your token duration?`,
          [
            { id: 'expiration-never', label: 'Never', value: 'Never' },
            { id: 'expiration-1day', label: '1 Day', value: '1 Day' },
            { id: 'expiration-3days', label: '3 Days', value: '3 Days' },
            { id: 'expiration-7days', label: '7 Days', value: '7 Days' },
            { id: 'expiration-1month', label: '1 Month', value: '1 Month' },
            { id: 'expiration-1year', label: '1 Year', value: '1 Year' }
          ]
        );
        addBotMessage(message);
      } 
      else if (tokenFlowState.step === 'expiration') {
        // Store the token expiration and move to confirmation step
        const tokenExpiration = content.trim();
        setTokenFlowState({
          ...tokenFlowState,
          step: 'confirmation',
          tokenExpiration
        });
        
        // Show confirmation options
        const message = MessageFactory.createActionOptionsMessage(
          `**Token summary:**\n• Name: "${tokenFlowState.tokenName}"\n• Type: Read-only access\n• Expiration: ${tokenExpiration}\n\nGenerate this token now?`,
          [
            { id: 'confirm-yes', label: 'Generate Token', value: 'Yes' },
            { id: 'confirm-no', label: 'Cancel', value: 'No' }
          ]
        );
        addBotMessage(message);
      }
      else if (tokenFlowState.step === 'confirmation') {
        // Handle final confirmation
        if (content.toLowerCase().includes('yes') || content.toLowerCase().includes('generate')) {
          // Generate a mock token
          const mockToken = `jfrog_at_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
          
          // End the token flow
          setTokenFlowState(null);
          
          // Show success message
          addBotMessage(`✅ **Token generated**\n\n**Details:**\n• Type: Read-only\n• Token: \`${mockToken}\`\n\n⚠️ Copy this token now - it won't be displayed again.`);
        } else {
          // Cancel token generation
          setTokenFlowState(null);
          addBotMessage(`Token generation cancelled.\n\nSay "generate token" to start over with different settings.`);
        }
      }
    } catch (error) {
      console.error("Error in token flow:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process token request."
      });
    } finally {
      setIsProcessing(false);
    }
    
    // Return true to indicate we handled this message
    return true;
  }, [tokenFlowState, addBotMessage, setIsProcessing, toast]);

  // Handle option selection for token flow
  const handleTokenOptionSelection = useCallback((option: ChatOption) => {
    if (!tokenFlowState) return false;
    
    setIsProcessing(true);
    
    try {
      if (tokenFlowState.step === 'expiration') {
        // Store the token expiration and move to confirmation step
        const tokenExpiration = option.value;
        setTokenFlowState({
          ...tokenFlowState,
          step: 'confirmation',
          tokenExpiration
        });
        
        // Show confirmation options
        const message = MessageFactory.createActionOptionsMessage(
          `**Token summary:**\n• Name: "${tokenFlowState.tokenName}"\n• Type: Read-only access\n• Expiration: ${tokenExpiration}\n\nGenerate this token now?`,
          [
            { id: 'confirm-yes', label: 'Generate Token', value: 'Yes' },
            { id: 'confirm-no', label: 'Cancel', value: 'No' }
          ]
        );
        addBotMessage(message);
      }
      else if (tokenFlowState.step === 'confirmation') {
        // Handle final confirmation
        if (option.id === 'confirm-yes') {
          // Generate a mock token
          const mockToken = `jfrog_at_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
          
          // End the token flow
          setTokenFlowState(null);
          
          // Show success message
          addBotMessage(`✅ **Token generated**\n\n**Details:**\n• Type: Read-only\n• Token: \`${mockToken}\`\n\n⚠️ Copy this token now - it won't be displayed again.`);
        } else {
          // Cancel token generation
          setTokenFlowState(null);
          addBotMessage(`Token generation cancelled.\n\nSay "generate token" to start over with different settings.`);
        }
      }
    } catch (error) {
      console.error("Error processing token option:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your selection."
      });
    } finally {
      setIsProcessing(false);
    }
    
    // Return true to indicate we handled this option
    return true;
  }, [tokenFlowState, addBotMessage, setIsProcessing, toast]);

  const isInTokenFlow = useCallback(() => {
    return tokenFlowState !== null;
  }, [tokenFlowState]);

  return {
    startTokenFlow,
    handleTokenMessage,
    handleTokenOptionSelection,
    isInTokenFlow,
    resetTokenFlow
  };
} 