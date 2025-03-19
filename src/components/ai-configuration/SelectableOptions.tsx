
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { ChatOption } from './types';

interface SelectableOptionsProps {
  options: ChatOption[];
  onSelectOption: (option: ChatOption) => void;
}

export const SelectableOptions: React.FC<SelectableOptionsProps> = ({
  options,
  onSelectOption
}) => {
  if (!options || options.length === 0) return null;
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 w-full">
      {options.map((option) => {
        // Apply custom sizing based on the label
        let customClass = "text-xs rounded-full px-4 hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-1 w-full";
        
        if (option.label.includes("open source") || option.label.includes("Open source")) {
          customClass += " sm:col-span-2"; // Make "Open source" related buttons larger
        } else if (option.label.includes("My packages") || option.label.includes("my packages") || 
                  option.label.includes("Set my CI") || option.label.includes("set my CI")) {
          customClass += " transform scale-95"; // Make specific buttons smaller
        }
        
        return (
          <Button
            key={option.id}
            variant="outline"
            size="sm"
            className={customClass}
            onClick={() => onSelectOption(option)}
          >
            {option.label}
            <ArrowUp className="h-3 w-3" />
          </Button>
        );
      })}
    </div>
  );
};
