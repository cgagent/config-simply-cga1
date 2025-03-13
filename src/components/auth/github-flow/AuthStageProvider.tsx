
import React, { createContext, useContext, useState } from 'react';
import { GithubOrg } from '../OrganizationSelector';
import { GithubRepo } from '../RepositorySelector';

// Auth flow stages that match the GitHub OAuth flow more closely
export type AuthStage = 'initial' | 'requestOrgPermissions' | 'organization' | 'repositories' | 'confirmation';

interface AuthStageContextProps {
  stage: AuthStage;
  setStage: (stage: AuthStage) => void;
  selectedOrg: GithubOrg | null;
  setSelectedOrg: (org: GithubOrg | null) => void;
  selectedRepos: Record<string, boolean>;
  setSelectedRepos: (repos: Record<string, boolean>) => void;
  selectAll: boolean;
  setSelectAll: (selectAll: boolean) => void;
  hasGrantedOrgPermissions: boolean;
  setHasGrantedOrgPermissions: (hasPermissions: boolean) => void;
  handleBack: () => void;
}

const AuthStageContext = createContext<AuthStageContextProps | undefined>(undefined);

export const useAuthStage = () => {
  const context = useContext(AuthStageContext);
  if (!context) {
    throw new Error('useAuthStage must be used within an AuthStageProvider');
  }
  return context;
};

interface AuthStageProviderProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const AuthStageProvider: React.FC<AuthStageProviderProps> = ({ 
  children,
  onClose
}) => {
  const [stage, setStage] = useState<AuthStage>('initial');
  const [selectedOrg, setSelectedOrg] = useState<GithubOrg | null>(null);
  const [selectedRepos, setSelectedRepos] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);
  const [hasGrantedOrgPermissions, setHasGrantedOrgPermissions] = useState(false);
  
  const handleBack = () => {
    if (stage === 'confirmation') {
      setStage('repositories');
    } else if (stage === 'repositories') {
      setStage('organization');
    } else if (stage === 'organization') {
      setStage('requestOrgPermissions');
    } else if (stage === 'requestOrgPermissions') {
      setStage('initial');
    } else {
      onClose();
    }
  };
  
  return (
    <AuthStageContext.Provider 
      value={{
        stage,
        setStage,
        selectedOrg,
        setSelectedOrg,
        selectedRepos,
        setSelectedRepos,
        selectAll,
        setSelectAll,
        hasGrantedOrgPermissions,
        setHasGrantedOrgPermissions,
        handleBack
      }}
    >
      {children}
    </AuthStageContext.Provider>
  );
};
