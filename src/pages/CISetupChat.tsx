
import React, { useState, useEffect, useRef } from 'react';
import { MessageList } from '@/components/ai-chat/MessageList';
import { ChatInput } from '@/components/ai-chat/ChatInput';
import { Message } from '@/components/ai-chat/constants';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { simulateAIResponse } from '@/components/ai-chat/utils/aiResponseUtils';

const CISetupChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with the first message
  useEffect(() => {
    const initialMessage: Message = {
      id: 'initial-message',
      role: 'user',
      content: 'I would like to set up my CI to work with JFrog. Can you set it up for me?'
    };
    
    setMessages([initialMessage]);
    
    // Simulate the bot response after a short delay
    setIsProcessing(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: 'bot-response-1',
        role: 'bot',
        content: "Great, let's set up your CI to work with JFrog. Which CI tools are you using?"
      };
      setMessages(prev => [...prev, botResponse]);
      setIsProcessing(false);
    }, 1000);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      try {
        const aiResponse = simulateAIResponse(content);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: aiResponse
        };
        
        setMessages(prev => [...prev, botMessage]);
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
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background">
      <main className="flex-1 w-full mx-auto flex flex-col">
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 flex flex-col h-[calc(100vh-64px)] pt-6">
          <h1 className="text-2xl font-bold mb-6 text-blue-100 space-glow">JFrog CI Setup Assistant</h1>
          
          <div className="flex-1 flex flex-col border-0 overflow-hidden bg-background dark:bg-background">
            <div className="flex-1 flex flex-col p-4 overflow-hidden">
              <MessageList messages={messages} isProcessing={isProcessing} />
              
              <div className="pt-4">
                <ChatInput 
                  isProcessing={isProcessing} 
                  onSendMessage={handleSendMessage} 
                  isInitialState={false}
                  value={inputValue}
                  setValue={setInputValue}
                />
              </div>
            </div>
          </div>
          
          <div ref={messagesEndRef} />
        </div>
      </main>
    </div>
  );
};

export default CISetupChat;
