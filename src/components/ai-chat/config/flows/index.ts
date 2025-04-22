import { ConversationFlow } from '../../types/chatTypes';
import { securityRiskFlow } from './securityRiskFlow';
import { maliciousPackagesFlow } from './maliciousPackagesFlow';
import { configFlow } from './configFlow';
import { releaseFlow } from './releaseFlow';
import { userInviteFlow } from './userInviteFlow';

/**
 * All conversation flows
 */
export const conversationFlows: ConversationFlow[] = [
  securityRiskFlow,
  maliciousPackagesFlow,
  configFlow,
  releaseFlow,
  userInviteFlow
]; 