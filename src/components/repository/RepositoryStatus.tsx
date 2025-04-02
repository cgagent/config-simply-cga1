import React from 'react';
import { Check } from 'lucide-react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface RepositoryStatusProps {
  isConfigured: boolean;
  isFullyConfigured: boolean;
  missingPackageTypes: string[];
}

const RepositoryStatus: React.FC<RepositoryStatusProps> = ({
  isConfigured,
  isFullyConfigured,
  missingPackageTypes
}) => {
  if (!isConfigured) {
    return (
      <div className="flex justify-center text-xs text-muted-foreground">
        Not configured
      </div>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex justify-center">
          <div className="bg-emerald-950/90 text-emerald-400 dark:bg-emerald-400/20 dark:text-emerald-300 px-3 py-1 rounded-full flex items-center shadow-sm border border-emerald-800/30 dark:border-emerald-400/30">
            <Check className="h-3.5 w-3.5 mr-1.5" />
            <span className="text-xs font-medium">Configured</span>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-popover border border-border text-foreground">
        {missingPackageTypes.length > 0 ? (
          <div className="text-xs">
            <p>Missing package types:</p>
            <ul className="list-disc pl-4 mt-1">
              {missingPackageTypes.map((type) => (
                <li key={type}>{type}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-xs">All package types connected</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
};

export default RepositoryStatus;
