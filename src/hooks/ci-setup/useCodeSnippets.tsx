
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  generateJFrogSetupSnippet, 
  generatePackageSpecificSnippet, 
  generateFullGithubWorkflow,
  generateFullOtherCIWorkflow
} from '@/components/ci-setup/codeGenerators';
import { Message } from '@/components/ai-chat/constants';

export const useCodeSnippets = (
  selectedCI: 'github' | 'other' | null,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: description,
      });
    }).catch(err => {
      console.error("Failed to copy: ", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy to clipboard"
      });
    });
  };

  const generateSnippet = (packages: string[]) => {
    return `${generateJFrogSetupSnippet()}${generatePackageSpecificSnippet(packages)}`;
  };

  const generateFullWorkflow = (packages: string[]) => {
    if (selectedCI === 'github') {
      return generateFullGithubWorkflow(packages);
    } else {
      return generateFullOtherCIWorkflow(packages);
    }
  };

  const sendSnippetAsMessage = (packages: string[], type: 'snippet' | 'full') => {
    setIsProcessing(true);
    
    // Simulate a delay for message processing
    setTimeout(() => {
      try {
        // Generate the appropriate content based on the type
        const snippetContent = type === 'snippet' 
          ? generateSnippet(packages)
          : generateFullWorkflow(packages);
        
        // Create message with snippet content
        const botMessage: Message = {
          id: Date.now().toString(),
          role: 'bot',
          content: `Here's the ${type === 'snippet' ? 'setup snippet' : 'full workflow'} for your CI configuration:\n\n\`\`\`yaml\n${snippetContent}\n\`\`\`\n\nYou can copy this code and add it to your CI workflow file.`
        };
        
        // Add the bot message to the messages
        setMessages(prev => [...prev, botMessage]);
        
        // Add instruction message about API keys
        const apiKeyMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: `Don't forget to set up your JFrog API key as a secret in your ${selectedCI === 'github' ? 'GitHub repository' : 'CI system'}. You can find this in your JFrog account settings.`
        };
        
        setMessages(prev => [...prev, apiKeyMessage]);
      } catch (error) {
        console.error("Error generating snippet:", error);
        
        // Add error message
        const errorMessage: Message = {
          id: Date.now().toString(),
          role: 'bot',
          content: "I'm sorry, there was an error generating your CI configuration. Please try again."
        };
        
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsProcessing(false);
      }
    }, 1000);
  };

  return {
    copyToClipboard,
    generateSnippet,
    generateFullWorkflow,
    sendSnippetAsMessage
  };
};
