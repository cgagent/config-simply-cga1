
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SnippetLoadingState: React.FC = () => {
  return (
    <div className="space-y-3 animate-pulse">
      <Skeleton className="h-6 w-full bg-gray-200" />
      <Skeleton className="h-40 w-full bg-gray-200" />
      <div className="flex justify-end mt-4 space-x-2">
        <Skeleton className="h-9 w-20 bg-gray-200" />
        <Skeleton className="h-9 w-24 bg-gray-200" />
      </div>
    </div>
  );
};

export default SnippetLoadingState;
