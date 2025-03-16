
import React, { useState } from 'react';
import { InitialChatScreen } from './InitialChatScreen';
import { ConversationScreen } from './ConversationScreen';
import { useMessageHandler } from './hooks/useMessageHandler';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AIChatProps {
  onChatStateChange?: (isChatActive: boolean) => void;
}

export const AIChat: React.FC<AIChatProps> = ({ onChatStateChange }) => {
  const {
    messages,
    isProcessing,
    inputValue,
    setInputValue,
    handleSendMessage,
    handleSelectQuery,
    showCIConfig,
    repository
  } = useMessageHandler();

  // Notify parent component about chat state changes
  React.useEffect(() => {
    if (onChatStateChange) {
      onChatStateChange(messages.length > 0);
    }
  }, [messages.length, onChatStateChange]);

  // Initial state (no messages yet)
  if (messages.length === 0) {
    return (
      <InitialChatScreen
        isProcessing={isProcessing}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        onSelectQuery={handleSelectQuery}
      />
    );
  }

  // Chat state (after user has sent at least one message)
  return (
    <>
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/home" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                  <Home className="h-3.5 w-3.5 mr-1" />
                  Back to Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ConversationScreen
        messages={messages}
        isProcessing={isProcessing}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        onSelectQuery={handleSelectQuery}
        showCIConfig={showCIConfig}
        repository={repository}
      />
    </>
  );
};
