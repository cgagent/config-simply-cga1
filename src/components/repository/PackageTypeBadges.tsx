import React from 'react';
import { Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PackageTypeBadgesProps {
  packageTypes: string[];
}

const PackageTypeBadges: React.FC<PackageTypeBadgesProps> = ({ 
  packageTypes
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
    </div>
  );
};

export default PackageTypeBadges;
