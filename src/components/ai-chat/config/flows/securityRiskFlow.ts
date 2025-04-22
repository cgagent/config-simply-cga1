import { ConversationFlow } from '../../types/chatTypes';
import { ChatOption } from '@/components/shared/types';

export const SECURITY_RISK_FLOW_ID = 'security-risk';

export const securityRiskFlow: ConversationFlow = {
  id: SECURITY_RISK_FLOW_ID,
  name: 'Security Risk',
  steps: [
    {
      id: 'detect-risk',
      patterns: ['security', 'risk', 'vulnerability'],
      response: "I've detected a security risk in your dependencies. Would you like me to help you address it?",
      actionOptions: [
        { id: 'fix-risk', label: 'Yes, help me fix it', value: 'Yes, help me fix it' },
        { id: 'ignore-risk', label: 'No, ignore for now', value: 'No, ignore for now' }
      ],
      nextSteps: ['fix-risk', 'ignore-risk']
    },
    {
      id: 'fix-risk',
      patterns: ['yes', 'fix', 'help'],
      response: "I'll help you fix the security risk. Let me analyze the best solution for you.",
      isEndOfFlow: true
    },
    {
      id: 'ignore-risk',
      patterns: ['no', 'ignore', 'later'],
      response: "I'll note that you want to ignore this risk for now. You can address it later through the security dashboard.",
      isEndOfFlow: true
    }
  ]
}; 