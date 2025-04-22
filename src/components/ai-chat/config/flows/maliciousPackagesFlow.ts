import { ConversationFlow } from '../../types/chatTypes';
import { ChatOption } from '@/components/shared/types';

export const MALICIOUS_PACKAGES_FLOW_ID = 'malicious-packages';

export const maliciousPackagesFlow: ConversationFlow = {
  id: MALICIOUS_PACKAGES_FLOW_ID,
  name: 'Malicious Packages',
  steps: [
    {
      id: 'detect-malicious',
      patterns: ['malicious', 'blocked', 'suspicious'],
      response: "I've detected some potentially malicious packages in your dependencies. Would you like me to help you block them?",
      actionOptions: [
        { id: 'block-packages', label: 'Yes, block them', value: 'Yes, block them' },
        { id: 'review-packages', label: 'No, let me review first', value: 'No, let me review first' }
      ],
      nextSteps: ['block-packages', 'review-packages']
    },
    {
      id: 'block-packages',
      patterns: ['yes', 'block', 'remove'],
      response: "I'll help you block these malicious packages and suggest safer alternatives.",
      isEndOfFlow: true
    },
    {
      id: 'review-packages',
      patterns: ['no', 'review', 'later'],
      response: "I'll provide you with a detailed report of the suspicious packages for your review.",
      isEndOfFlow: true
    }
  ]
}; 