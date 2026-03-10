import { ConversationFlow } from '../../utils/types';
import { ChatOption } from '@/components/shared/types';

// Export the flow ID for reference in other components
export const TOKEN_FLOW_ID = 'token-generation';

// Define selectable options for token expiration
export const tokenExpirationOptions: ChatOption[] = [
  { id: 'expiration-never', label: 'Never', value: 'Never' },
  { id: 'expiration-1day', label: '1 Day', value: '1 Day' },
  { id: 'expiration-3days', label: '3 Days', value: '3 Days' },
  { id: 'expiration-7days', label: '7 Days', value: '7 Days' },
  { id: 'expiration-1month', label: '1 Month', value: '1 Month' },
  { id: 'expiration-1year', label: '1 Year', value: '1 Year' },
];

// Define selectable options for token generation confirmation
const confirmationOptions: ChatOption[] = [
  { id: 'confirm-yes', label: 'Generate Token', value: 'Yes' },
  { id: 'confirm-no', label: 'Cancel', value: 'No' }
];

// Create and export the token flow
export const tokenFlow: ConversationFlow = {
  id: TOKEN_FLOW_ID,
  name: 'Token Generation Flow',
  steps: [
    {
      id: 'token-name',
      patterns: [
        'generate token',
        'create token',
        'new token',
        'token',
        'generate',
        'create'
      ],
      response: `To generate a new access token, please name it first with a descriptive name that will help you identify this token later.

What would you like to name your token?`,
      nextSteps: ['token-expiration']
    },
    {
      id: 'token-expiration',
      patterns: [
        '.*' // Match any response to capture the token name
      ],
      response: (input: string) => {
        return `Your token name will be "${input.trim()}"

What should be your token duration?`;
      },
      actionOptions: tokenExpirationOptions,
      nextSteps: ['confirm-token-generation']
    },
    {
      id: 'confirm-token-generation',
      patterns: [
        'never', 'Never',
        '1 Day', '1 day',
        '3 Days', '3 days',
        '7 Days', '7 days',
        '1 Month', 'month',
        '1 Year', 'year'
      ],
      response: (input: string) => {
        const tokenName = "your token"; // Simplified version without global state
        const expiration = input.trim();
        
        return `**Token summary:**
• Name: "${tokenName}"
• Type: Read-only access
• Expiration: ${expiration}

Generate this token now?`;
      },
      actionOptions: confirmationOptions,
      nextSteps: ['generate-token', 'cancel-token-generation']
    },
    {
      id: 'generate-token',
      patterns: [
        'yes', 'confirm', 'generate', 'create'
      ],
      response: (input: string) => {
        // Generate a mock token for demonstration
        const mockToken = `jfrog_at_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
        
        return `✅ **Token generated**

**Details:**
• Type: Read-only
• Token: \`${mockToken}\`

⚠️ Copy this token now - it won't be displayed again.`;
      },
      isEndOfFlow: true
    },
    {
      id: 'cancel-token-generation',
      patterns: [
        'no', 'cancel', 'stop'
      ],
      response: `Token generation cancelled.

Say "generate token" to start over with different settings.`,
      isEndOfFlow: true
    }
  ]
}; 