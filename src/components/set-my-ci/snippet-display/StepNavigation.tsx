
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface StepNavigationProps {
  onPreviousStep: () => void;
  onNextStep: () => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ onPreviousStep, onNextStep }) => {
  return (
    <div className="flex justify-end mt-4 space-x-3">
      <Button
        variant="outline"
        className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700"
        onClick={onPreviousStep}
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Back
      </Button>
      <Button
        className="bg-blue-700 text-white hover:bg-blue-600"
        onClick={onNextStep}
      >
        Continue <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

export default StepNavigation;
