/**
 * Repository type for CI configuration
 */
export interface Repository {
  id: string;
  name: string;
  owner: string;
  isConfigured: boolean;
  language: string;
}

/**
 * Patterns for CI tool selection
 */
export const CI_TOOL_PATTERNS = {
  github: ['github actions', 'github'],
  jenkins: ['jenkins'],
  gitlab: ['gitlab'],
  travis: ['travis'],
  circle: ['circle'],
  other: ['other ci']
} as const;

/**
 * Patterns for package manager selection
 */
export const PACKAGE_MANAGER_PATTERNS = {
  npm: ['npm'],
  maven: ['maven'],
  both: ['both']
} as const;

/**
 * Patterns for CI configuration detection
 */
export const CI_CONFIGURATION_PATTERNS = {
  setup: [
    'ci setup',
    'ci assist',
    'ci set up',
    'setup ci',
    'assist ci',
    'set up ci'
  ]
} as const;

/**
 * Get all CI tool patterns as a flat array
 */
export const getAllCIToolPatterns = (): string[] => {
  return Object.values(CI_TOOL_PATTERNS).flat();
};

/**
 * Get all package manager patterns as a flat array
 */
export const getAllPackageManagerPatterns = (): string[] => {
  return Object.values(PACKAGE_MANAGER_PATTERNS).flat();
};

/**
 * Get all CI configuration patterns as a flat array
 */
export const getAllCIConfigurationPatterns = (): string[] => {
  return Object.values(CI_CONFIGURATION_PATTERNS).flat();
};

/**
 * Check if a query is a CI configuration query
 * @param content The query content to check
 * @returns Whether the query is a CI configuration query
 */
export const isCIConfigurationQuery = (content: string): boolean => {
  const lowerContent = content.toLowerCase().trim();
  
  return CI_CONFIGURATION_PATTERNS.setup.some(pattern => 
    lowerContent.includes(pattern));
};

/**
 * Sample repository data for CI configuration
 */
export const getSampleRepository = (): Repository => {
  return {
    id: 'sample-repo-1',
    name: 'sample-repository',
    owner: 'jfrog',
    isConfigured: false,
    language: 'JavaScript'
  };
}; 