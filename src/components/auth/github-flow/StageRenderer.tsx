
import React from 'react';
import { useAuthStage } from './AuthStageProvider';
import InitialAuthStage from './InitialAuthStage';
import OrgPermissionsStage from './OrgPermissionsStage';
import OrganizationStage from './OrganizationStage';
import RepositoriesStage from './RepositoriesStage';
import ConfirmationStage from './ConfirmationStage';

interface StageRendererProps {
  onClose: () => void;
  onComplete?: (hasOrgPermissions: boolean) => void;
}

const StageRenderer: React.FC<StageRendererProps> = ({ 
  onClose, 
  onComplete 
}) => {
  const { stage } = useAuthStage();
  
  switch (stage) {
    case 'initial':
      return <InitialAuthStage onClose={onClose} />;
    case 'requestOrgPermissions':
      return <OrgPermissionsStage onClose={onClose} onComplete={onComplete} />;
    case 'organization':
      return <OrganizationStage />;
    case 'repositories':
      return <RepositoriesStage />;
    case 'confirmation':
      return <ConfirmationStage onClose={onClose} onComplete={onComplete} />;
    default:
      return null;
  }
};

export default StageRenderer;
