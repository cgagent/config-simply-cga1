import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Repository } from '@/types/repository';

// Create the initial repositories data
const initialRepositories: Repository[] = [
  {
    id: '1',
    name: 'infrastructure',
    owner: 'dev-team',
    orgName: 'Development Team',
    language: 'YAML',
    lastUpdated: '12 days ago',
    packageTypes: [],
    isConfigured: false,
    workflows: []
  },
  {
    id: '2',
    name: 'frontend-app',
    owner: 'acme-org',
    orgName: 'ACME Organization',
    language: 'TypeScript',
    lastUpdated: '2 days ago',
    packageTypes: ['npm', 'docker'],
    isConfigured: true,
    packageTypeStatus: {
      'npm': true,
      'docker': true
    },
    workflows: [
      { 
        id: 'w1', 
        name: 'CI/CD Pipeline', 
        status: 'active', 
        buildNumber: 245,
        lastRun: '2 days ago',
        packageTypes: ['npm']
      },
      { 
        id: 'w2', 
        name: 'Test Suite', 
        status: 'active',
        buildNumber: 244,
        lastRun: '3 days ago',
        packageTypes: ['npm', 'docker']
      }
    ]
  },
  {
    id: '3',
    name: 'backend-api',
    owner: 'acme-org',
    orgName: 'ACME Organization',
    language: 'JavaScript',
    lastUpdated: '5 days ago',
    packageTypes: ['npm', 'python', 'docker'],
    isConfigured: true,
    packageTypeStatus: {
      'npm': true,
      'python': true,
      'docker': true
    },
    workflows: [
      { 
        id: 'w3', 
        name: 'Database Migrations', 
        status: 'active',
        buildNumber: 76,
        lastRun: '5 days ago',
        packageTypes: ['npm', 'python', 'docker']
      }
    ]
  }
];

interface RepositoryContextType {
  repositories: Repository[];
  updateRepositoryStatus: (repoName: string, packageType: string) => void;
  testStatusAnimation: (repoName: string) => void;
}

const RepositoryContext = createContext<RepositoryContextType | undefined>(undefined);

export const useRepositories = () => {
  const context = useContext(RepositoryContext);
  if (!context) {
    throw new Error('useRepositories must be used within a RepositoryProvider');
  }
  return context;
};

interface RepositoryProviderProps {
  children: ReactNode;
}

export const RepositoryProvider: React.FC<RepositoryProviderProps> = ({ children }) => {
  const [repositories, setRepositories] = useState<Repository[]>(initialRepositories);

  const updateRepositoryStatus = (repoName: string, packageType: string) => {
    console.log(`Updating repository ${repoName} with package type ${packageType}`);
    
    setRepositories(prevRepositories => {
      const updatedRepos = prevRepositories.map(repo => {
        if (repo.name === repoName) {
          // Store the previous status before updating
          const previousPackageTypeStatus = {...(repo.packageTypeStatus || {})};
          
          // Create or update packageTypeStatus object
          const updatedPackageTypeStatus = {
            ...previousPackageTypeStatus,
            [packageType]: true
          };
          
          // Create or update packageTypes array
          const updatedPackageTypes = repo.packageTypes?.includes(packageType)
            ? repo.packageTypes
            : [...(repo.packageTypes || []), packageType];
          
          const updatedRepo = {
            ...repo,
            isConfigured: true,
            packageTypes: updatedPackageTypes,
            packageTypeStatus: updatedPackageTypeStatus,
            previousPackageTypeStatus: previousPackageTypeStatus,
            showStatusTransition: true,
            // Add a workflow if there isn't one
            workflows: repo.workflows && repo.workflows.length > 0 ? repo.workflows : [
              {
                id: `w${Date.now()}`,
                name: `workflow-${packageType}.yml`,
                status: 'active' as const,
                buildNumber: 1,
                lastRun: 'Just now',
                packageTypes: [packageType]
              }
            ]
          };
          
          console.log('Updated repository:', updatedRepo);
          return updatedRepo;
        }
        return repo;
      });
      
      // Set a timeout to remove the animation flag after it completes
      const repoToUpdate = updatedRepos.find(repo => repo.name === repoName);
      if (repoToUpdate && repoToUpdate.showStatusTransition) {
        // Use a longer timeout to ensure the animation completes fully
        setTimeout(() => {
          console.log("Animation complete, resetting flag for", repoName);
          setRepositories(prevRepos => 
            prevRepos.map(repo => 
              repo.name === repoName ? {...repo, showStatusTransition: false} : repo
            )
          );
        }, 4000); // Longer duration to match the enhanced animation sequence
      }
      
      return updatedRepos;
    });
  };

  // Function to test status animation without changing actual data
  const testStatusAnimation = (repoName: string) => {
    console.log(`Testing animation for repository ${repoName}`);
    
    setRepositories(prevRepositories => {
      const updatedRepos = prevRepositories.map(repo => {
        if (repo.name === repoName) {
          // Store the current status as previous
          const previousPackageTypeStatus = {...(repo.packageTypeStatus || {})};
          
          console.log("Test animation - previous status:", previousPackageTypeStatus);
          
          // Return the same repo with animation flag
          return {
            ...repo,
            previousPackageTypeStatus: previousPackageTypeStatus,
            showStatusTransition: true
          };
        }
        return repo;
      });
      
      // Reset animation flag after completing
      const repoToUpdate = updatedRepos.find(repo => repo.name === repoName);
      if (repoToUpdate) {
        setTimeout(() => {
          console.log("Test animation complete for", repoName);
          setRepositories(prevRepos => 
            prevRepos.map(repo => 
              repo.name === repoName ? {...repo, showStatusTransition: false} : repo
            )
          );
        }, 3500);
      }
      
      return updatedRepos;
    });
  };

  const value = {
    repositories,
    updateRepositoryStatus,
    testStatusAnimation
  };

  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  );
}; 