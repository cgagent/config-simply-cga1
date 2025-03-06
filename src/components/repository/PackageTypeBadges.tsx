
import React from 'react';
import { Package, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PackageTypeBadgesProps {
  packageTypes: string[];
  missingPackageTypes: string[];
}

const PackageTypeBadges: React.FC<PackageTypeBadgesProps> = ({ 
  packageTypes,
  missingPackageTypes 
}) => {
  return (
    <div className="flex gap-1 flex-wrap">
      {/* Connected package types */}
      {packageTypes.map((type, index) => (
        <Badge 
          key={index}
          variant="outline"
          className="text-xs bg-secondary text-secondary-foreground"
        >
          <Package className="h-3 w-3 mr-1" />
          {type}
        </Badge>
      ))}
      
      {/* Missing package types */}
      {missingPackageTypes.map((type, index) => (
        <Badge 
          key={`missing-${index}`}
          variant="outline"
          className="text-xs border-dashed bg-red-50 text-red-500 border-red-200"
        >
          <X className="h-3 w-3 mr-1" />
          {type}
        </Badge>
      ))}
    </div>
  );
};

export default PackageTypeBadges;
