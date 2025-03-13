
import React from 'react';
import OrganizationSelector from '../OrganizationSelector';
import { useAuthStage } from './AuthStageProvider';
import { githubOrgs } from '../githubData';

const OrganizationStage: React.FC = () => {
  const { handleBack, setSelectedOrg, setStage } = useAuthStage();
  
  const handleOrgSelect = (org) => {
    setSelectedOrg(org);
    setStage('repositories');
  };
  
  return (
    <OrganizationSelector 
      githubOrgs={githubOrgs}
      onOrgSelect={handleOrgSelect}
      onBack={handleBack}
    />
  );
};

export default OrganizationStage;
