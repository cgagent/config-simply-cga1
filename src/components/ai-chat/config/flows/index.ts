import { ConversationFlow } from '../../types/chatTypes';
import { securityFlow, maliciousPackagesFlow } from './securityFlow';
import { configFlow } from './configFlow';
import { releaseFlow } from './releaseFlow';
import { userInviteFlow } from './userInviteFlow';

/**
 * All conversation flows
 */
export const conversationFlows: ConversationFlow[] = [
  securityFlow,
  maliciousPackagesFlow,
  configFlow,
  releaseFlow,
  userInviteFlow
]; 