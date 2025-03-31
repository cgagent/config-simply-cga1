
import { useState } from 'react';
import StepOne from '../steps/StepOne';
import { ChatMessage } from '../ChatMessage';
import { CIType } from './useCISetupState';
import { useStepMessages } from './useStepMessages';
import { usePackageMessages } from './usePackageMessages';
import { useUserMessages } from './useUserMessages';

interface UseMessagesStateProps {
  currentStep: number;
  selectedCI: CIType;
  selectedPackages: string[];
  userMessages: Array<{
    id: string;
    text: string;
    type: 'user' | 'system';
    timestamp: Date;
  }>;
  handleCISelection: (ciType: string) => void;
  handlePackageSelection: (packageType: string) => void;
  handleContinueToStep3: () => void;
  handleContinueToStep4: () => void;
  handlePreviousStep: () => void;
  getSelectedPackagesText: () => string;
}

export function useMessagesState({
  currentStep,
  selectedCI,
  selectedPackages,
  userMessages,
  handleCISelection,
  handlePackageSelection,
  handleContinueToStep3,
  handleContinueToStep4,
  handlePreviousStep,
  getSelectedPackagesText
}: UseMessagesStateProps) {
  const [messages, setMessages] = useState<Array<{ id: string, component: React.ReactNode }>>([
    { id: 'step-1-initial', component: <StepOne onSelectCI={handleCISelection} selectedCI={selectedCI} /> }
  ]);
  
  const [setupComplete, setSetupComplete] = useState(false);

  // Use the step messages hook
  useStepMessages({
    currentStep,
    selectedCI,
    selectedPackages,
    handleCISelection,
    handlePackageSelection,
    handleContinueToStep3,
    handleContinueToStep4,
    handlePreviousStep,
    getSelectedPackagesText,
    messages,
    setMessages,
    setSetupComplete
  });

  // Use the package messages hook
  usePackageMessages({
    currentStep,
    selectedCI,
    selectedPackages,
    handlePackageSelection,
    handleContinueToStep3,
    messages,
    setMessages
  });

  // Use the user messages hook
  useUserMessages({
    userMessages,
    messages,
    setMessages
  });

  return {
    messages,
    setupComplete,
    setMessages,
    setSetupComplete
  };
}
