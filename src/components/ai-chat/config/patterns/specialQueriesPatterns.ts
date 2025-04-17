/**
 * Patterns for special queries
 */
export const SPECIAL_QUERY_PATTERNS = {
  blockedPackages: [
    "which packages were blocked in the last two weeks?",
    "blocked packages",
    "show me the packages that are blocked",
    "block",
    "malicious"
  ]
} as const;

/**
 * Get all special query patterns as a flat array
 */
export const getAllSpecialQueryPatterns = (): string[] => {
  return Object.values(SPECIAL_QUERY_PATTERNS).flat();
};

/**
 * Check if a query is a special query
 * @param content The query content to check
 * @returns The type of special query or null if not a special query
 */
export const checkSpecialQuery = (content: string): string | null => {
  const lowerContent = content.toLowerCase().trim();
  
  // Check for blocked packages query
  if (SPECIAL_QUERY_PATTERNS.blockedPackages.some(pattern => 
      lowerContent === pattern || lowerContent.includes(pattern))) {
    return 'blockedPackages';
  }
  
  return null;
}; 