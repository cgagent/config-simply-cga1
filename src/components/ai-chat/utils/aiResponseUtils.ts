
// Common responses for the AI chat
const commonResponses = [
  "I'm analyzing your repository now. Based on what I'm seeing, I recommend updating your dependency scanning configuration to catch vulnerable packages earlier in your pipeline.",
  "Looking at your setup, I notice you're using npm packages. Did you know JFrog can automatically scan these for security vulnerabilities during the CI process?",
  "Based on your repository structure, I recommend setting up Docker scanning in your CI pipeline to detect vulnerabilities before deployment.",
  "I've analyzed your build logs and found some opportunities to optimize your CI pipeline for faster security scanning.",
  "According to our analysis, implementing GitOps with JFrog can enhance your CI/CD security posture significantly.",
  "Looking at your package dependencies, I've identified several that could benefit from JFrog's advanced security scanning."
];

// Simulate a response from the AI
export const simulateAIResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  // Handle specific queries
  if (lowerQuery.includes("docker") || lowerQuery.includes("container")) {
    return "For Docker containers, JFrog Xray can scan for vulnerabilities in your images and prevent deployment of compromised containers. Would you like me to help set that up in your CI pipeline?";
  }
  
  if (lowerQuery.includes("npm") || lowerQuery.includes("javascript") || lowerQuery.includes("node")) {
    return "For npm packages, JFrog provides detailed vulnerability information including direct and transitive dependencies. This helps catch security issues early in your development cycle.";
  }
  
  if (lowerQuery.includes("maven") || lowerQuery.includes("java")) {
    return "For Java/Maven projects, JFrog can scan your dependencies and provide actionable remediation advice for vulnerable packages.";
  }
  
  if (lowerQuery.includes("security") || lowerQuery.includes("vulnerability") || lowerQuery.includes("scan")) {
    return "JFrog's security scanning identifies vulnerabilities in your dependencies and provides detailed information about the risks, including CVSS scores and fix recommendations.";
  }
  
  // Return a random response for other queries
  return getRandomResponse();
};

// Get a random response from the common responses
export const getRandomResponse = (): string => {
  const randomIndex = Math.floor(Math.random() * commonResponses.length);
  return commonResponses[randomIndex];
};
