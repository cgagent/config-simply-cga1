
import React from 'react';
import { Github } from 'lucide-react';
import Button from '@/components/Button';
import OrganizationSelect from './OrganizationSelect';

interface Organization {
  id: string;
  name: string;
}

interface RepositoryHeaderProps {
  organizations: Organization[];
  selectedOrg: Organization;
  setSelectedOrg: (org: Organization) => void;
}

const RepositoryHeader: React.FC<RepositoryHeaderProps> = ({
  organizations,
  selectedOrg,
  setSelectedOrg
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Dashboard</span>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="text-xs font-medium">GitHub Repositories</span>
        </div>
        <h1 className="text-3xl font-bold mt-1">GitHub Repositories</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <OrganizationSelect 
          organizations={organizations}
          selectedOrg={selectedOrg}
          setSelectedOrg={setSelectedOrg}
        />
        
        <Button icon={<Github className="h-4 w-4" />}>
          Connect Repository
        </Button>
      </div>
    </div>
  );
};

export default RepositoryHeader;
