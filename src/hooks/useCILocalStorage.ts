import { useState, useEffect } from 'react';
import { Repository } from '@/types/repository';

const STORAGE_KEY = 'ci_repositories';

// Default demo repositories
const defaultRepositories: Repository[] = [
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

export const useCILocalStorage = () => {
  const [repositories, setRepositories] = useState<Repository[]>(defaultRepositories);

  // Save to localStorage whenever repositories change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(repositories));
  }, [repositories]);

  const updateRepositoryStatus = (repoName: string, packageType: string) => {
    setRepositories(prevRepositories => {
      return prevRepositories.map(repo => {
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
          
          return {
            ...repo,
            isConfigured: true,
            packageTypes: updatedPackageTypes,
            packageTypeStatus: updatedPackageTypeStatus,
            previousPackageTypeStatus,
            showStatusTransition: true,
            lastUpdated: 'Today',
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
        }
        return repo;
      });
    });
  };

  const addRepository = (repository: Repository) => {
    setRepositories(prev => [...prev, repository]);
  };

  const removeRepository = (repoName: string) => {
    setRepositories(prev => prev.filter(repo => repo.name !== repoName));
  };

  return {
    repositories,
    updateRepositoryStatus,
    addRepository,
    removeRepository
  };
}; 