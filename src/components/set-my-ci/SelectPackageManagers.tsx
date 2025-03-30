
import React from 'react';
import { Package, Check, FileCode, Github, Database, Code2, Boxes } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SelectPackageManagersProps {
  selectedPackages: string[];
  onTogglePackage: (packageType: string) => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  canProceed: boolean;
}

// Helper function to get the appropriate icon for each package type
const getPackageIcon = (type: string) => {
  switch (type) {
    case 'docker':
      return <Boxes className="h-5 w-5 mr-2 text-blue-300" />;
    case 'npm':
      return <FileCode className="h-5 w-5 mr-2 text-blue-300" />;
    case 'github':
      return <Github className="h-5 w-5 mr-2 text-blue-300" />;
    case 'nuget':
      return <Code2 className="h-5 w-5 mr-2 text-blue-300" />;
    case 'python':
      return <Code2 className="h-5 w-5 mr-2 text-blue-300" />;
    case 'maven':
      return <Database className="h-5 w-5 mr-2 text-blue-300" />;
    case 'go':
      return <Code2 className="h-5 w-5 mr-2 text-blue-300" />;
    default:
      return <Package className="h-5 w-5 mr-2 text-blue-300" />;
  }
};

const packageManagers = [
  { id: 'docker', name: 'Docker' },
  { id: 'npm', name: 'npm' },
  { id: 'nuget', name: 'NuGet' },
  { id: 'python', name: 'Python' },
  { id: 'maven', name: 'Maven' },
  { id: 'go', name: 'Go' }
];

const SelectPackageManagers: React.FC<SelectPackageManagersProps> = ({
  selectedPackages,
  onTogglePackage
}) => {
  return (
    <div className="bg-blue-900/5 p-4 rounded-lg border border-blue-700/20 shadow-sm">
      <h2 className="text-xl font-bold mb-2 text-blue-100">Step 2: Select Package Managers</h2>
      <p className="text-blue-200 text-sm mb-3">
        Choose the package managers used in your project.
      </p>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        {packageManagers.map((pkg) => (
          <div 
            key={pkg.id}
            className={`flex items-center border rounded-md p-2 cursor-pointer hover:bg-blue-900/20 transition-colors ${
              selectedPackages.includes(pkg.id) 
                ? 'border-blue-600 bg-blue-900/30 ring-1 ring-blue-600/30 shadow-sm' 
                : 'border-blue-800/30'
            }`}
            onClick={() => onTogglePackage(pkg.id)}
          >
            {getPackageIcon(pkg.id)}
            <span className="font-medium text-sm text-blue-100">{pkg.name}</span>
            {selectedPackages.includes(pkg.id) && (
              <Check className="h-4 w-4 ml-auto text-blue-300" />
            )}
          </div>
        ))}
      </div>
      
      {selectedPackages.length > 0 && (
        <div className="p-2 bg-blue-900/20 rounded-md border border-blue-800/30 mb-3">
          <h3 className="text-sm font-medium mb-1 text-blue-100">Selected:</h3>
          <div className="flex flex-wrap gap-1">
            {selectedPackages.map((pkg) => {
              const manager = packageManagers.find(p => p.id === pkg);
              return (
                <Badge key={pkg} variant="secondary" className="flex items-center gap-1 py-0.5 px-2 bg-blue-800/50 text-blue-100 border border-blue-700/50 text-xs">
                  {getPackageIcon(pkg)}
                  {manager?.name || pkg}
                  <button 
                    className="ml-1 hover:text-destructive text-sm font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePackage(pkg);
                    }}
                  >
                    ×
                  </button>
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectPackageManagers;
