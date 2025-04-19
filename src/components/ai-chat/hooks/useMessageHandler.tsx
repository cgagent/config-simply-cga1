import { useToast } from '@/hooks/use-toast';
import { useMessageState } from './useMessageState';
import { ChatOption } from '@/components/shared/types';
import { generateSecurityRemediationResponse } from '../config/responses/securityResponses';
import { isCIConfigurationQuery, getSampleRepository, Repository } from '../config/patterns/ciPatterns';
import { checkSpecialQuery } from '../config/patterns/specialQueriesPatterns';
import { getRandomResponse, getCurrentActionOptions, simulateAIResponse, getCurrentFlow, getCurrentStep } from '../utils/aiResponseUtils';
import { useState } from 'react';
import { MessageFactory } from '../utils/messageFactory';
import { 
  RELEASE_PACKAGE_NAME_ACTIONS, 
  BRANCH_SELECTION_ACTIONS, 
  ENVIRONMENT_SELECTION_ACTIONS,
  RELEASE_TYPE_SELECTION_ACTIONS,
  branchSelectionOptions,
  environmentSelectionOptions,
  releaseTypeSelectionOptions
} from '../config/constants/releaseConstants';
import { conversationFlows } from '../config/flows';
import { isResponseFunction } from '@/components/shared/types/chatTypes';

// Type for release package name actions
type ReleasePackageNameAction = typeof RELEASE_PACKAGE_NAME_ACTIONS[keyof typeof RELEASE_PACKAGE_NAME_ACTIONS];

// Type for branch selection actions
type BranchSelectionAction = typeof BRANCH_SELECTION_ACTIONS[keyof typeof BRANCH_SELECTION_ACTIONS];

// Type for environment selection actions
type EnvironmentSelectionAction = typeof ENVIRONMENT_SELECTION_ACTIONS[keyof typeof ENVIRONMENT_SELECTION_ACTIONS];

// Type for release type selection actions
type ReleaseTypeSelectionAction = typeof RELEASE_TYPE_SELECTION_ACTIONS[keyof typeof RELEASE_TYPE_SELECTION_ACTIONS];

export const useMessageHandler = () => {
  const { toast } = useToast();
  const [showCIConfig, setShowCIConfig] = useState(false);
  const [repository, setRepository] = useState<Repository | null>(null);
  
  const {
    messages,
    isProcessing,
    setIsProcessing,
    inputValue,
    setInputValue,
    addUserMessage,
    addBotMessage,
    resetMessages
  } = useMessageState();

  const handleSecurityRemediation = (option: ChatOption) => {
    // Add user's selection as a message
    addUserMessage(option.value);
    setIsProcessing(true);

    // Check if this is a release flow option
    if (Object.values(RELEASE_PACKAGE_NAME_ACTIONS).includes(option.id as ReleasePackageNameAction)) {
      // Handle release flow option
      setTimeout(() => {
        try {
          // First simulate the response to update the conversation state
          // This will move the flow to the branch-selection step
          simulateAIResponse(option.value);
          
          // Explicitly set the branch selection options
          // This ensures we have the correct options for the branch selection step
          const branchOptions = branchSelectionOptions;
          
          // Use the branch selection response
          const responseText = "Which branch should we release from?";
          
          // Create an action options message with the branch selection options
          const actionOptionsMessage = MessageFactory.createActionOptionsMessage(responseText, branchOptions);
          addBotMessage(actionOptionsMessage);
        } catch (error) {
          console.error("Error handling release option:", error);
          addBotMessage("I encountered an error processing your selection. Please try again.");
        } finally {
          setIsProcessing(false);
        }
      }, 1000);
      return;
    }

    // Check if this is a branch selection option
    if (Object.values(BRANCH_SELECTION_ACTIONS).includes(option.id as BranchSelectionAction)) {
      // Handle branch selection option
      setTimeout(() => {
        try {
          // Simulate the response to update the conversation state
          simulateAIResponse(option.value);
          
          // Explicitly set the environment selection options
          // This ensures we have the correct options for the environment selection step
          const envOptions = environmentSelectionOptions;
          
          // Use the environment selection response
          const responseText = "Which environment should we release to?";
          
          // Create an action options message with the environment selection options
          const actionOptionsMessage = MessageFactory.createActionOptionsMessage(responseText, envOptions);
          addBotMessage(actionOptionsMessage);
        } catch (error) {
          console.error("Error handling branch option:", error);
          addBotMessage("I encountered an error processing your selection. Please try again.");
        } finally {
          setIsProcessing(false);
        }
      }, 1000);
      return;
    }

    // Check if this is an environment selection option
    if (Object.values(ENVIRONMENT_SELECTION_ACTIONS).includes(option.id as EnvironmentSelectionAction)) {
      // Handle environment selection option
      setTimeout(() => {
        try {
          // Simulate the response to update the conversation state
          simulateAIResponse(option.value);
          
          // Explicitly set the release type selection options
          // This ensures we have the correct options for the release type selection step
          const releaseTypeOptions = releaseTypeSelectionOptions;
          
          // Use the release type selection response
          const responseText = "What type of release is this?";
          
          // Create an action options message with the release type selection options
          const actionOptionsMessage = MessageFactory.createActionOptionsMessage(responseText, releaseTypeOptions);
          addBotMessage(actionOptionsMessage);
        } catch (error) {
          console.error("Error handling environment option:", error);
          addBotMessage("I encountered an error processing your selection. Please try again.");
        } finally {
          setIsProcessing(false);
        }
      }, 1000);
      return;
    }

    // Check if this is a release type selection option
    if (Object.values(RELEASE_TYPE_SELECTION_ACTIONS).includes(option.id as ReleaseTypeSelectionAction)) {
      // Handle release type selection option
      setTimeout(() => {
        try {
          // Simulate the response to update the conversation state
          simulateAIResponse(option.value);
          
          // Use the confirmation response
          const responseText = "Perfect! I'll help you create a release with these details. Would you like to proceed with the release?";
          
          // For confirmation, we don't have predefined options
          // So we just send a regular text message
          addBotMessage(responseText);
        } catch (error) {
          console.error("Error handling release type option:", error);
          addBotMessage("I encountered an error processing your selection. Please try again.");
        } finally {
          setIsProcessing(false);
        }
      }, 1000);
      return;
    }

    // Handle security remediation actions
    setTimeout(() => {
      try {
        const response = generateSecurityRemediationResponse(option.id);
        addBotMessage(response);
      } catch (error) {
        console.error("Error handling security remediation:", error);
        addBotMessage("I encountered an error processing your selection. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    }, 1000);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    addUserMessage(content);
    setIsProcessing(true);
    
    try {
      // Enhanced logging for debugging
      console.log("Original content:", content);
      
      // First, check if this is a CI configuration request
      if (isCIConfigurationQuery(content)) {
        // Set repository data
        setRepository(getSampleRepository());
        setShowCIConfig(true);
        
        // Add a 2.5-second delay for CI configuration response
        setTimeout(() => {
          addBotMessage("Great, let's set up your CI to work with JFrog. Which CI tools are you using?");
          setIsProcessing(false);
        }, 2500); // 2.5 seconds delay for "thinking"
        return;
      }
      
      // Next, check if this is a special query
      const specialQueryType = checkSpecialQuery(content);
      if (specialQueryType === 'blockedPackages') {
        console.log("Blocked packages query detected");
        
        const blockResponse = `In the past 2 weeks, we blocked the following malicious npm packages:

evil-package-101: Attempted to steal user credentials.
malware-lib: Contained scripts to inject ransomware.
bad-actor-addon: Had a payload to exfiltrate private data.`;
        
        addBotMessage(blockResponse);
        setIsProcessing(false);
        return;
      }
      
      // Handle other queries with a slight delay to simulate processing
      setTimeout(() => {
        try {
          // Add debug logging for current flow and step
          console.log("Before getRandomResponse - Current flow and step:", {
            currentFlow: getCurrentFlow(),
            currentStep: getCurrentStep()
          });
          
          const aiResponse = getRandomResponse(content);
          console.log("AI response:", aiResponse);
          
          // Add debug logging for current flow and step after getRandomResponse
          console.log("After getRandomResponse - Current flow and step:", {
            currentFlow: getCurrentFlow(),
            currentStep: getCurrentStep()
          });
          
          // Check if there are action options for this response
          const actionOptions = getCurrentActionOptions();
          
          // If we're in the confirmation step and the user confirms, we should not show action options
          const isConfirmation = content.toLowerCase().includes('yes') || 
                                content.toLowerCase().includes('proceed') || 
                                content.toLowerCase().includes('continue') || 
                                content.toLowerCase().includes('confirm') ||
                                content.toLowerCase().includes('ok') ||
                                content.toLowerCase().includes('sure') ||
                                content.toLowerCase().includes('go ahead') ||
                                content.toLowerCase().includes('let\'s do it') ||
                                content.toLowerCase().includes('do it') ||
                                content.toLowerCase().includes('start') ||
                                content.toLowerCase().includes('begin');
          
          if (actionOptions && actionOptions.length > 0 && !isConfirmation) {
            // Create an action options message
            const actionOptionsMessage = MessageFactory.createActionOptionsMessage(aiResponse, actionOptions);
            addBotMessage(actionOptionsMessage);
          } else {
            // Send a regular text message
            addBotMessage(aiResponse);
          }
        } catch (error) {
          console.error("Error generating AI response:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to generate response. Please try again."
          });
        } finally {
          setIsProcessing(false);
        }
      }, 1000);
    } catch (error) {
      console.error("Error processing message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your message. Please try again."
      });
      setIsProcessing(false);
    }
  };

  const handleSelectQuery = (query: string) => {
    setInputValue(query);
  };

  const fullReset = () => {
    resetMessages();
    setShowCIConfig(false);
    setRepository(null);
  };

  return {
    messages,
    isProcessing,
    inputValue,
    setInputValue,
    handleSendMessage,
    handleSelectQuery,
    handleSecurityRemediation,
    fullReset,
    showCIConfig,
    repository
  };
};
