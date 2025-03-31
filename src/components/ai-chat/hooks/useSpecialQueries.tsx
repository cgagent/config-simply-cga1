
import { useCallback } from 'react';
import { SUGGESTED_QUERIES } from '../constants';
import { getRandomResponse } from '../utils/aiResponseUtils';

export const useSpecialQueries = () => {
  // Process special queries with predefined responses
  const processSpecialQuery = useCallback((content: string) => {
    const lowerContent = content.toLowerCase().trim();
    
    // Default response (unhandled)
    let result = {
      handled: false,
      response: '',
      getResponse: () => getRandomResponse(content)
    };
    
    // Check if this matches a CI setup query
    if (
      (lowerContent.includes('set') && lowerContent.includes('ci')) || 
      (lowerContent.includes('setup') && lowerContent.includes('ci')) ||
      (lowerContent.includes('configure') && lowerContent.includes('ci')) ||
      lowerContent === 'set my ci'
    ) {
      // This is now handled directly in the CIConfiguration component
      result = {
        handled: true,
        response: "Great, let's set up your CI to work with JFrog.\nWhich CI tools are you using?",
        getResponse: () => "Great, let's set up your CI to work with JFrog.\nWhich CI tools are you using?"
      };
    }
    
    // Special query for package risks
    else if (lowerContent.includes('risk') && lowerContent.includes('package')) {
      result = {
        handled: true,
        response: "I've identified 3 high-risk packages in your organization:\n\n- axios@0.21.1 (CVE-2021-3749)\n- log4j@2.14.0 (CVE-2021-44228)\n- spring-core@5.3.8 (CVE-2022-22965)\n\nWould you like to see detailed information about any of these vulnerabilities?",
        getResponse: () => "I've identified 3 high-risk packages in your organization:\n\n- axios@0.21.1 (CVE-2021-3749)\n- log4j@2.14.0 (CVE-2021-44228)\n- spring-core@5.3.8 (CVE-2022-22965)\n\nWould you like to see detailed information about any of these vulnerabilities?"
      };
    }
    
    // Special query for HTTP package recommendations
    else if (lowerContent.includes('http') && lowerContent.includes('package')) {
      result = {
        handled: true,
        response: "For HTTP requests, I recommend these secure packages:\n\n1. axios@1.6.2 (JavaScript)\n2. requests@2.31.0 (Python)\n3. httpclient5@5.2.1 (Java)\n\nAll of these have recent security updates and no known critical vulnerabilities. Would you like more details on any of these options?",
        getResponse: () => "For HTTP requests, I recommend these secure packages:\n\n1. axios@1.6.2 (JavaScript)\n2. requests@2.31.0 (Python)\n3. httpclient5@5.2.1 (Java)\n\nAll of these have recent security updates and no known critical vulnerabilities. Would you like more details on any of these options?"
      };
    }
    
    // Special query for vulnerable packages
    else if (lowerContent.includes('vulnerable') && lowerContent.includes('package')) {
      result = {
        handled: true,
        response: "I've identified these vulnerable packages in use:\n\n- axios@0.21.1: Used in 12 repositories\n- log4j@2.14.0: Used in 5 repositories\n- spring-core@5.3.8: Used in 3 repositories\n\nWould you like to see which repositories are affected?",
        getResponse: () => "I've identified these vulnerable packages in use:\n\n- axios@0.21.1: Used in 12 repositories\n- log4j@2.14.0: Used in 5 repositories\n- spring-core@5.3.8: Used in 3 repositories\n\nWould you like to see which repositories are affected?"
      };
    }
    
    return result;
  }, []);

  return { processSpecialQuery };
};
