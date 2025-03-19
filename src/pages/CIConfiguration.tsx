import React from 'react';
import { AIConfigurationChat } from '@/components/ai-configuration';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useRepositories } from '@/contexts/RepositoryContext';

const CIConfigurationPage: React.FC = () => {
  const location = useLocation();
  
  // Use the shared repository context
  const { updateRepositoryStatus } = useRepositories();
  
  // Always use 'infrastructure' as the repository name for this demo
  const repositoryName = 'infrastructure';
  
  // Use the shared repository update function
  const handleMergeSuccess = (repoName: string, packageType: string) => {
    updateRepositoryStatus(repoName, packageType);
  };

  return (
    <motion.div 
      className="container mx-auto py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h1 
        className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        CI Configuration
      </motion.h1>
      
      <motion.div 
        className="mb-8 bg-card rounded-xl overflow-hidden shadow-lg"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AIConfigurationChat 
          repositoryName={repositoryName} 
          onMergeSuccess={handleMergeSuccess}
        />
      </motion.div>
    </motion.div>
  );
};

export default CIConfigurationPage;
