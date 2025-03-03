
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import ConfigurationModal from '@/components/ConfigurationModal';
import RepositoryHeader from '@/components/RepositoryHeader';
import RepositoryTable from '@/components/RepositoryTable';
import WorkflowSection from '@/components/WorkflowSection';

// Define types for our data
interface GitHubRepository {
  id: string;
  name: string;
  owner: string;
  orgName: string;
  packageTypes: string[];
  lastRun: string;
  isConfigured: boolean;
  workflows: {
    id: string;
    name: string;
    status: 'active' | 'inactive';
    buildNumber?: number;
    lastRun?: string;
  }[];
}

interface Organization {
  id: string;
  name: string;
}

const RepositoriesPage: React.FC = () => {
  // Mock data for repositories
  const [repositories, setRepositories] = useState<GitHubRepository[]>([
    {
      id: '1',
      name: 'frontend-app',
      owner: 'acme-org',
      orgName: 'ACME Organization',
      packageTypes: ['npm', 'yarn'],
      lastRun: '2 days ago',
      isConfigured: true,
      workflows: [
        { id: 'w1', name: 'CI/CD Pipeline', status: 'active' },
        { id: 'w2', name: 'Test Suite', status: 'active' }
      ]
    },
    {
      id: '2',
      name: 'backend-api',
      owner: 'acme-org',
      orgName: 'ACME Organization',
      packageTypes: ['npm'],
      lastRun: '5 days ago',
      isConfigured: false,
      workflows: [
        { id: 'w3', name: 'Database Migrations', status: 'inactive' }
      ]
    },
    {
      id: '3',
      name: 'documentation',
      owner: 'dev-team',
      orgName: 'Development Team',
      packageTypes: ['markdown'],
      lastRun: 'Never',
      isConfigured: false,
      workflows: []
    }
  ]);

  // Mock organizations data
  const [organizations, setOrganizations] = useState<Organization[]>([
    { id: 'org1', name: 'ACME Organization' },
    { id: 'org2', name: 'Development Team' },
    { id: 'org3', name: 'Personal Account' }
  ]);

  const [selectedOrg, setSelectedOrg] = useState<Organization>(organizations[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepository | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  
  const handleConfigureClick = (repo: GitHubRepository) => {
    setSelectedRepo(repo);
    setConfigModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="animate-fadeIn">
          <RepositoryHeader 
            organizations={organizations}
            selectedOrg={selectedOrg}
            setSelectedOrg={setSelectedOrg}
          />
          
          <RepositoryTable 
            repositories={repositories}
            selectedOrg={selectedOrg}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onConfigureClick={handleConfigureClick}
          />
          
          <WorkflowSection selectedRepo={selectedRepo} />
        </div>
      </main>
      
      {selectedRepo && (
        <ConfigurationModal
          open={configModalOpen}
          onOpenChange={setConfigModalOpen}
          repository={selectedRepo}
        />
      )}
    </div>
  );
};

export default RepositoriesPage;
