
import React from 'react';
import { Github, Circle as CircleIcon, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SelectCIServerProps {
  ciServer: 'github' | 'circle' | 'generic' | null;
  onSelectServer: (server: 'github' | 'circle' | 'generic') => void;
  onNextStep: () => void;
  canProceed: boolean;
}

const SelectCIServer: React.FC<SelectCIServerProps> = ({
  ciServer,
  onSelectServer,
  onNextStep,
  canProceed
}) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Step 1: Select CI Server</h2>
      <p className="text-muted-foreground mb-6">
        Choose the continuous integration server where your workflows run
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          className={`flex flex-col items-center border rounded-lg p-6 cursor-pointer hover:bg-muted transition-colors ${ciServer === 'github' ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}
          onClick={() => onSelectServer('github')}
        >
          <Github className="h-12 w-12 mb-4" />
          <h3 className="font-medium">GitHub Actions</h3>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Configure FlyFrog with GitHub Actions workflows
          </p>
        </div>
        
        <div 
          className={`flex flex-col items-center border rounded-lg p-6 cursor-pointer hover:bg-muted transition-colors ${ciServer === 'circle' ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}
          onClick={() => onSelectServer('circle')}
        >
          <CircleIcon className="h-12 w-12 mb-4" />
          <h3 className="font-medium">Circle CI</h3>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Configure FlyFrog with Circle CI pipelines
          </p>
        </div>
        
        <div 
          className={`flex flex-col items-center border rounded-lg p-6 cursor-pointer hover:bg-muted transition-colors ${ciServer === 'generic' ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}
          onClick={() => onSelectServer('generic')}
        >
          <Code className="h-12 w-12 mb-4" />
          <h3 className="font-medium">Generic CI</h3>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Configure FlyFrog with any other CI system
          </p>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button 
          onClick={onNextStep} 
          disabled={!canProceed}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SelectCIServer;
