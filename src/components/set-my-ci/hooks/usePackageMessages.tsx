
import { useEffect } from 'react';
import StepTwo from '../steps/StepTwo';
import { CIType } from './useCISetupState';

export interface PackageMessagesProps {
  currentStep: number;
  selectedCI: CIType;
  selectedPackages: string[];
  handlePackageSelection: (packageType: string) => void;
  handleContinueToStep3: () => void;
  messages: Array<{ id: string, component: React.ReactNode }>;
  setMessages: React.Dispatch<React.SetStateAction<Array<{ id: string, component: React.ReactNode }>>>;
}

export function usePackageMessages({
  currentStep,
  selectedCI,
  selectedPackages,
  handlePackageSelection,
  handleContinueToStep3,
  messages,
  setMessages
}: PackageMessagesProps) {
  
  // Force rerender Step 2 when selectedPackages changes
  useEffect(() => {
    if (currentStep === 2) {
      setMessages(prev => 
        prev.map(msg => {
          const comp = msg.component as React.ReactElement;
          if (comp.type === StepTwo) {
            const ciName = selectedCI === 'github' ? 'GitHub Actions' : 'Other CI Systems';
            return {
              ...msg,
              component: (
                <StepTwo 
                  key={`step2-${selectedPackages.join(',')}`} // Add key to force rerender
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
  }, [selectedPackages, currentStep, selectedCI, handlePackageSelection, handleContinueToStep3, messages, setMessages]);

  return { updatePackageMessages: () => {} };
}
