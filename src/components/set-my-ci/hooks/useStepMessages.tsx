
import { useState, useEffect } from 'react';
import StepOne from '../steps/StepOne';
import StepTwo from '../steps/StepTwo';
import StepThree from '../steps/StepThree';
import StepFour from '../steps/StepFour';
import CompletionStep from '../steps/CompletionStep';
import { CIType } from './useCISetupState';

export interface StepMessagesProps {
  currentStep: number;
  selectedCI: CIType;
  selectedPackages: string[];
  handleCISelection: (ciType: string) => void;
  handlePackageSelection: (packageType: string) => void;
  handleContinueToStep3: () => void;
  handleContinueToStep4: () => void;
  handlePreviousStep: () => void;
  getSelectedPackagesText: () => string;
  messages: Array<{ id: string, component: React.ReactNode }>;
  setMessages: React.Dispatch<React.SetStateAction<Array<{ id: string, component: React.ReactNode }>>>;
  setSetupComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useStepMessages({
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
}: StepMessagesProps) {
  
  // Update messages when steps change
  useEffect(() => {
    // Effect for handling Step 2
    if (currentStep === 2 && selectedCI) {
      const ciName = selectedCI === 'github' ? 'GitHub Actions' : 'Other CI Systems';
      
      // Check if step 2 is already in the messages
      const step2Exists = messages.some(msg => {
        const comp = msg.component as React.ReactElement;
        return comp.type === StepTwo;
      });
      
      if (!step2Exists) {
        setMessages(prev => [
          ...prev,
          { 
            id: `step-2-${Date.now()}`, 
            component: (
              <StepTwo 
                ciName={ciName} 
                onPackageSelection={handlePackageSelection} 
                selectedPackages={selectedPackages} 
                onContinue={handleContinueToStep3} 
              />
            )
          }
        ]);
      } else {
        // Update the existing Step 2 component with new props
        setMessages(prev => 
          prev.map(msg => {
            const comp = msg.component as React.ReactElement;
            if (comp.type === StepTwo) {
              return {
                ...msg,
                component: (
                  <StepTwo 
                    ciName={ciName} 
                    onPackageSelection={handlePackageSelection} 
                    selectedPackages={selectedPackages} 
                    onContinue={handleContinueToStep3} 
                  />
                )
              };
            }
            return msg;
          })
        );
      }
    } 
    // Effect for handling Step 3
    else if (currentStep === 3) {
      const step3Exists = messages.some(msg => {
        const comp = msg.component as React.ReactElement;
        return comp.type === StepThree;
      });
      
      if (!step3Exists) {
        setMessages(prev => [
          ...prev,
          { 
            id: `step-3-${Date.now()}`, 
            component: (
              <StepThree 
                packagesText={getSelectedPackagesText()} 
                selectedCI={selectedCI} 
                selectedPackages={selectedPackages} 
                onNextStep={handleContinueToStep4}
                onPreviousStep={handlePreviousStep}
              />
            )
          }
        ]);
      }
    } 
    // Effect for handling Step 4
    else if (currentStep === 4) {
      const step4Exists = messages.some(msg => {
        const comp = msg.component as React.ReactElement;
        return comp.type === StepFour;
      });
      
      if (!step4Exists) {
        setMessages(prev => [
          ...prev,
          { 
            id: `step-4-${Date.now()}`, 
            component: (
              <StepFour 
                onComplete={() => {
                  setSetupComplete(true);
                  setMessages(prevMessages => [
                    ...prevMessages,
                    { id: `completion-${Date.now()}`, component: <CompletionStep /> }
                  ]);
                }} 
              />
            )
          }
        ]);
      }
    }
  }, [currentStep, selectedCI, selectedPackages, handlePackageSelection, handleContinueToStep3, handleContinueToStep4, handlePreviousStep, getSelectedPackagesText, messages, setMessages, setSetupComplete]);

  return { updateStepMessages: () => {} };
}
