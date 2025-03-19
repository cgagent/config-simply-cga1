
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface SuggestedQueriesProps {
  queries: { label: string; query: string }[];
  onSelectQuery: (query: string) => void;
}

export const SuggestedQueries: React.FC<SuggestedQueriesProps> = ({ queries, onSelectQuery }) => {
  return (
    <div className="flex flex-nowrap gap-2 w-full overflow-x-auto pb-2">
      {queries.map((queryItem, index) => {
        // Natural size for all buttons with the same styling
        const customClass = "text-xs rounded-full px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors flex items-center whitespace-nowrap";
        
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
