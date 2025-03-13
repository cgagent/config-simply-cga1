
import React, { useState } from 'react';
import { Message } from './ChatMessage';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { SuggestedQueries } from './SuggestedQueries';
import { useToast } from '@/hooks/use-toast';
import { Bird, Plane } from 'lucide-react';

// Sample queries that will be inserted when clicking the suggestion bubbles
const SUGGESTED_QUERIES = [
  {
    label: "CI Setup",
    query: "I would like to set up my CI to work with you, can you please assist me to do it."
  },
  {
    label: "Org packages",
    query: "What are the packages that are being used in the last month? Please order it based on consumption date and show me the package type, latest version and vulnerability status."
  },
  {
    label: "Sbom",
    query: "Please create an Sbom report for me for the packages that are being used in the last 30 days in my organization."
  },
  {
    label: "Public package",
    query: "I would like to use axios, can you please share with me more details: what package should I use, any vulnerabilities I should know, what are the latest versions, and is there any reason why I should not use it?"
  },
  {
    label: "Blocked packages",
    query: "Can you please share with me the blocked packages that did not enter my organization in the last 2 weeks? Include package name, package type, and why it was blocked."
  }
];

const INITIAL_MESSAGES: Message[] = [];

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    try {
      // Simulate AI processing
      // In a real app, this would be an API call to an LLM service
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: simulateAIResponse(content)
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsProcessing(false);
      }, 1500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response. Please try again."
      });
      setIsProcessing(false);
    }
  };

  const handleSelectQuery = (query: string) => {
    setInputValue(query);
  };

  // Simulate AI response (would be replaced with actual API call)
  const simulateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
      return "Hello! How can I assist you today?";
    } 
    else if (lowerQuery.includes('repository') || lowerQuery.includes('repositories')) {
      return "Repositories are where your code lives. You can manage your repositories through the CI section of this application. Would you like to know more about setting up CI for your repositories?";
    }
    else if (lowerQuery.includes('ci') || lowerQuery.includes('continuous integration')) {
      return "Continuous Integration (CI) helps you automatically build, test, and validate code changes. Our CI tools integrate with your repositories to ensure code quality and streamline deployments. You can set up CI workflows in the CI section.";
    }
    else if (lowerQuery.includes('user') || lowerQuery.includes('account')) {
      return "User management allows you to control access to your organization's resources. You can add users, define roles, and set permissions in the User Management section.";
    }
    else {
      return "I understand you're asking about \"" + query + "\". Let me provide some information about that. This is a simulated response in our demo application. In a production environment, this would connect to an AI language model API like OpenAI GPT, Anthropic Claude, or Perplexity to provide helpful and accurate responses.";
    }
  };

  // Initial state (no messages yet)
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full pt-2">
        <div className="flex items-center justify-center mb-2">
          <div className="relative h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
            {/* Colorful Flying Frog Icon (represented by a Bird with a Plane) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Bird className="h-10 w-10 text-[#9b87f5]" />
              <Plane className="h-6 w-6 text-[#F97316] absolute transform rotate-45 -translate-x-2 -translate-y-2" />
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">What do you want to know?</h1>
        <div className="w-full max-w-xl">
          <ChatInput 
            isProcessing={isProcessing} 
            onSendMessage={handleSendMessage}
            isInitialState={true}
            value={inputValue}
            setValue={setInputValue}
          />
          <div className="mt-4">
            <SuggestedQueries 
              queries={SUGGESTED_QUERIES.map(q => q.label)} 
              onSelectQuery={(label) => {
                const query = SUGGESTED_QUERIES.find(q => q.label === label)?.query || '';
                handleSelectQuery(query);
              }} 
            />
          </div>
        </div>
      </div>
    );
  }

  // Chat state (after user has sent at least one message)
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden flex flex-col">
        <MessageList messages={messages} />
      </div>
      <div className="pt-4 border-t">
        <ChatInput 
          isProcessing={isProcessing} 
          onSendMessage={handleSendMessage} 
          isInitialState={false}
          value={inputValue}
          setValue={setInputValue}
        />
      </div>
    </div>
  );
};
