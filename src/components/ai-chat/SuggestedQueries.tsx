
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { SUGGESTED_QUERIES } from './constants';

interface SuggestedQueriesProps {
  queries: { label: string; query: string }[];
  onSelectQuery: (query: string) => void;
}

export const SuggestedQueries: React.FC<SuggestedQueriesProps> = ({ queries, onSelectQuery }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
      {queries.map((queryItem, index) => {
        // Apply custom sizing based on the label
        let customClass = "text-xs rounded-full px-4 hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-1 w-full";
        
        if (queryItem.label === "Open source packages") {
          customClass += " sm:col-span-2"; // Make this button take up 2 columns on sm screens and above
        } else if (queryItem.label === "My packages" || queryItem.label === "Set my CI") {
          customClass += " transform scale-95"; // Make these buttons slightly smaller
        }
        
        return (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={customClass}
            onClick={() => onSelectQuery(queryItem.query)}
          >
            {queryItem.label}
            <ArrowUp className="h-3 w-3" />
          </Button>
        );
      })}
    </div>
  );
};
