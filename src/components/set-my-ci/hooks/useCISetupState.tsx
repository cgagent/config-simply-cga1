
import { useState, useCallback, useEffect } from 'react';

export type CIType = 'github' | 'other' | null;

export interface UseCISetupStateProps {
  initialStep?: number;
  initialCI?: CIType;
  initialPackages?: string[];
}

export type UserMessage = {
  id: string;
  text: string;
  type: 'user' | 'system';
  timestamp: Date;
};

export function useCISetupState({
  initialStep = 1,
  initialCI = null,
  initialPackages = []
}: UseCISetupStateProps = {}) {
  const [selectedCI, setSelectedCI] = useState<CIType>(initialCI);
  const [selectedPackages, setSelectedPackages] = useState<string[]>(initialPackages);
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [userMessages, setUserMessages] = useState<UserMessage[]>([]);

  // Function to handle CI selection
  const handleCISelection = useCallback((ciType: string) => {
    setSelectedCI(ciType as CIType);
    
    // Add message about CI selection
    const ciName = ciType === 'github' ? 'GitHub Actions' : 'Other CI Systems';
    addUserMessage(`I'd like to set up ${ciName} for my project.`);
    
    setCurrentStep(2);
  }, []);

  // Function to handle package manager selection
  const handlePackageSelection = useCallback((packageType: string) => {
    console.log('Package selection toggled in hook:', packageType);
    setSelectedPackages(prevSelected => {
      // Create a new array to ensure React detects the state change
      if (prevSelected.includes(packageType)) {
        // Remove if already selected
        return prevSelected.filter(p => p !== packageType);
      } else {
        // Add if not already selected
        return [...prevSelected, packageType];
      }
    });
  }, []);

  // Function to add a user message
  const addUserMessage = useCallback((text: string) => {
    setUserMessages(prev => [
      ...prev, 
      {
        id: Date.now().toString(),
        text,
        type: 'user',
        timestamp: new Date()
      }
    ]);
  }, []);

  // Function to handle free text message
  const handleChatMessage = useCallback((message: string) => {
    addUserMessage(message);
    
    // Basic NLP to detect intent
    const lowerMessage = message.toLowerCase();
    
    // Check for CI selection intent
    if ((lowerMessage.includes('github') || lowerMessage.includes('action')) && currentStep === 1) {
      setSelectedCI('github');
      setCurrentStep(2);
    } else if ((lowerMessage.includes('other') || lowerMessage.includes('jenkins') || 
              lowerMessage.includes('gitlab') || lowerMessage.includes('circle')) && currentStep === 1) {
      setSelectedCI('other');
      setCurrentStep(2);
    }
    
    // Check for package manager intent
    const packageKeywords: Record<string, string[]> = {
      'npm': ['npm', 'node', 'javascript', 'js'],
      'docker': ['docker', 'container'],
      'python': ['python', 'pip', 'pypi'],
      'maven': ['maven', 'java'],
      'nuget': ['nuget', 'c#', 'csharp', '.net', 'dotnet'],
      'go': ['go', 'golang']
    };
    
    if (currentStep === 2) {
      for (const [pkg, keywords] of Object.entries(packageKeywords)) {
        if (keywords.some(keyword => lowerMessage.includes(keyword))) {
          setSelectedPackages(prev => {
            if (prev.includes(pkg)) {
              return prev;
            } else {
              return [...prev, pkg];
            }
          });
        }
      }
      
      // Check if user wants to continue
      if (lowerMessage.includes('continue') || lowerMessage.includes('next') || 
          lowerMessage.includes('step 3') || lowerMessage.includes('done')) {
        if (selectedPackages.length > 0) {
          setCurrentStep(3);
        }
      }
    }
    
    // Check for step 3 to step 4 transition
    if (currentStep === 3 && (lowerMessage.includes('continue') || lowerMessage.includes('next') ||
        lowerMessage.includes('step 4') || lowerMessage.includes('done'))) {
      setCurrentStep(4);
    }
    
  }, [currentStep, addUserMessage, selectedPackages]);

  // Debug effect to track package selection changes
  useEffect(() => {
    console.log('Selected packages updated:', selectedPackages);
  }, [selectedPackages]);

  // Function to continue to step 3
  const handleContinueToStep3 = useCallback(() => {
    addUserMessage(`I've selected the following package managers: ${selectedPackages.join(', ')}. Let's continue to the next step.`);
    setCurrentStep(3);
  }, [selectedPackages, addUserMessage]);

  // Function to continue to step 4 (completion)
  const handleContinueToStep4 = useCallback(() => {
    addUserMessage("The configuration looks good. Let's proceed to implementation.");
    setCurrentStep(4);
  }, [addUserMessage]);

  // Add a function to go to previous step
  const handlePreviousStep = useCallback(() => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  }, []);

  // Format selected packages as text
  const getSelectedPackagesText = useCallback(() => {
    return selectedPackages.join(', ');
  }, [selectedPackages]);

  // Check if we can proceed to next step
  const canProceedToNextStep = useCallback((step: number) => {
    switch (step) {
      case 1:
        return selectedCI !== null;
      case 2:
        return selectedPackages.length > 0;
      default:
        return true;
    }
  }, [selectedCI, selectedPackages]);

  return {
    selectedCI,
    selectedPackages,
    currentStep,
    userMessages,
    handleCISelection,
    handlePackageSelection,
    handleChatMessage,
    handleContinueToStep3,
    handleContinueToStep4,
    handlePreviousStep,
    getSelectedPackagesText,
    canProceedToNextStep
  };
}
