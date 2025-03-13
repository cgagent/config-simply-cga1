
import React from 'react';
import { Button } from '@/components/ui/button';

interface SuggestedQueriesProps {
  queries: string[];
  onSelectQuery: (query: string) => void;
}

export const SuggestedQueries: React.FC<SuggestedQueriesProps> = ({ queries, onSelectQuery }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {queries.map((query, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="text-xs rounded-full px-4 hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => onSelectQuery(query)}
        >
          {query}
        </Button>
      ))}
    </div>
  );
};
