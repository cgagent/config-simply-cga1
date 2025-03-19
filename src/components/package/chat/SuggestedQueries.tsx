
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
        {queries.map((query, index) => {
          // Apply custom sizing based on the query content
          let customClass = "text-xs truncate flex items-center justify-center gap-1 w-full";
          
          if (query.includes("open source") || query.includes("Open source")) {
            customClass += " sm:col-span-2 text-[10px]"; // Make "Open source packages" related buttons larger but smaller text
          } else if (query.includes("My packages") || query.includes("my packages") || 
                    query.includes("Set my CI") || query.includes("set my CI")) {
            customClass += " transform scale-95"; // Make "My packages" and "Set my CI" related buttons smaller
          }
          
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className={customClass}
              onClick={() => onSelectQuery(query)}
            >
              <span className="truncate">{query}</span>
              <ArrowUp className="h-3 w-3 flex-shrink-0" />
            </Button>
          );
        })}
      </div>
    </div>
  );
};
