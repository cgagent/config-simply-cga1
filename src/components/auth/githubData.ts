
import { GithubOrg } from './OrganizationSelector';
import { GithubRepo } from './RepositorySelector';

// Mock GitHub organizations data
export const githubOrgs: GithubOrg[] = [
  { 
    id: 'org1', 
    name: 'ACME Organization', 
    isAdmin: true,
    avatarUrl: 'https://github.com/github.png'
  },
  { 
    id: 'org2', 
    name: 'Development Team', 
    isAdmin: true,
    avatarUrl: 'https://github.com/github.png' 
  },
  { 
    id: 'org3', 
    name: 'Personal Account', 
    isAdmin: false,
    avatarUrl: 'https://github.com/github.png'
  }
];

// Mock GitHub repositories data, matching what's in the CI page
export const githubRepos: GithubRepo[] = [
  {
    id: '1',
    name: 'infrastructure',
    owner: 'dev-team',
    orgName: 'Development Team',
    private: true,
    description: 'Infrastructure as code repository'
  },
  {
    id: '2',
    name: 'frontend-app',
    owner: 'acme-org',
    orgName: 'ACME Organization',
    private: true,
    description: 'Main frontend application'
  },
  {
    id: '3',
    name: 'backend-api',
    owner: 'acme-org',
    orgName: 'ACME Organization',
    private: true,
    description: 'Backend API services'
  },
  {
    id: '4',
    name: 'infrastructure',
    owner: 'acme-org',
    orgName: 'ACME Organization',
    private: false,
    description: 'Infrastructure configuration and deployment'
  }
];
