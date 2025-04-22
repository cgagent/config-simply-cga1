import { ConversationFlow } from '../../types/chatTypes';
import { ChatOption } from '@/components/shared/types';

export const USER_INVITE_FLOW_ID = 'user-invite';

export const userInviteFlow: ConversationFlow = {
  id: USER_INVITE_FLOW_ID,
  name: 'User Invitation',
  steps: [
    {
      id: 'select-role',
      patterns: ['invite', 'user', 'add user'],
      response: "Let's invite users to your organization. Which role would you like to give to these users?",
      actionOptions: [
        { id: 'admin-role', label: 'Admin', value: 'Admin' },
        { id: 'developer-role', label: 'Developer', value: 'Developer' }
      ],
      nextSteps: ['enter-emails']
    },
    {
      id: 'enter-emails',
      patterns: ['admin', 'developer'],
      response: "Please provide the email addresses of the users you'd like to invite, separated by commas.",
      nextSteps: ['confirm-emails']
    },
    {
      id: 'confirm-emails',
      patterns: ['.*'],
      response: "Sure, let's send an invite to \"yaronl@jfrog.com\"",
      actionOptions: [
        { id: 'send-invites', label: 'Send invite', value: 'Send invite' },
        { id: 'maybe-later', label: 'Maybe later', value: 'Maybe later' }
      ],
      isEndOfFlow: true
    }
  ]
}; 