import { ConversationFlow } from '../../utils/types';
import { securityRiskPatterns } from '../patterns/securityPatterns';
import { securityRiskResponses } from '../responses/securityResponses';
import { securityRemediationOptions } from '../constants/securityConstants';
import { showMoreOption } from '../responses/securityResponses';

/**
 * Security risk flow
 */
export const securityFlow: ConversationFlow = {
  id: 'security-risk',
  name: 'Security Risk',
  steps: [
    {
      id: 'identify-risk',
      patterns: securityRiskPatterns.identifyRisk,
      response: securityRiskResponses.identifyRisk,
      nextSteps: ['remediation-action-selection']
    },
    {
      id: 'remediation-action-selection',
      patterns: securityRiskPatterns.remediationActionSelection,
      response: securityRiskResponses.remediationActionSelection,
      isEndOfFlow: true
    }
  ]
};

/**
 * Malicious packages flow
 */
export const maliciousPackagesFlow: ConversationFlow = {
  id: 'malicious-packages',
  name: 'Malicious Packages',
  steps: [
    {
      id: 'packages-at-risk',
      patterns: securityRiskPatterns.maliciousPackages,
      response: securityRiskResponses.maliciousPackages,
      nextSteps: ['show-more-packages']
    },
    {
      id: 'show-more-packages',
      patterns: [
        'Show more blocked packages',
        'Show more packages',
        'Show more'
      ],
      response: securityRiskResponses.detailedBlockedPackages,
      isEndOfFlow: true
    }
  ]
}; 