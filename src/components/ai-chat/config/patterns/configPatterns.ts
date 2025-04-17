/**
 * Patterns for configuration chat
 */
export const CONFIG_PATTERNS = {
  npm: ['npm', 'node', 'javascript', 'typescript'],
  docker: ['docker', 'container'],
  maven: ['maven', 'java'],
  pypi: ['pypi', 'python', 'pip'],
  github: ['github', 'github actions'],
  circleci: ['circleci', 'circle ci'],
  jenkins: ['jenkins'],
  gitlab: ['gitlab', 'gitlab ci'],
  merge: ['merge', 'merging', 'pull request'],
  abort: ['abort', 'cancel', 'stop'],
  viewDiff: ['view diff', 'see diff', 'check diff'],
  checkOnGithub: ['check on github', 'view on github', 'see on github']
} as const;

/**
 * Get all configuration patterns as a flat array
 */
export const getAllConfigPatterns = (): string[] => {
  return Object.values(CONFIG_PATTERNS).flat();
};

/**
 * Check if a query is a configuration query
 * @param content The query content to check
 * @returns Whether the query is a configuration query
 */
export const isConfigQuery = (content: string): boolean => {
  const lowerContent = content.toLowerCase().trim();
  
  return Object.values(CONFIG_PATTERNS).some(patterns => 
    patterns.some(pattern => lowerContent.includes(pattern)));
}; 