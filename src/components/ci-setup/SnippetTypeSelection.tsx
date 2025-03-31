
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, FileCog } from 'lucide-react';

interface SnippetTypeSelectionProps {
  onSelect: (type: 'snippet' | 'full') => void;
}

const SnippetTypeSelection: React.FC<SnippetTypeSelectionProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col mt-2 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
      <Button
        variant="outline"
        className="justify-start border-blue-800/30 bg-blue-950/20 text-blue-300 hover:bg-blue-900/30 hover:text-blue-100"
        onClick={() => onSelect('snippet')}
      >
        <FileText className="mr-2 h-4 w-4" />
        Basic Setup Snippet
      </Button>
      <Button
        variant="outline"
        className="justify-start border-blue-800/30 bg-blue-950/20 text-blue-300 hover:bg-blue-900/30 hover:text-blue-100"
        onClick={() => onSelect('full')}
      >
        <FileCog className="mr-2 h-4 w-4" />
        Full CI Workflow
      </Button>
    </div>
  );
};

export default SnippetTypeSelection;
