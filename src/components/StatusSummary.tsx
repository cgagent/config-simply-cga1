import React from 'react';
import { cn } from '@/lib/utils';
import { GitBranch, Check, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface StatusSummaryProps {
  totalRepos: number;
  configuredRepos: number;
  className?: string;
}

const StatusSummary: React.FC<StatusSummaryProps> = ({ 
  totalRepos, 
  configuredRepos,
  className
}) => {
  const percentage = totalRepos > 0 ? Math.round((configuredRepos / totalRepos) * 100) : 0;
  const unconfiguredRepos = totalRepos - configuredRepos;
  
  return (
    <div className={cn(
      "animate-fadeIn space-card rounded-lg border-blue-800/30 shadow-lg",
      className
    )}>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-blue-100 space-glow">Integration Status</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/40 text-blue-100 border border-blue-700/30">
            GitHub
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-blue-300/70">Total Git Repositories</span>
            <div className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-blue-400/80" />
              <span className="text-2xl font-semibold text-white">{totalRepos}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-sm text-blue-300/70">Configured</span>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-emerald-500" />
              <span className="text-2xl font-semibold text-white">{configuredRepos}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-sm text-blue-300/70">Not Configured</span>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <span className="text-2xl font-semibold text-white">{unconfiguredRepos}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-blue-200/80">Configuration progress</span>
            <span className="font-medium text-blue-100">{percentage}%</span>
          </div>
          <Progress 
            value={percentage} 
            className="h-2.5 bg-blue-950/60" 
            indicatorClassName="bg-gradient-to-r from-gray-900 via-blue-900 to-blue-800 backdrop-blur-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default StatusSummary;
