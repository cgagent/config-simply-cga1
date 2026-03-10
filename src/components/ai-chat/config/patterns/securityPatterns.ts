import { SECURITY_REMEDIATION_PATTERNS, getAllSecurityRemediationPatterns } from '../constants/securityConstants';

/**
 * Patterns for security risk identification
 */
export const SECURITY_RISK_PATTERNS = {
  identify: [
    'Which packages are at risk?',
    'Which packages are at risk?',
    'security risk',
    'vulnerable packages',
    'security vulnerabilities',
    'package vulnerabilities'
  ]
} as const;

// Re-export the security remediation patterns from the constants file
export { SECURITY_REMEDIATION_PATTERNS, getAllSecurityRemediationPatterns };

/**
 * Get all security risk patterns as a flat array
 */
export const getAllSecurityRiskPatterns = (): string[] => {
  return Object.values(SECURITY_RISK_PATTERNS).flat();
};

/**
 * Security risk patterns
 */
export const securityRiskPatterns = {
  identifyRisk: [
    "identify which packages are at risk",
    "Which packages are at risk?",
    "vulnerable packages",
    "security vulnerabilities in packages",
    "packages with security issues",
    "malicious packages",
    "blocked packages",
    "Which packages are at risk?"
  ],
  remediationActionSelection: [
    "Create a git issue for this vulnerability",
    "Notify in slack about this vulnerability",
    "Send an email about this vulnerability"
  ],
  maliciousPackages: [
    "Which packages were blocked in the last 30 days?",
    "Show me the malicious packages",
    "List blocked packages",
    "Show more blocked packages",
    "Packages at risk",
    "Security vulnerabilities"
  ]
}; 