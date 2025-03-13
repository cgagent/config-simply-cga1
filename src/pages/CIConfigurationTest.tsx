
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Repository, commonPackageTypes } from '@/types/repository';
import StepIndicator from '@/components/ci-configuration/StepIndicator';
import SelectCIServer from '@/components/ci-configuration/SelectCIServer';
import SelectPackageTypes from '@/components/ci-configuration/SelectPackageTypes';
import SetupInstructions from '@/components/ci-configuration/SetupInstructions';
import CompletionStep from '@/components/ci-configuration/CompletionStep';

const CIConfigurationTestPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const repository = location.state?.repository as Repository;

  const [currentStep, setCurrentStep] = useState(1);
  const [ciServer, setCIServer] = useState<'github' | 'circle' | 'generic' | null>(null);
  const [selectedPackageTypes, setSelectedPackageTypes] = useState<string[]>([]);
  
  // Step configuration
  const steps = [
    { number: 1, label: 'Select CI Server' },
    { number: 2, label: 'Package Managers' },
    { number: 3, label: 'Setup Instructions' },
    { number: 4, label: 'Complete' }
  ];

  // Go back to repositories page
  const handleGoBack = () => {
    navigate('/repositories');
  };

  // Handle CI server selection
  const handleCIServerSelect = (server: 'github' | 'circle' | 'generic') => {
    setCIServer(server);
    setCurrentStep(2);
  };

  // Toggle package type selection
  const togglePackageType = (type: string) => {
    if (selectedPackageTypes.includes(type)) {
      setSelectedPackageTypes(selectedPackageTypes.filter(t => t !== type));
    } else {
      setSelectedPackageTypes([...selectedPackageTypes, type]);
    }
  };

  // Copy text to clipboard
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: message,
      });
    });
  };

  // Move to next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Move to previous step
  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Conditional button to proceed
  const canProceed = () => {
    if (currentStep === 1) return ciServer !== null;
    if (currentStep === 2) return selectedPackageTypes.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="animate-fadeIn">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              className="mr-4" 
              onClick={handleGoBack}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to repositories
            </Button>
            <h1 className="text-2xl font-bold">
              Configure CI for {repository?.name || 'Repository'} (Test UX)
            </h1>
          </div>

          {/* Step indicator */}
          <StepIndicator currentStep={currentStep} steps={steps} />

          {/* Step Content */}
          {currentStep === 1 && (
            <SelectCIServer
              ciServer={ciServer}
              onSelectServer={handleCIServerSelect}
              onNextStep={nextStep}
              canProceed={canProceed()}
            />
          )}

          {currentStep === 2 && (
            <SelectPackageTypes
              packageTypes={commonPackageTypes}
              selectedPackageTypes={selectedPackageTypes}
              onTogglePackageType={togglePackageType}
              onNextStep={nextStep}
              onPreviousStep={previousStep}
              canProceed={canProceed()}
            />
          )}

          {currentStep === 3 && (
            <SetupInstructions
              repository={repository}
              selectedPackageTypes={selectedPackageTypes}
              onCopy={copyToClipboard}
              onNextStep={nextStep}
              onPreviousStep={previousStep}
            />
          )}

          {currentStep === 4 && (
            <CompletionStep onBackToRepositories={handleGoBack} />
          )}
        </div>
      </main>
    </div>
  );
};

export default CIConfigurationTestPage;
