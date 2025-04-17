/**
 * Pattern matching configuration for the AI chat
 * This file is kept for backward compatibility
 * New patterns should be added to the specific pattern files in the patterns directory
 */
import { CI_TOOL_PATTERNS } from './patterns/ciPatterns';
import { SECURITY_RISK_PATTERNS } from './patterns/securityPatterns';
import { CI_CONFIGURATION_PATTERNS } from './patterns/ciPatterns';
import { SPECIAL_QUERY_PATTERNS } from './patterns/specialQueriesPatterns';

export const patterns = {
  // CI/CD related patterns
  ciSetup: {
    keywords: [...CI_TOOL_PATTERNS.github, ...CI_TOOL_PATTERNS.jenkins, ...CI_TOOL_PATTERNS.gitlab, ...CI_TOOL_PATTERNS.travis, ...CI_TOOL_PATTERNS.circle],
    intent: 'ci_setup'
  },
  securityRisk: {
    keywords: Object.values(SECURITY_RISK_PATTERNS.identify),
    intent: 'security_risk'
  }
};

// Re-export all pattern files for convenience
export * from './patterns'; 