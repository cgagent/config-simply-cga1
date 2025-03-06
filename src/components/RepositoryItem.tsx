
import React, { useState } from 'react';
import { Repository } from '@/types/repository';
import { ChevronDown, ChevronRight, Package } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import WorkflowItem from './repository/WorkflowItem';
import PackageTypeBadges from './repository/PackageTypeBadges';
import RepositoryStatus from './repository/RepositoryStatus';

interface RepositoryItemProps {
  repository: Repository;
  onClick: (repo: Repository) => void;
  onConfigureClick: (repo: Repository) => void;
}

const RepositoryItem: React.FC<RepositoryItemProps> = ({
  repository,
  onClick,
  onConfigureClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasWorkflows = repository.workflows && repository.workflows.length > 0;
  const navigate = useNavigate();
  
  // Calculate package type coverage
  const calculatePackageTypeCoverage = () => {
    if (!repository.packageTypeStatus) return 0;
    
    const total = Object.keys(repository.packageTypeStatus).length;
    if (total === 0) return 0;
    
    const connected = Object.values(repository.packageTypeStatus).filter(Boolean).length;
    return Math.round((connected / total) * 100);
  };

  const coveragePercentage = calculatePackageTypeCoverage();
  const missingPackageTypes = repository.packageTypeStatus 
    ? Object.entries(repository.packageTypeStatus)
        .filter(([_, isConnected]) => !isConnected)
        .map(([type]) => type)
    : [];
  
  const isFullyConfigured = coveragePercentage === 100;

  const handleConfigure = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/ci-configuration', { state: { repository } });
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border-b border-border last:border-b-0"
    >
      <div 
        className="grid grid-cols-12 gap-2 px-6 py-4 hover:bg-muted/30 transition-colors cursor-pointer"
        onClick={() => onClick(repository)}
      >
        <div className="col-span-6 flex items-center gap-2">
          {hasWorkflows && repository.isConfigured && (
            <CollapsibleTrigger 
              onClick={(e) => e.stopPropagation()}
              className="p-1 hover:bg-secondary rounded-sm mr-1"
            >
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
          )}
          
          {(!hasWorkflows || !repository.isConfigured) && <div className="w-6" />}
          
          <div className="flex flex-col">
            <span className="font-medium truncate">{repository.name}</span>
            <span className="text-xs text-muted-foreground truncate">{repository.orgName}</span>
          </div>
        </div>
        
        <div className="col-span-2 hidden md:flex justify-center items-center">
          {repository.isConfigured && repository.packageTypes && repository.packageTypes.length > 0 ? (
            <PackageTypeBadges 
              packageTypes={repository.packageTypes}
              missingPackageTypes={missingPackageTypes}
            />
          ) : (
            repository.isConfigured ? 
            <span className="text-xs text-muted-foreground">-</span> :
            <span className="text-xs text-muted-foreground">Not configured yet</span>
          )}
        </div>
        
        <div className="col-span-2 hidden md:flex justify-center items-center">
          {repository.isConfigured ? (
            <span className="text-sm text-muted-foreground">{repository.lastUpdated}</span>
          ) : (
            <span className="text-xs text-muted-foreground">-</span>
          )}
        </div>
        
        <div className="col-span-2 md:col-span-2 flex justify-end items-center">
          <RepositoryStatus
            isConfigured={repository.isConfigured}
            isFullyConfigured={isFullyConfigured}
            coveragePercentage={coveragePercentage}
            missingPackageTypes={missingPackageTypes}
            onConfigure={handleConfigure}
          />
        </div>
      </div>
      
      {hasWorkflows && repository.isConfigured && (
        <CollapsibleContent className="bg-muted/30">
          {repository.workflows?.map((workflow) => (
            <WorkflowItem key={workflow.id} workflow={workflow} />
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};

export default RepositoryItem;
