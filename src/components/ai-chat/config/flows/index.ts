import { maliciousPackagesFlow } from './securityFlow';
import { securityRiskFlow } from './securityFlow';

/**
 * All conversation flows
 */
export const conversationFlows = [
  securityRiskFlow,
  maliciousPackagesFlow
]; 