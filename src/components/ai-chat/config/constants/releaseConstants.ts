import { ChatOption } from '@/components/shared/types';

/**
 * Release package names action types
 */
export const RELEASE_PACKAGE_NAME_ACTIONS = {
  SHARED: 'shared-components',
  FRONTEND: 'frontend-app',
  BACKEND: 'backend-api'
} as const;

/**
 * Release package names options for UI selection
 */
export const releasePackageNameOptions: ChatOption[] = [
  { 
    id: RELEASE_PACKAGE_NAME_ACTIONS.SHARED, 
    label: 'Shared Components', 
    value: 'shared-components' 
  },
  { 
    id: RELEASE_PACKAGE_NAME_ACTIONS.FRONTEND, 
    label: 'Frontend App', 
    value: 'frontend-app' 
  },
  { 
    id: RELEASE_PACKAGE_NAME_ACTIONS.BACKEND, 
    label: 'Backend API', 
    value: 'backend-api' 
  }
];

/**
 * Patterns for release package names
 */
export const RELEASE_PACKAGE_NAME_PATTERNS = {
  [RELEASE_PACKAGE_NAME_ACTIONS.SHARED]: ['shared-components', 'shared components'],
  [RELEASE_PACKAGE_NAME_ACTIONS.FRONTEND]: ['frontend-app', 'frontend app'],
  [RELEASE_PACKAGE_NAME_ACTIONS.BACKEND]: ['backend-api', 'backend api']
} as const;

/**
 * Get all release package name patterns as a flat array
 */
export const getAllReleasePackageNamePatterns = (): string[] => {
  return Object.values(RELEASE_PACKAGE_NAME_PATTERNS).flat();
}; 