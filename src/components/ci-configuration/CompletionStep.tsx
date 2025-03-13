
import React from 'react';
import { Check, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompletionStepProps {
  onBackToRepositories: () => void;
}

const CompletionStep: React.FC<CompletionStepProps> = ({ onBackToRepositories }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
      <div className="flex flex-col items-center justify-center py-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Configuration Complete!</h2>
        <p className="text-muted-foreground text-center max-w-lg mb-6">
          Your workflow is now configured. Complete the final step to enable FlyFrog in your repository.
        </p>
        
        <div className="w-full max-w-lg bg-muted rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <GitBranch className="h-5 w-5 mr-2" />
            Step 4: Merge to your default branch
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Once merged to your default branch, subsequent commits will have FlyFrog connected with your workflow. 
            Additionally, you'll find your repo usage dashboard here.
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" onClick={onBackToRepositories}>
            Back to repositories
          </Button>
          <Button variant="default" onClick={() => window.open('https://github.com', '_blank')}>
            Go to GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompletionStep;
