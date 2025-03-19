import React, { useState } from 'react';
import RepositoryHeader from '@/components/RepositoryHeader';
import RepositoryList from '@/components/RepositoryList';
import StatusSummary from '@/components/StatusSummary';
import { Repository } from '@/types/repository';
import { useRepositories } from '@/contexts/RepositoryContext';

interface Organization {
  id: string;
  name: string;
}

const RepositoriesPage: React.FC = () => {
  // Use the shared repository context
  const { repositories } = useRepositories();

  // Mock organizations data
  const [organizations, setOrganizations] = useState<Organization[]>([
    { id: 'org1', name: 'ACME Organization' },
    { id: 'org2', name: 'Development Team' },
    { id: 'org3', name: 'Personal Account' }
  ]);

  const [selectedOrg, setSelectedOrg] = useState<Organization>(organizations[0]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  
  const handleConfigureRepository = (repo: Repository) => {
    setSelectedRepo(repo);
  };

  // Calculate summary statistics
  const totalRepos = repositories.length;
  const configuredRepos = repositories.filter(repo => repo.isConfigured).length;

  return (
    <div className="p-6">
      <div className="animate-fadeIn">
        <RepositoryHeader 
          organizations={organizations}
          selectedOrg={selectedOrg}
          setSelectedOrg={setSelectedOrg}
        />
        
        <div className="flex flex-col gap-4 mt-4">
          <StatusSummary 
            totalRepos={totalRepos}
            configuredRepos={configuredRepos}
          />
          
          <RepositoryList 
            repositories={repositories}
            onConfigureRepository={handleConfigureRepository}
            organizations={organizations}
            selectedOrg={selectedOrg}
            setSelectedOrg={setSelectedOrg}
          />
        </div>
      </div>
    </div>
  );
};

export default RepositoriesPage;
