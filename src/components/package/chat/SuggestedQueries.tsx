
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface SuggestedQueriesProps {
  queries: string[];
  onSelectQuery: (query: string) => void;
}

export const SuggestedQueries: React.FC<SuggestedQueriesProps> = ({ queries, onSelectQuery }) => {
  return (
    <div className="px-4 py-2 bg-muted/20">
      <p className="text-xs text-muted-foreground mb-2">Try asking about:</p>
      <div className="flex flex-wrap gap-2 w-full">
        {queries.map((query, index) => {
          // Use natural sizing for all buttons
          const customClass = "text-xs flex items-center whitespace-nowrap";
          
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className={customClass}
              onClick={() => onSelectQuery(query)}
            >
              {query}
              <ArrowUp className="h-3 w-3 ml-1 flex-shrink-0" />
            </Button>
          );
        })}
      </div>
    </div>
  );
};
