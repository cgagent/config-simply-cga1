
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCIConfiguration = () => {
  const [showCIConfig, setShowCIConfig] = useState(false);
  const [repository, setRepository] = useState<any>(null);
  const navigate = useNavigate();

  const handleCIConfiguration = (content: string) => {
    const lowerContent = content.toLowerCase().trim();
    
    // Check if this is a CI Setup query
    if (lowerContent.includes('ci') && 
        (lowerContent.includes('setup') || lowerContent.includes('assist') || lowerContent.includes('set up'))) {
      
      // Option 1: Show embedded CI configuration in the current chat
      setRepository({
        id: 'sample-repo-1',
        name: 'sample-repository',
        owner: 'jfrog',
        isConfigured: false,
        language: 'JavaScript'
      });
      setShowCIConfig(true);
      
      // Option 2: Navigate to dedicated CI setup chat page
      // navigate('/ci-setup-chat');
      
      return {
        handled: true,
        response: "Great, let's set up your CI to work with JFrog. Which CI tools are you using?"
      };
    }
    
    return { handled: false };
  };

  const resetCIConfiguration = () => {
    setShowCIConfig(false);
    setRepository(null);
  };

  return {
    showCIConfig,
    repository,
    handleCIConfiguration,
    resetCIConfiguration
  };
};
