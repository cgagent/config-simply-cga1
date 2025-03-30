
import React from 'react';
import { Github, Code } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface SelectCITypeProps {
  selectedCI: 'github' | 'other' | null;
  onSelectCI: (ci: 'github' | 'other') => void;
  onNextStep: () => void;
  canProceed: boolean;
}

const SelectCIType: React.FC<SelectCITypeProps> = ({
  selectedCI,
  onSelectCI
}) => {
  return (
    <div className="bg-blue-900/5 p-4 rounded-lg border border-blue-700/20 shadow-sm">
      <h2 className="text-xl font-bold mb-2 text-blue-100">Step 1: Select CI System</h2>
      
      <Alert className="mb-3 bg-blue-900/10 border-blue-800/30 py-2">
        <Info className="h-4 w-4 text-blue-300" />
        <AlertTitle className="text-blue-100 font-medium text-sm">Streamline your CI pipeline with JFrog</AlertTitle>
        <AlertDescription className="text-blue-200 text-xs">
          Integrating JFrog with your CI system enhances security and improves artifact management.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div 
          className={`flex items-center border rounded-md p-3 cursor-pointer hover:bg-blue-900/20 transition-colors ${
            selectedCI === 'github' 
              ? 'border-blue-600 bg-blue-900/30 ring-1 ring-blue-600/30 shadow-sm' 
              : 'border-blue-800/30'
          }`}
          onClick={() => onSelectCI('github')}
        >
          <Github className="h-8 w-8 mr-3 text-blue-300" />
          <div>
            <h3 className="font-medium text-base text-blue-100">GitHub Actions</h3>
            <p className="text-xs text-blue-200">
              Configure JFrog with GitHub Actions
            </p>
          </div>
        </div>
        
        <div 
          className={`flex items-center border rounded-md p-3 cursor-pointer hover:bg-blue-900/20 transition-colors ${
            selectedCI === 'other' 
              ? 'border-blue-600 bg-blue-900/30 ring-1 ring-blue-600/30 shadow-sm' 
              : 'border-blue-800/30'
          }`}
          onClick={() => onSelectCI('other')}
        >
          <Code className="h-8 w-8 mr-3 text-blue-300" />
          <div>
            <h3 className="font-medium text-base text-blue-100">Other CI Systems</h3>
            <p className="text-xs text-blue-200">
              Circle CI, Jenkins, GitLab CI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCIType;
