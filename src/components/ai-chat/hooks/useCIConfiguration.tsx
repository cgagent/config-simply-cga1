
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const useCIConfiguration = () => {
  const [showCIConfig, setShowCIConfig] = useState(false);
  const [repository, setRepository] = useState<any>(null);

  const handleCIConfiguration = (content: string) => {
    const lowerContent = content.toLowerCase().trim();
    
    // Check if this is a CI Setup query
    if (
      (lowerContent.includes('set') && lowerContent.includes('ci')) || 
      (lowerContent.includes('setup') && lowerContent.includes('ci')) ||
      (lowerContent.includes('configure') && lowerContent.includes('ci')) ||
      lowerContent === 'set my ci'
    ) {
      // Show embedded CI configuration
      setRepository({
        id: 'sample-repo-1',
        name: 'infrastructure',
        owner: 'jfrog',
        isConfigured: false,
        language: 'JavaScript'
      });
      setShowCIConfig(true);
      
      return {
        handled: true,
        response: "Great, let's set up your CI to work with JFrog.\nWhich CI tools are you using?"
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
