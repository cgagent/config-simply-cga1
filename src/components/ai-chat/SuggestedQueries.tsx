
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
    <div className="flex flex-wrap gap-2 w-full">
      {queries.map((queryItem, index) => {
        // Apply custom sizing based on the label
        let customClass = "text-xs rounded-full px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors flex items-center whitespace-nowrap";
        
        if (queryItem.label === "Open source packages") {
          customClass += " flex-grow-0"; // Natural width based on content
        } else if (queryItem.label === "My packages" || queryItem.label === "Set my CI") {
          customClass += " flex-grow-0"; // Natural width based on content
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
            <ArrowUp className="h-3 w-3 ml-1 flex-shrink-0" />
          </Button>
        );
      })}
    </div>
  );
};
