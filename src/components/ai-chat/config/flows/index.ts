import { maliciousPackagesFlow } from './securityFlow';
import { securityRiskFlow } from './securityFlow';
import { configFlow } from './configFlow';

/**
 * All conversation flows
 */
export const conversationFlows = [
  securityRiskFlow,
  maliciousPackagesFlow,
  configFlow
]; 