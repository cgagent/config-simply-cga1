
import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import SelectCIType from './SelectCIType';
import SelectPackageManagers from './SelectPackageManagers';
import { Message } from '@/components/ai-configuration/types';
import { MessageItem } from '@/components/ai-configuration/MessageItem';
import { ConfigInputForm } from '@/components/ai-configuration/ConfigInputForm';

const CIChatFlow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: 'Welcome to the CI Setup Assistant. Let\'s configure your CI system to work with JFrog.'
    }
  ]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCI, setSelectedCI] = useState<'github' | 'other' | null>(null);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Handle CI selection from step 1
  const handleCISelect = (ci: 'github' | 'other') => {
    setSelectedCI(ci);
    setCurrentStep(2);
    
    // Add a message about the selection
    const ciTypeMessage: Message = {
      id: Date.now().toString(),
      role: 'bot',
      content: `You've selected ${ci === 'github' ? 'GitHub Actions' : 'Other CI System'}. Now, let's select the package managers for your project.`
    };
    
    setMessages(prev => [...prev, ciTypeMessage]);
  };

  // Handle package manager selection/deselection
  const handleTogglePackage = (packageType: string) => {
    setSelectedPackages(prev => {
      if (prev.includes(packageType)) {
        return prev.filter(p => p !== packageType);
      } else {
        return [...prev, packageType];
      }
    });
  };

  // Handle message send from user
  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Create bot response based on the current step
      let botResponse = '';
      
      if (content.toLowerCase().includes('help')) {
        botResponse = "I'm here to help you set up CI with JFrog. You can select your CI system and then choose the package managers you use.";
      } else if (content.toLowerCase().includes('restart')) {
        setCurrentStep(1);
        setSelectedCI(null);
        setSelectedPackages([]);
        botResponse = "Let's start over. Please select your CI system.";
      } else {
        botResponse = "I understand you're interested in setting up CI. Please use the options below to configure your setup.";
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: botResponse
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-850 dark:to-gray-900 rounded-md shadow-md border border-blue-700/30">
      <div className="p-3 border-b border-blue-700/20 bg-blue-900/10 backdrop-blur-sm">
        <h3 className="text-blue-100 font-medium flex items-center">
          <div className="w-8 h-8 mr-2 flex items-center justify-center rounded-full backdrop-blur-sm border border-blue-600/20 shadow-inner">
            <Bot className="w-5 h-5 text-blue-300" />
          </div>
          JFrog CI Configuration Assistant
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Display messages */}
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        
        {/* Display current step UI */}
        <div className="mt-4">
          {currentStep === 1 && (
            <div className="border border-blue-700/30 rounded-md overflow-hidden">
              <SelectCIType
                selectedCI={selectedCI}
                onSelectCI={handleCISelect}
                onNextStep={() => {}}
                canProceed={!!selectedCI}
              />
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="border border-blue-700/30 rounded-md overflow-hidden">
              <SelectPackageManagers
                selectedPackages={selectedPackages}
                onTogglePackage={handleTogglePackage}
                onNextStep={() => {}}
                onPreviousStep={() => setCurrentStep(1)}
                canProceed={selectedPackages.length > 0}
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-blue-700/20 bg-blue-900/10">
        <ConfigInputForm
          isProcessing={isProcessing}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default CIChatFlow;
