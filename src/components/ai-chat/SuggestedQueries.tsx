
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
      {queries.map((queryItem, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="text-xs rounded-full px-4 hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-1 w-full"
          onClick={() => onSelectQuery(queryItem.query)}
        >
          {queryItem.label}
          <ArrowUp className="h-3 w-3" />
        </Button>
      ))}
    </div>
  );
};
