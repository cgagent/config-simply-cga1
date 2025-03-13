
import React from 'react';
import { Package, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SelectPackageTypesProps {
  packageTypes: string[];
  selectedPackageTypes: string[];
  onTogglePackageType: (type: string) => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  canProceed: boolean;
}

const SelectPackageTypes: React.FC<SelectPackageTypesProps> = ({
  packageTypes,
  selectedPackageTypes,
  onTogglePackageType,
  onNextStep,
  onPreviousStep,
  canProceed
}) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Step 2: Select Package Managers</h2>
      <p className="text-muted-foreground mb-6">
        Choose the package managers that your project uses
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {packageTypes.map((type) => (
          <div 
            key={type}
            className={`border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors ${
              selectedPackageTypes.includes(type) 
                ? 'border-primary ring-2 ring-primary/20 bg-primary/5' 
                : 'border-border'
            }`}
            onClick={() => onTogglePackageType(type)}
          >
            <div className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              <span className="font-medium capitalize">{type}</span>
              {selectedPackageTypes.includes(type) && (
                <Check className="h-4 w-4 ml-auto text-primary" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      {selectedPackageTypes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Selected Package Managers:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedPackageTypes.map((type) => (
              <Badge key={type} variant="secondary" className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                {type}
                <button 
                  className="ml-1 hover:text-destructive"
                  onClick={() => onTogglePackageType(type)}
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-8 flex justify-end">
        <Button variant="outline" className="mr-2" onClick={onPreviousStep}>
          Back
        </Button>
        <Button onClick={onNextStep} disabled={!canProceed}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SelectPackageTypes;
